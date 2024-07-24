import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AmoCRM from 'amocrm-api';

@Injectable()
export class AmoCRMService {
  private readonly amo: AmoCRM;

  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {
    // Выводим значения из .env в консоль

    // Проверяем тип baseUrl
    const baseUrl = this.configService.get<string>('AMOCRM_BASE_URL');
    if (typeof baseUrl !== 'string') {
      console.error('Ошибка: baseUrl должен быть строкой.');
      // Добавьте сюда логику для обработки ошибки
      return; // Или throw error;
    }

    // Создайте экземпляр AmoCRM вне конструктора
    const amo = new AmoCRM({
      baseUrl, // Используем baseUrl
      clientId: this.configService.get<string>('AMOCRM_CLIENT_ID'),
      clientSecret: this.configService.get<string>('AMOCRM_CLIENT_SECRET'),
      redirectUri: this.configService.get<string>('AMOCRM_REDIRECT_URI'),
    });
    // Задайте this.amo после создания экземпляра
    this.amo = amo;
  }

  async findAllLeads(query: string = '') {
    try {
      const result = await this.amo.api.deals.get({ query });
      return result;
    } catch (error) {
      // Обработка ошибок API AmoCRM
      if (error.response && error.response.status) {
        // Ошибка HTTP-запроса
        console.error(
          `Ошибка API AmoCRM: ${error.response.status} - ${error.response.statusText}`,
        );
        console.error('Ответ сервера:', error.response.data);
        // Дополнительная обработка ошибок HTTP
        // Например, проверка кода ошибки и обработка соответствующим образом
      } else {
        // Другая ошибка, например, ошибка сети
        console.error('Ошибка при обращении к API AmoCRM:', error);
      }
      // Дополнительные действия при ошибке
      // Например, возврат пустого массива или кастомной ошибки
      return [];
    }
  }
}
