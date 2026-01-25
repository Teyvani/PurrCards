import { Controller, Post, Body } from '@nestjs/common';
import { ExperimentsService } from './experiments.service';
import { Multiply } from './dto/multipy.dto';

@Controller('exp')
export class ExperimentsController {
  constructor(private readonly experimentsService: ExperimentsService) {}

  @Post('calculate')
  async multiply(@Body() multiply: Multiply): Promise<number> {
    return this.experimentsService.multiply(multiply.numberA, multiply.numberB);
  }
}
