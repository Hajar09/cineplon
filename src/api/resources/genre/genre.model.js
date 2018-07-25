import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate"

const { Schema } = mongoose;
const  genreSchema  = new Schema({
    kind: {
        type: String,
        required: true
    },
    movies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true
    }]
    /*ctomer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    }*/
})

genreSchema.plugin(mongoosePaginate);

export default mongoose.model("Genre", genreSchema)
