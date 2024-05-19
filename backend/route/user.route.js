const { regitser, login, logout, getallUser, updateUser, deleteUser } = require("../controller/user.controller");
const { userModel } = require("../model/user.model");
const expres = require("express")

const  userRouter= expres.Router()



userRouter.post("/regitser",regitser )
userRouter.post("/login", login )
userRouter.get("/logout", logout )
userRouter.get("/getalluser", getallUser )


userRouter.put("/updateuser/:id", updateUser )
userRouter.delete("/deleteuser/:id", deleteUser )

module.exports={
    userRouter
}