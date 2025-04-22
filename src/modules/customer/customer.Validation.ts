import {  z } from "zod";


const updateCustomer = z.object({
    body: z.object({
        name:z.string({required_error: "Name is required!"})
        .min(2, "Name must be between 2 and 50 characters")
        .max(50, "Name must be between 2 and 50 characters").optional(),
        email: z.string({required_error:"Email is required!"}).email("Invalid email address").optional(),
        phone: z.string({required_error: "Phone number is required"}).min(11, "Enter 11 digit phone number").max(11).optional(),
        address: z.string({required_error:"Give delivery address"}).optional(),
    })
  
})

const updatePreferences = z.object({
    body: z.object({
        dietaryRestrictions: z.array(z.string()).optional(),
        preferredCuisines: z.array(z.string()).optional(),
        portionSize:z.enum(["small", "medium", "large"]).optional()
    })
  
})





export const customerValidation = {
    updateCustomer,
    updatePreferences

}