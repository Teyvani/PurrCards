import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Card } from './card.entity';
import { Exclude } from 'class-transformer';
import { DeckLibrary } from './deck-library.entity';

@Entity('decks')
export class Deck {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  deckName: string;

  @OneToMany(() => Card, (card) => card.deck, {
    cascade: true,
  })
  @Exclude()
  cards: Card[];

  @Column()
  numberOfCards: number;

  @ManyToOne(() => DeckLibrary, (deckLibrary) => deckLibrary.decks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'deckLibraryId' })
  deckLibrary: DeckLibrary;

  @CreateDateColumn()
  createdAt: Date;
}
