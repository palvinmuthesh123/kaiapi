const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/login', authenticate);
router.post('/doctorlogin', doctorAuthenticate);
router.post('/logout', logout);
router.post('/changepassword', changePassword);
router.post('/editprofile', editProfile);
router.post('/editdoctorprofile', editDoctorProfile);
router.post('/register', register);
router.post('/doctorregister', doctorRegister);
router.get('/', getAll);
router.get('/experts', getAllExperts);
router.get('/atheletes/:id', getAllAthletesByIds);
router.get('/doctors', getAllDoctor);
router.get('/all/:id', getAllWithId);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.get('/cities', getCities);
router.get('/usermessages/:id/:who', getUserMessages);
router.put('/:id', update);
router.delete('/:id', _delete);
router.delete('/doctor/:id', deleteDoctor);
router.get('/activate/:id', activate);
router.get('/request/:id/:fid/:type', sendRequest);
router.get('/requests/:id', getRequests);
router.delete('/request/:id', deleteRequest);
router.get('/request/:id', acceptRequest);
router.post('/address', addAddress);
router.post('/message' ,sendMessage);
router.get('/message/:id/:rec_id/:who' ,getMessages);
router.post('/updatemessage' ,updateMessage);
router.post('/update/password', forgotPassword)

module.exports = router;

function getMessages(req, res, next) {
    userService.getMessages(req.params.id, req.params.rec_id, req.params.who)
        .then(users => res.json(users))
        .catch(err => next(err));
}

function updateMessage(req, res, next) {
    userService.updateMessage(req.body)
        .then(users => res.json(users))
        .catch(err => next(err));
}

function sendMessage(req, res, next) {
    userService.sendMessage(req.body)
        .then(user => res.json(user))
        .catch(err => next(err));
}

function acceptRequest(req, res, next){
    userService.acceptRequest(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function addAddress(req, res, next){
    userService.addAddress(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function deleteRequest(req, res, next) {
    userService.deleteRequest(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getRequests(req, res, next) {
    userService.getRequests(req.params.id)
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCities(req, res, next) {
    userService.getCities()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function sendRequest(req, res, next) {
    userService.sendRequest(req.params.id, req.params.fid, req.params.type)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function doctorAuthenticate(req, res, next) {
    userService.doctorAuthenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function logout(req, res, next) {
    userService.logout(req.body.email)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Email is incorrect' }))
        .catch(err => next(err));
}

function changePassword(req, res, next) {
    userService.changePassword(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Email is incorrect' }))
        .catch(err => next(err));
}

function editProfile(req, res, next) {
    userService.editProfile(req.body)
        .then((user) => user ? res.json(user): res.status(400).json({ message: 'User ID is incorrect' }))
        .catch(err => next(err));
}

function editDoctorProfile(req, res, next) {
    userService.editDoctorProfile(req.body)
        .then((user) => user ? res.json(user): res.status(400).json({ message: 'Doctor ID is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    console.log(req.body)
    userService.create(req.body)
        .then((user) => res.json(user))
        .catch(err => next(err));
}

function doctorRegister(req, res, next) {
    console.log(req.body)
    userService.doctorCreate(req.body)
        .then((user) => res.json(user))
        .catch(err => next(err));
}

function forgotPassword(req, res, next) {
    userService.forgotPassword(req.body)
        .then((user) => res.json(user))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getAllExperts(req, res, next) {
    userService.getAllExperts()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getAllAthletesByIds(req, res, next) {
    userService.getAllAthletesByIds(req.params.id)
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getAllDoctor(req, res, next) {
    userService.getAllDoctor()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getAllWithId(req, res, next) {
    userService.getAllWithId(req.params.id)
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getUserMessages(req, res, next) {
    userService.getUserMessages(req.params.id, req.params.who)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function deleteDoctor(req, res, next) {
    userService.deleteDoctor(req.params.id)
        .then(doctor => doctor ? res.json(doctor) : res.sendStatus(404))
        .catch(err => next(err));
}

function activate(req, res, next) {
    userService.activate(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function testings(req, res, next) {
    userService.testings()
        .then(() => res.json({}))
        .catch(err => next(err));
}