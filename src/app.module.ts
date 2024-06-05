import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { RequestContextMiddleware } from 'routers/middlewares/requestcontext.middleware';
import { RequestContextPreparationService } from 'routers/context/request/requestcontext.service';
import { SevasContorller } from './Sevas/controller/seva.controller';


@Module({
  imports: [ConfigModule.forRoot(), HttpModule, ScheduleModule.forRoot()],
  controllers: [
    AppController,
    SevasContorller
    
  ],
  providers: [
    RequestContextMiddleware,
    RequestContextPreparationService,
   
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}
