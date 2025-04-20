import { model, Schema } from "mongoose";
import { IUser } from "./auth.interface";
import bcrypt from 'bcrypt'
import config from "../../config";



const userSchema = new Schema<IUser>({
    name:{
        type: String,
        required:[true , ' please give your name'],
        minlength: 3,
        maxlength: 30

    },
    email:{
        type: String, 
        required: [true , 'Give your email'], 
        unique: true, 
        validate: {
            validator: function(value){
                return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value)
            },
            message: `{value} is not a valid email`
        }
    },
    phone:{
        type: String,
        required: [true, 'Give your Phone number!'],
        unique: true
    },
    password:{
        type: String, 
        required: true,
        select:0
    }, 
    role:{
        type: String,
        enum:{
            values:['provider', 'customer'], 
            message: '{value } is not correct role!'
        }
    }, 
    isBlocked:{
        type: Boolean,
        default: false
    },
    needPasswordChange:{
        type: Boolean,
        default: false
    },
    

},{
    timestamps:true
}

)


userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_round))
    next()
})



export const User = model<IUser>("User", userSchema); 