import { useEffect, useState} from 'react'
import Info from './Info'
import Cpu from './Cpu'
import Mem from './Mem'
import socket from '../utilites/socketConnection'
import './widget.css'

const Widget = ({ data }) => {

  const [isAlive, setIsAlive] = useState(true);

  const {
    numCores,
    cpuType,
    cpuSpeed,
    totalMemory,
    freeMemory,
    usedMemory,
    memoryUsage,
    osType,
    uptime,
    cpuLoad,
    macA
  } = data;

  const cpuData = {  cpuLoad };
  const memData = { totalMemory, freeMemory, usedMemory, memoryUsage };
  const infoData = { osType, uptime, macA, cpuType, cpuSpeed, numCores };

  const notAlive = !isAlive ? <div className='not-active'>Offline</div> : <></>;

  useEffect(() => {
    socket.on('connectedOrNot', ({ machinMacA, isAlive}) => {
      //it's not checking for this client is disconnected or reconnected. 
      //it's for one of the node clients.
      if(machinMacA === macA) {
        setIsAlive(isAlive);
      }
    })
  }, [])

  return (
    <div className='widget row justify-content-evenly'>
      { notAlive }
      <Cpu data = { cpuData } />
      <Mem data = { memData } />
      <Info data = { infoData } />
    </div>
  )
}

export default Widget
