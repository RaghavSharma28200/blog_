const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const xss = require("xss-clean");
const hpp = require("hpp");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const commentRoute = require("./routes/commentRoute");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();
app.use("/public/img/user", express.static(path.join("public", "img", "user")));
app.use("/public/img/post", express.static(path.join("public", "img", "post")));
app.use(express.static("client/build"));

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(xss());

app.use(
  hpp({
    whitelist: ["user"],
  })
);
app.use(mongoSanitize());

// app.use((req, res, next) => {
//   console.log(req.cookies);
//   next();
// });

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/users", userRoute);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/comments", commentRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Cant't find ${req.originalUrl} on this server `, 404));
});

app.use(globalErrorHandler);
module.exports = app;