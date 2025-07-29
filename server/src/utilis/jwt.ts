
import jwt from 'jsonwebtoken'

const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY!;
const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY!;

export function signAccessTokenFunction(payload: object){
    return jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, {expiresIn: '15m'})
}

export function signRefreshTokenFunction(payload: object){
    return jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, {expiresIn: '7d'})
}

export function verifyAccessTokenFunction(token: string){
    return jwt.verify(token, ACCESS_TOKEN_SECRET_KEY)
}

export function verifyRefreshTokenFunction(token: string){
    return jwt.verify(token, REFRESH_TOKEN_SECRET_KEY)
}