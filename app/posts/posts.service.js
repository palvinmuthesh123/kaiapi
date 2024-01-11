const db = require('_helpers/db');
const Post = db.Post;
const Athlete = db.AthletePost;
const AthleteJob = db.AthleteJob;
const Recruit = db.Recruit;
const Job = db.Jobs;
const Shorts = db.Shorts;
const JobsApply = db.JobsApply;
const Connect = db.Connect;
const JobsSave = db.JobsSave;
const Campaign = db.Campaign;
const CampaignAction = db.CampaignAction;
const CampaignSave = db.CampaignSave;
const Sports = db.Sports;
const Notification = db.Notification;
const SportsVideos = db.SportsVideo;
const SportsVideoInfo = db.SportsVideoInfo;
const SportsVideoInfos = db.SportsVideoInfoSubs;
const Schedule = db.Schedule;
const Specialization = db.Specialization;
const Appointment = db.Appointment;
const Payment = db.Payment;
const Patient = db.Patient;
const Review = db.Review;
const Wishlist = db.Wishlist;
const TopSpecialization = db.TopSpecialization;
const JobAction = db.JobAction
const Supports = db.Supports
const User = db.User
const PostLike = db.PostLike

const { admin } = require("../../firebase-config")
const cities = require("../users/cities")

module.exports = {
    getAllCities,
    createPost,
    getAllPosts,
    getAllPostsWithLike,
    getPostById,
    getPostByUId,
    deletePost,
    updatePost,

    createPostLike,
    getAllPostLikes,
    getPostLikeById,
    deletePostLike,
    updatePostLike,

    createShort,
    getAllShorts,
    getShortById,
    deleteShort,
    updateShort,
    createAthletePost,
    getAllAthletes,
    getAthleteById,
    deleteAthlete,
    updateAthlete,
    createRecruit,
    getAllRecruits,
    getRecruitById,
    deleteRecruit,
    updateRecruit,
    createAthleteJob,
    getAllAthleteJobs,
    // getAllAthleteJobsById,
    // getAthleteJobById,
    deleteAthleteJob,
    updateAthleteJob,
    createJob,
    getAllJobs,
    getAllJobsById,
    getJobById,
    deleteJob,
    updateJob,
    createJobsApply,
    getAllJobsApplys,
    getJobsApplyById,
    deleteJobsApply,
    updateJobsApply,
    createConnect,
    getAllConnects,
    getConnectById,
    deleteConnect,
    updateConnect,
    createJobsSave,
    getAllJobsSaves,
    getJobsSaveById,
    getJobsSaveByUId,
    deleteJobsSave,
    updateJobsSave,

    createCampaign,
    getAllCampaigns,
    getAllCampaignsById,
    getCampaignById,
    deleteCampaign,
    updateCampaign,
    createCampaignAction,
    getAllCampaignActions,
    getCampaignActionById,
    getCampaignActionByUserId,
    deleteCampaignAction,
    updateCampaignAction,
    createCampaignSave,
    getAllCampaignSaves,
    getCampaignSaveById,
    getCampaignSaveByUId,
    deleteCampaignSave,
    updateCampaignSave,
    createSport,
    getAllSports,
    getSportsWithDatas,
    getSportsWithVideo,
    getSportById,
    deleteSport,
    updateSport,
    createSportsVideo,
    getAllSportsVideos,
    getSportsVideoById,
    deleteSportsVideo,
    updateSportsVideo,
    createSportsVideoInfo,
    getAllSportsVideoInfos,
    getSportsVideoInfoById,
    deleteSportsVideoInfo,
    updateSportsVideoInfo,
    createSportsVideoInfos,
    getAllSportsVideoInfoss,
    getSportsVideoInfosById,
    deleteSportsVideoInfos,
    updateSportsVideoInfos,
    createSchedule,
    getAllSchedules,
    getScheduleById,
    deleteSchedule,
    updateSchedule,
    createSpecialization,
    getAllSpecializations,
    getSpecializationById,
    deleteSpecialization,
    updateSpecialization,
    createTopSpecialization,
    getAllTopSpecializations,
    getTopSpecializationById,
    deleteTopSpecialization,
    updateTopSpecialization,
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    getAppointmentByUserId,
    deleteAppointment,
    updateAppointment,
    createPayment,
    getAllPayments,
    getPaymentById,
    deletePayment,
    updatePayment,
    createPatient,
    getAllPatients,
    getPatientById,
    deletePatient,
    updatePatient,
    createReview,
    getAllReviews,
    getReviewById,
    deleteReview,
    updateReview,
    createWishlist,
    getAllWishlists,
    getWishlistById,
    deleteWishlist,
    updateWishlist,
    getCampaignUser,
    createJobAction,
    getAllJobActions,
    getJobActionById,
    deleteJobAction,
    updateJobAction,
    createSupport,
    getAllSupports,
    getSupportById,
    deleteSupport,
    updateSupport
};

async function getAllCities() {
    return { success: true, data: cities };
}

async function createPost(contents) {
    const post = new Post(contents);
    await post.save();

    // var pst = await Post.findById(contents.id).select('-hash').lean();

    var contents = {
        uid: contents.uid,
        title: contents.name,
        name: "Your post is created successfully",
    }

    await notific(contents);

    return { success: true, message: "Post Added Successfully" };
}

async function getAllPosts() {
    return await Post.find().select('-hash').sort({createdDate: -1});
}

async function getAllPostsWithLike(ids) {
    const posts = await Post.find().select('-hash');
    var arr = []
    if(posts.length==0)
    {
        return{success: false, message: "No Data Found"}
    }
    else
    {
        for(var i = 0; i<posts.length; i++)
        {
            var like = []
            var cnt = []
            var connect = []
            like = await PostLike.find({uid: ids, id: posts[i]._id}).select('-hash');
            cnt = await PostLike.find({id: posts[i]._id}).select('-hash');
            connect = await Connect.find({uid: ids, id: posts[i]._id}).select('-hash');

            arr.push({
                _id: posts[i]._id,
                uid: posts[i].uid,
                image: posts[i].image,
                name: posts[i].name,
                location: posts[i].location,
                description: posts[i].description,
                feel: posts[i].feel,
                liked: like.length!=0 ? true : false,
                count: cnt.length,
                connect: connect.length!=0 ? true : false,
                createdDate: posts[i].createdDate,
            })
        }
        return { success: true, arr }
    }
}

async function getPostById(id) {
    const post = await Post.findById(id).select('-hash').lean();
    if (!post)
        return { error: true, message: "Post not found" };
    const stats = await Post.findOne({ _id: id }).lean();
    return { success: true, posts: { ...post, ...stats } };
}

async function getPostByUId(id) {
    const post = await Post.find({uid: id}).select('-hash').lean();
    if (!post)
        return { success: false, message: "Post not found" };
    else
        return { success: true, post };
}

async function deletePost(id) {
    await Post.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updatePost(data) {
    // console.log(id);
    const post = await Post.findById(data.id);
    // validate
    if (post) {
        // Object.assign(post, {address: data.add});
        let keys = Object.keys(data.new)
        keys.map(x=>{
            post[x] =  data.new[x]
        })
        await post.save();
    }
}

async function notific(msg) {

    const notification = new Notification(msg);
    await notification.save();

    var payload = {
        notification: {
            title: "You have a new message",
            body : msg.name
        }
    };

    var registrationTokens = await User.find({_id: msg.uid}).select('-hash').lean();
    
    admin.messaging().sendToDevice(registrationTokens[0].deviceid, payload)
        .then((response) => {
            console.log('Sent successfully.\n');
            console.log(response);
            res.status(statusCodes.Ok);
            res.json(response);
        })
        .catch((error) => {
            console.log('Sent failed.\n');
            console.log(error);
            res.status(statusCodes.InternalServerError);
            res.json(error);
        });

}

async function createPostLike(contents) {
    const post = new PostLike(contents);
    await post.save();

    var pst = await Post.findById(contents.id).select('-hash').lean();

    var contents = {
        uid: pst.uid,
        title: pst.name,
        name: "Your "+pst.name+ "post got a like",
    }

    await notific(contents);

    return { success: true, message: "Post Liked Successfully" };
}

async function getAllPostLikes() {
    return await PostLike.find().select('-hash');
}

async function getPostLikeById(id) {
    const post = await PostLike.findById(id).select('-hash').lean();
    if (!post)
        return { error: true, message: "Post not found" };
    else
        return { success: true, post };
}

async function deletePostLike(id) {
    await PostLike.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updatePostLike(data) {
    // console.log(id);
    const post = await PostLike.findById(data.id);
    // validate
    if (post) {
        // Object.assign(post, {address: data.add});
        let keys = Object.keys(data.new)
        keys.map(x=>{
            post[x] =  data.new[x]
        })
        await post.save();
    }
}

async function createShort(contents) {
    const short = new Shorts(contents);
    await short.save();

    var pst = await User.findById(contents.uid).select('-hash').lean();

    var contents = {
        uid: contents.uid,
        title: pst.first_name+" "+pst.last_name,
        name: "Your shorts is created successfully",
    }

    await notific(contents);

    return { success: true, message: "Shorts Added Successfully" };
}

async function getAllShorts() {
    return await Shorts.find().select('-hash');
}

async function getShortById(id) {
    const short = await Shorts.find({uid: id}).select('-hash').lean();
    if (short.length==0)
        return { success: false, message: "Shorts not found" };
    else
        return { success: true, short };
}

async function deleteShort(id) {
    await Shorts.findByIdAndRemove(id);
    return { success: true, message:"Shorts Successfully Deleted" };
}

async function updateShort(data) {
    // console.log(id);
    const short = await Shorts.findById(data.id);
    // validate
    if (short) {
        // Object.assign(short, {address: data.add});
        let keys = Object.keys(data.new)
        keys.map(x=>{
            short[x] =  data.new[x]
        })
        await short.save();
    }
}

async function createAthletePost(contents) {
    const athletepost = new Athlete(contents);
    await athletepost.save();
    return { success: true, message: "Athlete Added Successfully" };
}

async function getAllAthletes() {
    return await Athlete.find().select('-hash');
}

async function getAthleteById(id) {
    const athletepost = await Athlete.findById(id).select('-hash').lean();
    if (!athletepost)
    return { error: true, message: "Athlete not found" };
    const stats = await Athlete.findOne({ _id: id }).lean();
    return { success: true, athleteposts: { ...athletepost, ...stats } };
}

async function deleteAthlete(id) {
    await Athlete.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updateAthlete(data) {
    const athletepost = await Athlete.findById(data.id);
    // validate
    if (athletepost) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            athletepost[x] =  data.new[x]
        })
        await athletepost.save();
    }
}


async function createRecruit(contents) {
    const recruit = new Recruit(contents);
    await recruit.save();

    var pst = await User.findById(contents.id).select('-hash').lean();

    var contents = {
        uid: contents.expert_id,
        title: pst.first_name+" "+pst.last_name,
        name: "You have recruited an athelete",
    }

    await notific(contents);

    return { success: true, message: "Recruited Successfully" };
}

async function getAllRecruits() {
    return await Recruit.find().select('-hash');
}

async function getRecruitById(id) {
    const recruit = await Recruit.findById(id).select('-hash').lean();
    if (!recruit)
    return { error: true, message: "Recruit not found" };
    else
    return { success: true, recruit };
}

async function deleteRecruit(id) {
    await Recruit.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updateRecruit(data) {
    const recruit = await Recruit.findById(data.id);
    // validate
    if (recruit) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            recruit[x] =  data.new[x]
        })
        await recruit.save();
    }
}

async function createAthleteJob(contents) {
    const athletejob = new AthleteJob(contents);
    await athletejob.save();
    return { success: true, message: "AthleteJob Added Successfully" };
}

async function getAllAthleteJobs() {
    const users = await AthleteJob.find().select('-hash');
    var arr = [];
    for(var i = 0; i<users.length; i++)
    {
        arr.push({
            _id: users[i]._id,
            uid: users[i].uid,
            name: users[i].name,
            class: users[i].class,
            position: users[i].position,
            level: users[i].level,
            description: users[i].description,
            location: users[i].location,
            createdDate: users[i].createdDate,
            __v: users[i].__v,
            id: users[i].id,
            title: users[i].title ? users[i].title: '',
            expert_details: await User.findById(users[i].uid).select('-hash')
        })
    }
    return { success: true, arr };
}

// async function getAthleteJobById(id) {
//     const athletejob = await AthleteJob.find({uid: id}).select('-hash').lean();
//     if (athletejob.length==0)
//         return { success: false, message: "Athlete Job not found" };
//     else
//     {
//         var arr = []
//         for(var i = 0; i<athletejob.length; i++)
//         {
//             var appl = await JobsApply.find({id: athletejob[i]._id}).select('-hash').lean();
//             var liis = []
//             for(var j = 0; j<appl.length; j++)
//             {
//                 liis.push(await User.findById(appl[i].uid).select('-hash'))
//             }
//             arr.push({
//                 job: athletejob[i],
//                 applied: liis
//             })
//         }
//         return { success: true, arr };
//     }
// }

async function deleteAthleteJob(id) {
    await AthleteJob.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updateAthleteJob(data) {
    const athletejob = await AthleteJob.findById(data.id);
    // validate
    if (athletejob) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            athletejob[x] =  data.new[x]
        })
        await athletejob.save();
    }
}

async function createJob(contents) {
    const job = new Job(contents);
    await job.save();
    return { success: true, message: "Job Added Successfully" };
}

async function getAllJobs() {
    return await Job.find().select('-hash').sort({createdDate: -1});
}

async function getAllJobsById(id) {
    const jobb =  await AthleteJob.find().select('-hash').sort({createdDate: -1});
    var arr = []
    for(var i = 0; i<jobb.length; i++)
    {
            var join = []
            var save = []
            join = await JobsApply.find({uid: id, id: jobb[i]._id}).select('-hash');
            save = await JobsSave.find({uid: id, id: jobb[i]._id}).select('-hash');

        arr.push({
            _id: jobb[i]._id,
            uid: jobb[i].uid,
            name: jobb[i].name,
            class: jobb[i].class,
            position: jobb[i].position,
            level: jobb[i].level,
            description: jobb[i].description,
            location: jobb[i].location,
            createdDate: jobb[i].createdDate,
            __v: jobb[i].__v,
            id: jobb[i].id,
            title: jobb[i].title ? jobb[i].title: '',
            expert_details: await User.findById(jobb[i].uid).select('-hash'),
            joined: join.length!=0 ? true : false,
            saved: save.length!=0 ? true : false,
            createdDate: jobb[i].createdDate
        })
    }
    return { success: true, arr };
}

async function getJobById(id) {
    const job = await Job.findById(id).select('-hash').lean();
    if (!job)
    return { error: true, message: "Job not found" };
    const stats = await Job.findOne({ _id: id }).lean();
    return { success: true, jobs: { ...job, ...stats } };
}

async function deleteJob(id) {
    await Job.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updateJob(data) {
    const job = await Job.findById(data.id);
    // validate
    if (job) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            job[x] =  data.new[x]
        })
        await job.save();
    }
}

async function createJobsApply(contents) {
    const jobsapply = new JobsApply(contents);
    await jobsapply.save();

    var pst = await User.findById(contents.uid).select('-hash').lean();

    var contents = {
        uid: contents.uid,
        title: pst.first_name+" "+pst.last_name,
        name: "Your application for the job has been submitted successfully",
    }

    await notific(contents);

    return { success: true, message: "Job Applied Successfully" };
}

async function getAllJobsApplys() {
    return await JobsApply.find().select('-hash');
}

async function getJobsApplyById(id) {
    const jobsapply = await JobsApply.find({uid: id}).select('-hash').lean();
    var arr = []
    if (jobsapply.length==0)
        return { success: false, message: "Jobs Apply not found" };
    else
    {
        for(var i = 0; i<jobsapply.length; i++)
        {
            var job = await AthleteJob.find({_id: jobsapply[i].id}).select('-hash').lean()
            arr.push(job[0])
        }
        return { success: true, arr };
    }
}

async function getJobsApplyById(id) {
    const jobsapply = await JobsApply.find({uid: id}).select('-hash').lean();
    var arr = []
    if (jobsapply.length==0)
        return { success: false, message: "Jobs Apply not found" };
    else
    {
        for(var i = 0; i<jobsapply.length; i++)
        {
            var job = await AthleteJob.find({_id: jobsapply[i].id}).select('-hash').lean()
            arr.push(job[0])
        }
        return { success: true, arr };
    }
}

async function deleteJobsApply(id) {
    await JobsApply.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updateJobsApply(data) {
    const jobsapply = await JobsApply.findById(data.id);
    // validate
    if (jobsapply) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            jobsapply[x] =  data.new[x]
        })
        await jobsapply.save();
    }
}

async function createJobsSave(contents) {
    const jobsSave = new JobsSave(contents);
    await jobsSave.save();

    var pst = await User.findById(contents.uid).select('-hash').lean();

    var contents = {
        uid: pst.uid,
        title: pst.first_name+" "+pst.last_name,
        name: "Job has been saved successfully",
    }

    await notific(contents);

    return { success: true, message: "JobsSave Added Successfully" };
}

async function getAllJobsSaves() {
    return await JobsSave.find().select('-hash');
}

async function getJobsSaveById(id) {
    const jobsSave = await JobsSave.findById(id).select('-hash').lean();
    if (!jobsSave)
    return { error: true, message: "JobsSave not found" };
    else
    {
        // const 
        return { success: true, jobsSaves: jobsSave }
    }
}

async function getJobsSaveByUId(id) {
    const jobsSave = await JobsSave.find({uid : id}).select('-hash').lean();
    var camp = []
    if (!jobsSave)
    return { success: false, message: "JobsSave not found" };
    else
    { 
        for(var i = 0; i<jobsSave.length; i++)
        {
            var job = await AthleteJob.find({_id: jobsSave[i].id}).select('-hash').lean()
            camp.push(job[0])
        }
        return { success: true, camp };
    }
}

async function deleteJobsSave(id) {
    await JobsSave.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updateJobsSave(data) {
    const jobssave = await JobsSave.findById(data.id);
    // validate
    if (jobssave) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            jobssave[x] =  data.new[x]
        })
        await jobssave.save();
    }
}

async function createConnect(contents) {
    const connect = new Connect(contents);
    await connect.save();

    var pst = await User.findById(contents.uid).select('-hash').lean();

    var contents = {
        uid: contents.uid,
        title: pst.first_name+" "+pst.last_name,
        name: "Your connection has been sent",
    }

    await notific(contents);

    return { success: true, message: "Connect Added Successfully" };
}

async function getAllConnects() {
    return await Connect.find().select('-hash');
}

async function getConnectById(id) {
    const connect = await Connect.find({uid: id}).select('-hash').lean();
    if (!connect)
    {
        var arr = []
        for(var i = 0; i<connect.length; i++)
        {
            var dat = await Post.find({_id: connect[i].id}).select('-hash').lean();
            var userr = await User.find({_id: dat[i].uid}).select('-hash').lean();
            arr.push(userr[0])
        }
        return { success: true, arr }
    }
    else
    {
        return { success: false, message: "Not found" };
    }
}

async function deleteConnect(id) {
    await Connect.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updateConnect(data) {
    const connect = await Connect.findById(data.id);
    // validate
    if (connect) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            connect[x] =  data.new[x]
        })
        await connect.save();
    }
}

async function createCampaign(contents) {
    const campaign = new Campaign(contents);
    await campaign.save();

    var pst = await User.findById(contents.uid).select('-hash').lean();

    var contents = {
        uid: contents.uid,
        title: pst.first_name+" "+pst.last_name,
        name: "Your campaign has been created successfully",
    }

    await notific(contents);

    return { success: true, message: "campaign Added Successfully" };
}

async function getAllCampaigns() {
    return await Campaign.find().select('-hash').sort({createdDate: -1});
}

async function getAllCampaignsById(id) {
    const camps = await Campaign.find().select('-hash').sort({createdDate: -1});
    var arr = []
    for(var i = 0; i<camps.length; i++)
    {
        var join = []
        var save = []

        join = await CampaignAction.find({uid: id, ids: camps[i]._id}).select('-hash');
        save = await CampaignSave.find({uid: id, id: camps[i]._id}).select('-hash');

        arr.push({
            _id: camps[i]._id,
            uid: camps[i].uid,
            image: camps[i].image,
            title: camps[i].title,
            location: camps[i].location,
            start_date: camps[i].start_date,
            end_date: camps[i].end_date,
            venue: camps[i].venue,
            host_name: camps[i].host_name,
            email: camps[i].email,
            description: camps[i].description,
            eligible_sports: camps[i].eligible_sports,
            about: camps[i].about,
            joined: join.length!=0 ? true : false,
            saved: save.length!=0 ? true : false,
            saveid: save.length!=0 ? save[0]._id : '',
            createdDate: camps[i].createdDate
        })
    }
    return { success: true, arr };
}

async function getCampaignById(id) {
    const campaign = await Campaign.findById(id).select('-hash').lean();
    if (!campaign)
    return { error: true, message: "Campaign not found" };
    const stats = await Campaign.findOne({ _id: id }).lean();
    return { success: true, campaigns: { ...campaign, ...stats } };
}

async function getCampaignUser(id) {
    const campaign = await Campaign.findById(!id).select('-hash').lean();
    if (!campaign)
    return { error: true, message: "Campaign not found" };
    // const stats = await Campaign.findOne({ _id: id }).lean();
    return { success: true, campaign };
}

async function deleteCampaign(id) {
    await Campaign.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updateCampaign(data) {
    const campaign = await Campaign.findById(data.id);
    // validate
    if (campaign) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            campaign[x] =  data.new[x]
        })
        await campaign.save();
    }
}

async function createCampaignAction(contents) {
    const campaignAction = new CampaignAction(contents);
    await campaignAction.save();

    var pst = await User.findById(contents.uid).select('-hash').lean();

    var contents = {
        uid: contents.uid,
        title: pst.first_name+" "+pst.last_name,
        name: "You have joined the campaign",
    }

    await notific(contents);

    return { success: true, message: "campaign Added Successfully" };
}

async function getAllCampaignActions() {
    const campaign = await CampaignAction.find().select('-hash');
    var data = [];
    for(var i = 0; i<campaign.length; i++)
    {
        var user = await User.find({_id : campaign[i].uid}).select('-hash'); 
        var camp = await Campaign.find({_id : campaign[i].ids}).select('-hash');
        data.push({
            user_details: user[0],
            campaign_details: camp[0],
            _id: campaign[i]._id,
            uid: campaign[i].uid,
            ids: campaign[i].ids,
            createdDate: campaign[i].createdDate,
            __v: campaign[i].__v,
            id: campaign[i].id
        })
    }
    return { success: true, data };
}

async function getCampaignActionById(id) {
    const campaignAction = await CampaignAction.findById(id).select('-hash').lean();
    if (!campaignAction)
    return { error: true, message: "Campaign not found" };
    // const stats = await Campaign.findOne({ _id: id }).lean();
    else
    return { success: true, campaignAction };
}

async function getCampaignActionByUserId(id) {
    const campaignAction = await CampaignAction.find({uid: id}).select('-hash').lean();

    var camp = [] 
    if (!campaignAction)
        return { success: false, message: "Campaign not found" };
    else
    {
        for(var i = 0; i<campaignAction.length; i++)
        {
            var pushings = await Campaign.find({_id: campaignAction[i].ids}).select('-hash').lean()
            camp.push(pushings[0])
        }
        return { success: true, camp };
    }

}

async function deleteCampaignAction(id) {
    await CampaignAction.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updateCampaignAction(data) {
    const campaignAction = await CampaignAction.findById(data.id);
    // validate
    if (campaignAction) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            campaignAction[x] =  data.new[x]
        })
        await campaignAction.save();
    }
}

async function createCampaignSave(contents) {
    const campaignSave = new CampaignSave(contents);
    await campaignSave.save();

    var pst = await User.findById(contents.id).select('-hash').lean();

    var contents = {
        uid: contents.uid,
        title: pst.first_name+" "+pst.last_name,
        name: "Campaign has been saved",
    }

    await notific(contents);

    return { success: true, message: "campaign Added Successfully" };
}

async function getAllCampaignSaves() {
    const campaign = await CampaignSave.find().select('-hash');
    var data = [];
    for(var i = 0; i<campaign.length; i++)
    {
        var user = await User.find({_id : campaign[i].uid}).select('-hash'); 
        var camp = await Campaign.find({_id : campaign[i].ids}).select('-hash');
        data.push({
            user_details: user[0],
            campaign_details: camp[0],
            _id: campaign[i]._id,
            uid: campaign[i].uid,
            ids: campaign[i].ids,
            createdDate: campaign[i].createdDate,
            __v: campaign[i].__v,
            id: campaign[i].id
        })
    }
    return { success: true, data };
}

async function getCampaignSaveById(id) {
    const campaignSave = await CampaignSave.findById(id).select('-hash').lean();
    if (!campaignSave)
    return { error: true, message: "Campaign not found" };
    // const stats = await Campaign.findOne({ _id: id }).lean();
    else
    {
        const camp = await Campaign.find({_id: campaignSave.id}).select('-hash').lean()
        return { success: true, camp };
    }
}

async function getCampaignSaveByUId(id) {
    const campaignSave = await CampaignSave.find({uid: id}).select('-hash').lean();
    var camp = [] 
    if (!campaignSave)
        return { error: true, message: "Campaign not found" };
    else
    {
        for(var i = 0; i<campaignSave.length; i++)
        {
            var pushing = await Campaign.find({_id: campaignSave[i].id}).select('-hash').lean()
            pushing[0]['saveid'] = campaignSave[i]._id
            camp.push(pushing[0])
        }
        return { success: true, camp };
    }
}

async function deleteCampaignSave(id) {
    await CampaignSave.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updateCampaignSave(data) {
    const campaignSave = await CampaignSave.findById(data.id);
    // validate
    if (campaignSave) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            campaignSave[x] =  data.new[x]
        })
        await campaignSave.save();
    }
}

async function createSport(contents) {
    const sports = new Sports(contents);
    await sports.save();
    return { success: true, message: "Sports Added Successfully" };
}

async function getAllSports() {
    return await Sports.find().select('-hash');
}

async function getSportById(id) {
    const sports = await Sports.findById(id).select('-hash').lean();
    if (!sports)
        return { success: false, message: "Sports not found" };
    else
        return { success: true, sports };
}

async function getSportsWithDatas(id) {
    const sport =  await Sports.find({_id: id}).select('-hash');
    const sport1 = await SportsVideos.find({sports_id: id}).select('-hash');
    const sport2 = await SportsVideoInfo.find({sports_id: id}).select('-hash');
    const sport3 = await SportsVideoInfos.find({sports_id: id}).select('-hash');
    return { success: true, data: {sport: sport[0], subsport: sport1, subsport1: sport2, subsport2: sport3}};
}

async function getSportsWithVideo() {
    const sport =  await Sports.find().select('-hash');
    var arr = []
    for(var i = 0; i<sport.length; i++)
    {
        var sport1 = await SportsVideos.find({sports_id: sport[i]._id}).select('-hash');
        var sport2 = await SportsVideoInfo.find({sports_id: sport[i]._id}).select('-hash');
        var sport3 = await SportsVideoInfos.find({sports_id: sport[i]._id}).select('-hash');
        var arr1 = []
        var arr2 = []
        var arr3 = []
        for(var j = 0; j<sport1.length; j++)
        {
            arr1.push(sport1[j].video)
        }
        for(var k = 0; k<sport2.length; k++)
        {
            arr2.push(sport2[k].video)
        }
        for(var h = 0; h<sport3.length; h++)
        {
            arr3.push(sport3[h].video)
        }
       
        var arr4 = arr1.concat(arr2, arr3);
        
        arr.push({
            sports: sport[i],
            videos: arr4
        })
    }
    
    return { success: true, arr};
}

async function deleteSport(id) {
    await Sports.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updateSport(data) {
    const sport = await Sports.findById(data.id);
    // validate
    if (sport) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            sport[x] =  data.new[x]
        })
        await sport.save();
    }
}

async function createSportsVideo(contents) {
    const sportsvideos = new SportsVideos(contents);
    await sportsvideos.save();
    return { success: true, message: "Sports Videos Added Successfully" };
}

async function getAllSportsVideos(id) {
    return await SportsVideos.find({sports_id: id}).select('-hash');
}

async function getSportsVideoById(id) {
    const sportsvideos = await SportsVideos.findById(id).select('-hash').lean();
    if (!sportsvideos)
        return { success: false, message: "Sports Videos not found" };
    else
        return { success: true, sportsvideos };
}

async function deleteSportsVideo(id) {
    await SportsVideos.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updateSportsVideo(data) {
    const sportsvideos = await SportsVideos.findById(data.id);
    // validate
    if (sportsvideos) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            sportsvideos[x] =  data.new[x]
        })
        await sportsvideos.save();
    }
}

async function createSportsVideoInfo(contents) {
    const sportsvideosinfo = new SportsVideoInfo(contents);
    await sportsvideosinfo.save();
    return { success: true, message: "Sports Video Info Added Successfully" };
}

async function getAllSportsVideoInfos(id) {
    return await SportsVideoInfo.find({season_id: id}).select('-hash');
}

async function getSportsVideoInfoById(id) {
    const sportsvideosinfo = await SportsVideoInfo.findById(id).select('-hash').lean();
    if (!sportsvideosinfo)
        return { error: true, message: "Sports Video Info not found" };
    else
        return { success: true, sportsvideosinfo };
}

async function deleteSportsVideoInfo(id) {
    await SportsVideoInfo.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updateSportsVideoInfo(data) {
    const sportsvideosinfo = await SportsVideoInfo.findById(data.id);
    // validate
    if (sportsvideosinfo) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            sportsvideosinfo[x] =  data.new[x]
        })
        await sportsvideosinfo.save();
    }
}

async function createSportsVideoInfos(contents) {
    const sportsvideosinfo = new SportsVideoInfos(contents);
    await sportsvideosinfo.save();
    return { success: true, message: "Sports Video Info Added Successfully" };
}

async function getAllSportsVideoInfoss(id) {
    return await SportsVideoInfos.find({sub_id: id}).select('-hash');
}

async function getSportsVideoInfosById(id) {
    const sportsvideosinfo = await SportsVideoInfos.findById(id).select('-hash').lean();
    if (!sportsvideosinfo)
        return { success: false, message: "Sports Video Info not found" };
    else
        return { success: true, sportsvideosinfo };
}

async function deleteSportsVideoInfos(id) {
    await SportsVideoInfos.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updateSportsVideoInfos(data) {
    const sportsvideosinfo = await SportsVideoInfos.findById(data.id);
    // validate
    if (sportsvideosinfo) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            sportsvideosinfo[x] =  data.new[x]
        })
        await sportsvideosinfo.save();
    }
}

async function createSchedule(contents) {
    const schedule = new Schedule(contents);
    await schedule.save();
    return { success: true, message: "Schedule Video Info Added Successfully" };
}

async function getAllSchedules() {
    return await Schedule.find().select('-hash');
}

async function getScheduleById(id) {
    const schedule = await Schedule.findById(id).select('-hash').lean();
    if (!schedule)
    return { error: true, message: "Schedule Video Info not found" };
    const stats = await Schedule.findOne({ _id: id }).lean();
    return { success: true, schedule: { ...schedule, ...stats } };
}

async function deleteSchedule(id) {
    await Schedule.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updateSchedule(data) {
    const schedule = await Schedule.findById(data.id);
    // validate
    if (schedule) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            schedule[x] =  data.new[x]
        })
        await schedule.save();
    }
}

async function createSpecialization(contents) {
    const specialization = new Specialization(contents);
    await specialization.save();
    return { success: true, message: "Specialization Video Info Added Successfully" };
}

async function getAllSpecializations() {
    return await Specialization.find().select('-hash');
}

async function getSpecializationById(id) {
    const specialization = await Specialization.findById(id).select('-hash').lean();
    if (!specialization)
    return { error: true, message: "Specialization Video Info not found" };
    const stats = await Specialization.findOne({ _id: id }).lean();
    return { success: true, specialization: { ...specialization, ...stats } };
}

async function deleteSpecialization(id) {
    await Specialization.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updateSpecialization(data) {
    const specialization = await Specialization.findById(data.id);
    // validate
    if (specialization) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            specialization[x] =  data.new[x]
        })
        await specialization.save();
        return { success: true, message: "Updated Successfully" };
    }
    else
    {
        return { success: false, message: "Not Found" };
    }
}

async function createTopSpecialization(contents) {
    const topspecialization = new TopSpecialization(contents);
    await topspecialization.save();
    return { success: true, message: "Top Specialization Video Info Added Successfully" };
}

async function getAllTopSpecializations() {
    return await TopSpecialization.find().select('-hash');
}

async function getTopSpecializationById(id) {
    const topspecialization = await TopSpecialization.findById(id).select('-hash').lean();
    if (!topspecialization)
    return { error: true, message: "Top Specialization Info not found" };
    // const stats = await Specialization.findOne({ _id: id }).lean();
    return { success: true, topspecialization };
}

async function deleteTopSpecialization(id) {
    await TopSpecialization.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updateTopSpecialization(data) {
    const topspecialization = await TopSpecialization.findById(data.id);
    // validate
    if (topspecialization) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            topspecialization[x] =  data.new[x]
        })
        await topspecialization.save();
    }
}

async function createAppointment(contents) {
    const appointment = new Appointment(contents);
    await appointment.save();

    // var pst = await Post.findById(contents.id).select('-hash').lean();

    var contents = {
        uid: contents.uid,
        title: contents.name,
        name: "Your appointment has been booked",
    }

    await notific(contents);

    return { success: true, message: "Appointment Info Added Successfully", appointmentid: appointment._id };
}

async function getAllAppointments() {
    return await Appointment.find().select('-hash');
}

async function getAppointmentById(id) {
    const appointment = await Appointment.findById(id).select('-hash').lean();
    if (!appointment)
    return { error: true, message: "Appointment Info not found" };
    // const stats = await Appointment.findOne({ _id: id }).lean();
    return { success: true, appointment: { appointment } };
}

async function getAppointmentByUserId(id) {
    const appointment = await Appointment.find({uid: id}).select('-hash').lean();
    if (!appointment)
    return { error: true, message: "Appointment Info not found" };
    // const stats = await Appointment.findOne({ _id: id }).lean();
    return { success: true, appointment };
}

async function deleteAppointment(id) {
    await Appointment.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updateAppointment(data) {
    const appointment = await Appointment.findById(data.id);
    // validate
    if (appointment) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            appointment[x] =  data.new[x]
        })
        await appointment.save();
    }

    return { success: true, message:"Successfully Updated" };
}

async function createPayment(contents) {
    const payment = new Payment(contents);
    await payment.save();
    return { success: true, message: "Payment Info Added Successfully" };
}

async function getAllPayments() {
    return await Payment.find().select('-hash');
}

async function getPaymentById(id) {
    const payment = await Payment.findById(id).select('-hash').lean();
    if (!payment)
    return { error: true, message: "Payment Info not found" };
    const stats = await Payment.findOne({ _id: id }).lean();
    return { success: true, payment: { ...payment, ...stats } };
}

async function deletePayment(id) {
    await Payment.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updatePayment(data) {
    const payment = await Payment.findById(data.id);
    // validate
    if (payment) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            payment[x] =  data.new[x]
        })
        await payment.save();
    }
}

async function createPatient(contents) {
    const patient = new Patient(contents);
    await patient.save();
    return { success: true, message: "Patient Info Added Successfully" };
}

async function getAllPatients() {
    return await Patient.find().select('-hash');
}

async function getPatientById(id) {
    const patient = await Patient.findById(id).select('-hash').lean();
    if (!patient)
    return { error: true, message: "Patient Info not found" };
    const stats = await Patient.findOne({ _id: id }).lean();
    return { success: true, patient: { ...patient, ...stats } };
}

async function deletePatient(id) {
    await Patient.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updatePatient(data) {
    const patient = await Patient.findById(data.id);
    // validate
    if (patient) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            patient[x] =  data.new[x]
        })
        await patient.save();
    }
}

async function createReview(contents) {
    const review = new Review(contents);
    await review.save();

    var pst = await User.findById(contents.uid).select('-hash').lean();

    var contents = {
        uid: contents.uid,
        title: pst.first_name+" "+pst.last_name,
        name: "Your riview has been submitted",
    }

    await notific(contents);

    return { success: true, message: "Review Info Added Successfully" };
}

async function getAllReviews() {
    return await Review.find().select('-hash');
}

async function getReviewById(id) {
    const review = await Review.findById(id).select('-hash').lean();
    if (!review)
    return { error: true, message: "Review Info not found" };
    const stats = await Review.findOne({ _id: id }).lean();
    return { success: true, review: { ...review, ...stats } };
}

async function deleteReview(id) {
    await Review.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updateReview(data) {
    const review = await Review.findById(data.id);
    // validate
    if (review) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            review[x] =  data.new[x]
        })
        await review.save();
    }
}

async function createWishlist(contents) {
    const wishlist = new Wishlist(contents);
    await wishlist.save();
    return { success: true, message: "Wishlist Info Added Successfully" };
}

async function getAllWishlists() {
    return await Wishlist.find().select('-hash');
}

async function getWishlistById(id) {
    const wishlist = await Wishlist.findById(id).select('-hash').lean();
    if (!wishlist)
    return { error: true, message: "Wishlist Info not found" };
    const stats = await Wishlist.findOne({ _id: id }).lean();
    return { success: true, wishlist: { ...wishlist, ...stats } };
}

async function deleteWishlist(id) {
    await Wishlist.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updateWishlist(data) {
    const wishlist = await Wishlist.findById(data.id);
    // validate
    if (wishlist) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            wishlist[x] =  data.new[x]
        })
        await wishlist.save();
    }
}

async function createJobAction(contents) {
    const jobaction = new JobAction(contents);
    await jobaction.save();
    return { success: true, message: "Job Action Info Added Successfully" };
}

async function getAllJobActions() {
    return await JobAction.find().select('-hash');
}

async function getJobActionById(id) {
    const jobaction = await JobAction.findById(id).select('-hash').lean();
    if (!jobaction)
    return { error: true, message: "JobAction Info not found" };
    const stats = await JobAction.findOne({ _id: id }).lean();
    return { success: true, jobaction: { ...jobaction, ...stats } };
}

async function deleteJobAction(id) {
    await JobAction.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updateJobAction(data) {
    const jobAction = await JobAction.findById(data.id);
    // validate
    if (jobAction) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            jobAction[x] =  data.new[x]
        })
        await jobAction.save();
    }
}

async function createSupport(contents) {
    const supports = new Supports(contents);
    await supports.save();

    var pst = await User.findById(contents.id).select('-hash').lean();

    var contents = {
        uid: contents.id,
        title: pst.first_name+" "+pst.last_name,
        name: "Your ticket has been raised",
    }

    await notific(contents);

    return { success: true, message: "Supports Added Successfully" };
}

async function getAllSupports() {
    const supports = await Supports.find().select('-hash');
    var data = []
    for(var i = 0; i<supports.length; i++)
    {
        var user = await User.find({_id : supports[i].uid}).select('-hash');
        data.push({
            _id: supports[i]._id,
            uid: supports[i].uid,
            user_details: user[0],
            message: supports[i].message,
            status: supports[i].status,
            createdDate: supports[i].createdDate,
        })
    }
    return { success: true, data };
}

async function getSupportById(id) {
    var data = [];
    const supports = await Supports.findById(id).select('-hash').lean();
    if (!supports)
    return { error: true, message: "Supports Info not found" };
    // const stats = await supports.findOne({ _id: id }).lean();
    var user = await User.find({_id : supports.uid}).select('-hash');
    data.push({
        uid: supports.uid,
        user_details: user[0],
        message: supports.message,
        status: supports.status,
        createdDate: supports.createdDate,
    })
    return { success: true, data };
}

async function deleteSupport(id) {
    await Supports.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updateSupport(data) {
    const supports = await Supports.findById(data.id);
    // validate
    if (supports) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            supports[x] =  data.new[x]
        })
        await supports.save();
    }
}