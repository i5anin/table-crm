// leads.module.ts
import { Module } from '@nestjs/common';
import { LeadsController } from './leads.controller';
import { AmoCRMService } from './amo-crm.service';

@Module({
  controllers: [LeadsController],
  providers: [AmoCRMService], // Регистрация AmoCRMService в модуле
})
export class LeadsModule {}
