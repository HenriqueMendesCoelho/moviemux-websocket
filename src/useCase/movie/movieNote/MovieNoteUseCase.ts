import { io } from '../../../server';

export class MovieNoteUseCase {
  emitMovieNoteEvents(movieId: string, event: string, content: JSON) {
    io.of('/movie/note').to(movieId).emit(event, content);

    return {
      sucess: true,
      message: `Event ${event} emmitted on room ${movieId}`,
    };
  }
}
