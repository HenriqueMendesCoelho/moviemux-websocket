import { Socket } from 'socket.io';
import { validateTokenUseCase } from '../useCase/authentication';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { ExtendedError } from 'socket.io/dist/namespace';

export async function socketIoMiddleware(
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  next: (err?: ExtendedError) => void
) {
  const token = socket.handshake.auth.token;
  const isValid = await validateTokenUseCase.tokenIsValid(token);

  if (isValid) {
    next();
  } else {
    const err = new Error('not authorized');
    err['data'] = { content: 'token is not valid' };
    next(err);
  }
}
