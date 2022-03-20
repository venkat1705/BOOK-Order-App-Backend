module.exports = (req,res,next)=>{
    if(!req.user.role){
       return  res.status(401).json({error: 'You are no Authorised to Access this Page'});
    }
    next();
}