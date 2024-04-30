//The node program that captures local performance data and 
//sends it via socket to the server
//REQ:
//-socket.io-client

// - CPU load (current)
// - Memory Usage
  // - total
  // - free
// - OS type
// - uptime 
// - CPU info
  // - type 
  // - Number of cores
  // - Clock speed 

  const os = require('os');
  const io = require('socket.io-client');
  const options = {
    auth: {
      token: "lasjdkl;asm,nxv0u3095woitsguweulrjkld,nvsv"
    }
  }
  const socket = io.connect('http://localhost:3000', options);


  socket.on('connect', () => {
    //I need a unique id to identify this machin to the server, we will use macId because its unique for this machin (not socket.id or ip address or random hash)
    const nI = os.networkInterfaces(); //a list of all the network interface elements on this machin;
    let macA;
    for(key in nI) {
      const isExternal = !nI[key][0].internal;
      if(isExternal) {
        macA = nI[key][0].mac;
        break
      }
    }
    const perfDataInterval = setInterval(async() => {
      const perfData = await perfomanceLoadData();
      perfData.macA = macA;
      socket.emit('perfData', perfData);
    }, 1000);

    socket.on('disconnect', () => {
      clearInterval(perfDataInterval);
    })
  })

  function cpuAverage() {
    const cpus = os.cpus();
    let totalMs = 0;
    let idleMs = 0;
    cpus.forEach(core => {
      for (mode in core.times) {
        totalMs += core.times[mode]
      }
      idleMs += core.times.idle;
    })
    return {
      idle : idleMs / cpus.length,
      total: totalMs / cpus.length,
    }
  }

  const getCpuLoad = () => new Promise((resolve, reject) => {
    const start = cpuAverage();
    setTimeout(() => {
      const end = cpuAverage();
      const idleDiff = end.idle - start.idle;
      const totalDiff = end.total - start.total;
      const percentageOfCpus = 100 - Math.floor(100 * idleDiff / totalDiff);
      resolve(percentageOfCpus);
    }, 100)
  }) 

  const perfomanceLoadData = () => new Promise(async(resolve, reject) => {
    const cpus = os.cpus();
    const numCores = cpus.length;
    const cpuType = cpus[0].model;
    const cpuSpeed = cpus[0].speed;
    const totalMemory = os.totalmem(); //in bytes
    const freeMemory = os.freemem(); // in bytes
    const usedMemory = totalMemory - freeMemory;
    const memoryUsage = Math.floor((usedMemory/totalMemory) * 100) / 100;
    const osType = os.type();
    const uptime = os.uptime();
    const cpuLoad = await getCpuLoad();
    resolve({
      numCores,
      cpuType,
      cpuSpeed,
      totalMemory,
      freeMemory,
      usedMemory,
      memoryUsage,
      osType,
      uptime,
      cpuLoad
    });
  });

  // const run = async() => {
  //   const data = await perfomanceLoadData();
  //   console.log(data);
  // }

  // run();
 








