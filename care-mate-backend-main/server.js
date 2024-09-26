const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const app = express();

app.use(
  express.json({
    limit: "50mb",
  })
);

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: false, limit: "50mb" }));

const allRoutes = require("./routes/AllRoutes");

app.use("/api", allRoutes);

app.listen(4000, (err) => {
  if (err) {
    console.log("Error Occured: ", err);
  } else {
    console.log("Server is listening on port: ", 4000);
    // mongodb+srv://nimarta:nimarta123@care-mate-cluster.flo3v8l.mongodb.net/CareMateDB
    const MONGODB_URI =
      "mongodb+srv://nimarta:nimarta123@care-mate-cluster.flo3v8l.mongodb.net/CareMateDB";
    mongoose
      .connect(MONGODB_URI)
      
      .then((onConnect) => {
        console.log("Database connection established successfully!");
      })
      .catch((onConnectError) => {
        console.log(
          "Something went wrong while connecting to database.",
          onConnectError
        );
      });
  }
});
