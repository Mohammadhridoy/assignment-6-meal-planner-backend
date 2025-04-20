import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { authService } from "./auth.service";




const register = catchAsync(async(req:Request, res:Response)=>{

    

    const result  = await authService.registerIntoDB(req.body)
    

    const {id, name, email, phone, role, isBlocked, needPasswordChange, } = result

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
         status: true,
         message: "User registered successfully!",
         data: {
            id,
            name,
            email, 
            phone, 
            role, 
            isBlocked, 
            needPasswordChange
         }
    })

})


const login = catchAsync(async(req:Request, res:Response) =>{
        const result = await authService.loginIntoDB(req.body)

        const {accessToken , refreshToken} = result

        res.cookie("refreshToken", refreshToken)

        sendResponse(res, {
            statusCode: StatusCodes.OK,
            status: true,
            message:"User login successfully!",
            data:{
                accessToken
            }
        })
})


const getRefreshToken = catchAsync(async(req:Request, res:Response)=>{
    
    const {refreshToken} = req.cookies
    const result = await authService.getRefreshToken(refreshToken)

    sendResponse(res,{
        statusCode:StatusCodes.OK,
        status:true, 
        message: "Access token retrieved successfully!",
        data: result
    })

})



export const authController = {
    register,
    login,
    getRefreshToken
}