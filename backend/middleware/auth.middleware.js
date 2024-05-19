const jwt= require("jsonwebtoken");
const { blacklist } = require("../blacklist/blacklist");
const {userModel} = require("../model/user.model")

const authmiddleware  = (req, res, next)=>{
    const token = req.headers.token
    console.log(token)
    if (token) {
        if(blacklist.includes(token)){
            res.json({msg:"please login first to access the data"})
           
        }
        jwt.verify(token, 'deepak', async function (err, decoded) {
            if (err) {
                res.status(200).json({ err })
            }
            else {
                console.log(decoded) // bar
                const user = await userModel.findOne({_id:decoded.userId})
                 req.role=user.role
                console.log(user);
               next();
            }
        });
    }
    else {
        res.json({ msg: "You are not authorized" })
    }
}


module.exports={
    authmiddleware
}














