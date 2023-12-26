const express = require('express');
const router = express.Router();
const homeService = require('./home.service');

// routes
router.post('/', getHomeData);
router.get('/nearby/:uid', getNearby);
router.get('/friends/:id', getFriends);
router.get('/resources', getResources);
router.get('/music/list', getMusicList);
router.post('/music/add', addMusicOption);
router.get('/music/:userId', getUserMusic);

module.exports = router;

function getHomeData(req, res, next) {
    homeService.getHomeData(req.body)
        .then(data => res.json(data))
        .catch(err => next(err));
}

function getNearby(req, res, next) {
    homeService.getNearby(req.params.uid)
        .then(data => {
            console.log(data);
            return res.json(data)
        })
        .catch(err => next(err));
}

function getFriends(req, res, next) {
    homeService.getFriends(req.params.id)
        .then(data => res.json(data))
        .catch(err => next(err));
}

function getResources(req,res,next) {
    homeService.getResources()
        .then(data => res.json(data))
        .catch(err => next(err));
}

function getFriendsNearby(req,res,next) {
    homeService.getFriendsNearby()
        .then(data => res.json(data))
        .catch(err => next(err));
}

function getMusicList(req,res,next) {
    homeService.getMusicList()
        .then(data => res.json(data))
        .catch(err => next(err));
}

function addMusicOption(req,res,next) {
    homeService.addMusicOption(req.body)
        .then(data => res.json(data))
        .catch(err => next(err));
}

function getUserMusic(req,res,next) {
    homeService.getUserMusic(req.params.userId)
        .then(data => res.json(data))
        .catch(err => next(err));
}