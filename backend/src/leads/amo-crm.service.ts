import { Injectable } from '@nestjs/common';
import { AmoCRM } from 'amocrm';

@Injectable()
export class AmoCRMService {
  private readonly amo: AmoCRM;

  constructor() {
    // Инициализация amoCRM API
    this.amo = new AmoCRM({
      clientId: 'YOUR_CLIENT_ID',
      clientSecret: 'YOUR_CLIENT_SECRET',
      redirectUri: 'YOUR_REDIRECT_URI',
    });
  }

  async findAllLeads() {
    // Логика для получения всех сделок
    const deals = await this.amo.api.deals.get();
    // ...
    return deals;
  }

  async findLeadsByQuery(query: string) {
    // Логика для поиска сделок по запросу
    const deals = await this.amo.api.deals.get({ query });
    // ...
    return deals;
  }

  async createLead(createLeadDto: CreateLeadDto) {
    // Логика для создания новой сделки
    const newLead = await this.amo.api.deals.add(createLeadDto);
    // ...
    return newLead;
  }
}
