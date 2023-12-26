const express = require('express');
const router = express.Router();
const gamesService = require('./games.service');

// routes
router.get('/games', getAllGames);
router.get('/games/:id', getGamesById);
router.delete('/games/:id', deleteGames);
router.post('/games' ,createGames);
router.post('/updategames' ,updateGames);
router.get('/gamewinner', getAllGameWinner);
router.get('/gamewinner/:id', getGameWinnerById);
router.delete('/gamewinner/:id', deleteGameWinner);
router.post('/gamewinner' ,createGameWinner);
router.post('/updategamewinner' ,updateGameWinner);

module.exports = router;

function createGames(req, res, next) {
    gamesService.createGames(req.body)
        .then(cms => res.json(cms))
        .catch(err => next(err));
}

function getAllGames(req, res, next) {
    gamesService.getAllGames()
        .then(cms => res.json(cms))
        .catch(err => next(err));
}

function getGamesById(req, res, next) {
    gamesService.getGamesById(req.params.id)
        .then(cms => cms ? res.json(cms) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteGames(req, res, next) {
    gamesService.deleteGames(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateGames(req, res, next) {
    gamesService.updateGames(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createGameWinner(req, res, next) {
    gamesService.createGameWinner(req.body)
        .then(cms => res.json(cms))
        .catch(err => next(err));
}

function getAllGameWinner(req, res, next) {
    gamesService.getAllGameWinner()
        .then(cms => res.json(cms))
        .catch(err => next(err));
}

function getGameWinnerById(req, res, next) {
    gamesService.getGameWinnerById(req.params.id)
        .then(cms => cms ? res.json(cms) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteGameWinner(req, res, next) {
    gamesService.deleteGameWinner(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateGameWinner(req, res, next) {
    gamesService.updateGameWinner(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}