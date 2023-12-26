const db = require('_helpers/db');
const Chat = db.Chat;
// const {admin} = require("../../firebase-config")

module.exports = io => socket => {
    console.log("Made socket connection", socket.id, );
    socket.on("message", async(msg) => {
        console.log(msg);
        io.emit("message", msg);
        const message = new Chat(msg);
        await message.save();
    });

    socket.on("disconnect", () => {
        io.emit("user disconnected", socket.userId);
    });
}