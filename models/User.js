const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


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

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

UserSchema.methods.createJWT = function (){
    return jwt.sign({userId:this._id, name : this.name},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFE_TIME})
}

UserSchema.methods.comparePassword = async function(cadidatePassword){
    const isMatch = await bcrypt.compare(cadidatePassword,this.password)
    return isMatch
}

module.exports = mongoose.model('User',UserSchema)