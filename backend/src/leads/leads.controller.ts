import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AmoCRMService } from './amo-crm.service';
import { CreateLeadDto } from './dto/create-lead.dto';

@Controller('api/leads')
export class LeadsController {
  constructor(private readonly amoCRMService: AmoCRMService) {}

  @Get()
  async findAll(@Query('query') query: string) {
    if (query && query.length >= 3) {
      return this.amoCRMService.findLeadsByQuery(query);
    } else {
      return this.amoCRMService.findAllLeads();
    }
  }

  @Post()
  async create(@Body() createLeadDto: CreateLeadDto) {
    return this.amoCRMService.createLead(createLeadDto);
  }
}
