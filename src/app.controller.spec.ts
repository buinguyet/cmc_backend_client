import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WsAdapter } from '@nestjs/platform-ws';
import { ChatGateway } from './chat.gateway';
import { ColorData } from './color.dto';
import { getClientWebsocket } from './ws-client.helper';
import { INITIAL_DATA } from './constant';

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
    let app;
    const socket = getClientWebsocket();

    it(`should emit and on message with array data`, async () => {
      app = await createNestApp(ChatGateway);
      socket.emit('count', INITIAL_DATA);

      socket.on('count', (dataServer: ColorData[]) => {
        expect(dataServer[0].value).toBe(0);

        socket.disconnect();
      });
    });

    it(`should emit and on message with single data`, async () => {
      app = await createNestApp(ChatGateway);

      const dataForEmit = INITIAL_DATA[0];
      socket.emit('count', dataForEmit);

      socket.on('count', (data: ColorData[]) => {
        const findDataEmit = data.find(
          (item: ColorData) => item.label === dataForEmit.label,
        );

        expect(findDataEmit.value).toBe(findDataEmit.value);

        socket.disconnect();
      });
    });
  });
});
