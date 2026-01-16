export interface DeckLibrary {
  topic: string;
  decks: Deck[];
  numberOfDecks: number;
}

export interface Deck {
  deckName: string;
  cards: Card[];
  numberOfCards: number;
}

export interface Card {
  word: string;
  definition: string;
}
