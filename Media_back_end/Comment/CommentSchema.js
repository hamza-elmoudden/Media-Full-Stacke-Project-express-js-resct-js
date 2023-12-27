import { Schema, model } from 'mongoose';
import Posts from "../Post/PostSchema.js"
import Joi from 'joi';

const Post = new Posts()

const CommentSchema = new Schema({
    
    Onwer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },

    content: {
        type: String,
        required: true,
        lowercase:true,
        minLength:2,
        maxLength:255,
        
      },
    
    dateOfcreate: {
        type: Date,
        default:Date.now()
      },
},{
    timestamps: true,
})


class Comments{

  constructor(){
    this.model = model("Comment",CommentSchema)
  }


  async GetAllComments(data){
      const {page=1,limit=10} = data
      const commets = this.model.find({})
      .populate("User","Username")
      .limit(limit *1)
      .skip((page -1) * limit).exec()

      return commets   
  }

  async AddComment(data,Post_id){

    const comment = await this.model({
      Onwer:data.Onwer,
      content:data.content,
    })

    await comment.save()

    // add comment to the post
    const add_comment = await Post.Comment_Post(comment._id,Post_id)

    
    return comment._id
  }

}

export function Valide_Comment_Add(data){

  const Schema = Joi.object({
    content : Joi.string().min(2).max(255).required()
  })

  return Schema.validate(data)
}


export default Comments