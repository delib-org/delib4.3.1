import express from 'express';
const router = express.Router();
import {getCouncil, setCouncil} from '../controlers/councilsCont';
import { getUserFroomCookie } from '../controlers/usersCont';

router
.post('/set-council', getUserFroomCookie,setCouncil)
.get('/get-council',getCouncil)


export default router;