import { AllMoviesUseCase } from './AllMovies/AllMoviesUseCase';
import { MovieController } from './MovieController';
import { MovieNoteUseCase } from './movieNote/MovieNoteUseCase';

const allMoviesUseCase = new AllMoviesUseCase();
const movieNoteUseCase = new MovieNoteUseCase();
const movieController = new MovieController(allMoviesUseCase, movieNoteUseCase);

export { movieNoteUseCase, movieController };
