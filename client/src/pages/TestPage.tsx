import React from "react";
import { DECK_LIBRARIES } from "../utils/dataLoader";

const TestPage = () => {
  const availableLibraries = DECK_LIBRARIES;
  return (
    <>
      <h1>Hi there</h1>
      <p>Already forgot how to do it</p>
      {availableLibraries.map((library) => (
        <div className="library">
          <h2 className="library topic">{library.topic}</h2>
          <p>{library.numberOfDecks}</p>
          <div className="deck_list">
            {library.decks.map((deck) => (
              <div className="deck">
                <h3 className="deck name">{deck.deckName}</h3>
                <p>{deck.numberOfCards}</p>
                <div className="card-list">
                  {deck.cards.map((card) => (
                    <div className="card" key={deck.deckName + card.word}>
                      <h4 className="word">{card.word}</h4>
                      <h4 className="definition">{card.definition}</h4>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default TestPage;
