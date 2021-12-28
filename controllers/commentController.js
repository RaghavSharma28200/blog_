const Comment = require("../models/commentModal");
const catchAsync = require("../utils/catchAsync");

exports.createComment = catchAsync(async (req, res, next) => {
  req.body.user = req.user.id;
  const comment = await Comment.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      comment,
    },
  });
});

exports.allComment = catchAsync(async (req, res, next) => {
  const queryObj = { ...req.query };
  const excludedFields = ["sort"];
  excludedFields.forEach((el) => delete queryObj[el]);
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  const query = Comment.find(JSON.parse(queryStr));

  if (queryObj.sort) {
    const sortBy = queryObj.sort.split(",").join(" ");
    // console.log(sortBy);
    query = query.sort(sortBy);
  }
  // console.log(req.query);
  const comments = await query.sort("-createdAt");

  // const comments = await Comment.find();

  res.status(200).json({
    status: "success",
    results: comments.length,
    data: {
      comments,
    },
  });
});

exports.getComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      comment,
    },
  });
});
