
import { Schema, model } from 'mongoose';

//Data types 
const gameSchema = new Schema({
  board: [[String]],
  currentPlayer: String,
  winner: String,
  date: { type: Date, default: Date.now }
});

export default model('Game', gameSchema);
