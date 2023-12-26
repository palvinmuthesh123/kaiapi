const express = require('express');
const router = express.Router();
const cmsService = require('./cms.service');


// routes
router.get('/cms', getAllCMS);
router.get('/cms/:id', getCMSById);
router.delete('/cms/:id', deleteCMS);
router.post('/cms' ,createCMS);
router.post('/updatecms' ,updateCMS);
router.get('/commission', getAllCommission);
router.get('/commission/:id', getCommissionById);
router.delete('/commission/:id', deleteCommission);
router.post('/commission' ,createCommission);
router.post('/updatecommission' ,updateCommission);
router.get('/support', getAllSupport);
router.get('/support/:id', getSupportById);
router.get('/allPayments' ,allPayments);
router.delete('/support/:id', deleteSupport);
router.post('/support' ,createSupport);
router.post('/updatesupport' ,updateSupport);
router.post('/payment' ,payment);
router.post('/paypals' ,paypals);
router.post('/savePayment' ,savePayment);
// router.get('/getpayments' ,getAllPayments);
// router.get('/getpaymentbyid' ,getPaymentById);
// router.delete('/deletepayment' ,deletePayment);

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

function createCommission(req, res, next) {
    cmsService.createCommission(req.body)
        .then(cms => res.json(cms))
        .catch(err => next(err));
}

function getAllCommission(req, res, next) {
    cmsService.getAllCommission()
        .then(cms => res.json(cms))
        .catch(err => next(err));
}

function getCommissionById(req, res, next) {
    cmsService.getCommissionById(req.params.id)
        .then(cms => cms ? res.json(cms) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteCommission(req, res, next) {
    cmsService.deleteCommission(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateCommission(req, res, next) {
    cmsService.updateCommission(req.body)
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

function payment(req, res, next) {
    cmsService.payment(req.body)
        .then(payment => payment ? res.json(payment) : res.sendStatus(404))
        .catch(err => next(err));
}

function paypals(req, res, next) {
    cmsService.paypals(req.body)
        .then(payment => payment ? res.json(payment) : res.sendStatus(404))
        .catch(err => next(err));
}

function savePayment(req, res, next) {
    cmsService.savePayment(req.body)
        .then(payment => payment ? res.json(payment) : res.sendStatus(404))
        .catch(err => next(err));
}

function allPayments(req, res, next) {
    cmsService.allPayments()
        .then(payment =>payment ? res.json(payment) : res.sendStatus(404))
        .catch(err => next(err));
}