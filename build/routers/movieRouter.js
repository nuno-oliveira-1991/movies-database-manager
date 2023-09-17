import express from 'express';
import MovieController from './../controllers/MovieController.js';
const router = express.Router();
router.get('/movies', MovieController.getAllMovies);
router.get('/movies/:id', MovieController.getOneMovie);
router.post('/movies', MovieController.createMovie);
router.put('/movies/ratings/:id', MovieController.addRating);
router.put('/movies/:id', MovieController.updateMovie);
router.delete('/movies/:id', MovieController.deleteMovie);
export default router;
//# sourceMappingURL=movieRouter.js.map