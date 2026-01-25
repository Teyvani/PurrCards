import { Injectable } from '@nestjs/common';

@Injectable()
export class ExperimentsService {
  multiply(numA: number, numB: number) {
    return numA * numB;
  }
}
