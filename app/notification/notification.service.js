const db = require('_helpers/db');
const Notification = db.Notification;
const Support = db.Support;

module.exports = {
    createNotification,
    getAllNotification,
    getNotificationById,
    deleteNotification,
    updateNotification,
};

async function createNotification(contents) {
    const notification = new Notification(contents);
    await notification.save();
    return { success: true, message: "Notification Added Successfully" };
}

async function getAllNotification() {
    return await Notification.find().select('-hash');
}

async function getNotificationById(id) {
    const notification = await Notification.findById(id).select('-hash').lean();
    if (!notification)
        return { error: true, message: "Notification not found" };
    const stats = await Notification.findOne({ _id: id }).lean();
    return { success: true, notification: { ...notification, ...stats } };
}

async function deleteNotification(id) {
    await Notification.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updateNotification(data) {
    // console.log(id);
    const notification = await Notification.findById(data.id);
    // validate
    if (notification) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            notification[x] =  data.new[x]
        })
        await notification.save();
    }
}

async function updateCMSById(data) {
    // console.log(id);
    const cms = await CMS.findById(data.id);
    
    // validate
    if (cms) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            cms[x] =  data.new[x]
        })
        await cms.save();
    }
}

async function createSupport(contents) {
    const support = new Support(contents);
    await support.save();
    return { success: true, message: "Support Added Successfully" };
}

async function getAllSupport() {
    return await Support.find().select('-hash');
}

async function getSupportById(id) {
    const support = await Support.findById(id).select('-hash').lean();
    if (!support)
        return { error: true, message: "Support not found" };
    const stats = await Support.findOne({ _id: id }).lean();
    return { success: true, support: { ...support, ...stats } };
}

async function deleteSupport(id) {
    await Support.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updateSupport(data) {
    // console.log(id);
    const support = await Support.findById(data.id);
    // validate
    if (support) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            support[x] =  data.new[x]
        })
        await support.save();
    }
}