import express from 'express';
import { connect, Schema, model } from 'mongoose';
import bodyParser from 'body-parser';

const { json } = bodyParser;

import cors from 'cors';

const app = express();

app.use(json());
app.use(cors());

//MongoDB connect
connect('mongodb://localhost:27017/tictactoe', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Data type for store in DB
const gameSchema = new Schema({
  board: [[String]],
  currentPlayer: String,
  winner: String,
  date: { type: Date, default: Date.now }
});

const Game = model('Game', gameSchema);

//POST for send data to DB
app.post('/api/save', async (req, res) => {
  try {
    const newGame = new Game(req.body);
    await newGame.save();
    res.status(201).send('Game saved');
  } catch (error) {
    res.status(500).send('Error saving game');
  }
});

//GET history match for show on website
app.get('/api/history', async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).send('Error retrieving games');
  }
});


//PORT Server is opened for listen client.
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
