import { StatusCodes } from "http-status-codes"
import sendResponse from "../../utils/sendResponse"
import catchAsync from "../../utils/catchAsync"
import { Request, Response } from "express"
import { providerService } from "./provider.service"




const updateSpecialties = catchAsync(async(req:Request, res:Response)=>{
    const user = req.user
    const updatableInfo = req.body
    
     const result = await providerService.updateSpecialtiesIntoDB(user, updatableInfo)

    sendResponse(res, {
        statusCode:StatusCodes.OK,
        status:true, 
        message: "Provider specialties updated!",
        data: result
    })

})


const createMeal = catchAsync(async(req:Request, res:Response) =>{


    const result = await providerService.createMealIntoDB(req.body)

    sendResponse(res, {
        statusCode:StatusCodes.OK,
        status:true, 
        message: "Meal create successfully",
        data: result
    })


})


const getAllMeals = catchAsync(async(req:Request, res:Response) =>{


    const result = await providerService.getallmealsFromDB()

    sendResponse(res, {
        statusCode:StatusCodes.OK,
        status:true, 
        message: "Meal create successfully",
        data: result
    })


})

const  updateMealData = catchAsync(async(req:Request, res:Response) =>{
        const id = req.params.id
        const mealData = req.body

    const result = await providerService.updateMealDataIntoDB(id, mealData)

    sendResponse(res, {
        statusCode:StatusCodes.OK,
        status:true, 
        message: "Meal Updated successfully",
        data: result
    })


})


const createMenus = catchAsync(async(req:Request, res:Response) =>{


    const result = await providerService.createMenuIntoDB(req.body)

    sendResponse(res, {
        statusCode:StatusCodes.OK,
        status:true, 
        message: "Menu create successfully",
        data: result
    })


})


const getAllMenus = catchAsync(async(req:Request, res:Response) =>{
    
  
    const result = await providerService.getAllMenusFromDB(req.query)

    sendResponse(res, {
        statusCode:StatusCodes.OK,
        status:true, 
        message: "Menus get  successfully",
        data: result
    })


})



export const providerController = {
    updateSpecialties,
    createMeal,
    getAllMeals,
    updateMealData,
    createMenus,
    getAllMenus 
}