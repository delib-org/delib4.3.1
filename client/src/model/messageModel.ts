import { Council } from "./councilModelC";
import { User } from "./userModelC";

export interface Message{
    message:string;
    _id?:string;
    isTemp:boolean;
    time:Date;
    council:Council;
    creator:User;
}