import mongoose from "mongoose";
const movie_schema=new mongoose.Schema({
    Movie_Title:{type:String},
    Genre:{type:String},
    Rating:{type:Number},
    Release_Date:{type:String},
    Languages:{type:String},
    Description:{type:String},
    Movie_Banner:{type:String},
    Movie_Poster:{type:String}
})

export default mongoose.model.Movies||mongoose.model("Movie",movie_schema)