import mongoose from 'mongoose';
import IRating from '../interfaces/RatingInterface.js';
import { validateRating } from '../utils/Validations.js';

const RatingSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    validate: {
      validator: validateRating,
      message: 'Rating must be a whole number between 1 and 10',
    },
  },
  comment: String,
});

const RatingModel = mongoose.model<IRating>('Rating', RatingSchema);

export default RatingModel;