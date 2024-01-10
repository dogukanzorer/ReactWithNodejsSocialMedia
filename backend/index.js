const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const connection = require("./database/db.js");
const authRouter = require("./routers/authRouter.js")
const postsRouter = require("./routers/post.router.js")

app.use(express.json());
app.use(cors());


// allow reading image files
app.use("/uploads",express.static(path.join(__dirname,"uploads")));


connection();


app.use("/api",authRouter);
app.use("/api" , postsRouter);


app.listen(5000 , ()=> console.log("The server is running on port 5000"));

//mongo db fake mail adress : movifak811@telvetto.com  password : Amnezia123--