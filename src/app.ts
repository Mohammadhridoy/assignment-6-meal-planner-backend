import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { StatusCodes } from 'http-status-codes'
import cookieParser from 'cookie-parser'
import globalErrorHandler from './Middlewares/globalErrorHandler'
import authRouter from './modules/auth/auth.router'
import customerRouter from './modules/customer/customer.router'


const app:Application = express()



// middleware 
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: 'http://localhost:3000',  credentials:true}))


app.use('/api/auth', authRouter)
app.use('/api/customer', customerRouter)




app.get('/', (req: Request, res: Response)=>{
    res.send("Meal planner website server is running!")
})

// //  Global error handler 
app.use(globalErrorHandler)

// //  Not found route 
// app.use('*', (req:Request, res:Response) =>{
//     res.status(StatusCodes.NOT_FOUND).json({
//         status:false,
//         message:"Route Not Found!", 
//     })
// }
// )

export default app; 