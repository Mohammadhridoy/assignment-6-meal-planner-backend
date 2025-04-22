import { Router } from "express";
import { customerController } from "./customer.controller";
import auth from "../../Middlewares/auth";
import validateRequst from "../../Middlewares/validateRequest";
import { customerValidation } from "./customer.Validation";



const customerRouter = Router()


customerRouter.patch('/update', auth('customer'), validateRequst(customerValidation.updateCustomer),   customerController.updateCustomerInfo)
customerRouter.put('/updatepassword', auth('customer'), customerController.updatePassword )
customerRouter.patch("/updatepreferences", auth('customer'), validateRequst(customerValidation.updatePreferences), customerController.updatePreferences)
customerRouter.get("/singleuser/:email", customerController.getSingleCustomer)


export default customerRouter; 

// , 