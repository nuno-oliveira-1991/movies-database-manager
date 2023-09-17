import { Document } from "mongoose";
import IRating from "./RatingInterface.js";

export default interface IMovie extends Document {
    title: string;
    releaseDate: Date;
    trailerLink: string;
    posterUrl: string;
    genres: string[];
    ratings: IRating[];
}