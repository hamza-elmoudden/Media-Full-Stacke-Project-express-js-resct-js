import { Router } from "express";
import Posts,{Valid_Post} from "./PostSchema.js";
import HandelEroor,{ StatusCode } from "../Error_Handle/Error.js"
import Auth from "../Middleware/Auth.js";
import _ from "lodash"


const router = Router()
const Post = new Posts()

router.get("/",Auth,async (req,res)=>{
    try {
        console.log("Get Post Start")
        const Get_Post = await Post.GetAllPost(req.query)

        console.log(Get_Post)

        if(Get_Post.length === 0){
            return res.status(StatusCode.level_400.Conflict).json({message:"No data Found"})
        }
    
        return res.status(StatusCode.level_200.Ok).json({message:"Post Found",data:Get_Post})
        
    } catch (error) {
        error = new HandelEroor("Error in Server Get Post",StatusCode.level_500.Internal_Server_Error,'>..(.)..<').customizeMessage().send()
        return res.status(StatusCode.level_500.Internal_Server_Error).json({error})
        
    }
})

router.post("/",Auth,async (req,res)=>{
    if(!req.body){
        return new HandelEroor("No Req In The Body",StatusCode.level_400.Bad_Request,'.....').customizeMessage().send()
    }

    const Valide = Valid_Post(_.pick(req.body,["content"]))
        
    if(Valide.error){
        return res.status(StatusCode.level_400.Bad_Request).json({message:"Error in Data Fome IN Body",error:Valide.error.details[0].message})
    }



    try {

        req.body.Onwer = req.decode.Id

        const Creat_Post = await Post.AddPost(_.pick(req.body,["Onwer","content"]))

        console.log("start Post creat:" + Creat_Post)

        if(Creat_Post === null){
            return new HandelEroor("Error in Add Post",StatusCode.level_500.Service_Unavailable,"(>...Server..<)").customizeMessage().send()
        }

        return res.status(StatusCode.level_200.Accepted).json({message:"Creat Post",Creat_Post})
        
    } catch (error) {
        error = new HandelEroor("Error in Server Add Post",StatusCode.level_500.Internal_Server_Error,'>..(.)..<').customizeMessage().send()
        return res.status(StatusCode.level_500.Internal_Server_Error).json({error})
    }

})


router.put("/likes/:Post_id",Auth,async (req,res)=>{

    const Post_id = req.params.Post_id

    try {
        const find = await Post.GetOne(Post_id)

        if(find === null){
            return res.status(StatusCode.level_400.Not_Found).json({message:"Post Not Found",data:find})
        }
        
        const likes = await Post.Like_Post(req.decode.Id,Post_id)

        return res.status(StatusCode.level_200.Created).json({data:likes})


    } catch (error) {
        error = new HandelEroor("Error in Server Add Likes",StatusCode.level_500.Internal_Server_Error,'>..(.)..<').customizeMessage().send()
        return res.status(StatusCode.level_500.Internal_Server_Error).json({error})

    }
})

export default router