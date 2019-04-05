import { NestFactory } from '@nestjs/core';
import app from './settings/server';
import { Server } from 'typescript-rest';
import * as Routes from './controllers/SchedulesController';

Server.apply(Routes);
Server.buildServices(app);

app.route('v1/schedules');

async function bootstrap() {
  await app.listen(3000, () => {
    console.log('server rodando');
  });
}
bootstrap();
