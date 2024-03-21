import { Movie, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class MovieService {
  async getMovies() {
    const movies = await prisma.movie.findMany();
    return movies;
  }

  async getMovie(id: number) {
    const movie = await prisma.movie.findUnique({
      where: { id },
    });
    return movie;
  }

  async createMovie(dataMovie: Movie) {
    const movie = await prisma.movie.create({
      data: dataMovie,
    });
    return movie;
  }

  async updateMovie(id: number, dataMovie: Movie) {
    const movie = await prisma.movie.update({
      where: { id },
      data: dataMovie,
    });
    return movie;
  }

  async deleteMovie(id: number) {
    const movie = await prisma.movie.delete({
      where: { id },
    });
    return movie;
  }
}

export const movieService = new MovieService();
