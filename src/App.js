import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Notification from './components/Notification';
import Popup from './components/Popup';
import {showNotification as show, checkWin} from './guide/guide';

import './App.css';

// const words = () => {
// const API_URL = 'http://localhost:3001/';

//     const options = {
//       method: 'POST',
//       headers: {'Content-Type': 'application/x-www-form-urlencoded'},
//       body: new URLSearchParams({locale: 'en-EN'})
//     };
    
//     fetch(API_URL, options)
//       .then(response => response.json())
//       .then((data) => {
//           setWord(data.word)
//           console.log(data.word)
//         })
//       .catch(err => console.error(err));
 
// useEffect(() => {
//     getRandomWord();
//   }, []);
// }

const words = ['tree'] 

let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable = true;

function App() {
  const [ playable, setPlayable ]= useState(true);
  const [ correctLetters, setCorrectLetters ]= useState([]);
  const [ wrongLetters, setWrongLetters ]= useState([]);
  const [ showNotification, setshowNotification ]= useState(false);

  useEffect(() => {
const handleKeydown = event => {
  const { key, keyCode } = event;
    if (playable && keyCode >= 65 && keyCode <= 90) {
      const letter = key.toLowerCase();

      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);
          setCorrectLetters(currentLetters => [...currentLetters, letter]);

          
        } else {
          show(setshowNotification);
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          setWrongLetters(wrongLetters => [...wrongLetters, letter]);

        } else {
          show(setshowNotification);

        }
      }
    
  }
}
window.addEventListener('keydown', handleKeydown);

 

  return () => window.removeEventListener('keydown', handleKeydown);
 }, [correctLetters, wrongLetters, playable]);

function playAgain(){
  setPlayable(true);

setCorrectLetters([]);
setWrongLetters([]);

const random = Math.floor( Math.random() * words.length);
selectedWord = words[random];

}

  return (
    <>
     <Header />
     <div className="game-container">
           <Figure wrongLetters={wrongLetters}/>
           <WrongLetters wrongLetters={wrongLetters}/>
           <Word selectedWord={selectedWord} correctLetters={correctLetters} />

     </div>
     < Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
      < Notification showNotification={showNotification}/>
    </>
  );
}

export default App;
