// amo-crm.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AmoCRM } from 'amocrm';

@Injectable()
export class AmoCRMService {
  private readonly amo: AmoCRM;

  constructor(private configService: ConfigService) {
    // Инициализация amoCRM API
    this.amo = new AmoCRM({
      clientId: this.configService.get<string>('AMOCRM_CLIENT_ID'),
      clientSecret: this.configService.get<string>('AMOCRM_CLIENT_SECRET'),
      redirectUri: this.configService.get<string>('AMOCRM_REDIRECT_URI'),
    });
  }

  async findAllLeads(query: string = null) {
    // Логика для получения всех сделок
    const deals = await this.amo.api.deals.get({ query });
    return deals;
  }

  // ... другие методы
}
