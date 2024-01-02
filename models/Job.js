const mongoose = require('mongoose')


const JobSchema = new mongoose.Schema({
    comapny: {
        type:String,
        required: [true,'Company is provided field'],
        maxlength: 50
    },
    position: {
        type:String,
        required: [true,'Position is provided field'],
        maxlength: 50
    },
    status: {
        type:String,
        enum: ['interview','declined','pending'],
        default: 'pending'
    },
    createdBy:{
        type : mongoose.Types.ObjectId,
        ref: 'User',
        required: [true,'User is provided field']
    }

},{timestamps : true})


module.exports = mongoose.model('Job',JobSchema)