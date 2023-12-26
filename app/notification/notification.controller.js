const express = require('express');
const router = express.Router();
const cmsService = require('./notification.service');

// routes
router.get('/cms', getAllCMS);
router.get('/cms/:id', getCMSById);
router.delete('/cms/:id', deleteCMS);
router.post('/cms' ,createCMS);
router.post('/updatecms' ,updateCMS);

module.exports = router;

function createCMS(req, res, next) {
    cmsService.createCMS(req.body)
        .then(cms => res.json(cms))
        .catch(err => next(err));
}

function getAllCMS(req, res, next) {
    cmsService.getAllCMS()
        .then(cms => res.json(cms))
        .catch(err => next(err));
}

function getCMSById(req, res, next) {
    cmsService.getCMSById(req.params.id)
        .then(cms => cms ? res.json(cms) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteCMS(req, res, next) {
    cmsService.deleteCMS(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateCMS(req, res, next) {
    cmsService.updateCMS(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createSupport(req, res, next) {
    cmsService.createSupport(req.body)
        .then(support => res.json(support))
        .catch(err => next(err));
}

function getAllSupport(req, res, next) {
    cmsService.getAllSupport()
        .then(support => res.json(support))
        .catch(err => next(err));
}

function getSupportById(req, res, next) {
    cmsService.getSupportById(req.params.id)
        .then(support => support ? res.json(support) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteSupport(req, res, next) {
    cmsService.deleteSupport(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateSupport(req, res, next) {
    cmsService.updateSupport(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}