import { User_Role } from "./auth.constants";



export interface IUser {
    name: string, 
    email: string, 
    phone:string,
    password: string,
    role:  "customer"| "provider",
    isBlocked: boolean, 
    needPasswordChange: boolean,
    
}

export type TUserRole = keyof typeof User_Role;