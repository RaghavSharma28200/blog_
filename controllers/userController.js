const multer = require("multer");
const sharp = require("sharp");

const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;
  // console.log("user", req.user.id);
  next();
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const allUser = await User.find();
  res.status(200).json({
    status: "success",
    result: allUser.length,
    data: {
      allUser,
    },
  });
});

// const MIME_TYPE = {
//   "image/png": "png",
//   "image/jpeg": "jpeg",
//   "image/jpg": "jpg",
// };

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "public/img/user");
//     },
//     filename: (req, file, cb) => {
//       const ext = MIME_TYPE[file.mimetype];
//       cb(null, `user-${Date.now()}.${ext}`);
//     },
//   }),
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith("image")) {
//       cb(null, true);
//     } else {
//       cb(new AppError("Not an image! Please Upload only images. ", 400), false);
//     }
//   },
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please Upload only images. ", 400), false);
  }
};
// limit is used to set the limit of file
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
// // const upload = multer({ dest: 'public/img/users' });

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/user/${req.file.filename}`);

  next();
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // console.log(req.file);
  // console.log(req.body);
  // 1) Create error if user Posts password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password update please use /updateMyPassword route ",
        400
      )
    );
  }
  // 2) Filtered out unwanted field names that are not allowed to be updated
  const filterBody = filterObj(req.body, "name", "email");
  if (req.file) filterBody.photo = req.file.filename;
  // console.log(req.file.path);

  const updateUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });
  // 3) Update user document
  res.status(200).json({
    status: "success",
    data: {
      user: updateUser,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  let query = User.findById(req.params.id);
  const doc = await query;

  // const doc = await Model.findById(req.params.id).populate('reviews');
  // Tour.findOne({_id: req.params.id}) under the hood findById
  if (!doc) {
    return next(new AppError("No document find with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

/////// for delete
// exports.getMe = catchAsync(async (req, res, next) => {
//   await req.user.remove()
// });
