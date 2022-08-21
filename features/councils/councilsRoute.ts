import express from 'express';
const router = express.Router();
import {getCouncil, getCouncils, setCouncil} from './councilsCont';
import { getUserFroomCookie } from '../users/usersCont';

router
.post('/set-council', getUserFroomCookie,setCouncil)
.get('/get-council',getCouncil)
.get('/get-councils',getCouncils)


export default router;