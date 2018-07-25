import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate"


const { Schema } = mongoose;
const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        //trim: true,
        //minlength: 5,
        //maxlength: 255
    },
    /*kind: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre",
        required: true
    },*/
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }, 
    /*vipCustomer: {
        type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true
    }*/
})

movieSchema.plugin(mongoosePaginate)
export default mongoose.model('Movie', movieSchema)