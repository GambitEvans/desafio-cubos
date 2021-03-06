import app from './settings/server';
import { Server } from 'typescript-rest';
import * as SchedulingRoutes from './controllers/SchedulingController';

Server.apply(SchedulingRoutes);
Server.buildServices(app);

async function bootstrap() {
  await app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
}
bootstrap();
