import { Movie, PrismaClient, UserMovieRating } from "@prisma/client";
import { fileServices } from "./fileService";
import { FileArray } from "express-fileupload";
import { roundUp } from "../utils/roundUp";
import { json2csv } from "json-2-csv";
import { mlService } from "./mlService";

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
    const mainImgFile = Array.isArray(files.main_img)
      ? files.main_img[0]
      : files.main_img;
    const horizontalImgFile = Array.isArray(files.horizontal_img)
      ? files.horizontal_img[0]
      : files.horizontal_img;
    const videoFile = Array.isArray(files.video) ? files.video[0] : files.video;

    const fileNamePickerMain = fileServices.uploadFilePicker(mainImgFile);
    const fileNamePickerHorizontal =
      fileServices.uploadFilePicker(horizontalImgFile);
    const fileNameVideo = fileServices.uploadFileVideo(videoFile);
    const movie = await prisma.movie.create({
      data: {
        ...dataMovie,
        main_img: fileNamePickerMain!,
        horizontal_img: fileNamePickerHorizontal!,
        video: fileNameVideo!,
      },
    });

    return movie;
  }

  async updateMovie(id: number, dataMovie: Movie, files: FileArray) {
    const mainImgFile = Array.isArray(files.main_img)
      ? files.main_img[0]
      : files.main_img;
    const horizontalImgFile = Array.isArray(files.horizontal_img)
      ? files.horizontal_img[0]
      : files.horizontal_img;
    const videoFile = Array.isArray(files.video) ? files.video[0] : files.video;

    const fileNamePickerMain = fileServices.uploadFilePicker(mainImgFile);
    const fileNamePickerHorizontal =
      fileServices.uploadFilePicker(horizontalImgFile);
    const fileNameVideo = fileServices.uploadFileVideo(videoFile);

    const movie = await prisma.movie.update({
      where: { id },
      data: {
        ...dataMovie,
        main_img: fileNamePickerMain!,
        horizontal_img: fileNamePickerHorizontal!,
        video: fileNameVideo!,
      },
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

    return averageRating;
  }

  async getNewMovies() {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const movies = await prisma.movie.findMany({
      where: {
        year_of_creation: {
          gte: oneMonthAgo,
        },
      },
      take: 3,
    });

    return movies;
  }

  async getSimilar(id: number) {
    await mlService.generateCSVMovies();
    await mlService.generateMatrix();

    const response = await fetch(
      `${process.env.URL_RECOMMENDATION}/similar_ids`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          id,
        }),
      }
    );

    const data: number[] = await response.json();

    const promises = data.map((id) =>
      prisma.movie.findUnique({ where: { id } })
    );

    const movies = await Promise.all(promises);

    return movies;
  }
}

export const movieService = new MovieService();
