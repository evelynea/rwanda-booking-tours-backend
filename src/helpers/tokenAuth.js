import jwt from "jsonwebtoken"
import dotnev from "dotenv"

dotnev.config();
class TokenAuth{
    /**generate
    @Static
    @param {object} data object
    @memberof TokenAuth
    @return {String} token
    */
   static tokengenerator(data){
       const token= jwt.sign(data,process.env.JWT_KEY)
       return token
   }
   static decodeToken(token){
      try{ const data=jwt.verify(token,process.env.JWT_KEY)
       return data;
      } catch(error){
        return error
   }
}
}
export default TokenAuth;
