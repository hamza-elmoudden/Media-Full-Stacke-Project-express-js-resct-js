import Comments,{Valide_Comment_Add} from "./CommentSchema.js";
import HandelEroor,{StatusCode} from "../Error_Handle/Error.js";
import Auth from "../Middleware/Auth.js"
import { Router } from "express";
import _ from "lodash"


const router = Router()
const Comment = new Comments()

router.get("/",Auth,async (req,res)=>{
    
    try{
        const get_Comment = await Comment.GetAllComments(req.query)
        
        console.log(get_Comment);

        if(get_Comment.length === 0){
            return res.status(StatusCode.level_400.Not_Found).json({message:"Not Comment Found",data:get_Comment})
        }

        return res.status(StatusCode.level_200.Ok).json({"message":"comment Found",data:get_Comment})


    } catch (error) {
        error = new HandelEroor("Error in Gat Comments",StatusCode.level_500.Internal_Server_Error,"....").customizeMessage().send()
        return res.status(StatusCode.level_500.Internal_Server_Error).json(error)
    }
})


router.post("/:Post_id",Auth,async (req,res)=>{
    console.log("start comment")
    if(!req.body){
        return res.status(StatusCode.level_400.Bad_Request).json({message:"No Data In the Body"})
    }

    const Valide = Valide_Comment_Add(_.pick(req.body,["content"]))

    if(Valide.error){
        return res.status(StatusCode.level_400.Bad_Request).json({message:"Error In Forme Data",error:Valide.error.details[0].message})
    }

    try {

        req.body.Onwer = req.decode.Id 


        const add_comment = await Comment.AddComment(_.pick(req.body,["Onwer","content"]),req.params.Post_id)
        console.log(add_comment)
        res.status(StatusCode.level_200.Created).json({message:"Commmnet Created",id_commnet:add_comment})
        
    } catch (error) {
        error = new HandelEroor("Error in Gat Comments",StatusCode.level_500.Internal_Server_Error,"....").customizeMessage().send()
        return res.status(StatusCode.level_500.Internal_Server_Error).json({error})
    }
})



export default router 