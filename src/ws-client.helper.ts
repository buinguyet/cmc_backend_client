/* eslint-disable @typescript-eslint/no-var-requires */
import * as io from 'socket.io-client';
require('dotenv').config();

export const getClientWebsocket = () => {
  const PORT = process.env.PORT;
  return io.connect(`http://localhost:${PORT}`);
};
