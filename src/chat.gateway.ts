import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server } from 'socket.io';
import { ColorData } from './color.dto';

@WebSocketGateway({ cors: '*:*' })
export class ChatGateway {
  @WebSocketServer() server: Server;
  globalData: ColorData[];

  setGlobalData(globalData: ColorData[]) {
    this.globalData = globalData;
  }

  @SubscribeMessage('count')
  handleMessage(@MessageBody() data: ColorData[]): void {
    if (data[0].isDashboard) {
      this.server.emit('count', this.globalData);
    } else {
      this.server.emit('count', data);

      this.setGlobalData(data);
    }
  }
}
