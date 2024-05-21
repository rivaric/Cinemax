import { Movie } from "@prisma/client";
import { movieService } from "../services/movieService";
import { Request, Response } from "express";

class MovieController {
  async getMovies(req: Request, res: Response) {
    const movies = await movieService.getMovies();
    res.json(movies);
  }

  async getMovie(req: Request, res: Response) {
    const { id } = req.params;
    const movie = await movieService.getMovie(Number(id));
    res.json(movie);
  }

  async createMovie(req: Request<{}, {}, Movie>, res: Response) {
    const dataMovie = req.body;
    const files = req.files;
    const movie = await movieService.createMovie(dataMovie, files!);
    res.json(movie);
  }

  async updateMovie(req: Request<{ id: string }, {}, Movie>, res: Response) {
    const { id } = req.params;
    const dataMovie = req.body;
    const files = req.files;
    const movie = await movieService.updateMovie(Number(id), dataMovie, files!);
    res.json(movie);
  }

  async deleteMovie(req: Request<{ id: string }, {}, Movie>, res: Response) {
    const { id } = req.params;
    const movie = await movieService.deleteMovie(Number(id));
    res.json(movie);
  }

  async getRating(req: Request, res: Response) {
    const { id } = req.params;
    const averageRating = await movieService.getRating(Number(id));
    res.json({ rating: averageRating });
  }

  async addRating(req: Request, res: Response) {
    const { rating, movieId, userId } = req.body;
    const averageRating = await movieService.addRating(
      Number(movieId),
      Number(userId),
      rating
    );
    res.json({ rating: averageRating });
  }
}

export const movieController = new MovieController();
