import * as io from 'socket.io-client';

export const getClientWebsocket = () => {
  return io.connect('http://localhost:8000');
};
