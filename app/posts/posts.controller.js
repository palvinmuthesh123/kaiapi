const express = require('express');
const router = express.Router();
const postService = require('./posts.service');

// routes
router.get('/posts', getAllPosts);
router.get('/cities', getAllCities);
router.get('/posts/:id', getAllPostsWithLike);
router.get('/post/:id', getPostById);
router.get('/userpost/:id', getPostByUId);
router.delete('/post/:id', deletePost);
router.post('/post' ,createPost);
router.post('/updatepost' ,updatePost);

router.get('/postlikes', getAllPostLikes);
router.get('/postlike/:id', getPostLikeById);
router.delete('/postlike/:id', deletePostLike);
router.post('/postlike' ,createPostLike);
router.post('/updatepostlike' ,updatePostLike);

router.get('/postconnects', getAllConnects);
router.get('/postconnect/:id', getConnectById);
router.delete('/postconnect/:id', deleteConnect);
router.post('/postconnect' ,createConnect);
router.post('/updatepostconnect' ,updateConnect);

router.get('/shorts', getAllShorts);
router.get('/short/:id', getShortById);
router.get('/shortdata/:id', getSportsWithDatas);
router.delete('/short/:id', deleteShort);
router.post('/short' ,createShort);
router.post('/updateshort' ,updateShort);
router.get('/athletes', getAllAthletes);
router.get('/athlete/:id', getAthleteById);
router.delete('/athlete/:id', deleteAthlete);
router.post('/athlete' ,createAthletePost);
router.post('/updateathlete' ,updateAthlete);

router.get('/jobssaves', getAllJobsSaves);
router.get('/jobssave/:id', getJobsSaveById);
router.get('/jobssaveuser/:id', getJobsSaveByUId);
router.delete('/jobssave/:id', deleteJobsSave);
router.post('/jobssave' ,createJobsSave);
router.post('/updatejobssave' ,updateJobsSave);

router.get('/jobsapplys', getAllJobsApplys);
router.get('/jobsapply/:id', getJobsApplyById);
router.delete('/jobsapply/:id', deleteJobsApply);
router.post('/jobsapply' ,createJobsApply);
router.post('/updatejobsapply' ,updateJobsApply);

router.get('/athletejobss', getAllAthleteJobs);
router.get('/athletejobs/:id', getAthleteJobById);
router.delete('/athletejobs/:id', deleteAthleteJob);
router.post('/athletejobs' ,createAthleteJob);
router.post('/updateathletejobs' ,updateAthleteJob);

router.get('/jobss', getAllJobs);
router.get('/jobs/:id', getJobById);
router.delete('/jobs/:id', deleteJob);
router.post('/jobs' ,createJob);
router.post('/updatejobs' ,updateJob);

router.get('/campaigns', getAllCampaigns);
router.get('/campaigns/:id', getAllCampaignsById);
router.get('/campaign/:id', getCampaignById);
router.get('/campaignuser/:id', getCampaignUser);
router.delete('/campaign/:id', deleteCampaign);
router.post('/campaign' ,createCampaign);
router.post('/updatecampaign' ,updateCampaign);

router.get('/campaignactions', getAllCampaignActions);
router.get('/campaignaction/:id', getCampaignActionById);
router.get('/campaignactionuser/:id', getCampaignActionByUserId);
router.delete('/campaignaction/:id', deleteCampaignAction);
router.post('/campaignaction' ,createCampaignAction);
router.post('/updatecampaignaction' ,updateCampaignAction);

router.get('/campaignsaves', getAllCampaignSaves);
router.get('/campaignsave/:id', getCampaignSaveById);
router.get('/campaignsaveuser/:id', getCampaignSaveByUId);
router.delete('/campaignsave/:id', deleteCampaignSave);
router.post('/campaignsavee' ,createCampaignSave);
router.post('/updatecampaignsave' ,updateCampaignSave);

router.get('/sports', getAllSports);
router.get('/sport/:id', getSportById);
router.delete('/sport/:id', deleteSport);
router.post('/sport' ,createSport);
router.post('/updatesport' ,updateSport);
router.get('/sportsvideos/:id', getAllSportsVideos);
router.get('/sportsvideo/:id', getSportsVideoById);
router.delete('/sportsvideo/:id', deleteSportsVideo);
router.post('/sportsvideo' ,createSportsVideo);
router.post('/updatesportsvideo' ,updateSportsVideo);
router.get('/sportsvideoinfos/:id', getAllSportsVideoInfos);
router.get('/sportsvideoinfo/:id', getSportsVideoInfoById);
router.delete('/sportsvideoinfo/:id', deleteSportsVideoInfo);
router.post('/sportsvideoinfo' ,createSportsVideoInfo);
router.post('/updatesportsvideoinfo' ,updateSportsVideoInfo);
router.get('/sportsvideoinfoss/:id', getAllSportsVideoInfoss);
router.get('/sportsvideoinfos/:id', getSportsVideoInfosById);
router.delete('/sportsvideoinfos/:id', deleteSportsVideoInfos);
router.post('/sportsvideoinfos' ,createSportsVideoInfos);
router.post('/updatesportsvideoinfos' ,updateSportsVideoInfos);
router.get('/schedules', getAllSchedules);
router.get('/schedule/:id', getScheduleById);
router.delete('/schedule/:id', deleteSchedule);
router.post('/schedule' ,createSchedule);
router.post('/updateschedule' ,updateSchedule);
router.get('/specializations', getAllSpecializations);
router.get('/specialization/:id', getSpecializationById);
router.delete('/specialization/:id', deleteSpecialization);
router.post('/specialization' ,createSpecialization);
router.post('/updatespecialization' ,updateSpecialization);
router.get('/topspecializations', getAllTopSpecializations);
router.get('/topspecialization/:id', getTopSpecializationById);
router.delete('/topspecialization/:id', deleteTopSpecialization);
router.post('/topspecialization' ,createTopSpecialization);
router.post('/updatetopspecialization' ,updateTopSpecialization);
router.get('/payments', getAllPayments);
router.get('/payment/:id', getPaymentById);
router.delete('/payment/:id', deletePayment);
router.post('/payment' ,createPayment);
router.post('/updatepayment' ,updatePayment);
router.get('/appointments', getAllAppointments);
router.get('/appointment/:id', getAppointmentById);
router.get('/userappointment/:id', getAppointmentByUserId);
router.delete('/appointment/:id', deleteAppointment);
router.post('/appointment' ,createAppointment);
router.post('/updateappointment' ,updateAppointment);
router.get('/patients', getAllPatients);
router.get('/patient/:id', getPatientById);
router.delete('/patient/:id', deletePatient);
router.post('/patient' ,createPatient);
router.post('/updatepatient' ,updatePatient);
router.get('/reviews', getAllReviews);
router.get('/review/:id', getReviewById);
router.delete('/review/:id', deleteReview);
router.post('/review' ,createReview);
router.post('/updatereview' ,updateReview);
router.get('/wishlists', getAllWishlists);
router.get('/wishlist/:id', getWishlistById);
router.delete('/wishlist/:id', deleteWishlist);
router.post('/wishlist' ,createWishlist);
router.post('/updatewishlist' ,updateWishlist);
router.get('/supports', getAllSupports);
router.get('/support/:id', getSupportById);
router.delete('/support/:id', deleteSupport);
router.post('/support' ,createSupport);
router.post('/updatesupport' ,updateSupport);

module.exports = router;

function createPost(req, res, next) {
    postService.createPost(req.body)
        .then(product => res.json(product))
        .catch(err => next(err));
}

function getAllCities(req, res, next) {
    postService.getAllCities()
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getAllPosts(req, res, next) {
    postService.getAllPosts()
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getAllPostsWithLike(req, res, next) {
    postService.getAllPostsWithLike(req.params.id)
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getPostById(req, res, next) {
    postService.getPostById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function getPostByUId(req, res, next) {
    postService.getPostByUId(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function deletePost(req, res, next) {
    postService.deletePost(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updatePost(req, res, next) {
    postService.updatePost(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createPostLike(req, res, next) {
    postService.createPostLike(req.body)
        .then(product => res.json(product))
        .catch(err => next(err));
}

function getAllPostLikes(req, res, next) {
    postService.getAllPostLikes()
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getPostLikeById(req, res, next) {
    postService.getPostLikeById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function deletePostLike(req, res, next) {
    postService.deletePostLike(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updatePostLike(req, res, next) {
    postService.updatePostLike(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createConnect(req, res, next) {
    postService.createConnect(req.body)
        .then(product => res.json(product))
        .catch(err => next(err));
}

function getAllConnects(req, res, next) {
    postService.getAllConnects()
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getConnectById(req, res, next) {
    postService.getConnectById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteConnect(req, res, next) {
    postService.deleteConnect(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateConnect(req, res, next) {
    postService.updateConnect(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createShort(req, res, next) {
    postService.createShort(req.body)
        .then(product => res.json(product))
        .catch(err => next(err));
}

function getAllShorts(req, res, next) {
    postService.getAllShorts()
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getShortById(req, res, next) {
    postService.getShortById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function getSportsWithDatas(req, res, next) {
    postService.getSportsWithDatas(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteShort(req, res, next) {
    postService.deleteShort(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateShort(req, res, next) {
    postService.updateShort(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createAthletePost(req, res, next) {
    postService.createAthletePost(req.body)
        .then(product => res.json(product))
        .catch(err => next(err));
}

function getAllAthletes(req, res, next) {
    postService.getAllAthletes()
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getAthleteById(req, res, next) {
    postService.getAthleteById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteAthlete(req, res, next) {
    postService.deleteAthlete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateAthlete(req, res, next) {
    postService.updateAthlete(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createAthleteJob(req, res, next) {
    postService.createAthleteJob(req.body)
        .then(product => res.json(product))
        .catch(err => next(err));
}

function getAllAthleteJobs(req, res, next) {
    postService.getAllAthleteJobs()
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getAthleteJobById(req, res, next) {
    postService.getAthleteJobById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteAthleteJob(req, res, next) {
    postService.deleteAthleteJob(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateAthleteJob(req, res, next) {
    postService.updateAthleteJob(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createJobsSave(req, res, next) {
    postService.createJobsSave(req.body)
        .then(product => res.json(product))
        .catch(err => next(err));
}

function getAllJobs(req, res, next) {
    postService.getAllJobs()
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getJobById(req, res, next) {
    postService.getJobById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteJob(req, res, next) {
    postService.deleteJob(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateJob(req, res, next) {
    postService.updateJob(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createJob(req, res, next) {
    postService.createJob(req.body)
        .then(product => res.json(product))
        .catch(err => next(err));
}

function getAllJobsSaves(req, res, next) {
    postService.getAllJobsSaves()
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getJobsSaveById(req, res, next) {
    postService.getJobsSaveById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function getJobsSaveByUId(req, res, next) {
    postService.getJobsSaveByUId(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteJobsSave(req, res, next) {
    postService.deleteJobsSave(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function updateJobsSave(req, res, next) {
    postService.updateJobsSave(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAllJobsApplys(req, res, next) {
    postService.getAllJobsApplys()
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getJobsApplyById(req, res, next) {
    postService.getJobsApplyById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteJobsApply(req, res, next) {
    postService.deleteJobsApply(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateJobsApply(req, res, next) {
    postService.updateJobsApply(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createJobsApply(req, res, next) {
    postService.createJobsApply(req.body)
        .then(product => res.json(product))
        .catch(err => next(err));
}

function createCampaign(req, res, next) {
    postService.createCampaign(req.body)
        .then(product => res.json(product))
        .catch(err => next(err));
}

function getAllCampaigns(req, res, next) {
    postService.getAllCampaigns()
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getAllCampaignsById(req, res, next) {
    postService.getAllCampaignsById(req.params.id)
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getCampaignById(req, res, next) {
    postService.getCampaignById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function getCampaignUser(req, res, next) {
    postService.getCampaignUser(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteCampaign(req, res, next) {
    postService.deleteCampaign(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateCampaign(req, res, next) {
    postService.updateCampaign(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createCampaignAction(req, res, next) {
    postService.createCampaignAction(req.body)
        .then(product => res.json(product))
        .catch(err => next(err));
}

function getAllCampaignActions(req, res, next) {
    postService.getAllCampaignActions()
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getCampaignActionById(req, res, next) {
    postService.getCampaignActionById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function getCampaignActionByUserId(req, res, next) {
    postService.getCampaignActionByUserId(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteCampaignAction(req, res, next) {
    postService.deleteCampaignAction(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateCampaignAction(req, res, next) {
    postService.updateCampaignAction(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createCampaignSave(req, res, next) {
    postService.createCampaignSave(req.body)
        .then(product => res.json(product))
        .catch(err => next(err));
}

function getAllCampaignSaves(req, res, next) {
    postService.getAllCampaignSaves()
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getCampaignSaveById(req, res, next) {
    postService.getCampaignSaveById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function getCampaignSaveByUId(req, res, next) {
    postService.getCampaignSaveByUId(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteCampaignSave(req, res, next) {
    postService.deleteCampaignSave(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateCampaignSave(req, res, next) {
    postService.updateCampaignSave(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createSport(req, res, next) {
    postService.createSport(req.body)
        .then(product => res.json(product))
        .catch(err => next(err));
}

function getAllSports(req, res, next) {
    postService.getAllSports()
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getSportById(req, res, next) {
    postService.getSportById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteSport(req, res, next) {
    postService.deleteSport(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateSport(req, res, next) {
    postService.updateSport(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createSportsVideo(req, res, next) {
    postService.createSportsVideo(req.body)
        .then(product => res.json(product))
        .catch(err => next(err));
}

function getAllSportsVideos(req, res, next) {
    postService.getAllSportsVideos(req.params.id)
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getSportsVideoById(req, res, next) {
    postService.getSportsVideoById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteSportsVideo(req, res, next) {
    postService.deleteSportsVideo(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateSportsVideo(req, res, next) {
    postService.updateSportsVideo(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createSportsVideoInfo(req, res, next) {
    postService.createSportsVideoInfo(req.body)
        .then(product => res.json(product))
        .catch(err => next(err));
}

function getAllSportsVideoInfos(req, res, next) {
    postService.getAllSportsVideoInfos(req.params.id)
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getSportsVideoInfoById(req, res, next) {
    postService.getSportsVideoInfoById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteSportsVideoInfo(req, res, next) {
    postService.deleteSportsVideoInfo(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateSportsVideoInfo(req, res, next) {
    postService.updateSportsVideoInfo(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createSportsVideoInfos(req, res, next) {
    postService.createSportsVideoInfos(req.body)
        .then(product => res.json(product))
        .catch(err => next(err));
}

function getAllSportsVideoInfoss(req, res, next) {
    postService.getAllSportsVideoInfoss(req.params.id)
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getSportsVideoInfosById(req, res, next) {
    postService.getSportsVideoInfosById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteSportsVideoInfos(req, res, next) {
    postService.deleteSportsVideoInfos(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateSportsVideoInfos(req, res, next) {
    postService.updateSportsVideoInfos(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createSchedule(req, res, next) {
    postService.createSchedule(req.body)
        .then(product => res.json(product))
        .catch(err => next(err));
}

function getAllSchedules(req, res, next) {
    postService.getAllSchedules()
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getScheduleById(req, res, next) {
    postService.getScheduleById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteSchedule(req, res, next) {
    postService.deleteSchedule(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateSchedule(req, res, next) {
    postService.updateSchedule(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createSpecialization(req, res, next) {
    postService.createSpecialization(req.body)
        .then(product => res.json(product))
        .catch(err => next(err));
}

function getAllSpecializations(req, res, next) {
    postService.getAllSpecializations()
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getSpecializationById(req, res, next) {
    postService.getSpecializationById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteSpecialization(req, res, next) {
    postService.deleteSpecialization(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateSpecialization(req, res, next) {
    postService.updateSpecialization(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createTopSpecialization(req, res, next) {
    postService.createTopSpecialization(req.body)
        .then(product => res.json(product))
        .catch(err => next(err));
}

function getAllTopSpecializations(req, res, next) {
    postService.getAllTopSpecializations()
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getTopSpecializationById(req, res, next) {
    postService.getTopSpecializationById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteTopSpecialization(req, res, next) {
    postService.deleteTopSpecialization(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateTopSpecialization(req, res, next) {
    postService.updateTopSpecialization(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createPayment(req, res, next) {
    postService.createPayment(req.body)
        .then(product => res.json(product))
        .catch(err => next(err));
}

function getAllPayments(req, res, next) {
    postService.getAllPayments()
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getPaymentById(req, res, next) {
    postService.getPaymentById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function deletePayment(req, res, next) {
    postService.deletePayment(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updatePayment(req, res, next) {
    postService.updatePayment(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createAppointment(req, res, next) {
    postService.createAppointment(req.body)
        .then(product => res.json(product))
        .catch(err => next(err));
}

function getAllAppointments(req, res, next) {
    postService.getAllAppointments()
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getAppointmentById(req, res, next) {
    postService.getAppointmentById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function getAppointmentByUserId(req, res, next) {
    postService.getAppointmentByUserId(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteAppointment(req, res, next) {
    postService.deleteAppointment(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateAppointment(req, res, next) {
    postService.updateAppointment(req.body)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function createPatient(req, res, next) {
    postService.createPatient(req.body)
        .then(product => res.json(product))
        .catch(err => next(err));
}

function getAllPatients(req, res, next) {
    postService.getAllPatients()
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getPatientById(req, res, next) {
    postService.getPatientById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function deletePatient(req, res, next) {
    postService.deletePatient(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updatePatient(req, res, next) {
    postService.updatePatient(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createReview(req, res, next) {
    postService.createReview(req.body)
        .then(product => res.json(product))
        .catch(err => next(err));
}

function getAllReviews(req, res, next) {
    postService.getAllReviews()
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getReviewById(req, res, next) {
    postService.getReviewById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteReview(req, res, next) {
    postService.deleteReview(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateReview(req, res, next) {
    postService.updateReview(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createWishlist(req, res, next) {
    postService.createWishlist(req.body)
        .then(product => res.json(product))
        .catch(err => next(err));
}

function getAllWishlists(req, res, next) {
    postService.getAllWishlists()
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getWishlistById(req, res, next) {
    postService.getWishlistById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteWishlist(req, res, next) {
    postService.deleteWishlist(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateWishlist(req, res, next) {
    postService.updateWishlist(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createSupport(req, res, next) {
    postService.createSupport(req.body)
        .then(product => res.json(product))
        .catch(err => next(err));
}

function getAllSupports(req, res, next) {
    postService.getAllSupports()
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getSupportById(req, res, next) {
    postService.getSupportById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteSupport(req, res, next) {
    postService.deleteSupport(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateSupport(req, res, next) {
    postService.updateSupport(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}