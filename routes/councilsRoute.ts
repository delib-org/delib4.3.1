import express from 'express';
const router = express.Router();
import {setCouncil} from '../controlers/councilsCont';

router
.post('/set-council',setCouncil)


export default router;