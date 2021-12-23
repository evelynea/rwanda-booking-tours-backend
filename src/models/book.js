import mongoose from "mongoose"
const bookSchema= new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        ref:"User"
    },
    tour:{
        type: mongoose.Schema.ObjectId,
        ref:"tour"
    },
    status:{
        type: mongoose.Schema.ObjectId,
        enum:["pending","accepted","declined","cancel"],
        ref:"pending"
    },
},
{
    timestamps:true
})
bookSchema.pre(/^find/,function(next){
    this.populate({
        path:"user",
        select:"firstName lastName email gender address"
    }).populate({
        path:"tour",
    });
    next();
});
const Book= mongoose.model("Book", bookSchema);
export default Book;
