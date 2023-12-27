import { Schema, model } from "mongoose";
import Joi from "joi";

const SchemaMessage = Schema({

    message_to:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    message_from:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    content:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    dateOfSend: {
        type: Date,
        default:Date.now()
    },
})


class Messages{

    constructor(){
        this.model = model("Message",SchemaMessage)
    }

    async sendMessage(id_to,id_from,data){

        const send_sms = this.model({
            message_to:id_to,
            message_from:id_from,
            content:data.content
        })

        send_sms.save()

        return true
    }

    async getMessage(id_to,id_from){

        const get_sms = this.model.find({

            "message_to":id_to

        })
        .where("message_from" === id_from)

        return get_sms
    }
    

    async getMessage_y(id_to,id_from){

        const get_sms = this.model.find({

            "message_from":id_from

        })
        .where("message_to" === id_to)

        return get_sms
    }
}



export function Valide_sms(data){

    const Schema = Joi.object({
        content:Joi.string().min(1).max(255).required()
    })

    return Schema.validate(Schema)
}

export default Messages