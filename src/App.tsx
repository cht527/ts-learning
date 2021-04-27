import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import iniitValue from './initValue'


function App() {

  return (
    <div className="App">
      
      <div>{iniitValue.data.a}</div>
    </div>
  );
}

export default App;
