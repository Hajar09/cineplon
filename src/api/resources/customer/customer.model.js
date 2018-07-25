import mongoose from "mongoose"
const { Schema } = mongoose;

export const STANDARD_ROLE = false
export const GOLD_ROLE = true;

const customerSchema = new Schema({
    name: {
        type: String,
        required: true,
        //minlength: 5,
        //maxlength: 50
    },
    isGold: {
        type: Boolean,
        default:false
    },
    phone: {
        type: String,
        required: true,
        //minlength: 5,
        //maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    }
})

export default mongoose.model("Customer", customerSchema)