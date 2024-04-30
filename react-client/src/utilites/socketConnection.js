import io from 'socket.io-client'
const options = {
  auth: {
    token: "l;lsdajfnxc,vnkladsjfkljsdoiwuertlkagjm,g"
  }
}
const socket = io.connect('http://localhost:3000', options) 

// socket.on('welcome', message => {
//   console.log(message);
// })

export default socket;


