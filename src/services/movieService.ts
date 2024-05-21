import { Movie, PrismaClient } from "@prisma/client";
import { fileServices } from "./fileServices";
import { FileArray } from "express-fileupload";
import { roundUp } from "../utils/roundUp";

const prisma = new PrismaClient();

function getAverageRating(ratings: any): number {
  const { totalSum, totalCount } = ratings.reduce(
    (acc: any, rating: any) => {
      const sum = rating.rating.reduce((acc: any, curr: any) => acc + curr, 0);
      return {
        totalSum: acc.totalSum + sum,
        totalCount: acc.totalCount + rating.rating.length,
      };
    },
    { totalSum: 0, totalCount: 0 }
  );

  const averageRating = totalCount > 0 ? totalSum / totalCount : 0;

  const roundedAverageRating = roundUp(averageRating, 1);

  return roundedAverageRating;
}

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

  async createMovie(dataMovie: Movie, files: FileArray) {
    const fileNamePicker = fileServices.uploadFilePicker(files);
    const fileNameVideo = fileServices.uploadFileVideo(files);
    const movie = await prisma.movie.create({
      data: { ...dataMovie, img: fileNamePicker!, video: fileNameVideo! },
    });
    return movie;
  }

  async updateMovie(id: number, dataMovie: Movie, files: FileArray) {
    const fileNamePicker = fileServices.uploadFilePicker(files);
    const fileNameVideo = fileServices.uploadFileVideo(files);
    const movie = await prisma.movie.update({
      where: { id },
      data: { ...dataMovie, img: fileNamePicker!, video: fileNameVideo! },
    });
    return movie;
  }

  async deleteMovie(id: number) {
    const movie = await prisma.movie.delete({
      where: { id },
    });
    return movie;
  }

  async getRating(id: number) {
    const ratings = await prisma.userMovieRating.findMany({
      where: {
        movieId: id,
      },
    });

    const averageRating = getAverageRating(ratings);

    return averageRating;
  }

  async addRating(movieId: number, userId: number, rating: number) {
    await prisma.userMovieRating.upsert({
      where: {
        userId_movieId: {
          userId: userId,
          movieId: movieId,
        },
      },
      update: {
        rating: {
          push: rating,
        },
      },
      create: {
        userId: userId,
        movieId: movieId,
        rating: [rating],
      },
    });

    const ratings = await prisma.userMovieRating.findMany({
      where: {
        movieId,
      },
    });

    const averageRating = getAverageRating(ratings);

    return averageRating;
  }
}

export const movieService = new MovieService();
