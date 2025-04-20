import { z } from "zod";

const createUserValidationSchema = z.object({
    body: z.object({
        name: z.string({required_error: "Name is required!"}),
        email: z.string({required_error:"Email is required!"}).email(),
        phone:z.string({required_error: "Phone number is required"}),
        password: z.string({required_error:"Password is required"}),
        role : z.enum(['customer', 'provider']),
        isBlocked: z.boolean().optional(), 
        needPasswordChange: z.boolean().optional()
    })
  
})


const loginValidaton = z.object({
    body: z.object({
        email:z.string({
            required_error: "Email must be provided and must be a string"
        }).email(),
        password:z.string({required_error: "Password is required"})
    })
})





export const userValidation = {
    createUserValidationSchema,
    loginValidaton
 
}