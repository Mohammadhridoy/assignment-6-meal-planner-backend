import { model, Schema } from "mongoose";
import { IMeal, IMenus } from "./provider.interface";


const mealSchema = new Schema<IMeal>({
    mealname:{
        type:String,
        required:[true , ' please give meal name'],
        minlength: 3,
        maxlength: 30
    },
    description:{
        type:String
    },
    price:{
        type:String
    },
    category: {
        type: String,
        enum:{
            values:["Veg" , "Non-Veg"], 
            message: '{value } is not correct role!'
        }
    },
    portionSize:{
        type: String,
        enum:{
            values:["Small" , "Medium" , "Large"], 
            message: '{value } is not correct Size!'
        }
    },
    image:{
        type: String,
    },
    tags: {
        type: [String],
        default:[]
    },
    ingredients:{
        type: [String],
        required:[true , ' Give Meal  ingredients'],
        default:[]
    },
    preparationTime: {
        type: String,
    },
    available:{
        type:Boolean,
        default:true
    },
    isDeleted:{ 
        type:Boolean,
        default:false
    }

},
{
    timestamps:true
}

)

const menuPlanSchema = new Schema<IMenus>({
    menuname: {
        type:String,
        required:true
    },
    providerId:{
        type: Schema.Types.ObjectId, ref:"User",
         required:true
       
        },
    mealSlot:{
        type:String,
        enum:["Breakfast","Lunch" ,"Dinner"],
        required: true

    },
    meals:[
        {
            type: Schema.Types.ObjectId,
            ref:"Meal",
            required:true
        }
    ],
    mealPublishDate:{
        type: Date,
        required:[true , ' Give Meal Publish Date'],
    },
    specialNotes: {
        type: String,
    
        },
    isDeleted:{
        type:Boolean
    }
})


export const Meal = model<IMeal>("Meal", mealSchema); 

export const Menu = model<IMenus>("Menu", menuPlanSchema); 

