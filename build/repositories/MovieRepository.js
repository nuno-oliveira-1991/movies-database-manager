import MovieModel from '../models/movieModel.js';
import ApiError from '../utils/ApiError.js';
class MovieRepository {
    async getAllMovies(query, page, limit, sortParams) {
        try {
            const skip = (page - 1) * limit;
            const countPromise = MovieModel.countDocuments(query);
            const dataPromise = MovieModel.find(query)
                .sort(sortParams)
                .skip(skip)
                .limit(limit);
            const [totalMovies, movies] = await Promise.all([countPromise, dataPromise]);
            return { totalMovies, movies };
        }
        catch (error) {
            throw error;
        }
    }
    async getOneMovie(movieId) {
        try {
            return await MovieModel.findById(movieId);
        }
        catch (error) {
            throw error;
        }
    }
    async createMovie(movieData) {
        try {
            const newMovie = new MovieModel(movieData);
            return await newMovie.save();
        }
        catch (error) {
            throw error;
        }
    }
    async updateMovie(movieId, movieData) {
        try {
            const movieToUpdate = await MovieModel.findById(movieId);
            if (!movieToUpdate) {
                throw ApiError.NotFoundError('Failed to update movie', [
                    { field: 'movieId', message: 'Movie not found' },
                ]);
            }
            return await MovieModel.findByIdAndUpdate(movieId, movieData, { new: true });
        }
        catch (error) {
            throw error;
        }
    }
    async deleteMovie(movieId) {
        try {
            return await MovieModel.findByIdAndDelete(movieId);
        }
        catch (error) {
            throw error;
        }
    }
    async updateMovieRating(movieId, ratingData) {
        try {
            return await MovieModel.findByIdAndUpdate(movieId, ratingData, { new: true });
        }
        catch (error) {
            throw error;
        }
    }
}
export default new MovieRepository();
//# sourceMappingURL=MovieRepository.js.map