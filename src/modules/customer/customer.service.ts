import { JwtPayload } from "jsonwebtoken"
import { User } from "../auth/auth.model"
import AppError from "../../error/AppError"
import { StatusCodes } from "http-status-codes"
import bcrypt from 'bcrypt'
import config from "../../config"


type TuserPayload = {
     name?:string
     email?:string 
     phone?:string 
     address?:string
}
        
          


const updateCustomerInfoInDB = async(userData:JwtPayload| undefined, payload:TuserPayload) =>{

   

    const result  = await User.findOneAndUpdate(
        {email: userData?.email},
        {$set: payload},
        {new:true, runValidators:true}
    )

    return result




}

type Tpassword = {
    currentpassword:string,
    newpassword: string
} 

const updatePasswordIntoDB = async(userData:JwtPayload| undefined, payload:Tpassword) =>{

         

            const user = await User.findOne({ email: userData?.email}).select("+password")

            if(!user){
                throw new AppError(StatusCodes.NOT_FOUND, "This user is not found")
            }

            // if user is blocked 
            const isBlocked = user?.isBlocked
            if(isBlocked){
                throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked!')
            }

            // checking if the password is correct
            const isPasswordMatched = await bcrypt.compare(
                payload?.currentpassword,
                user?.password
            )
            if(!isPasswordMatched){
                throw new AppError(StatusCodes.FORBIDDEN, 'Password do not matched!')
            }


            const newHashpassword = await bcrypt.hash(
                payload.newpassword,
                Number(config.bcrypt_salt_round)
            )

            await User.findOneAndUpdate(
                {
                    _id:user?._id,
                    role: user?.role
                },
                {
                    password: newHashpassword,
                    needPasswordChange: true,
                    passwordChangedAt: new Date()
                }
            )

            return null






}


const getSingleCustomerIntoDB = async(email:string) =>{

    const result = await User.findOne({email})
    return result



}


type TPreferences = {
    dietaryRestrictions?: string[]
    preferredCuisines?: string[]
    portionSize?:string

}

const updatePreferencesIntoDB = async(userData:JwtPayload| undefined, payload: TPreferences) =>{


    
    const preferences:any ={ }
    if(payload.dietaryRestrictions !== undefined){
        preferences["preferences.dietaryRestrictions"] = payload.dietaryRestrictions
    }
    if(payload.preferredCuisines !== undefined ){
       preferences["preferences.preferredCuisines"] = payload.preferredCuisines
    }
    if(payload.portionSize !== undefined) {
       preferences["preferences.portionSize"] = payload.portionSize
    }



    const result  = await User.findOneAndUpdate(
        {email: userData?.email},
        {$set: preferences},
        {new:true, runValidators:true}
    )

    return result



}



export const customerServices = {
    updateCustomerInfoInDB,
    updatePasswordIntoDB,
    getSingleCustomerIntoDB,
    updatePreferencesIntoDB
}