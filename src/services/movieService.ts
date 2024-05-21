import { Movie, PrismaClient, UserMovieRating } from "@prisma/client";
import { fileServices } from "./fileServices";
import { FileArray } from "express-fileupload";
import { roundUp } from "../utils/roundUp";
import { json2csv } from "json-2-csv";

const prisma = new PrismaClient();

function getAverageRating(ratings: any): number {
  const averageRating =
    ratings.reduce(
      (acc: number, { rating }: UserMovieRating) => acc + rating,
      0
    ) / ratings.length;

  const roundedAverageRating = roundUp(averageRating, 1);

  return roundedAverageRating;
}

class MovieService {
  async generateCSVMovies() {
    const movies = await prisma.movie.findMany();
    const moviesCSV = json2csv(movies);
    fileServices.uploadFileCSV(moviesCSV, "movies");
  }

  async generateRaringsCVS() {
    const ratings = await prisma.userMovieRating.findMany();
    const ratingsCSV = json2csv(ratings);
    fileServices.uploadFileCSV(ratingsCSV, "ratings");
  }

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

    await this.generateCSVMovies();

    return movie;
  }

  async updateMovie(id: number, dataMovie: Movie, files: FileArray) {
    const fileNamePicker = fileServices.uploadFilePicker(files);
    const fileNameVideo = fileServices.uploadFileVideo(files);
    const movie = await prisma.movie.update({
      where: { id },
      data: { ...dataMovie, img: fileNamePicker!, video: fileNameVideo! },
    });

    await this.generateCSVMovies();

    return movie;
  }

  async deleteMovie(id: number) {
    const movie = await prisma.movie.delete({
      where: { id },
    });

    await this.generateCSVMovies();

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
        rating,
      },
      create: {
        userId: userId,
        movieId: movieId,
        rating: rating,
      },
    });

    const ratings = await prisma.userMovieRating.findMany({
      where: {
        movieId,
      },
    });

    const averageRating = getAverageRating(ratings);

    await this.generateRaringsCVS();

    return averageRating;
  }

  async getSimilar(id: number) {}
}

export const movieService = new MovieService();
