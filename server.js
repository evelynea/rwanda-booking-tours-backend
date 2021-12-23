import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv"
import mongoose from "mongoose"
import userRoutes from "./src/routes/userRoutes"
import tourRoute from "./src/routes/tourRouter";

dotenv.config("./.env");

const app= express();
app.use(bodyParser.json());
app.use("/user", userRoutes);
app.use("/tours", tourRoute)

app.use("/",(req,res)=> res.status(200).json({
    message:"this is Tour Api, what's up"
    // message:"how are you feeling today"
}));

const dbUrl= process.env.DATABASEURL;
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
}).then(()=> console.log("Database connected succesful"));

app.listen(3030,()=>{
    console.log(`server is running on port 3030`);
})

export default app;