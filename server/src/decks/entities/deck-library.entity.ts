import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Deck } from './deck.entity';

@Entity('deck-libraries')
export class DeckLibrary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Deck, (deck) => deck.deckLibrary, {
    cascade: true,
  })
  decks: Deck[];
}
