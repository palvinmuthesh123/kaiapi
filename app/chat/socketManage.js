const db = require('_helpers/db');
const Chat = db.Chat;
const User = db.User;
const DoctorChat = db.DoctorChat;
const {admin} = require("../../firebase-config")


module.exports = io => socket => {
    console.log("Made socket connection", socket.id, );
    socket.on("message", async(msg) => {
        console.log(msg);
        io.emit("message", msg);
        if(msg.who=='jobs')
        {
            const message = new Chat(msg);
            await message.save();
        }
        else if(msg.who=='doctor')
        {
            const message = new DoctorChat(msg);
            await message.save();
        }

        // var registrationTokens = [
        //     'tokenFromIosApp'
        // ];

        var registrationTokens = await User.find({_id: msg[i].to}).sort({createdAt: 1}).lean()

        var payload = {
            notification: {
                title: 'Testing',
                body : 'TEST'
            }
        };
        
        admin.messaging().sendToDevice(registrationTokens.deviceid, payload)
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

    });

    socket.on("disconnect", () => {
        io.emit("user disconnected", socket.userId);
    });
}