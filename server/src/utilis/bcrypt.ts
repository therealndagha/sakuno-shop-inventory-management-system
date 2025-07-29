
import bcrypt from 'bcrypt'

export function hashPassword(text: string){
     return bcrypt.hash(text, 10)
}

export function comparePassword(password: string, hash: string){
    return bcrypt.compare(password, hash)
}