import UserModel, { User } from "../model/usersModel";
import jwt_decode from "jwt-decode";

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
    console.log({
      sub,
      given_name,
      family_name,
      email,
      email_verified,
      name,
      picture,
    });

    const UserDB = await UserModel.findOneAndUpdate(
      { uid: userId },
      { uid:sub, given_name, family_name, email, email_verified, name, picture },
      {
        new: true,
        upsert: true
      }
    );
    console.log(UserDB);
    res.send({ ok: true, user: UserDB });
  } catch (error) {
    console.log(error.error);
    res.send({ error: error.message });
  }
}
