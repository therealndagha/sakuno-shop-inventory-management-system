

import { Response, Router } from "express";
import { login, logout, refresh, register } from "../controllers/auth-controllers";
import { authenticateJWT, authorizeRoles } from "../middlewares/auth-middlewares";
import { RequestExtendsUserType } from "../types/user";

const router = Router();

// login , register , logout routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

//get new  access and refresh token

router.post('/refresh', refresh )

//user account routes
router.get('/me', authenticateJWT, (req:RequestExtendsUserType, res: Response)=>{
    const user = req.user;
    return res.status(200).json({user});
})

//admin routes 
router.get('/admin/dashboard', authenticateJWT, authorizeRoles('ADMIN'), (req: RequestExtendsUserType, res: Response)=>{
    return res.status(200).json({message: 'admin route reached'});
} )

export default router;

