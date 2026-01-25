import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello, here something working :)';
  }
  giveLove(): string {
    return '♥♥♥';
  }
  simpleCalculation(num: number): number {
    return num * 2;
  }
}
