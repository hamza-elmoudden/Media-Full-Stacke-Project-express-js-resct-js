import { Schema, model } from 'mongoose';
import Joi from 'joi';
import _ from "lodash"

const PostSchema = new Schema({

    Onwer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },

    content: {
        type: String,
        required: true,
        lowercase:true,
        minLength:2,
        maxLength:255,
      },

    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }],

    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }],
      dateOfcreate: {
        type: Date,
        default:Date.now()
      },
},{
    timestamps: true,
})


class Posts {

    constructor(){
        this.model = model.Post || model('Post', PostSchema)
    }

    async GetAllPost(data){

      console.log("Post schema",data)

      const {page=1,limit=10} = data

      const Posts = await this.model.find({})
                // .populate("User","Username")
                // .populate("Comment","Onwer content dateOfcreate")
                .limit(limit *1)
                .skip((page -1) * limit).exec()

        console.log("Post schema",Posts)

      return Posts
    }

    
    async GetOne(id){
      const Post = this.model.findOne({
        "_id":id
      })

      return Post
    }

    async AddPost(data){
      const Post = new this.model({
        Onwer: data.Onwer,
        content: data.content
      })
      await Post.save()
      return _.pick(Post,["_id","Onwer","content"])
    }

    async Like_Post(id,Post_id){
        const Post = await this.model.findOne({
          "_id" : Post_id,
        })

        if(Post.likes.length > 0){
          const Like = Post.likes.findIndex((e)=> String(e) === id)
          if(Like !== -1){
            Post.likes.splice(Like,1)
          }else{

            Post.likes =  [...Post.likes,id]
          }
        }else{
          Post.likes =  [...Post.likes,id]
        }

        // Save the blog post.
        await Post.save()
        return Post.likes
    }

    async Comment_Post(id,Post_id){
      const Post = await this.model.findOne({
        "_id":Post_id
      })
      
      if(Post.comments.length > 0){
        
        const Comment_id = Post.comments.findIndex((e)=> String(e) === id)

        if(Comment_id !== -1){
          Post.comments.splice(Comment_id,1)
        }else{

          Post.comments =  [...Post.comments,id]
        }

      }else{
        Post.comments =  [...Post.comments,id]
      }

      // Save the blog post.
      await Post.save()

      return true
    }
}


export function Valid_Post(data){
  const Schema = Joi.object({
    content:Joi.string().min(2).max(255).required()
  })

  return Schema.validate(data)
}


export default Posts