const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    password: {
        type: String,
        trim: true,
    },
    score: {
        multiWins: Number,
        mulitLose: Number,
        mulitiDraws: Number,
        singleWins: Number,
        singleLose: Number,
        singleDraws: Number
    },
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;