const { userModel } = require("../model/user.model");
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');
const { blacklist } = require("../blacklist/blacklist");

// CRUD



// 1. create 

const regitser =  (req, res) => {
    const { name, email, password, role } = req.body

    try {
        bcrypt.hash(password, 5, async function (err, hash) {
            // Store hash in your password DB.
            if(err){
                res.status(200).json({err})
            }
            else{
                const user = new userModel({
                    name,
                    email,
                    password:hash, 
                    role
                })
                await user.save();
                res.status(200).json({ msg: "new user  register succesfully" })
            }
        });
        
    } catch (error) {
        res.status(500).json({ "the error hven by post request": error })
    }
}


// 2. read all data
const getallUser = async(req, res)=>{
    try {
        const users = await userModel.find({});
        res.json({"all user":users})
    } catch (error) {
        res.json({error})
    }
}


// 3. update
const updateUser = async(req, res)=>{
    const {id} = req.params;
    const payload = req.body ;
    try {
        const users = await userModel.findByIdAndUpdate({_id:id}, payload);
        res.json({msg:"user details updated"})
    } catch (error) {
        res.json({error})
    }
}

// ?delete?
const deleteUser = async(req, res)=>{
    const {id} = req.params;
    try {
        const users = await userModel.findByIdAndDelete({_id:id});
        res.json({msg:"user details updated"})
    } catch (error) {
        res.json({error})
    }
}



// ragister



const login = async (req, res) => {
    const { email, password } = req.body
    try {


        const user = await userModel.findOne({ email })
        if (!user) {
            res.send("user not found")
        }
        else{
            bcrypt.compare(password, user.password , function(err, result) {
                if(err){
                    res.status(200).json({err})
                }
                else if(result){
                    var token = jwt.sign({ userId:user._id , name:user.name}, 'deepak');
                    res.status(200).json({ msg:"login successfully", "this is token":token})
                }
                else{
                    res.status(200).json({ msg:"wrong credentials"})
                }
            });
        }
       
    } catch (error) {
        res.status(500).json({ "the error hven by post request": error })
    }
}


const logout = (req, res)=>{
    const token = req.headers.token
    try {
        if(token){
            blacklist.push(token)
            res.json({msg:"user logout successsfully"})
        }
    } catch (error) {
        res.json({error})
    }
}


module.exports = {
    regitser,
    login,
    logout, 
    getallUser, 
    updateUser, 
    deleteUser
}