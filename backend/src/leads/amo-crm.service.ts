// amo-crm.service.ts
import { Injectable } from '@nestjs/common';
import AmoCRM from 'amocrm'; // Импорт по умолчанию

@Injectable()
export class AmoCRMService {
  private readonly amo: AmoCRM;

  constructor() {
    this.amo = new AmoCRM({
      clientId: process.env.AMOCRM_CLIENT_ID,
      clientSecret: process.env.AMOCRM_CLIENT_SECRET,
      redirectUri: process.env.AMOCRM_REDIRECT_URI,
    });
  }
  async findAllLeads(query: string = null) {
    // Логика для получения всех сделок
    return await this.amo.api.deals.get({ query });
  }
}
