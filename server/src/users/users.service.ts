import { Injectable } from '@nestjs/common';
import { User } from './dto/user.dto';

/*It's only temporary, I'm still just learning, I'll add TypeORM later
    ... the moment I learn foundamentials of PostgreSQL and TypeORM :)
    It's a new stack for me so don't judge ._.
*/
@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'Tobby',
      password: 'IsFree',
    },
    {
      userId: 2,
      username: 'admin',
      password: 'trust',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
