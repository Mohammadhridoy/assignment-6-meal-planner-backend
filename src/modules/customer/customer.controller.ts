import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { customerServices } from "./customer.service"
import sendResponse from "../../utils/sendResponse"
import { StatusCodes } from "http-status-codes"


const updateCustomerInfo = catchAsync(async(req:Request, res:Response)=>{
    const user = req.user
    const updatableInfo = req.body


    const result = await customerServices.updateCustomerInfoInDB(user, updatableInfo)
    sendResponse(res,{
        statusCode:StatusCodes.OK,
        status:true, 
        message: "Customer Information updated!",
        data: result
    })

})

const updatePassword = catchAsync(async(req:Request, res:Response)=>{
    const user = req.user
    const updatableInfo = req.body

    const result = await customerServices.updatePasswordIntoDB(user, updatableInfo)

    sendResponse(res,{
        statusCode:StatusCodes.OK,
        status:true, 
        message: "Password updated!",
        data: result
    })

})


const getSingleCustomer = catchAsync(async(req:Request, res:Response)=>{
    
    const email = req.params.email
   

    const result = await customerServices.getSingleCustomerIntoDB(email)

    sendResponse(res,{
        statusCode:StatusCodes.OK,
        status:true, 
        message: "Password updated!",
        data: result
    })

})




const updatePreferences = catchAsync(async(req:Request, res:Response)=>{
    const user = req.user
    const updatableInfo = req.body
    

    const result = await customerServices.updatePreferencesIntoDB(user, updatableInfo)

    sendResponse(res,{
        statusCode:StatusCodes.OK,
        status:true, 
        message: "Preferences updated!",
        data: result
    })

})




export const customerController = {
    updateCustomerInfo,
    updatePassword,
    getSingleCustomer,
    updatePreferences

}