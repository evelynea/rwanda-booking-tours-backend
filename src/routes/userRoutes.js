import express from "express";
import UserController from "../controllers/userController";
import validator from "../middlewares/validator";
import DataChecker from "../middlewares/dataChecker";
import verifyAccess from "../middlewares/verifyAccess";
import verifyToken from "../middlewares/verifyToken"

const userRoute= express.Router();
userRoute.post("/register",
validator.newAccountRules(),
validator.validateInput,
DataChecker.isEmailExist,
UserController.createUser)
userRoute.get("/all", UserController.getAllUsers)
userRoute.get("/:id", UserController.getOneUser)
userRoute.delete("/:id", UserController.deleteOneUser)
userRoute.post("/login", UserController.userLogin)

//booking path
userRoute.post("/book/:id",verifyToken,verifyAccess("user"), UserController.bookTour);
userRoute.patch("/book/status", verifyToken, verifyAccess("admin"), UserController.changeBookStatus)

userRoute.get("/books/all", UserController.getAllBookings)
userRoute.get("/books/:idtour",verifyToken,verifyAccess("admin"), UserController.getAllBookingsByTourId)
userRoute.get("/books/userId",verifyToken,verifyAccess("user"), UserController.getAllBookingsByUserId)



export default userRoute;