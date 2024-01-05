const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const { sendMail, sendMessages } = require('../utilities');
const {Expo} =  require("expo-server-sdk")
const User = db.User;
const Requests = db.Requests;
const Chat = db.Chat;
const DoctorChat = db.DoctorChat;
const Stats = db.Stats;
const Doctors = db.Doctors;
const city = require('./cities');

module.exports = {
    authenticate,
    doctorAuthenticate,
    getAll,
    getAllExperts,
    getAllDoctor,
    getById,
    create,
    doctorCreate,
    update,
    delete: _delete,
    activate,
    getCities,
    acceptRequest,
    sendRequest,
    deleteRequest,
    getRequests,
    sendMessage,
    getMessages,
    getAllWithId,
    forgotPassword,
    updateMessage,
    addAddress,
    sendMails,
    testings,
    logout,
    changePassword,
    editProfile,
    editDoctorProfile,
    deleteDoctor,
    getUserMessages
};

async function sendRequest(id,fid, type){
    const checkRequest = await Requests.findOne({$or: [{uid: id, fid: fid},{uid: fid, fid: id}]});
    console.log(checkRequest)
    if(checkRequest && type == "delete"){
        await Requests.findByIdAndRemove(checkRequest._id);
        return {success: true};
    }

    if(!checkRequest && type == "add"){
        const request = new Requests({
            uid: id,
            fid: fid,
            accepted: true
        });
        await request.save();
        return {success: true};
    }
}

async function deleteRequest(id) {
    await Requests.findByIdAndRemove(id);
}

async function acceptRequest(id) {
    console.log(id);
    const request = await Requests.findById(id);
    // validate
    if (request) {
        Object.assign(request, {
            accepted: true,
            uid: request.uid,
            fid: request.fid
        });
        await request.save();
    }
}

async function addAddress(data) {
    console.log(id);
    const user = await User.findById(data.id);
    // validate
    if (user) {
        Object.assign(user, {address: data.add});
        await user.save();
    }
}

async function getRequests(id){
    const users = await Requests.find({fid: id, accepted: { $ne: true }}).select().lean();
    const loggedInUser = await User.findById(id);
    var usersList = [];
    var user = {};

    for(var i=0; i<users.length; i++){
        user = await User.findById(users[i].uid).lean();
        user.request_id = users[i]._id;
        if(user){
            usersList.push(user);
        }
    }

    return usersList;
}

async function sendMessage(chat){
    if(chat.who=='doctor')
    {
        const message = new DoctorChat(chat);
        await message.save();
        return {success: true, messages: "Message sent successfully"};
    }
    else if(chat.who=='jobs')
    {
        const message = new Chat(chat);
        await message.save();
        return {success: true, messages: "Message sent successfully"};
    }
}

async function getCities(){
    console.log(city,"CCCCCCCCCCCCCCCCCCC")
    const response = {};
    response.cities = city;
    response.success = true;
    return response
}

async function getMessages(id, rec_id, who){
    if(who=='jobs')
    {
        const messages = await Chat.find({$or: [{from: id, to: rec_id},{to: id, from: rec_id}]}).sort({createdAt: 1}).lean();
        return {success: true, messages};
    }
    else if(who=='doctor')
    {
        const messages = await DoctorChat.find({$or: [{from: id, to: rec_id},{to: id, from: rec_id}]}).sort({createdAt: 1}).lean();
        return {success: true, messages};
    }
}

async function getUserMessages(id, who){
    
    if(who=='jobs')
    {
        const messages = await Chat.find({$or: [{from: id},{to: id}]}).sort({createdAt: 1}).lean();
        var data = [];
        for(var i = 0; i<messages.length; i++)
        {
            if(messages[i].to==id)
            {
                var frut = await User.find({_id: messages[i].from}).sort({createdAt: 1}).lean()
                data.push(frut[0]);
            }
            else if(messages[i].from==id)
            {
                var frut = await User.find({_id: messages[i].to}).sort({createdAt: 1}).lean()
                data.push(frut[0]);
            }
            
        }
        return {success: true, data};
    }
    else if(who=='doctor')
    {
        const messages = await DoctorChat.find({$or: [{from: id},{to: id}]}).sort({createdAt: 1}).lean();
        var data = [];
        for(var i = 0; i<messages.length; i++)
        {
            if(messages[i].to==id)
            {
                var frut = await User.find({_id: messages[i].from}).sort({createdAt: 1}).lean()
                data.push(frut[0]);
            }
            else if(messages[i].from==id)
            {
                var frut = await User.find({_id: messages[i].to}).sort({createdAt: 1}).lean()
                data.push(frut[0]);
            }
            
        }
        return {success: true, data};
    }
        
    
}

async function updateMessage(data){
    const messages = await Chat.find({$or: [{from: data.from, to: data.to},{to: data.from, from: data.to}]}).sort({createdAt: 1}).lean();

    for(var i = 0; i<messages.length;i++){
        if(messages[i].message.includes("true","latitude","longitude"))
        {
            console.log(messages[i]._id);
            Chat.findByIdAndRemove(messages[i]._id, function (err, docs) {
                if (err){
                    console.log(JSON.stringify(err))
                }
                else{
                    console.log("Removed Chat : ", JSON.stringify(docs));
                    const message = new Chat(data);
                    message.save();
                }
            });
        }
    }

    const expo = new Expo({ accessToken: "22ycIMONJKwQjKst7SYMliHTR9gpTftL1IWfFmff" });
		const chunks = expo.chunkPushNotifications([{ to: data.toid, data: {message: data.message}, title: data.fromname+" "+data.status+" Your Challenge", body:msg.message, badge:1 }]);
		console.log(chunks)
		const tickets = [];
		for (const chunk of chunks) {
			try {
				const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
				console.log(ticketChunk)
				tickets.push(...ticketChunk);
			} catch (error) {
				console.error(error);
			}
		}
		let response = "";
		for (const ticket of tickets) {
			if (ticket.status === "error") {
				if (ticket.details && ticket.details.error === "DeviceNotRegistered") {
					response = "DeviceNotRegistered";
				}
			}
			if (ticket.status === "ok") {
				response = ticket.id;
			}
		}

    return {success: true};
}

async function authenticate({ email, password }) {
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.hash)) {
        var data = {active: true}
        let keys = Object.keys(data)
        keys.map(x=>{
            user[x] =  data[x]
        })
        await user.save();
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token, success: true
        };
    }
    else
    {
        return {success: false, message: "Invailid password or Email"}
    }
}

async function doctorAuthenticate({ email, password }) {
    const doctor = await Doctors.findOne({ email });
    if (doctor && bcrypt.compareSync(password, doctor.hash)) {
        var data = {active: true}
        let keys = Object.keys(data)
        keys.map(x=>{
            doctor[x] =  data[x]
        })
        await doctor.save();
        const { hash, ...doctorWithoutHash } = doctor.toObject();
        const token = jwt.sign({ sub: doctor.id }, config.secret);
        return {
            ...doctorWithoutHash,
            token, success: true
        };
    }
    else
    {
        return {success: false, message: "Invailid password or Email"}
    }
}

async function logout({ email }) {
    const user = await User.findOne({ email });
    if (user) {
        var data = {active: false}
        let keys = Object.keys(data)
        keys.map(x=>{
            user[x] =  data[x]
        })
        await user.save();
        return {success: true, message: "Logged Out Successfully !!!"};
    }

    throw 'Invalid email or password';
}

async function editProfile(data) {
    const user = await User.findById(data.id);

    // const news = typeof data.new=='string' ? JSON.parse(data.new) : data.new

    if(typeof data.new=='string')
    {
        news = JSON.parse(data.new)
    }
    else if(typeof data.new=='object')
    {
        news = data.new
    }
    if (user) {
        let keys = Object.keys(news)
        keys.map(x=>{
            user[x] = news[x]
        })
        await user.save();
        return {success: true, message: "Profile Edited Successfully !!!"};
    }
    else
    {
        return {success: false, message: "Invalid email or password"}
    }
}

async function editDoctorProfile(data) {
    const doctor = await Doctors.findById(data.id);
    if(typeof data.new=='string')
    {
        news = JSON.parse(data.new)
    }
    else if(typeof data.new=='object')
    {
        news = data.new
    }
    if (doctor) {
        let keys = Object.keys(news)
        keys.map(x=>{
            doctor[x] = news[x]
        })
        await doctor.save();
        return {success: true, message: "Profile Edited Successfully !!!"};
    }
    else
    {
        return {success: false, message: "Invalid email or password"}
    }
}

async function changePassword(userParam) {
    const user = await User.findOne({email : userParam.email});
    if(user)
    {
        if (user && bcrypt.compareSync(userParam.password, user.hash))
        {
            user.hash = bcrypt.hashSync(userParam.newpassword, 10);
            await user.save();
            return {success: true, message: "Password Changed Successfully"};
        }
        else
        {
            return {success: false, message: "Incorrect Password"};
        }
    }
    else
    {
        return {success: false, message: "Incorrect Email"};
    }
}

async function getAll() {
    return await User.find().select('-hash');
}

async function getAllExperts() {
    const users = await User.find().select('-hash');
    var arr = [];
    for(var i = 0; i<users.length; i++)
    {
        if(users[i].role=='expert')
        {
            arr.push(users[i])
        }
    }
    return {success: true, arr}
}

async function getAllDoctor() {
    return await Doctors.find().select('-hash');
}

async function getAllWithId(id) {
    var users = await User.find({ _id: { $ne: id } }).select('-hash').lean();
    var loggedInUser = await User.findById(id).select('-hash');
    var distance = 0;
    var userList = [];
    var checkRequest;

    for(var i=0; i<users.length; i++){
        checkRequest = await Requests.findOne({$or: [{uid: users[i]._id, fid: id},{uid: id, fid: users[i]._id}]});

        if(!checkRequest){
            userList.push(users[i]);
        }        
    }

    return userList;
}

async function getById(id) {
    const user = await User.findById({_id: id}).select('-hash').lean();
    if(!user) return {error: true, message: "User not found"};
    
    const stats = await Stats.findOne({userId: id}).lean();
    return {success: true, user: {...user}};
}

async function create(userParam) {
    // validate
    if (await User.findOne({ email: userParam.email })) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    const user = new User(userParam);
    if (userParam.password)
    user.hash = bcrypt.hashSync(userParam.password, 10);
    const savedUser = await user.save();
    await (new Stats({userId: savedUser._id})).save();

    return {success: true, message: "User sign up successfull"};
}

async function doctorCreate(doctorParam) {
    // validate
    if (await Doctors.findOne({ email: doctorParam.email })) {
        throw 'Email "' + doctorParam.email + '" is already taken';
    }

    const doctor = new Doctors(doctorParam);
    if (doctorParam.password)
    doctor.hash = bcrypt.hashSync(doctorParam.password, 10);
    const savedDoctor = await doctor.save();
    await (new Stats({doctorId: savedDoctor._id})).save();

    return {success: true, message: "Doctor sign up successfull"};
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function forgotPassword(usero) {
    const user = await User.findOne({email: usero.email});
    var userParam = {};

    userParam.password = Math.floor(100000 + Math.random() * 900000).toString();

    if (!user) throw 'User not found';
    userParam.hash = bcrypt.hashSync(userParam.password, 10);

    Object.assign(user, userParam);
    sendMail(usero.email, userParam.password);
    await user.save();
}

async function sendMails(usero) {
    sendMessages(usero.email, userParam.code);
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}

async function deleteDoctor(id) {
    await Doctors.findByIdAndRemove(id);
    return {success: true, message: "Doctor Deleted successfull"};
}

async function activate(id, userParam) {
    const user = await User.findById(id);
    // validate
    if (!user) throw 'User not found';
    user.active = !user.active;

    await user.save();
}

async function testings() {
    console.log("Logggg");
}
