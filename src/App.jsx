import './App.scss';
import Keyboard from './Keyboard';
import React, {useState} from 'react';

function App() {

  const [text, setText] = useState("");
  return (
    <div className="App flex-column justify-center align-center height100">
      <h1>On-screen keyboard</h1>
      <Keyboard text={text} setText={setText} />
    </div>
  );
}

export default App;
