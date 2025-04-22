import { User_Role } from "./auth.constants";



// interface preference {
//     dietaryRestrictions:string[],
//     preferredCuisines: string[],
//     portionSize: "small"| "medium" | "large"

// }

export interface IUser {
    name: string, 
    email: string, 
    phone:string,
    password: string,
    role:  "customer"| "provider",
    isBlocked: boolean, 
    needPasswordChange: boolean,
    address?:string,
    preferences: {
        dietaryRestrictions:string[],
        preferredCuisines: string[],
        portionSize: "small"| "medium" | "large"
    
    }
    
}

export type TUserRole = keyof typeof User_Role;