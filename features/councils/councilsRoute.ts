import express from 'express';
const router = express.Router();
import {getCouncil, setCouncil} from './councilsCont';
import { getUserFroomCookie } from '../users/usersCont';

router
.post('/set-council', getUserFroomCookie,setCouncil)
.get('/get-council',getCouncil)


export default router;