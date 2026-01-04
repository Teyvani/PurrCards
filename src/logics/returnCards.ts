import japaneseAlphabetCards from "../assets/dataForCards/japaneseAlphabetCards.json";

interface Cards {
  name: string;
  cards: { key: string; value: string }[];
}

const returnCards = (deckName: string): Cards => {
  function formatedCards(cards: {
    [key: string]: string;
  }): { key: string; value: string }[] {
    return Object.entries(cards).map(([key, value]) => ({ key, value }));
  }

  switch (deckName) {
    case "hiragana":
      return {
        name: "hiragana",
        cards: formatedCards(japaneseAlphabetCards.hiragana),
      };
    case "katakana":
      return {
        name: "katakana",
        cards: formatedCards(japaneseAlphabetCards.katakana),
      };
    default:
      throw new Error(`Deck "${deckName}" not found.`);
  }
};

export default returnCards;
