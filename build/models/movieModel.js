import mongoose from 'mongoose';
import RatingModel from './ratingModel.js';
const MovieSchema = new mongoose.Schema({
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
const MovieModel = mongoose.model('Movie', MovieSchema);
export default MovieModel;
//# sourceMappingURL=movieModel.js.map