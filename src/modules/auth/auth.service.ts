import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import { IUser } from "./auth.interface";
import { User } from "./auth.model";
import bcrypt from "bcrypt"
import createToken from "../../utils/auth.utils";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";
import jwt from 'jsonwebtoken' 


const registerIntoDB = async(payload: IUser) =>{
    const result = await User.create(payload)
    return result 
}


type Tpayload ={
    email:string, 
    password:string
}

const loginIntoDB = async(payload: Tpayload) =>{
    const userEmail = payload.email
    const user = await User.findOne({email: userEmail}).select("+password")

    // if user is not found
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
        payload?.password,
        user?.password
    )
    if(!isPasswordMatched){
        throw new AppError(StatusCodes.FORBIDDEN, 'Give correct password !')
    }

    // create token and sent to the client 
    const jwtpayload = {
        name: user?.name,
        email: user?.email,
        role: user?.role,
        phone: user?.phone,
        id:user?._id 
    }


    const  accessToken = createToken(jwtpayload, 
        config.jwt_access_secret as string,
          config.jwt_access_expires_in as string
    )

    const refreshToken = createToken(jwtpayload, config.jwt_refresh_secret as string, config.jwt_refresh_expires_in as string)



    return {
        accessToken,
        refreshToken
    } 

}

// get frefresh token
const  getRefreshToken = async (token:string) =>{

   
    if(!token){
        throw new AppError(StatusCodes.UNAUTHORIZED, "you are not authorized!")
    }
   
    
     const decoded = jwt.verify(
        token,
        config.jwt_refresh_secret as string,
     ) as JwtPayload
    
   
   
    const {email } = decoded; 

    const user = await User.findOne({email})

    

  

    if(!user){
        throw new AppError(StatusCodes.NOT_FOUND, "This user is not found")
    }
    
    const userStatus = user.isBlocked
    if(userStatus==true){
        throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked')
    }

    const jwtpayload = {
        name: user?.name,
        email: user?.email,
        role: user?.role,
        phone: user?.phone
    }


    const  accessToken = createToken(jwtpayload, 
        config.jwt_access_secret as string,
          config.jwt_access_expires_in as string
    )

    return {
        accessToken
    }

}



export const authService = {
    registerIntoDB,
    loginIntoDB,
    getRefreshToken
}