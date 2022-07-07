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
        multiWins: {
            type: Number,
            default: 0,
        },
        mulitLose: {
            type: Number,
            default: 0,
        },
        mulitiDraws: {
            type: Number,
            default: 0,
        },
        singleWins: {
            type: Number,
            default: 0,
        },
        singleLose: {
            type: Number,
            default: 0,
        },
        singleDraws:  {
            type: Number,
            default: 0,
        }
    },
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;