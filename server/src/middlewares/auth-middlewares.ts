import { NextFunction, Response } from "express";
import { allowedRolesArrayType, RequestExtendsUserType, RolesType, UserType } from "../types/user";
import { verifyAccessTokenFunction } from "../utilis/jwt";



export function authenticateJWT(req: RequestExtendsUserType, res: Response, next: NextFunction){
    
    const authHeaders = req.headers['authorization'];
    if(!authHeaders) return res.status(401).json({message: 'invalid or missing token'});
    if(!authHeaders.startsWith("Bearer ")) return res.status(401).json({message: 'invalid or missing token'});
    
    const token = authHeaders.split(" ")[1]
    try {
        const payload = verifyAccessTokenFunction(token);
        req.user = payload as UserType;
        next();
    } catch (error) {
        return res.status(401).json({message: 'invalid or missing token'});
    }

}

export function authorizeRoles(...allowedRoles: allowedRolesArrayType){
    
    return (req: RequestExtendsUserType, res: Response, next: NextFunction)=>{
           const user = req.user;
           if(!user || !(allowedRoles.includes(user.role))) return res.status(403).json({message: 'access denied'})
            return next();
    }

}

