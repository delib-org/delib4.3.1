import UserModel, { User } from "../model/usersModel";
import jwt_decode from "jwt-decode";
import jwt from "jwt-simple";


const jwtSecret = process.env.JWT_SECRET;

export async function loginUser(req, res) {
  try {
    const { credential } = req.body;
    if (!credential) throw new Error("No cre ");
   
    const userInfo: any = jwt_decode(credential);
    const userId = userInfo.sub;
    if (!userId) throw new Error("No user iid in credential");
    const {
      sub,
      given_name,
      family_name,
      email,
      email_verified,
      name,
      picture,
    } = userInfo;

    const user = {
      uid: sub,
      given_name,
      family_name,
      email,
      email_verified,
      name,
      picture,
    };

    const UserDB = await UserModel.findOneAndUpdate({ uid: userId }, user, {
      new: true,
      upsert: true,
    });

    const encodedUser = jwt.encode(sub, jwtSecret);

    res.cookie("userInfo", encodedUser, { httpOnly: true});
    res.send({ ok: true, user });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
}

export async function getUser(req:any, res:any) {
  
  try {
    if(!req.userId) throw new Error('User is missing in request');
  
    const userDB = await getUserFromDB(req.userId);
    if(!userDB) throw new Error('Couldnt find user in DB');


    const {uid, name, given_name, family_name, picture, email, email_verified} = userDB;
    if(!userDB) throw new Error(`no user with id ${req.userId} in DB`);
    res.send({ user:  {uid, name, given_name, family_name, picture,email, email_verified} });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
}

export function getUserFroomCookie(req:any, res:any, next:Function) {
  try {
    const { userInfo } = req.cookies;
    if (!userInfo) throw new Error("No user info in cookies");

    const userId = jwt.decode(userInfo, jwtSecret);

    req.userId = userId;
   
    next();
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
}


export async function getUserFromDB(userId:string):Promise<User|false> {
  try {
    if(!userId && typeof userId !== 'string') throw new Error('User is missing in request');
  
    const userDB = await UserModel.findOne({uid:userId});
    if(!userDB) throw new Error(`couldnt find user ${userId} in DB`);
    return userDB;
  } catch (error) {
    console.error(error);
    return false

  }
}
