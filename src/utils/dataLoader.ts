import { type DeckLibrary, type Deck, type Card } from "../types/index";

type DataFileContent = Record<string, any[]>;

const rawDataModules = import.meta.glob<DataFileContent>("../data/*.json", {
  eager: true,
});

const processLibrary = () => {
  const libraries: DeckLibrary[] = [];
  for (const path in rawDataModules) {
    const module = rawDataModules[path];
    const topic = path.split("/").pop()?.replace(".json", "") as string;
    const deckLibrary: DeckLibrary = {
      topic,
      decks: [],
      numberOfDecks: 0,
    };

    for (const [deckName, rawData] of Object.entries(module.default)) {
      console.log(deckName);
      const processedCards: Card[] = Object.entries(rawData).map(
        ([front, back]) => ({
          word: front,
          definition: back as string,
        })
      );

      const deck: Deck = {
        deckName,
        cards: processedCards,
        numberOfCards: processedCards.length,
      };

      deckLibrary.decks.push(deck);
    }

    deckLibrary.numberOfDecks = deckLibrary.decks.length;
    libraries.push(deckLibrary);
  }

  return libraries;
};

export const DECK_LIBRARIES: DeckLibrary[] = processLibrary();
