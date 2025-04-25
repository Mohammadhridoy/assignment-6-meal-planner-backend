import { Types } from "mongoose"


export interface IMeal {
    mealname:string 
    description:string
    price: string
    category: "Veg" | "Non-Veg"
    portionSize: "Small" | "Medium" | "Large"
    image: string
    tags: string[]
    ingredients:string[]
    preparationTime: string,
    available?:boolean
    isDeleted?:boolean
   
}

export interface IMenus {
    menuname: string
    providerId: Types.ObjectId,
    mealSlot: "Breakfast"| "Lunch" |"Dinner"
    meals: Types.ObjectId[]
    mealPublishDate: Date,
    specialNotes: string
    isDeleted?:boolean
    
}
