import { useRef } from 'react'
import drawCircle from '../utilites/canvasLoadAnimations';

const Mem = ({ data }) => {
  const { totalMemory, freeMemory, usedMemory, memoryUsage } = data;

  const totalMemInGB = Math.floor(totalMemory / 1073741824 * 100) / 100;
  const freeMemInGB = Math.floor(freeMemory / 1073741824 * 100) / 100;
  const usedMemInGB = Math.floor(usedMemory / 1073741824 * 100) / 100;

  const canvasEl = useRef();
  drawCircle(canvasEl.current, memoryUsage * 100);

  return (
    <div className='mem col-3'>
      <h4>Memory</h4>
      <div className='canvas-wrapper'>
        <canvas ref={canvasEl} className='' width="200" height="200"></canvas>
        <div className='mem-text'>
          { memoryUsage * 100 }%
        </div>
      </div>
      <div>
        <small>Total Memory: { totalMemInGB } GB</small>
        <br />
        <small>Free Memory: { freeMemInGB } GB</small>
      </div>
    </div>
  )
}

export default Mem
