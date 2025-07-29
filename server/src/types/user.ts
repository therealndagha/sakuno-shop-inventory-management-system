import { Request } from "express"


export type RolesType = 'USER' | 'ADMIN';

export type allowedRolesArrayType = RolesType[];

export interface UserType {
    id: string,
    fullname?:string,
    email: string,
    role: RolesType
}

export interface RequestExtendsUserType extends Request {
    user?: UserType
} 



