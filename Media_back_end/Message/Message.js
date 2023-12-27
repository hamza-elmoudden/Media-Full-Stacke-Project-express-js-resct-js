import Messages from "./SchemaMessage.js";
import Auth from "../Middleware/Auth.js"
import HandelEroor,{StatusCode} from "../Error_Handle/Error.js";
import { Router } from "express";


const Message = new Messages()
const router = Router()




router.post("/",(req,res)=>{

    if(!req.body){
        res.status(StatusCode.level_400.Bad_Request).send('No Data in the Body')
    }

    try {
        
    } catch (error) {
        error = new HandelEroor("Error In Server In Send Message",StatusCode.level_500.Internal_Server_Error,`${error}`).customizeMessage()
        return res.status(StatusCode.level_500.Internal_Server_Error).send(error)
    }
})

