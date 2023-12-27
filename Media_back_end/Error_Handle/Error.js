import { logger } from "./Logger.js";

export const StatusCode = {

    level_200:{
        Ok:200,
        Created:201,
        Accepted:202,
        Non_Authoritative_information:203,
        No_content:204,
    },

    level_400:{
        Bad_Request:400,
        Unathorized:401,
        Forbiden:403,
        Not_Found:404,
        Conflict:409,
    },

    level_500:{
        Internal_Server_Error:500,
        Not_Implented:501,
        Bad_Gateway:502,
        Service_Unavailable:503,
        Gatewat_Timeout:504,
        Network_Timeout:599,
    }

}


class HandelEroor extends Error {
    
    constructor(message,StatusCode,ErrorDetails){
        super(message);
        this.StatusCode = StatusCode;
        this.ErrorDetails = ErrorDetails;
    }

    send() {

        let message = `${this.message}. Status code: ${this.StatusCode}`;
        if (this.ErrorDetails) {
          message += `\nError details: ${this.ErrorDetails}`;
        }

        return message;
    }

    customizeMessage(customMessage) {
        this.message = customMessage;
        return this;
    }

    log() {
        logger.log({level:"error",Date:`${Date()}`,message:`Error: ${this.message} || Status code: ${this.StatusCode} || Error details: ${this.ErrorDetails} `})
    }
}


export default HandelEroor