import { Council } from "../councilModelC";
import { User } from "../../user/userModelC";

export interface Message{
    message:string;
    _id?:string;
    isTemp:boolean;
    time:number;
    councilId:string;
    creator:User;
}