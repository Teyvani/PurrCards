export interface Deck {
  deckName: string;
  cards: Card[];
}

export interface Card {
  word: string;
  definition: string;
}
