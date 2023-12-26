const fs = require('fs');
const path = require('path');
const db = require('_helpers/db');
const userService = require('../users/user.service');
const { findDistance } = require('../utilities');
const mm = require('music-metadata');
const util = require('util');
const workout = require('../../_helpers/workout');
const constants = require('./../../_helpers/constants')

const User      = db.User;
const Requests  = db.Requests;
const Resource  = db.Resource;
const Music     = db.Music;

module.exports = {
    getHomeData,
    getNearby,
    getFriends,
    getResources,
    getMusicList,
    getFriendsNearby,
    getUserMusic,
    addMusicOption
};

async function getHomeData({latitude,longitude, uid}) {
    const user = await userService.getById(uid);

    if(user){
        if(latitude && longitude)
            await userService.update(uid, {latitude,longitude});
        
        const response = {};
    
        response.workouts = workout;
        response.music = await getUserMusic(uid);

        response.success = true;
        return response;
    }

    return {error: true, message: 'User not found'};
}

async function getNearby(uid){
    const userResponse = await userService.getById(uid);
    
    if(userResponse.success){
        try{
            const {user} = userResponse;
            let friends = await getFriends(uid);
            //friends = friends.filter(o => o.latitude != null && o.longitude != null);
            const friendIds = friends.map(o => o._id);
            const users = await User.find({ _id: { $ne: uid } }).lean();
            const nearByPeople = users.filter(o => !friendIds.includes(o._id));
            const friendProfiles = await User.find({ _id: { $in: friendIds }}).lean();
            console.log(friendProfiles)
            nearByPeople.forEach(o => {
                o.distance = findDistance(o.latitude,o.longitude,user.latitude,user.longitude);
            });
            friendProfiles.forEach(o => {
                o.distance = findDistance(o.latitude,o.longitude,user.latitude,user.longitude);
            });

            return {friends: friendProfiles, users: nearByPeople, success: true};
        }catch(e){
            console.log(e);
            return {
                error: true, message: JSON.stringify(e)
            }
        }
    }

    return {error: true, message: 'User not found'};
}

async function getFriends(id){
    const userO = await userService.getById(id);

    if(userO){
        const users = await Requests.find({$or: [{uid: id},{fid: id}]});
        var usersList = [];
        var user = {};
        for(var i=0; i<users.length; i++){
            if(users[i].accepted){
                user = users[i];

                if(user.uid == id)
                    user = await User.findById(user.fid).lean();
                else
                    user = await User.findById(user.uid).lean();

                if(user)
                    usersList.push(user);
            }
        }

        return usersList;
    }

    throw 'User not found';
}

async function getResources(){
    return {
        success: true,
        data: [
            {
                uid: 1, title: "Water is Life.", image: `${constants.backendUrl}/static/images/water.png`,
                description: 'We drink it. We wash in it, we’re actually made of it, for the most part. Try living without it!' +
                'Over 70% of earth is covered in water, it is essential to all life.' +
                'Try starting the day with a large glass of water, not only does it rehydrate you and curb your appetite, it also flushes your body of harmful chemicals and toxins that build up.' +
                'Keeping yourself hydrated effects your energy, your mind and nearly every bodily function. In fact, a 5% drop in bodily fluids could cause up to 30% reduction in energy.' +
                'A good rule of thumb is that you should never feel thirsty, this means you are always hydrated.' +
                'Water, Just Drink it!!'
            },{
                uid: 2, title: "Dont B hating on carbs!", image: `${constants.backendUrl}/static/images/carbs.png`,
                description: 'Atkins, Keto, High-protein. There are lots of diets that focus on reducing or eliminating carbs to assist weight loss. But the truth is we need a balanced diet, including carbohydrates.'+
                'Our macro dietary needs are essentially Protein, carbohydrates and Fats.'+
                'The aim should be to consume more complex, unrefined carbs – vegetables, whole grains and rice.  And less simple, refined carbs – processed sweets and fast foods high in sugar.'+
                'Complex carbs, especially vegetables, also provide us with fibre and essential macro-nutrients.'+
                `Complex carbs are great for long lasting, slow release energy and usually sit lower on the GI index, we need these for endless horsepower, you can't hate that!!'`
            },{
                uid: 3, title: "oh Sugar!!", image: `${constants.backendUrl}/static/images/sugar.png`,
                description: 'We’ve all heard the latest on sugar in your diet. In simple terms, sugars are simple carbs that the body converts into glucose for energy, depending on the source, they can negatively impact your weight and general health.'+
                'Whilst fruit is loaded with healthy vitamins and fibre, it is also loaded with fructose (sugar) and calories, especially when juiced. '+
                'Like most things, moderation is the key. Stick to natural forms of sugar as much as possible and eliminate processed and refined sugar as much as possible. Try to consume them early in the day or close to exercise.'+
                'Lollies, soft-drinks and processed foods with added sugar are the enemy.'
            },{
                uid: 4, title: "Hiit - HIGH INTENSITY INTERVAL TRAINING - sound scary?", image: `${constants.backendUrl}/static/images/hiit.png`,
                description: 'HIIT is not a new fitness industry fad. Popularised in the 70’s, HIIT focuses on intensive bursts of output which burn high amounts of calories during, and after working out.'+
                'Higher intensity exercise has the benefit of increasing your metabolism, so you’re burning fat even when you’re not exercising. And because you aren’t subjecting your body to extended endurance sessions, HIIT makes it easier to maintain muscle mass, shorter intensive bursts of energy will more burn more fat than longer, less intensive forms of exercise whilst maintaining muscle mass, getting ripped without losing all your gains.'+
                'Best of all, in today’s time poor world, you get better results in shorter sessions, HIIT is the future!!'
            },{
                uid: 5, title: `Don't be a "Lemon"`, image: `${constants.backendUrl}/static/images/lemon.png`,
                description: 'Lemons are a great way of naturally flavouring so many foods and drinks.'+
                'Apart from containing no fat or cholesterol, lemons only contain 28 calories per 100grams.'+
                'A natural cleanser and preservative, the citric acid in lemons constitutes up to 80% of the fruit and are great for digestion and kidney function, this can also be helpful in dissolving kidney stones.'+
                'Why not try using lemon instead of processed flavouring that is loaded with salt and chemicals??'
            },{
                uid: 6, title: "Protein", image: `${constants.backendUrl}/static/images/protein.png`,
                description: 'Contributing essential amino acids, Proteins are the building blocks of a healthy diet and strong body.'+
                'Your muscles are made of protein so it makes sense to have good quality, protein rich foods in your diet, especially if you are doing strength or endurance training.'+
                'Whether it’s lean meats or vegetables, eggs or legumes, consuming several serves of protein per day provides you with fuel to build and repair muscle tissue, which in return elevates your metabolism.'+
                'Consuming protein with carbohydrates post workout, restores glycogen in your muscles, aiding recovery.'
            },{
                uid: 7, title: "Superfoods!", image: `${constants.backendUrl}/static/images/superfoods.png`,
                description: 'No you don’t have to wear a cape to eat them! However, some claim the effect these ‘Superfoods’ have on your body could make you feel super.'+
                'Super foods can generally be classified as foods that provide specific health benefits. Whether it be lowering cholesterol, lowering blood pressure or even assisting the fight against cancer, superfoods are nutritionally dense.'+
                'It is hard to say which, and how much of these we should be eating, but a good start would be foods rich in Omega 3, anti-oxidants and Vitamins A,C and E. Avocadoes, Flaxseed, Chia Seeds, salmon and spinach are a few to include in your weekly diet.'+
                'They increase energy and vitality, regulate cholesterol and blood pressure while helping to fight off cancers and other disease.'+
                `whether you believe in Superfoods or not, you can't argue that a balanced diet with vitamin rich foods won't boost your health!!`
            },{
                uid: 8, title: "Hash Tags", image: `${constants.backendUrl}/static/images/hashtags.png`,
                description: 'So much talk about hashtags but what are they and how do they work?'+
                'Hashtags are a way of spreading your social media posts to a wider audience.'+
                'By simply adding a hashtag to key words associated with your post, your industry and your target audience, you can reach so many more people.'+
                'Many of us don’t have the capital to invest in expensive marketing campaigns, but using social media and hashtags, you can increase the bang for your buck at little or even no cost.'+
                'Who knows, maybe someone famous with a huge social media following will like or comment on your post!'+
                'Dont forget to tag us in your workouts, #skip2beat big love!!!'
            },{
                uid: 9, title: "Banana Dramas!", image: `${constants.backendUrl}/static/images/banana.png`,
                description: 'Bananas can sometimes get a bad rap when comparing fruits. Yes, they are slightly higher in calories than some other fruits, but they also provide great nutritional benefits.'+
                'High in b6, potassium, vitamin c and manganese, bananas are the ultimate pre-packaged food.'+
                'A medium banana has around 100 calories, mostly made of carbohydrates. They’re a great source of energy and are convenient to pack when you’re on the go. A perfect pre-exercise snack.'+
                'Ever see a monkey eat an apple??'
            }
        ]
    }
    return await Resource.find().sort({createdDate: 1}).lean();
}

async function getFriendsNearby(){

}

function getMusicByFolder(){
    return new Promise((resolve) => {
        try {
            const data = [];
    
            fs.readdir(path.join(__dirname, '../../static/music'), async (err, files) => {
                if(err) resolve([]);
                
                for(let i=0; i<files.length; i+=1){
                    const metadata = await mm.parseFile(path.join(__dirname, '../../static/music/', files[i]));
                    
                    if(metadata && metadata.common){
                        data.push({
                            file  : files[i],
                            artist: metadata.common.artists ? metadata.common.artists.join() : "",
                            title : metadata.common.title   ? metadata.common.title : files[i]
                        });
                    }
                }
                console.log(data);

                resolve(data);
            });
            
        } catch (error) {
            console.error(error.message);
            resolve([]);
        }
    });
}

async function getMusicList(){
   return await getMusicByFolder();    
}

async function getUserMusic(userId){
    return await Music.find({userId});
}

async function addMusicOption(data){
    const exists = await Music.findOne({
        userId: data.userId,
        file  : data.file
    });

    if(!exists){
        const music = new Music(data);
        await music.save();
    }
    
    return true;
}