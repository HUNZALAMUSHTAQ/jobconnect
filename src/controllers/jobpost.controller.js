const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { JobPost } = require('../models');
const mongoose = require('mongoose');

const createJobPost = catchAsync(async (req, res) => {
  const jobPost = await JobPost.create({ ...req.body, postedBy: req.user._id });
  res.status(httpStatus.CREATED).json(jobPost);
});

const getJobPosts = catchAsync(async (req, res) => {
  const jobPosts = await JobPost.find();
  res.json(jobPosts);
});

const getJobPostById = catchAsync(async (req, res) => {
  const { jobId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: 'Invalid ObjectId' });
  }
  const jobPost = await JobPost.findById(jobId);
  if (!jobPost) {
    return res.status(httpStatus.NOT_FOUND).json({ message: 'Job post not found' });
  }
  res.json(jobPost);
});
const updateJobPost = catchAsync(async (req, res) => {
  const { jobId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: 'Invalid ObjectId' });
  }
  const jobPost = await JobPost.findByIdAndUpdate(jobId, req.body, { new: true });
  if (!jobPost) {
    return res.status(httpStatus.NOT_FOUND).json({ message: 'Job post not found' });
  }
  res.json(jobPost);
});

const deleteJobPost = catchAsync(async (req, res) => {
  const { jobId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: 'Invalid ObjectId' });
  }
  const jobPost = await JobPost.findByIdAndDelete(jobId);
  if (!jobPost) {
    return res.status(httpStatus.NOT_FOUND).json({ message: 'Job post not found' });
  }
  res.json({ message: 'Job post deleted successfully' });
});

module.exports = {
  getJobPosts,
  getJobPostById,
  createJobPost,
  updateJobPost,
  deleteJobPost,
};
