const express = require('express');
const router = express.Router();
const cmsService = require('./notification.service');

// routes
// router.get('/cms', getAllCMS);
// router.get('/cms/:id', getCMSById);
// router.delete('/cms/:id', deleteCMS);
// router.post('/cms' ,createCMS);
// router.post('/updatecms' ,updateCMS);

router.get('/notifications', getAllNotification);
router.get('/notification/:id', getNotificationById);
router.delete('/notification/:id', deleteNotification);
router.post('/notification' ,createNotification);
router.post('/updatenotification' ,updateNotification);

module.exports = router;

function createNotification(req, res, next) {
    cmsService.createNotification(req.body)
        .then(cms => res.json(cms))
        .catch(err => next(err));
}

function getAllNotification(req, res, next) {
    cmsService.getAllNotification()
        .then(cms => res.json(cms))
        .catch(err => next(err));
}

function getNotificationById(req, res, next) {
    cmsService.getNotificationById(req.params.id)
        .then(cms => cms ? res.json(cms) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteNotification(req, res, next) {
    cmsService.deleteNotification(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateNotification(req, res, next) {
    cmsService.updateNotification(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

// function createSupport(req, res, next) {
//     cmsService.createSupport(req.body)
//         .then(support => res.json(support))
//         .catch(err => next(err));
// }

// function getAllSupport(req, res, next) {
//     cmsService.getAllSupport()
//         .then(support => res.json(support))
//         .catch(err => next(err));
// }

// function getSupportById(req, res, next) {
//     cmsService.getSupportById(req.params.id)
//         .then(support => support ? res.json(support) : res.sendStatus(404))
//         .catch(err => next(err));
// }

// function deleteSupport(req, res, next) {
//     cmsService.deleteSupport(req.params.id)
//         .then(() => res.json({}))
//         .catch(err => next(err));
// }

// function updateSupport(req, res, next) {
//     cmsService.updateSupport(req.body)
//         .then(() => res.json({}))
//         .catch(err => next(err));
// }