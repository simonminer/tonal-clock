import React, { useEffect, useState } from 'react';
import Clock from 'react-clock';
import './App.css';
import 'react-clock/dist/Clock.css';

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
      <Clock 
        value={now}
        size={500}
        renderNumbers={true}
      />
    </div>
  );
}

export default App;
