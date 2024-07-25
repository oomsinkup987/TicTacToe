/* eslint-disable no-undef */
import { Router } from 'express';
const router = Router();
import Game from '../models/gameModel';

// Save a game
router.post('/save', async (req, res) => {
  try {
    const newGame = new Game(req.body);
    await newGame.save();
    res.status(201).send('Game saved');
  } catch (error) {
    res.status(500).send('Error saving game');
  }
});

// Get game history
router.get('/history', async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).send('Error retrieving games');
  }
});

export default router;
