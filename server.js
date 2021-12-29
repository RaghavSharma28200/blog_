const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");
const app = require("./app");

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // console.log(con.connections);
    console.log("DB connection successfull !");
  })
  .catch((err) => {
    console.log(err);
  });

const port = 8000;
const server = app.listen(port, () => {
  console.log("App Running On Port 3000");
});
// raghav1234;
