import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyControllerController } from './my-controller/my-controller.controller';
import { LeadsModule } from './leads/leads.module';
import { LeadsController } from './leads.controller';

@Module({
  imports: [LeadsModule],
  controllers: [AppController, MyControllerController, LeadsController],
  providers: [AppService],
})
export class AppModule {}
