import { PrismaClient } from "@prisma/client";
import { fileServices } from "./fileService";
import { json2csv } from "json-2-csv";

const prisma = new PrismaClient();

class MlService {
  async generateCSVMovies() {
    const movies = await prisma.movie.findMany();

    const moviesForMl = movies.map((movie) => ({
      ...movie,
      genre: movie.genre.split(", "),
      tags: movie.tags.split(", "),
    }));

    const moviesCSV = json2csv(moviesForMl);
    fileServices.uploadFileCSV(moviesCSV, "movies", process.env.PATH_ML!);
  }

  async generateRaringsCVS() {
    const ratings = await prisma.userMovieRating.findMany();
    const ratingsCSV = json2csv(ratings);
    fileServices.uploadFileCSV(ratingsCSV, "ratings", process.env.PATH_ML!);
  }

  async generateMatrix() {
    const { body: similar_preprocess } = await fetch(
      `${process.env.URL_RECOMMENDATION}/similar_preprocess`,
      {
        method: "GET",
      }
    );
    const { body: reccomend } = await fetch(
      `${process.env.URL_RECOMMENDATION}/recommend_preprocess`,
      {
        method: "GET",
      }
    );

    return {
      similar_preprocess: similar_preprocess,
      reccomend: reccomend,
    };
  }
}

export const mlService = new MlService();
