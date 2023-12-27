import User, {Validte_post,Validte_post_login} from "../User/UserSchema.js"
import HandelEroor ,{StatusCode} from "../Error_Handle/Error.js";
import  Jwt  from "jsonwebtoken";


import * as dote from 'dotenv'
dote.config()


const Usres = new User()

export default async function(req,res,next){


    if(!req.headers.autorisation){
        return res.status(StatusCode.level_400.Bad_Request).send("No Tekon  Found")
    }

    try {
        const token = req.headers.autorisation
        //Decode Token --- Jwt
        
        const decode = Jwt.verify(token,process.env.KEY)
        
        // check if Token Valid
        
        if (!decode || typeof decode !== "object") {
            return res.status(StatusCode.level_400.Unathorized).send("Invalid token");
          }
        
          const expirationDate = new Date(decode.exp * 1000);
          
          // check if Date ExpirationDate
        
          if (expirationDate < new Date()) {
            // The JWT is expired
            return res.status(StatusCode.level_400.Unathorized).send("Expired token");
          }
        
          //check if user existing
        
        const user = await Usres.getOne(decode.Id)
        
        if(!user){
            return res.status(StatusCode.level_400.Not_Found).send("User Not Found")
        }
        
        req.decode = decode
        
        return next()  

    } catch (error) {
        error = new HandelEroor("Error In Server In Auth",StatusCode.level_500.Internal_Server_Error,">...(.)....<").customizeMessage()
        return res.status(StatusCode.level_500.Bad_Gateway).send(error)
    }
}