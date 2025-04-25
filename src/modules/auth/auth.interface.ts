import { User_Role } from "./auth.constants";


export interface IUser {
    name: string, 
    email: string, 
    phone:string,
    password: string,
    role:  "customer"| "provider",
    isBlocked: boolean, 
    needPasswordChange: boolean,
    address?:string,
    preferences : {
        dietaryRestrictions:string[],
        preferredCuisines: string[],
        portionSize: "small"| "medium" | "large"
    
    },
    specialties : {
        cuisinespecialtie: string[]
        availability: string[]
        price: string
     }
}

export type TUserRole = keyof typeof User_Role;