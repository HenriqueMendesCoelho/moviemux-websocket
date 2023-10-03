import { io } from '../../../server';

export class AllMoviesUseCase {
  emitAllMoviesUpdate(event: string, content: JSON) {
    io.of('/movie/all').emit(event, {
      event: event,
      content,
    });
  }
}
