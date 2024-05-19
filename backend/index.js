require('dotenv').config()
const express = require("express");
const { connection } = require("./congif/database");
const { userModel } = require("./model/user.model");
const { userRouter } = require("./route/user.route");
const jwt = require("jsonwebtoken");
const { authmiddleware } = require("./middleware/auth.middleware");
const { accessmiddleware } = require("./middleware/access.middleware");

const app = express()
app.use(express.json())

app.use("/", userRouter)

// private route

// acces by admin and user//
app.use("/movies", authmiddleware,  accessmiddleware("user"), (req, res) => {
    console.log("this is movie data");
   res.send("this is movies data")
})

// acces by admin and user//
app.use("/series", authmiddleware ,accessmiddleware("admin", "user"),  (req, res) => {
    res.send("this is seriese data")
})

// acces by admin//
app.use("/game",authmiddleware,accessmiddleware("admin"),  (req, res) => {
    res.send("this is game data")
})


const PORT = 8080
app.listen(PORT , async () => {
    try {
        await connection
        console.log("connect to db");
        console.log(`server is running at port ${PORT}`);
    } catch (error) {
        console.log(error);
    }
})