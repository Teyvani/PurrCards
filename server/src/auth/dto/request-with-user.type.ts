import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: { sub: number; username: string; email: string; role: string };
}
