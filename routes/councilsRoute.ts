import express from 'express';
const router = express.Router();
import {setCouncil} from '../controlers/councilsCont';
import { getUserFroomCookie } from '../controlers/usersCont';

router
.post('/set-council', getUserFroomCookie,setCouncil)


export default router;