import { io } from '../../../server';

export class MovieNoteUseCase {
  emitMovieNoteEvents(movieId: string, event: string, content: JSON) {
    const room = `/movie/${movieId}/note`;
    io.of(room).emit(event, {
      event: event,
      content,
    });

    return {
      sucess: true,
      message: `Event ${event} emmitted on room ${room}`,
    };
  }
}
