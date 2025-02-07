import React, { useState, useEffect } from 'react';
import './MemoryGame.css';

interface Card {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [moves, setMoves] = useState(0);

  const generateCards = () => {
    const cardContent = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
    ];

    const shuffledCards = [...cardContent, ...cardContent]
      .sort(() => Math.random() - 0.5)
      .map((content, index) => ({
        id: index,
        content,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
  };

  useEffect(() => {
    generateCards();
  }, []);

  const flipCard = (card: Card) => {
    if (card.isFlipped || flippedCards.length === 2) return;

    card.isFlipped = true;
    setFlippedCards([...flippedCards, card]);

    if (flippedCards.length === 1) {
      const [firstCard] = flippedCards;
      if (firstCard.content === card.content) {
        setCards((prevCards) =>
          prevCards.map((c) =>
            c.content === card.content
              ? { ...c, isMatched: true }
              : c
          )
        );
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((c) =>
              c.id === firstCard.id || c.id === card.id
                ? { ...c, isFlipped: false }
                : c
            )
          );
        }, 1000);
      }
      setMoves((prev) => prev + 1);
      setFlippedCards([]);
    } else {
      setCards((prevCards) =>
        prevCards.map((c) =>
          c.id === card.id ? { ...c, isFlipped: true } : c
        )
      );
    }
  };

  const resetGame = () => {
    generateCards();
    setMoves(0);
  };

  return (
    <div className="game-container">
      <h1>Memory Game</h1>
      <div className="cards-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${card.isFlipped ? 'flipped' : ''}`}
            onClick={() => flipCard(card)}
          >
            {card.isFlipped || card.isMatched ? card.content : '?'}
          </div>
        ))}
      </div>
      <div className="info">
        <p>Moves: {moves}</p>
        <button onClick={resetGame}>Restart the Game</button>
      </div>
    </div>
  );
};

export default MemoryGame;
