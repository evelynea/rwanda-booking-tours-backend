import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
    {
        tittle:{
           type: String,
        },
        description:{
            type:String,
            required:true,
        },
      seats:{
          type:Number,
          required:true,
      },
      available:{
          type:Number,
      },
      datescheduled:{
          type:Date,
      },
      duedate:{
          type:Date,
      },
      price:{
          type:String,
      },
      user:{
          type:mongoose.Schema.ObjectId,
          ref:"user",
      }//whattt???
      
    },
    {
        timestamps:true,
    }  
);
tourSchema.pre(/^find/,function(next){
    this.populate({
        path:"user",
        select:"lastName email address"
    })
    next();
})
const tour=mongoose.model('tour', tourSchema);

export default tour;