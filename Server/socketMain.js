//Where socket.io listeners and (most) emmiters

const socketMain = (io) => {
  let machinMacA;

  io.on("connection", (socket) => {
    const auth = socket.handshake.auth;
    if(auth.token === "lasjdkl;asm,nxv0u3095woitsguweulrjkld,nvsv") {
      socket.join('nodeClients');
    }
    else if (auth.token === "l;lsdajfnxc,vnkladsjfkljsdoiwuertlkagjm,g") {
      socket.join('reactClients');
    }
    else {
      socket.disconnect();
      console.log("YOU ARE NOT A VALID CLIENT");
      console.log("YOU HAVE BEEN DISCONNECTED!");
    }
    console.log(`Someone connected on a worker, process id: ${process.pid}`);
    socket.emit('welcome', 'Welcome to our cluster driven socket.io server!');

    socket.on('perfData', data => {
      io.to('reactClients').emit('perfData', data);
      if(!machinMacA) {
        machinMacA = data.macA;
      }
      else {
        io.to('reactClients').emit('connectedOrNot', { machinMacA, isAlive: true });
      }
    })

    socket.on('connectionTestApp', data => {
      console.log(data);
    })

    socket.on('secondConnection', data => {
      console.log(data);
    })

    socket.on('disconnect', reason => {
      io.to('reactClients').emit('connectedOrNot', { machinMacA, isAlive: false });
    })
  });
}

module.exports = socketMain;