import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate"
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
        default:false,
        required: true
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

customerSchema.plugin(mongoosePaginate);
export default mongoose.model("Customer", customerSchema)