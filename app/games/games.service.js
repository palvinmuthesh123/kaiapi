const db = require('_helpers/db');
const Games = db.Games;
const GameWinner = db.GameWinner;

module.exports = {
    createGames,
    getAllGames,
    getGamesById,
    deleteGames,
    updateGames,
    createGameWinner,
    getAllGameWinner,
    getGameWinnerById,
    deleteGameWinner,
    updateGameWinner
};

async function createGames(contents) {
    const games = new Games(contents);
    await games.save();
    return { success: true, message: "Games Added Successfully" };
}

async function getAllGames() {
    return await Games.find().select('-hash');
}

async function getGamesById(id) {
    const games = await Games.findById(id).select('-hash').lean();
    if (!games)
        return { error: true, message: "Games not found" };
    const stats = await Games.findOne({ _id: id }).lean();
    return { success: true, games: { ...games, ...stats } };
}

async function deleteGames(id) {
    await Games.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updateGames(data) {
    const games = await Games.findById(data.id);
    // validate
    if (games) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            games[x] =  data.new[x]
        })
        await games.save();
    }
}

async function createGameWinner(contents) {
    const gamewinner = new GameWinner(contents);
    await gamewinner.save();
    return { success: true, message: "GameWinner Added Successfully" };
}

async function getAllGameWinner() {
    return await GameWinner.find().select('-hash');
}

async function getGameWinnerById(id) {
    const gamewinner = await GameWinner.findById(id).select('-hash').lean();
    if (!gamewinner)
        return { error: true, message: "GameWinner not found" };
    const stats = await GameWinner.findOne({ _id: id }).lean();
    return { success: true, gamewinner: { ...gamewinner, ...stats } };
}

async function deleteGameWinner(id) {
    await GameWinner.findByIdAndRemove(id);
    return { success: true, message:"Successfully Deleted" };
}

async function updateGameWinner(data) {
    const gamewinner = await GameWinner.findById(data.id);
    // validate
    if (gamewinner) {
        let keys = Object.keys(data.new)
        keys.map(x=>{
            gamewinner[x] =  data.new[x]
        })
        await gamewinner.save();
    }
}