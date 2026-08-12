import mongoose , {Schema} from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    }
}, 
{
    timestamps: true
})

//this is a mongoose pre-save hook. automatically hash a user's password before the user document is saved
//'this' cannot be used with =>. function has to be used explicitly
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next()

    //10 is salt rounds or cost factor
    this.password = await bcrypt.hash(this.password , 10)
    next()
})



userSchema.methods.comparePassword = async function(inputPassword){
    return await bcrypt.compare(inputPassword , this.password)
}



export const User = mongoose.model("User" , userSchema)