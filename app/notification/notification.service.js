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