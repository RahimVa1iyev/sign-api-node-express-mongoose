const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require : [true , 'Please provide name'],
        minlength:2,
        maxlength:20
    },
    email :{
        type:String,
        require : [true , 'Please provide name'],
        unique : [true, 'Email has already been'],
        match : [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide valid email']
    },
    password: {
        type: String,
        require : [true , 'Please provide password'],
        minlength:6,
    },
})

module.exports = mongoose.model('User',UserSchema)