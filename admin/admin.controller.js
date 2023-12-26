const express = require('express');
const router = express.Router();
const adminService = require('./admin.service');

// routes
router.get('/', getAll);

module.exports = router;

function getAll(req, res, next) {
    adminService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}