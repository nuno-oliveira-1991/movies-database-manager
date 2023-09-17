import IMovie from '../interfaces/MovieInterface.js';
import IRating from '../interfaces/RatingInterface.js';
import MovieRepository from '../repositories/MovieRepository.js';

class MovieService {
    async getAllMovies(
        page: number, 
        limit: number, 
        sortBy: string, 
        sortOrder: string, 
        filters: any) {    
        try {
            const sortParams: {[key: string]: 'asc' | 'desc'} = {
                [sortBy]: sortOrder === 'desc' ? 'desc' : 'asc',
            };
            const defaultQuery: any = {};
            for (const key in filters) {
                if (filters.hasOwnProperty(key)) {
                    const value = filters[key];
                    if (key === 'title') {
                        defaultQuery[key] = { $regex: value, $options: 'i'}
                    } else if (key === 'genres' && Array.isArray(value) && value.length > 0) {
                        const validGenres = value.filter((genre: string) => genre.trim( ) !== '')
                        if (validGenres.length > 0) {
                            defaultQuery[key] = { $all: validGenres}
                        }
                    } else if (key === 'year') {
                        defaultQuery['releaseDate'] = {
                            $gte: new Date(`${value}-01-01`),
                            $lt: new Date(`${parseInt(value + 1)}-01-01`)
                        }
                    } else {
                        defaultQuery[key] = value;
                    }
                }
            }
            const result = await MovieRepository.getAllMovies(defaultQuery, page, limit, sortParams)
            const responseData = {
                movies: result.movies,
                currentPage: page,
                totalPages: Math.ceil(result.totalMovies / limit)
            }
            return responseData;
            
        } catch (error) {
            throw error
        }
    }
    async getOneMovie(movieId: string) {    
        try {
            const selectedMovie = await MovieRepository.getOneMovie(movieId)
            return selectedMovie;
        } catch (error) {
            throw error
        }
    }
    async createMovie(movieData: IMovie) {    
        try {
            const savedMovie = await MovieRepository.createMovie(movieData)
            return savedMovie;
        } catch (error) {
            throw error
        }
    }
    async updateMovie(movieId: string, movieData: IMovie): Promise<IMovie | null> {    
        try {
            const updatedMovie = await MovieRepository.updateMovie(movieId, movieData)
            return updatedMovie;
        } catch (error) {
            throw error
        }
    }
    async deleteMovie(movieId: string): Promise<IMovie | null> {    
        try {
            const deletedMovie = await MovieRepository.deleteMovie(movieId)
            return deletedMovie;
        } catch (error) {
            throw error
        }
    }
    async updateMovieRatings(movieId: string, ratingData: IRating) {   
        try {
            if (ratingData.rating < 1 || ratingData.rating > 10) 
                throw new Error('Rating must be minimum 1 and maximum 10');
            const selectedMovie = await MovieRepository.getOneMovie(movieId)
            if (selectedMovie) {
                if (!selectedMovie.ratings) selectedMovie.ratings = [];
                const wasRatedByThisUser = selectedMovie.ratings.some(item => item.userEmail === ratingData.userEmail);
                if (!wasRatedByThisUser) {
                    selectedMovie.ratings.push(ratingData)
                } else {
                    throw new Error('This movie was already rated by this user');
                }
            }
            const updatedData = {
                ratings: selectedMovie?.ratings
            } as IMovie;
            const updatedMovieRatings = await MovieRepository.updateMovie(movieId, updatedData)
            return updatedMovieRatings;
        } catch (error) {
            throw error
        }
    }
}

export default new MovieService();