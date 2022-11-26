import React, { useEffect, useState } from 'react';
import './App.css';
import TonalClockFace from './TonalClockFace';

function App() {
  const now = new Date();
  now.setHours(now.getHours() + 3);
  return (
    <div>
      <h1>Current Time</h1>
      <TonalClockFace />
    </div>
  );
}

export default App;
