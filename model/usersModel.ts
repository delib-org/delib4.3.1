import mongoose from "mongoose";

export interface User{
  email_verified: boolean,
  email: string,
  family_name: string,
  given_name: string,
  name: string,
  picture: string,
  uid: string,
}

const UserSchema = new mongoose.Schema({
  email_verified: Boolean,
  email: String,
  family_name: String,
  given_name: String,
  name: String,
  picture: String,
  uid: String,
});
//create a collection
const UserModel = mongoose.model("users", UserSchema);
export default UserModel;
