import { Controller, Get, Post, Req, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('love')
  giveLove(): string {
    return this.appService.giveLove();
  }

  @Post('calculate')
  simpleCalculation(@Body() body: string): number {
    if (!body) {
      throw new Error('Invalid request body');
    }
    const number = parseInt(body, 1);
    if (isNaN(number)) {
      throw new Error('Invalid number provided');
    }
    console.log(number);
    return this.appService.simpleCalculation(number);
  }
}
