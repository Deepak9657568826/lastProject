const accessmiddleware = (...role)=>{
   
    return (req, res, next)=>{
        try {
           if( role.includes(req.role)  ){
            next()
           }
           else{
            res.json({msg:"you are not authorized to acces this page"})
           }
           
        } catch (error) {
            res.json({error})
        }
    }

}


module.exports={
    accessmiddleware
}