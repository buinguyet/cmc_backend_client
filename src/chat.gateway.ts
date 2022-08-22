import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server } from 'socket.io';
import { ColorData } from './color.dto';
import { INITIAL_DATA } from './constant';

@WebSocketGateway({ cors: '*:*' })
export class ChatGateway {
  @WebSocketServer() server: Server;
  dataServer: ColorData[] = INITIAL_DATA;

  setDataServer(data: ColorData | ColorData[]) {
    if (Array.isArray(data)) {
      this.dataServer = data;
    } else {
      const newDataServer = this.dataServer.map((item: ColorData) => {
        const newItem = { ...item };

        if (newItem.label === data.label) {
          return { ...newItem, value: newItem.value + 1 };
        }

        return newItem;
      });

      this.dataServer = newDataServer;
    }
  }

  public getDataServer() {
    return this.dataServer;
  }

  @SubscribeMessage('count')
  handleMessage(@MessageBody() data: ColorData | ColorData[]): void {
    this.setDataServer(data);

    const responseDataServer = this.getDataServer();

    this.server.emit('count', responseDataServer);
  }
}
