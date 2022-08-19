import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WsAdapter } from '@nestjs/platform-ws';
import { ChatGateway } from './chat.gateway';
import { ColorData } from './color.dto';
import * as WebSocket from 'ws';

async function createNestApp(...gateways): Promise<INestApplication> {
  const testingModule = await Test.createTestingModule({
    providers: gateways,
  }).compile();
  const app = testingModule.createNestApplication();
  app.useWebSocketAdapter(new WsAdapter(app) as any);
  return app;
}

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('WebSocketGateway (WsAdapter)', () => {
    let ws, app;

    it(`should emit and on message`, async () => {
      app = await createNestApp(ChatGateway);

      ws = new WebSocket('ws://localhost:8000');

      const dataForEmit = [
        {
          label: 'Blue',
          value: 1,
          color: 'blue',
        },
        {
          label: 'Orange',
          value: 3,
          color: 'orange',
        },
      ];

      ws.emit(dataForEmit);

      ws.on('count', (data: ColorData[]) => {
        expect(data[0].label).toBe('Blue');
        ws.close();
      });
    });
  });
});
