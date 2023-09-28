import { Server } from 'socket.io';
import { app } from './app';
import { validateStart } from './startup';
import { AppDataSource } from '../data-source';

process.env.TZ = 'America/Sao_Paulo';

//Start Socket.io
const PORT_SOCKET_IO = 3334;
const io = new Server({ path: '/ws' });
io.listen(PORT_SOCKET_IO);
console.log(
  `Socket.io started at http://localhost:${PORT_SOCKET_IO} -> ${new Date().toLocaleString(
    'pt-Br'
  )}`
);
io.on('connection', (socket) => {
  console.log('User connected');
});
io.on('disconnect', (socket) => {
  console.log('User disconnected');
});

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
