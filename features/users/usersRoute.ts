import express from 'express';
const router = express.Router();
import {getUser, getUserFroomCookie, loginUser} from './usersCont';

router
.post('/login',loginUser)
.get('/get-user',getUserFroomCookie, getUser);

export default router;