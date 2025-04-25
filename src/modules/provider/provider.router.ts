import { Router } from "express";
import auth from "../../Middlewares/auth";
import validateRequst from "../../Middlewares/validateRequest";
import { providervalidation } from "./provider.validation";
import { providerController } from "./provider.controller";



const providerRouter = Router()

providerRouter.post("/createmeal", auth('provider'), 
validateRequst(providervalidation.createMeal), providerController.createMeal )

providerRouter.post("/createmenus", auth('provider'), validateRequst(providervalidation.menuPlan) ,
providerController.createMenus )

providerRouter.patch("/updatespecialties", auth('provider'),
 validateRequst(providervalidation.updateSpecialties), providerController.updateSpecialties )

providerRouter.get('/getallmeals', providerController.getAllMeals)
providerRouter.patch('/meal/update/:id', auth('provider'), providerController.updateMealData)

providerRouter.get("/getallmenus", providerController.getAllMenus )


export default providerRouter