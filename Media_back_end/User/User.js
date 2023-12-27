import {Router} from "express"
import User, {Validte_post,Validte_post_login} from "./UserSchema.js"
import _ from "lodash"
import bcrypt from "bcrypt"
import HandelEroor,{ StatusCode } from "../Error_Handle/Error.js"
import Auth from "../Middleware/Auth.js"


const router = Router()
const Users = new User()


router.get("/",Auth,async (req,res)=>{

    try {
        
        const find_all_user = await Users.getAllUser(req.query)

        if(!find_all_user){
             let error  = new HandelEroor("No User Found",StatusCode.level_400.Not_Found,"No User Found...")
             return res.status(StatusCode.level_400.Not_Found).json({message:"Not Found ",error})
            
        }
        
        return res.status(StatusCode.level_200.Accepted).json({data:find_all_user})

    } catch (error) {
         error =  new HandelEroor("Error In Server",StatusCode.level_500.Service_Unavailable,`Error:${error}`).send()
         return res.status(StatusCode.level_500.Internal_Server_Error).json({error})
    }

})


router.get("/:id",Auth,async (req,res)=>{
    try {

        if(!req.params.id){
            let error = new HandelEroor("No ID In PARAMS",StatusCode.level_400.Bad_Request,"Error")
            return res.status(StatusCode.level_400.Not_Found).json({error})
        }

        const {id} = req.params
        const find = await Users.getOne(id)

        if(find === null){
            res.status(StatusCode.level_400.Not_Found).json({messaage:"Not Use Fond",data:find})
        }

        return res.status(StatusCode.level_200.Ok).json({data:find})

    } catch (error) {
        error = new HandelEroor("Error In Server",StatusCode.level_500.Service_Unavailable,`Error:${error}`).customizeMessage().send()
        return res.status(StatusCode.level_500.Internal_Server_Error).json({error})
    }
})

router.post("/", async (req,res)=>{

    if(!req.body){
        return res.status(StatusCode.level_400.Bad_Request).json({message:"No Data in Body"})
    }

    
    const Vailde =  Validte_post(_.pick(req.body,["name","Username","email","password"]))

    if(Vailde.error){
        return res.status(400).json({message:"Error in Fome data",error:Vailde.error.details[0].message})
    }

    try {
        
        const find = await Users.getOne_email(req.body.email)
        
        if(find !== null){
            return res.status(StatusCode.level_400.Bad_Request).json({message:"User Not found"})
        }

        const site = await Users.creatUser(req.body)


        return res.status(StatusCode.level_200.Created).json({data:site})

    } catch (error) {
        error = new HandelEroor("Error In Server",StatusCode.level_500.Service_Unavailable,`Error:${error}`).customizeMessage().send()
        return res.status(StatusCode.level_500.Internal_Server_Error).json({error})
    }

})


//  start Login route
router.post("/login", async (req,res)=>{
    if(!req.body){
        return res.status(StatusCode.level_400.Bad_Request).json({message:"No Data in Body"})
    }

    
    const Vailde =  Validte_post_login(_.pick(req.body,["email","password"]))

    if(Vailde.error){
        return res.status(400).json({message:"Error in Fome data",error:Vailde.error.details[0].message})
    }

    try {
        
        const CheckUser = await Users.getOne_email(req.body.email)
        if(CheckUser === null){
            return res.status(StatusCode.level_400.Not_Found).json({message:"Rowing Email OR Password"})
        }
        const CheckPass = await bcrypt.compare(req.body.password,CheckUser.password)

        if(!CheckPass){
            return res.status(StatusCode.level_400.Not_Found).json({message:"Rowing Email OR Password"})
        }

        const Token = await CheckUser.Generate_token()
        return res.status(StatusCode.level_200.Accepted).json({token:Token,message:"login Ok---->"})
    } catch (error) {

        error = new HandelEroor("Error In Server",StatusCode.level_500.Service_Unavailable,`Error:${error}`).customizeMessage().send()
        return res.status(StatusCode.level_500.Internal_Server_Error).json({error})
    }

})

// end Login route





export default router