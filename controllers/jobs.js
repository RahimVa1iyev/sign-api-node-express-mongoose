const Job = require('../models/Job')
const {BadRequestError,NotFoundError} = require('../errors')
const {StatusCodes} = require('http-status-codes')

const getAllJobs = async (req,res) =>{
    const jobs = await Job.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({jobs})
}
const getJob = async (req,res) =>{
    const  {user:{userId}, params:{id:jobId}} = req

    const job = await Job.findOne({_id:jobId , createdBy:userId})

    if(!job) throw new NotFoundError(`Job not found by id ${jobId}`)

    res.status(StatusCodes.OK).json({job})
}
const createJob = async (req,res) =>{
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}
const updateJob = async (req,res) =>{
    const {body , params:{id:jobId}, user:{userId}} = req

    const updateJob = await Job.findOneAndUpdate({_id : jobId,createdBy:userId},body,{new:true,runValidators:true})

    res.status(StatusCodes.OK).json({updateJob})

}
const deleteJob = async (req,res) =>{
      const  {user:{userId}, params:{id:jobId}} = req

    const deletedjob = await Job.findOneAndRemove({_id:jobId , createdBy:userId})

    if(!deletedjob) throw new NotFoundError(`Job not found by id ${jobId}`)
    
    res.status(StatusCodes.OK).json({deletedjob})
}

module.exports = {getAllJobs,getJob,createJob,updateJob,deleteJob}