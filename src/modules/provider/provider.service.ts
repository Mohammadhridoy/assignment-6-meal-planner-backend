import { JwtPayload } from "jsonwebtoken"
import { User } from "../auth/auth.model"
import { Meal, Menu } from "./provider.model"
import { IMeal, IMenus } from "./provider.interface"
import QueryBuilder from "../../Builder/QueryBuilder"



type TSpecialties = {
    cuisinespecialties: string[]
    availability: string[]
    price:string
}


const updateSpecialtiesIntoDB = async(userData:JwtPayload| undefined, payload: TSpecialties ) =>{

     
     const specialtiesUpdate:any ={ }
     if(payload.cuisinespecialties !== undefined){
        specialtiesUpdate["specialties.cuisinespecialties"] = payload.cuisinespecialties
     }
     if(payload.availability !== undefined ){
        specialtiesUpdate["specialties.availability"] = payload.availability
     }
     if(payload.price !== undefined) {
        specialtiesUpdate["specialties.price"] = payload.price
     }

    const result  = await User.findOneAndUpdate(
        {email: userData?.email},
        {$set: specialtiesUpdate},
        {new:true, runValidators:true}
    )

    return result


}



const createMealIntoDB = async(mealdata:IMeal) =>{

  

    const result = await Meal.create(mealdata)
    return result

}


const getallmealsFromDB = async() =>{
    const result = await Meal.find({isDeleted: "false"})
    return result
}

// update Meal data 
const updateMealDataIntoDB  = async( id:string, payload:IMeal ) =>{

     console.log(payload);
    const mealDataUpdate:any ={ }

    if(payload.mealname !== undefined){
        mealDataUpdate["mealname"] = payload?.mealname
    }
    if(payload.image !== undefined){
        mealDataUpdate["image"] = payload?.image
    }
    if(payload.category !== undefined){
        mealDataUpdate["category"] = payload?.category
    }
    if(payload.description !== undefined){
        mealDataUpdate["description"] = payload?.description
    }
    if(payload.preparationTime !== undefined){
        mealDataUpdate["preparationTime"] = payload?.preparationTime
    }
    if("available" in payload){
        mealDataUpdate["available"] = payload.available
    }
    if( Array.isArray(payload.tags) && payload.tags.length !== 0 ){
        mealDataUpdate["tags"] = payload?.tags
    }  
    if( Array.isArray(payload.ingredients) && payload.ingredients.length !== 0 ){
        mealDataUpdate["ingredients"] = payload?.ingredients
    } if(payload.portionSize !== undefined){
        mealDataUpdate["portionSize"] = payload?.portionSize
    }
    if(payload.price !== undefined){
        mealDataUpdate["price"] = payload?.price
    }
    if(payload.isDeleted){
        mealDataUpdate["isDeleted"] = payload.isDeleted
    }
  
   

    console.log("down",mealDataUpdate);

   const result  = await Meal.findOneAndUpdate(
       {_id: id},
       {$set: mealDataUpdate},
       {new:true, runValidators:true}
   )

   return result


}


const createMenuIntoDB = async(menudata:IMenus) =>{

   
  

    const result = await Menu.create(menudata)
    return result

}

const getAllMenusFromDB = async(query:Record<string, unknown>) =>{ 

    



    const searchField = ["portionSize", "mealname", "category","ingredients","menuname"]


    const carQuery = new QueryBuilder(Menu.find().populate('meals').populate('providerId'), query)
    .search(searchField).filter()

    const result = await carQuery.modelQuery
   
    return result; 

  
}




export const providerService = {
    updateSpecialtiesIntoDB,
    createMealIntoDB,
    getallmealsFromDB,
    updateMealDataIntoDB,
    createMenuIntoDB,
    getAllMenusFromDB
}


