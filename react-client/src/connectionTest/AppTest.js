import { useEffect } from 'react'
import socket from '../socketConnection'
import SecondTest from './secondTest';

const AppTest = () => {

  useEffect(() => {
    socket.emit('connectionTestApp', 'am i connected?');
  }, [socket]);

  return (
    <>
      <h1>App Test</h1>
      <SecondTest />
    </>
  )
}

export default AppTest