import { Module } from '@nestjs/common';
import { LeadsController } from './leads.controller';

@Module({
  controllers: [LeadsController], // Регистрация LeadsController в модуле
})
export class LeadsModule {}
