import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { bcrypt } from 'bcrypt';
import { User } from './entities/user.entity';

/*It's only temporary, I'm still just learning, I'll add TypeORM later
    ... the moment I learn foundamentials of PostgreSQL and TypeORM :)
    It's a new stack for me so don't judge ._.
*/
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(
    username: string,
    password: string,
    email: string,
    emailToken: string,
  ): Promise<User> {
    const { usernameExists, emailExists } = await this.checkUniqueness(
      username,
      email,
    );

    if (usernameExists) {
      throw new ConflictException('This username is already being used.');
    }
    if (emailExists) {
      throw new ConflictException('This email is already being used.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({
      username,
      email,
      password: hashedPassword,
      emailToken,
    });

    return await this.usersRepository.save(user);
  }

  async checkUniqueness(
    username: string,
    email: string,
  ): Promise<{ usernameExists: boolean; emailExists: boolean }> {
    const existingUsers = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .orWhere('user.email = :email', { email })
      .getMany();

    return {
      usernameExists: existingUsers.some((u) => u.username === username),
      emailExists: existingUsers.some((u) => u.email === email),
    };
  }
}
