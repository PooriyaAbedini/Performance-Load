//socket.io server that will service both 
//node and react clients
//REQ:
//  -socket.io
//  -socket.io/cluster-adapter
//  -socket.io/sticky

//entrypoint for ouf cluster which will make workers
//and the workers will do the socket.io handling 


const cluster = require("cluster");
const http = require("http"); //if i need express, we will implement it in a different way
const { Server } = require("socket.io");
const numCPUs = require("os").cpus().length;
const { setupMaster, setupWorker } = require("@socket.io/sticky"); // makes it so a client can find it's way back to the correct worker
const { createAdapter, setupPrimary } = require("@socket.io/cluster-adapter"); // makes it so a primary node can emmit to everyone
const socketMain = require('./socketMain');

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  const httpServer = http.createServer();

  // setup sticky sessions
  setupMaster(httpServer, {
    loadBalancingMethod: "least-connection",
  });

  // setup connections between the workers
  setupPrimary();

  // needed for packets containing buffers (you can ignore it if you only send plaintext objects)
  // Node.js < 16.0.0
  // cluster.setupMaster({
  //   serialization: "advanced",
  // });
  // Node.js > 16.0.0
  cluster.setupPrimary({
    serialization: "advanced",
  });

  httpServer.listen(3000);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  console.log(`Worker ${process.pid} started`);

  const httpServer = http.createServer();
  const io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:3001',
      credentials: true
    }
  });

  // use the cluster adapter
  io.adapter(createAdapter()); // change from the default adapter

  // setup connection with the primary process
  setupWorker(io);

  socketMain(io);


}