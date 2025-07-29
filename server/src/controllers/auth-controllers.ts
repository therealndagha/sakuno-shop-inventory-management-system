import { Request, Response } from "express";
import { prisma } from "../config/db";
import { comparePassword, hashPassword } from "../utilis/bcrypt";
import { signAccessTokenFunction, signRefreshTokenFunction, verifyRefreshTokenFunction } from "../utilis/jwt";


export async function register(req: Request, res: Response){

    if(!req.body) return res.status(400).json({message: 'email or password are required'});

    const {email, password, role, fullname} = req.body;

    if(!email || !password ) return res.status(400).json({message: 'email or password are required'}); 

    const existingUser = await prisma.user.findUnique({where: {email}});
    if(existingUser) return res.status(400).json({message: 'email already in use'}) ;

    const hashedPassword = await hashPassword(password);

    const newlyCreatedUser = await prisma.user.create({data: {email, password: hashedPassword, role: role || 'USER', fullname: fullname || undefined }});

    const accessToken = signAccessTokenFunction({id: newlyCreatedUser.id, fullname: newlyCreatedUser.fullname, email: newlyCreatedUser.email, role: newlyCreatedUser.role});

    const refreshToken = signRefreshTokenFunction({id: newlyCreatedUser.id});

    await prisma.user.update({where: {email}, data: {refreshToken}});

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: false, 
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/api/auth/refresh"
    })

    res.status(201).json({accessToken});

} 

export async function login(req: Request, res: Response){
    if(!req.body) return res.status(400).json({message: 'email or password is required'});

    const {email, password} = req.body;

    if(!email || !password) return res.status(400).json({message: 'email or password is required'});

    const user = await prisma.user.findUnique({where: {email}});

    if(!user || !(await comparePassword(password, user.password))) return res.status(403).json({message: 'invalid credentials'});

    const accessToken = signAccessTokenFunction({id: user.id, fullname: user.fullname, email: user.email, role: user.role});
    const refreshToken = signRefreshTokenFunction({id: user.id});

    await prisma.user.update({where: {email: user.email}, data: {refreshToken}});

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: false, //set to true in production
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/api/auth/refresh"
    })

    res.status(200).json({accessToken})

}



export async function refresh(req: Request, res: Response){
    const token = req.cookies.refreshToken;
    if(!token) return res.status(401).json({message: 'token is missing'})
    try {
        const payload = verifyRefreshTokenFunction(token) as {id: string}
        const user = await prisma.user.findUnique({where: {id: payload.id}});
        if(!user || user.refreshToken !== token) return res.status(403).json({message: 'invalid refresh token'});

        const newAccessToken = signAccessTokenFunction({id: user.id , email: user.email, role: user.role, fullname: user.fullname});
        const newRefreshToken = signRefreshTokenFunction({id: user.id});

        await prisma.user.update({
            where: {id: user.id},
            data:  {refreshToken: newRefreshToken}
        })

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: false, // set to true in production
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/api/auth/refresh"

        })
         res.json({accessToken: newAccessToken});

    } catch (error) {
         return res.status(403).json({ message: "Invalid or expired refresh token" });
    }    
}


export const logout = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (token) {
    try {
      const payload = verifyRefreshTokenFunction(token) as { id: string };
      await prisma.user.update({
        where: { id: payload.id },
        data: { refreshToken: null },
      });
    } catch (err) {
      // ignore if token is invalid
    }
  }

  res.clearCookie("refreshToken", { path: "/api/auth/refresh" });
  res.json({ message: "Logged out" });
};