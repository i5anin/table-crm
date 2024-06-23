import { Injectable, Inject } from '@nestjs/common';
// Использование импорта * as AmoCRM для импортирования всего содержимого пакета
import { ConfigService } from '@nestjs/config';
import AmoCRM from 'amocrm-api'; // Если AmoCRM - дефолтный экспорт

@Injectable()
export class AmoCRMService {
  private readonly amo: AmoCRM; // Использование типа AmoCRM для amo

  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {
    this.amo = new AmoCRM({
      clientId: this.configService.get<string>('AMOCRM_CLIENT_ID'),
      clientSecret: this.configService.get<string>('AMOCRM_CLIENT_SECRET'),
      redirectUri: this.configService.get<string>('AMOCRM_REDIRECT_URI'),
    });
  }

  async findAllLeads(query: string = '') {
    try {
      const result = await this.amo.api.deals.get({ query });
      return result;
    } catch (error) {
      console.error('Ошибка при получении сделок из AMOCRM', error);
      throw error;
    }
  }
}
