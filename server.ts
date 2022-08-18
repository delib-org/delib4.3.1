import express from "express";
import mongoose from "mongoose";
import 'dotenv/config' 
const app = express();
const port: number = 3000;

app.use(express.static("public"));
app.use(express.json());

const mongodb_uri = process.env.MONGODB_URI;

mongoose.connect(
  mongodb_uri
).then(res=>{
  console.log("Connect to DB");
}).catch(err=>{
  console.info('At mongoose.connect:')
  console.error(err.message)
});


import usersRoute from "./routes/usersRoute";
app.use("/users", usersRoute);






app.listen(port, () => {
  return console.log(`Server is listening at http://localhost:${port}`);
});
