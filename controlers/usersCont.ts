import UserModel, { User } from "../model/usersModel";
import jwt_decode from "jwt-decode";
import jwt from "jwt-simple";
import Cryptr from "cryptr";

const jwtSecret = process.env.JWT_SECRET;

export async function loginUser(req, res) {
  try {
    const { credential } = req.body;
    if (!credential) throw new Error("No cre ");
    console.log("sdgsdgsdgsdg");
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

    res.cookie("userInfo", encodedUser, { httpOnly: true, maxAge: 1000000 });
    res.send({ ok: true, user });
  } catch (error) {
    console.log(error.error);
    res.send({ error: error.message });
  }
}
