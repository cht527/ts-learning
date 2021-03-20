import React, { useEffect, useRef } from 'react';
import useDom from './hooks/dom';
import './App.css';
import { fromEvent } from 'rxjs';

function App() {
  const nodeRef = useRef<HTMLElement|null>(null);
  
  useEffect(()=>{  
    nodeRef.current = document.getElementById('btn') as HTMLButtonElement;
    
    fromEvent(nodeRef.current, 'click').subscribe(() => console.log('Clicked!'));
    
  },[])
  

  return (
    <div className="App">
      <button id="btn">test click</button>
    </div>
  );
}

export default App;
