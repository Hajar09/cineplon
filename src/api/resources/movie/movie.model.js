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
    //genre: {
        //type: String, //à lier avec les genres quand la catégorie est faite
        //required: true
    //},
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
    }
})

movieSchema.plugin(mongoosePaginate)
export default mongoose.model('Movie', movieSchema)