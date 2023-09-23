import { Server } from 'socket.io';
import { app } from './app';

process.env.TZ = 'America/Sao_Paulo';

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

const PORT = 3333;
app.listen(PORT, () =>
  console.log(
    `Express started at http://localhost:${PORT} -> ${new Date().toLocaleString(
      'pt-Br'
    )}`
  )
);

export { io };
