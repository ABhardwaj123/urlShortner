import mongoose , {Schema} from "mongoose";

const urlSchema = new Schema({

        url: {
            type: String,
            required: true,
        },

        shortCode: {
            type: String,
            required: true,
            unique: true
        },

        accessCount: {
            type: Number,
            default: 0
        }


    },

    {
        timestamps: true
    }
)

export const Url = mongoose.model("Url" , urlSchema)