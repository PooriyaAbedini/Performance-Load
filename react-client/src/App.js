import { useEffect, useState } from 'react';
import './App.css';
import socket from './utilites/socketConnection';
import Widget from './perfDataComponents/Widget';

function App() {
  const [performanceData, setPerformanceData] = useState({});

  useEffect(() => {
    socket.on('perfData', data => {
      const copyPerfData = { ...performanceData };
      performanceData[data.macA] = data;
      setPerformanceData(copyPerfData);
    })
  }, []);

  const widgets = Object.values(performanceData).map(data => <Widget data = {data} key = {data.macA} />);

  return (
    <div className='container'>
      { widgets }
    </div>
  );
}

export default App;
