import { Server } from 'socket.io';
import { app } from './app';
import { validateStart } from './startup';
import { AppDataSource } from './data-source';
import { socketIoMiddleware } from './middleware/SocketIoMiddleware';

process.env.TZ = 'America/Sao_Paulo';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '.env' });
}

//Start Socket.io
const PORT_SOCKET_IO = 3334;
const io = new Server({
  path: '/ws',
  cors: {
    origin: '*',
  },
});
io.listen(PORT_SOCKET_IO);
console.log(
  `Socket.io started at http://localhost:${PORT_SOCKET_IO} -> ${new Date().toLocaleString(
    'pt-Br'
  )}`
);
io.of(/^\/movie\/.+$/)
  .on('connection', (socket) => {
    const ipAddress =
      socket.request.headers['x-forwarded-for'] ||
      socket.client.conn.remoteAddress;
    const path = socket.nsp?.name;

    console.log(`user[${ipAddress}] connected to -> ${path}`);

    socket.on('disconnect', () => {
      console.log(`user[${ipAddress}] disconnect -> ${path}`);
    });

    socket.on('join-room', (data) => {
      socket.join(data.room);
      console.log(`User[${ipAddress}] joined room -> ${data.room}`);
    });

    socket.on('leave-room', (data) => {
      socket.leave(data.room);
      console.log(`User[${ipAddress}] leaved room -> ${data.room}`);
    });
  })
  .use(socketIoMiddleware);

//Start Express
const PORT = 3333;
app.listen(PORT, () =>
  console.log(
    `Express started at http://localhost:${PORT} -> ${new Date().toLocaleString(
      'pt-Br'
    )}`
  )
);

//Start Data Source typeORM
AppDataSource.initialize()
  .then(async () => {
    await validateStart();
  })
  .catch((error) => console.log(error));

export { io };
