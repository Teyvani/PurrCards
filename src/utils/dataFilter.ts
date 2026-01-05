import { japaneseAlphabetCards } from "../data/index";
import { type Deck, type Card } from "../types/index";

type AlphabetType = keyof typeof japaneseAlphabetCards;

const returnCards = (deckName: string): Deck => {
  if (!(deckName in japaneseAlphabetCards)) {
    throw new Error(`Deck "${deckName}" not found.`);
  }

  const rawData = japaneseAlphabetCards[deckName as AlphabetType];

  const cards: Card[] = Object.entries(rawData).map(([word, definition]) => ({
    word,
    definition,
  }));

  return {
    deckName,
    cards,
  };
};

export default returnCards;
