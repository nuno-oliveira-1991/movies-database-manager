import mongoose from 'mongoose';
import IMovie from '../interfaces/MovieInterface.js';
import RatingModel from './ratingModel.js'

// Defining Movie Schema, setting it of type IMovie 
const MovieSchema = new mongoose.Schema<IMovie>({
    title: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    trailerLink: {
        type: String,
        required: true,
    },
    genres: {
        type: [String],
        required: true,
    },
    posterUrl: {
        type: String,
        required: true,
    },
    ratings: [RatingModel.schema],
});

// Creating an instance of Movie model using Movie Schema
const MovieModel = mongoose.model<IMovie>('Movie', MovieSchema);

export default MovieModel;