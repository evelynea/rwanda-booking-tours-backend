import {check, validationResult} from "express-validator"
class validator{
    static validateInput=(req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const errorMessage=errors.errors.map((err)=>err.msg);
            return res.status(400).json({message:errorMessage})
        }
        return next();
    };
    static newAccountRules(){
        return[
            check("email","email is invalid").trim().isEmail(), //trim function removes the space before/after the email
            check("password","weak password").trim().isStrongPassword(),
            check("lastname","lastname should be valid").trim().isAlpha(),
            check("gender","gender should be female, male, other, or prefer not to say")
            .trim().isIn(["male","female","other","prefer not to say"]),
        ];
    }
    static newAccountTourRules(){
        return[
            check("title","title is invalid").trim().isAlpha(), 
            check("seats","seats should be a number").trim().isNumeric(), 
            check("available","available seats should be numbers").trim().isNumeric(), 
            check("dateScheduled","date should be valid").trim().isDate(), 
            check("dueDate","Due date should be valid").trim().isDate(), 
            check("price","price is invalid").trim().isNumeric(), 
        ];
    }
}
export default validator;