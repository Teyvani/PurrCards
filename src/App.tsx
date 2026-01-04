import { useState } from "react";
import returnCards from "./utils/returnDeck";

function App() {
  const [count, setCount] = useState(0);
  const [deckName, setDeckName] = useState("hiragana");

  const deck = returnCards(deckName);

  return (
    <>
      <h1>Hi there</h1>
      <p>Already forgot how to do it</p>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <button
        onClick={() =>
          setDeckName((deckName) =>
            deckName === "hiragana" ? "katakana" : "hiragana"
          )
        }
      >
        Switch Deck
      </button>
      <p>
        {deck.deckName} deck has {deck.cards.length} cards.
      </p>
      <p>
        {deck.cards
          .map((card) => `${card.word}: ${card.definition} `)
          .join(", ")}
      </p>
    </>
  );
}

export default App;
