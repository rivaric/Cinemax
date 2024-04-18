import { Movie, PrismaClient } from "@prisma/client";
import { fileServices } from "./fileServices";
import { FileArray } from "express-fileupload";

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
}

export const movieService = new MovieService();
