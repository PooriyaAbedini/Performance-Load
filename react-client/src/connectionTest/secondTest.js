import { useEffect } from 'react'
import socket from '../socketConnection'

const SecondTest = () => {
  useEffect(() => {
    socket.emit('secondConnection', "am i connected again?")
  }, [socket])
  return (
    <>
      <h2>second test: fuck you there again!!</h2>
    </>
  )
}

export default SecondTest