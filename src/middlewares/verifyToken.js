import { userInfo } from "os";
import TokenAuth from "../helpers/tokenAuth";
import UserInfos from "../models/user"
const isUserExist=async(req,res,next)=>{
    try{
        const token=req.header("x-auth-token")
        if(!token){
            return res.status(400).json({error:"no token provided"})        
        }    
        const data = TokenAuth.decodeToken(token)
        const {name}=data
        if (name==="jsonWebTokenError"){
            return res.status(400).json({error:"invalid JWT"})      
        }
        if (name==="TokenExpiredError"){
            return res.status(400).json({error:"token is expired"})      
        }

        req.user=data.user;
        const user=await UserInfos.findById(req.user._id)
        if (!user){
            return res.status(400).json({error:"user not found, you are not an admin"})      
            
        }
        return next();
    }
    catch(err){
        console.log(err);
    }
}
export default isUserExist;