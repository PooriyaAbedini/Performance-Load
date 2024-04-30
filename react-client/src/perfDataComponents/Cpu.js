import { useRef } from 'react'
import drawCircle from '../utilites/canvasLoadAnimations'

const Cpu = ({ data }) => {
  const { cpuLoad } = data;
  const canvasEl = useRef();
  drawCircle(canvasEl.current, cpuLoad);

  return (
    <div className='cpu col-3'>
      <h4>Cpu Load</h4>
      <div className='canvas-wrapper'>
        <canvas ref={canvasEl} className='' width="200" height="200"> </canvas>
        <div className='cpu-text'>
          { cpuLoad }
        </div>
      </div>
    </div>
  )
}

export default Cpu
