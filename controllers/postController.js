const multer = require("multer");
const sharp = require("sharp");

const Post = require("../models/postModal");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

//// read all posts
exports.getAllPosts = catchAsync(async (req, res, next) => {
  const queryObj = { ...req.query };
  const excludedFields = ["sort"];
  excludedFields.forEach((el) => delete queryObj[el]);
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  const query = Post.find(JSON.parse(queryStr));

  if (queryObj.sort) {
    const sortBy = queryObj.sort.split(",").join(" ");
    // console.log(sortBy);
    query = query.sort(sortBy);
  }
  // console.log(req.query);
  const posts = await query.sort("-createdAt");

  res.status(200).json({
    status: "success",
    results: posts.length,
    data: {
      posts,
    },
  });
});



exports.myPosts = (req, res, next) => {
  req.query = { user: req.user.id };
  next();
};

exports.SortPostByDate = (req, res, next) => {
  req.query = { sort: "createdAt" };
  next();
};
//////////////////////////////
// For Image Uploading In post
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please Upload only images. ", 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("image");

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `post-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 100 })
    .toFile(`public/img/post/${req.file.filename}`);

  next();
});

///////////create post

exports.createPost = catchAsync(async (req, res, next) => {
  const filterBody = req.body;
  filterBody.user = req.user.id;
  if (req.file) filterBody.image = req.file.filename;
  const newPost = await Post.create(filterBody);
  res.status(201).json({
    status: "success",
    data: {
      post: newPost,
    },
  });
});

/////////////update post

exports.updatePost = catchAsync(async (req, res, next) => {
  // console.log(req.file);
  //   console.log(req.body);
  // console.log(req.params.post);
  const filterBody = req.body;
  if (req.file) filterBody.image = req.file.filename;

  const updatePost = await Post.findByIdAndUpdate(req.params.post, filterBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      user: updatePost,
    },
  });
});

////////////delete post
exports.deletePost = catchAsync(async (req, res, next) => {
  const document = await Post.findByIdAndDelete(req.params.post);
  if (!document) {
    return next(new AppError("No Document find with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.post).populate("comments");
  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
});