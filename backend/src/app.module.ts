import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeadsModule } from './leads/leads.module';
import { LeadsController } from './leads.controller';

@Module({
  imports: [LeadsModule],
  controllers: [AppController, LeadsController],
  providers: [AppService],
})
export class AppModule {}
