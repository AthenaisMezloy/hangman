import React, {useEffect} from 'react';
import {checkWin} from '../guide/guide';


const Popup = ({correctLetters, wrongLetters, selectedWord, setPlayable, playAgain}) => {
    let finalMessage = '';
    let finalMessageRevealWord = '';
    let playable = true;

    if( checkWin(correctLetters, wrongLetters, selectedWord) === 'win') {
        finalMessage = 'Bravo you are the best 😉';
        playable = false;
    } else if ( checkWin(correctLetters, wrongLetters, selectedWord) === 'lose'){
        finalMessage = 'Haha you lost 😂';
        finalMessageRevealWord = `The word was: ${selectedWord}`;
        playable = false
    }
useEffect(() => setPlayable(playable));
  return (
    <div className="popup-container" style={finalMessage !== '' ? {display:'flex'} : {}}>
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        <button onClick={playAgain}>Try Again!</button>
      </div>
    </div>
  )
}

export default Popup