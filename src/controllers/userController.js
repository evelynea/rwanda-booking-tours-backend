import TokenAuth from "../helpers/tokenAuth";
import  UserInfos from "../models/user";
import bcrypt from "bcrypt"
import BookInfos from "../models/book"
import tourInfos from "../models/tours"

//a class is a container of functions to be able to access them in css in UI but her it is used to hold more than one function in a controller
class UserController{
    //creating a user in DB
    static async createUser(req,res){
        const hashPassword = bcrypt.hashSync(req.body.password, 10)//???10??why??//////////////////////////
        req.body.password =hashPassword
        const user= await UserInfos.create(req.body);// returns generated data
        if (!user){
            return res.status(404).json({error:"user not registered"})
        }
        return res.status(200).json({ message:"User created successfully", data: user});//??????????????
    }
    //getting all users
    static async getAllUsers(req,res){
        const user= await UserInfos.find();
        if (!user){
            return res.status(404).json({error:"user not registered"})
        }
        return res.status(200).json({ message:"User created successfully", data: user});
    } 

    
    //getting one user
    static async getOneUser(req,res){
        const user= await UserInfos.findById(req.params.id);
        if (!user){
            return res.status(404).json({error:"user not registered"})
        }
        return res.status(200).json({ message:"User created successfully", data: user});
    } 

    //deleting a user
    static async deleteOneUser(req,res){
        const user= await UserInfos.findByIdAndDelete(req.params.id);
        if (!user){
            return res.status(404).json({error:"user not deleted"})
        }
        return res.status(200).json({ message:"User deleted successfully", data: user});
    } 
    //login function
    static async userLogin(req,res){
        const user=await UserInfos.findOne({email:req.body.email})
        if(!user){
            return res.status(404).json({error:"user not found! kindly first register"})// compare hashed data and entered data
        }
        if (bcrypt.compareSync(req.body.password, user.password)){
            user.password=null
            const token = TokenAuth.tokengenerator({user:user});
            return res.status(200).json({message:"successfully logged in", token: token});
        }
        return res.status(400).json({error:"wrong password"})
    }

    //booking function
    static async bookTour(req,res){
        const bookData={
            user:req.user._id,
            tour:req.params.id
        }
        const book=await BookInfos.create(bookData)
        const tour= await TourInfos.findById(req)
        const tourSeats = tour.Seats -1;
        await tourInfos.finsByIdAndUpdate(req.params.id,{Seats: tourSeats})
        
        if (!book){
        return res.status(400).json({error:"failed to book"})
        }
        return res.status(200).json({message:"booked successfully",data:book})

    }

    //getting users who booked
    static async getAllBookings (req,res){
        const books = await BookInfos.find();
        if(!books)
        return res.status(400).json({error:"no bookings available"})
    
    return res.status(200).json({message:"booking successfully retrieved",data:books})

    }

    //getting people whwo booked a particular tour
    static async getAllBookingsByTourId(req,res){
        const books= await BookInfos.find({tour:req.params.idtour})
        if(!books){
            return res.status(400).json({error:"books not found"})
        }
    return res.status(200).json({message:"success",data:books})

    }
    //all tours booked by a user
    static async getAllBookingsByUserId(req,res){
        const books= await BookInfos.find({user:req.params.iduser})
        
        if(!books){
            return res.status(400).json({error:"books not found"})
        }
    return res.status(200).json({message:"success",data:books})
    }
    
}
    export default UserController;

    //controller is the one directly connected on database