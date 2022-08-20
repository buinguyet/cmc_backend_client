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

  @SubscribeMessage('count')
  handleMessage(@MessageBody() data: ColorData | ColorData[]): void {
    this.server.emit('count', data);
  }
}
