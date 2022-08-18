import express from 'express';
const router = express.Router();
import {loginUser} from '../controlers/usersCont';

router
.post('/login',loginUser)


export default router;