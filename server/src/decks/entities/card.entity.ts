import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Deck } from './deck.entity';

@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  face: string;

  @Column({ nullable: false })
  back: string;

  @ManyToOne(() => Deck, (deck) => deck.cards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'deckId' })
  deck: Deck;
}
