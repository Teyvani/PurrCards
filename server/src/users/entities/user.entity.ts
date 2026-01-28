import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 50 })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: null })
  @Exclude()
  emailToken: string | null;

  @Column({ default: false })
  @Exclude()
  emailValidated: boolean;

  @Column({ enum: ['user', 'admin'], default: 'user' })
  role: string;
}
