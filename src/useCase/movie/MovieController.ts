import { Request, Response } from 'express';
import { MovieNoteUseCase } from './movieNote/MovieNoteUseCase';
import { AllMoviesUseCase } from './AllMovies/AllMoviesUseCase';

export class MovieController {
  constructor(
    private allMoviesUseCase: AllMoviesUseCase,
    private movieNoteUseCase: MovieNoteUseCase
  ) {}
  allMovies(request: Request, response: Response) {
    const { event } = request.params;
    const content = request.body;

    const result = this.allMoviesUseCase.emitAllMoviesUpdate(event, content);

    return response.status(200).json(result);
  }
  movieNote(request: Request, response: Response) {
    const { movieId, event } = request.params;
    const content = request.body;

    const result = this.movieNoteUseCase.emitMovieNoteEvents(
      movieId,
      event,
      content
    );

    return response.status(200).json(result);
  }
}
