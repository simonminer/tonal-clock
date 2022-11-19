import React, { useEffect, useState } from 'react';
import './App.css';
import TonalClockFace from './TonalClockFace';

function App() {
  const [now, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <h1>Current Time</h1>
      <TonalClockFace time={now} />
    </div>
  );
}

export default App;
