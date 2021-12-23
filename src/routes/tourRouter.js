import express from "express";
import tourController from "../controllers/tourController";
import validator from "../middlewares/validator";
import verifyAccess from "../middlewares/verifyAccess";
import verifyToken from "../middlewares/verifyToken"

const tourRoute= express.Router();
tourRoute.post("/registertour", 
verifyToken,
verifyAccess("admin"),
validator.newAccountTourRules(),
validator.validateInput,
tourController.createTours),

tourRoute.get("/all", tourController.getAllTours),
tourRoute.get("/:id", tourController.getOneTour),
tourRoute.delete("/:id", tourController.deleteTour)




export default tourRoute;

