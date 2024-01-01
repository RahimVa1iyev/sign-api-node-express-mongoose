const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')
const { NotFoundError } = require('../errors')



const register = async (req, res) => {
    const {name,email,password} = req.body
    if(!name || !email || !password){
        throw new BadRequestError('Name , email and password are required fields')
    }
    
    const user = await User.create({ ...req.body })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}
const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new BadRequestError('Email and Passwrod is required field')
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new NotFoundError(StatusCodes.NOT_FOUND, "User not found")
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new BadRequestError("Email or password is not correct")
    }
    const token = user.createJWT()

   res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })

}

module.exports = { register, login }