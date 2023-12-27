import express, { json } from 'express';
import cors from 'cors';
import { default as mongoose } from 'mongoose';
import * as dote from 'dotenv'
dote.config()
const app = express();
// import routes
import User from "./User/User.js"
import Post from "./Post/Post.js"
import Comment from "./Comment/Comment.js"
import Auth from './Middleware/Auth.js';

// Mongo DB Connections
mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(response=>{
    console.log('MongoDB Connection Succeeded.')
}).catch(error=>{
    console.log('Error in DB connection: ' + error)
});


// Middleware Connections
app.use(cors())
app.use(json())


// Routes
app.use("/User",User)
app.use("/Post",Post)
app.use("/Comment",Comment)

// Auth

app.post("/Auth",Auth,(req,res)=>{

        if(req.decode){
            return res.status(200).json({data:true}) 
        }
})
// Connection
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log('App running in port: '+PORT)
})


