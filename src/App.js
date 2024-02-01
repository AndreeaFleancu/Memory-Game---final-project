import { useState } from 'react';
import './App.css';
import OneCard from './components/OneCard';
import { useEffect } from 'react';




const cardImages = [
  {id: 1,"src": "/images/brow.jpg", matched: false},
  {id: 2,"src": "/images/cioco.jpg", matched: false},
  {id: 3,"src": "/images/capsu.jpg", matched: false},
  {id: 4,"src": "/images/waf.jpg", matched: false},
  {id: 5,"src": "/images/pan.jpg", matched: false},
  {id: 6,"src": "/images/rol.jpg", matched: false},
  {id: 7,"src": "/images/pud.jpg", matched: false},
  {id: 8,"src": "/images/cheese.jpg", matched: false},
  {id: 9,"src": "/images/ginger.jpg", matched: false},
  {id: 10,"src": "/images/tone.jpg", matched: false},
  {id:11,"src": "/images/ice.jpg", matched: false},
  {id: 12,"src": "/images/afine.jpg", matched: false},


]

const levels = [
  [1, 2, 3, 4, 5, 6],  // imagini nivel 1
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],   // imagini nivel 2
  
  
];


function App() {

    const [cards, setCards] = useState([]);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [currentLevel, setCurrentLevel] = useState(0);
    

  //function to shuffle the cards
  const shuffleCards = () => {
    const levelCards = levels[currentLevel].map(cardId => cardImages.find(card => card.id === cardId));
    console.log(levels[currentLevel]);
    const shuffledCards = [...levelCards, ...levelCards]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }));
  
    setCards(shuffledCards);
  };
  // make correct choice
  const makeChoice = (card) => {
    if (!choiceOne) {
        setChoiceOne(card);
    } else if (!choiceTwo) {
        setChoiceTwo(card);
    }
}
  
  //comparison bewteen cards

  useEffect(() => {
    if (choiceOne && choiceTwo) {
        if (choiceOne.src === choiceTwo.src && choiceOne.id !== choiceTwo.id) {
            setCards(prevCards => {
              return prevCards.map(card => {
                if (card.src === choiceOne.src) {
                  return {...card, matched: true}
                } else {
                  return card;
                }
              })
            })
            resetGame();
        } else {
            
            setTimeout(resetGame, 800); 
        }
    }
}, [choiceOne, choiceTwo]);

// function to pass to the next level
const nextLevel = () => {
  const allMatched = cards.every((card) => card.matched);
console.log(allMatched);
  if (allMatched) {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
    } else {
      alert('Congratulations!');
    }
  }
};

useEffect(() => {
  shuffleCards()
}, [currentLevel]);

  // function to reset the cards
  const resetGame =() => {
    setChoiceOne(null);
    setChoiceTwo(null)
  }

  return (
    <div className="App">
      <h1>Sweet Match</h1>
      <button onClick={shuffleCards}> New Game</button>
      <button onClick={nextLevel}> Next Level</button>

      <div className="card-grid">
        {cards.map(card => (
           <OneCard key = {card.id} card = {card} makeChoice={makeChoice}
           flipped = {card === choiceOne || card === choiceTwo || card.matched}/>
        ))}
      
      </div>
    </div>
  );
}


export default App;
