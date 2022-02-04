import React, {useState, useEffect} from 'react';
import './App.scss';
import useKeypress from 'react-use-keypress';

function Keyboard({text, setText}) {
    const [digits, setDigits] = useState(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']);
    const [keys, setKeys] = useState(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']);
    const [pressed, setPressed] = useState(-1);

    useEffect(() => {
        console.log('pressed: ', pressed);
    }, [pressed]);

    useEffect(() => {
        
        setKeys(shuffle(keys));
        setDigits(shuffle(digits));
      
    }, [text]);

    useKeypress(keys.concat(digits).concat('Backspace'), (event) => {
        // if (event.key === 'ArrowLeft') {
        //   console.log(event);
          setPressed(event.key.charCodeAt(0))
          setTimeout(() => {
            setPressed(-1);
          }, 1000);
      });
    

  return <div className="keyboard-div">

    <input type="text" value={text} className="input" placeholder="Your input will be displayed here"></input>
      
      <div className="keyboard-row  flex-row">
      {
          digits.map((k, i)=><Key c={k} text={text} setText={setText} pressed={pressed=== k.charCodeAt(0)} />)
      }
      </div>
      <div className="keyboard-row  flex-row">
      {
          keys.slice(0, 10).map((k, i)=><Key c={k} text={text} setText={setText} pressed={pressed=== k.charCodeAt(0)} />)
      }
      </div>
      <div className="keyboard-row  flex-row">
      {
          keys.slice(10, 20).map((k, i)=><Key c={k} text={text} setText={setText} pressed={pressed=== k.charCodeAt(0)} />)
      }
      </div>
      <div className="keyboard-row  flex-row">
      {
          keys.slice(20).map((k, i)=><Key c={k} text={text} setText={setText} pressed={pressed=== k.charCodeAt(0)} />)
      }
      </div>
      <div className="keyboard-row  flex-row">
        <Key c="Space" text={text} setText={setText} pressed={pressed===66} />
        <Key c="Backspace" text={text} setText={setText} pressed={pressed===66} />
        <Key c="Clear" text={text} setText={setText} pressed={false} />
      </div>
  </div>;
}

function Key({c='a', text, setText, pressed}){
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

    return <div className={`key-div flex-row align-center justify-center ${pressed ? 'active' : ''} ${vowels.includes(c) ? 'vowel' : ''} ${digits.includes(c) ? 'digit' : ''} ${c==='Space' ? 'space' : ""}`} onClick={()=>{
        c === 'Backspace' ? setText(text.slice(0, text.length-1)) : c === 'Clear' ? setText("") :
        c === 'Space' ? setText(text + " ") : setText(text+c);
        }}>
        {c}
    </div>;
}

export default Keyboard;

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
