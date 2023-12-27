import { Schema, model } from 'mongoose';
import _ from "lodash";
import Joi from "joi";
import bcrypt from "bcrypt"
import  Jwt  from 'jsonwebtoken';

const UserSchema = new Schema({
    name:{
        type:String,
        required:true,
        minLength:2,
        maxLength:50,
        lowercase:true

    },
    Username: {
        type: String,
        required: true,
        unique: true,
        minLength:4,
        maxLength:50,
        lowercase:true

      },
    email: {
        type: String,
        required: true,
        minLength:2,
        maxLength:255,
        unique: true,
        lowercase:true

      },
    password: {
        type: String,
        required: true,
        maxLength:1024,
        minLength:8
      },

    profilePicture: {
        type: String,
        maxLength:2025
      },
    coverPhoto: {
        type: String ,
        maxLength:2025
      },
    dateOfBirth: {
        type: Date,
        // required:true
      },
    dateOfcreate: {
        type: Date,
        default:Date.now()
      },
    interests: [{
        type: [String]
      }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }],

},{
    timestamps: true,
});


UserSchema.methods.Generate_token = async function(){
  const token = Jwt.sign({ Id: this._id, Name: this.name, Email: this.email,Username: this.Username }, process.env.KEY,{expiresIn:process.env.expiresdata})
  return  token
}

function passwordcrepte(password){
    const saltRounds = 8;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash

}

class User {
    constructor(){
        this.model = model('User', UserSchema)
    }

    async creatUser(data){
       const User =  this.model(_.pick(data,["name","Username","email","password","profilePicture","coverPhoto","dateOfBirth","interests"]))
       User.password =  passwordcrepte(User.password)
        await User.save()
        return _.pick(User,["_id","name","Username","email"])
    }

    async getAllUser(data) {
        const {page=1,limit=10} = data
        const Users = await this.model.find()
                .limit(limit *1)
                .skip((page -1) * limit).exec()
        return Users
    }


    async getOne(id){
         const User = await this.model.findOne({
            "_id":id
        })
        return   _.pick(User,["name","Username","email"])
    }

    async getOne_email(email){
        const User = await this.model.findOne({
            "email":email,
        })
        return User
    }
}




export function Validte_post(data){
    const Schema = Joi.object({
        name:Joi.string().min(2).max(50).required(),
        Username:Joi.string().min(2).max(50).required(),
        email:Joi.string().min(2).max(255).email().required(),
        password:Joi.string().min(8).max(255).required()
    })

    return Schema.validate(data)
}

export function Validte_post_login(data){
  const Schema = Joi.object({
      email:Joi.string().min(2).max(50).email().required(),
      password:Joi.string().min(8).max(255).required()
  })

  return Schema.validate(data)
}






export default User