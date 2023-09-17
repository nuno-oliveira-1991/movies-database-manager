import { Request, Response, NextFunction } from "express";
import IMovie from "../interfaces/MovieInterface.js";
import IRating from "../interfaces/RatingInterface.js";
import MovieService from "../services/MovieService.js";
import ApiError from "./../utils/ApiError.js"

class MovieController {
    async getAllMovies(req: Request, res: Response, next: NextFunction) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const sortBy = req.query.sortBy as string || 'releaseDate';
            const sortOrder = req.query.sortOrder as string || 'desc'
            const filtersQuery = req.query.filters as string | undefined;
            let filters: any = {};
            if (filtersQuery) {
                try {
                    filters = JSON.parse(decodeURIComponent(filtersQuery));
                    console.log(filters)
                } catch (err) {
                    return next(ApiError.BadRequestError('Invalid filters JSON'))
                }
            }
            const movies = await MovieService.getAllMovies(page, limit, sortBy, sortOrder, filters);
            res.status(200).json(movies)
        } catch (err) {
            res.status(500).send({ errorMessage: 'Cannot get movies', error: err })
        }
    }
    async getOneMovie(req: Request, res: Response) {
        try {
            const movieId = req.params.id;
            const selectedMovie = await MovieService.getOneMovie(movieId)
            if (!selectedMovie) {
                res.status(404).send({ errorMessage: 'Movie not found' })
            }
            console.log(selectedMovie)
            res.status(200).json(selectedMovie)
        } catch (error) {
            res.status(500).send({ errorMessage: 'Cannot get movie', error: error })
        }
    }
    async createMovie(req: Request, res: Response, next: NextFunction) {    
        try {
            const { title, releaseDate, trailerLink, posterUrl, genres, ratings } = req.body;
            const newMovie = {
                title, 
                releaseDate, 
                trailerLink,
                posterUrl, 
                genres,
                ratings
            } as IMovie;
            const savedMovie = await MovieService.createMovie(newMovie)
            res.status(201).json(savedMovie);
        } catch (error) {
            next(error)
        }
    }
    async updateMovie(req: Request, res: Response) {
        try {
            const movieId = req.params.id;
            const updatedData = {
                title: req.body.title, 
                releaseDate: req.body.releaseDate,
                trailerLink: req.body.trailerLink,
                posterUrl: req.body.posterUrl, 
                genres: req.body.genres,
                ratings: req.body.ratings
            } as IMovie;
            const updatedMovie = await MovieService.updateMovie(movieId, updatedData)
            
            console.log(updatedMovie)
            res.status(200).json(updatedMovie)
        } catch (error) {
            res.status(500).send({ errorMessage: 'Cannot update movie', error: error })
        }
    }
    async deleteMovie(req: Request, res: Response) {
        try {
            const movieId = req.params.id;
            const deletedMovie = await MovieService.deleteMovie(movieId)
            if (!deletedMovie) {
                res.status(404).send({ errorMessage: 'Movie not found' })
            }
            console.log(deletedMovie)
            res.status(200).json(deletedMovie)
        } catch (err) {
            res.status(500).send({ errorMessage: 'Cannot delete movie', error: err })
        }
    }
    async addRating(req: Request, res: Response) {
        try {
            const movieId = req.params.id;
            const newRatingData = {
                userEmail: req.body.userEmail,
                userName: req.body.userName, 
                rating: req.body.rating,
                comment: req.body.comment
            } as IRating;
            const updatedMovieRatings = await MovieService.updateMovieRatings(movieId, newRatingData)
            res.status(200).json(updatedMovieRatings)
        } catch (error) {
            res.status(500).send({ errorMessage: 'Cannot rate movie', error: error })
        }
    }
}

export default new MovieController();