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

        var registrationTokens = await User.find({_id: msg.to}).sort({createdAt: 1}).lean()
        var registrationTokens1 = await User.find({_id: msg.from}).sort({createdAt: 1}).lean()

        console.log(registrationTokens1[0].first_name, registrationTokens1[0].last_name, "MMMMMMMMMMMMMMMMMMMMM")

        var payload = {
            notification: {
                title: registrationTokens1[0].first_name + " " + registrationTokens1[0].last_name + " sent you a message",
                body : msg.message
            }
        };
        
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

    });

    socket.on("disconnect", () => {
        io.emit("user disconnected", socket.userId);
    });
}