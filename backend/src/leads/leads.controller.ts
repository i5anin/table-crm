import { Controller, Get, Post } from '@nestjs/common';

@Controller('api/leads')
export class LeadsController {
  @Get()
  findAll() {
    // логика для обработки GET запроса
    return 'This action returns all leads';
  }

  @Post()
  create() {
    // логика для обработки POST запроса
    return 'This action adds a new lead';
  }
}
