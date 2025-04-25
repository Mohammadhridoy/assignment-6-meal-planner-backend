import { isValidObjectId } from "mongoose";
import { z } from "zod";

const createMeal = z.object({
    body: z.object({
        mealname:z.string(),
        description:z.string(),
        price: z.string(),
        category: z.enum(["Veg" , "Non-Veg"]),
        portionSize: z.enum(["Small" , "Medium" , "Large"]),
        image: z.string(),
        tags: z.array(z.string()),
        ingredients:  z.array(z.string()),
        preparationTime: z.string(),
        available:z.boolean().optional(),
        isDeleted:z.boolean().optional()
        

    })
})


const updateSpecialties = z.object({
    body: z.object({
        cuisinespecialties: z.array(z.string()).optional(),
        availability: z.array(z.string()).optional(),
        price:z.string().optional()
    })
  
})




const menuPlan = z.object({
    body: z.object({
        menuname:z.string(),
        providerId:z.string().refine(isValidObjectId, {message:"Invalid provider ID"}),
        specialNotes: z.string(),
        mealSlot: z.enum(["Breakfast","Lunch" ,"Dinner"]),
        mealPublishDate :z.string().refine((val)=> !isNaN(Date.parse(val)), {message: "Invalid date format"}).transform((val)=> new Date(val)),
        meals:  z.array(z.string().refine(isValidObjectId, {message: "Invalid meal ID"})).min(1),
        isDeleted:z.boolean().optional()
        

    })
})



export const providervalidation = {
    updateSpecialties,
    createMeal,
    menuPlan
}