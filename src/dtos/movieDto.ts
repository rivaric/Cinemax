// import { Movie } from "@prisma/client";
// import { roundUp } from "../utils/roundUp";

// export class MovieDto {
//   id: number;
//   name: string;
//   img: string;
//   video: string;
//   duration: string;
//   year_of_creation: Date;
//   estimations: number;
//   genre: string;
//   tags: string;

//   constructor(model: Movie) {
//     this.id = model.id;
//     this.name = model.name;
//     this.img = model.img;
//     this.video = model.video;
//     this.duration = model.duration;
//     this.estimations = this.calculateAverageRating(model.estimations);
//     this.year_of_creation = model.year_of_creation;
//     this.genre = model.genre;
//     this.tags = model.tags;
//   }

//   private calculateAverageRating(estimations: string) {
//     const arrEstimations = estimations.split(",").map((item) => Number(item));

//     const averageRating =
//       arrEstimations.reduce((a, b) => a + b) / arrEstimations.length;

//     const roundAverageRating = roundUp(averageRating, 1);

//     return roundAverageRating;
//   }
// }
