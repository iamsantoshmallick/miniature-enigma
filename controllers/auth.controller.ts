import { type Request, type Response } from "express";
import { signUpSchema, type SignUpInput } from "../validators/user.validator.ts";
import { User } from "../models/user.model.ts";

export const signUp = async(req:Request, res:Response) =>{
    try {
        console.log("Received body:", JSON.stringify(req.body, null, 2));
        //Validating req body with zod
        const validationResult = signUpSchema.safeParse(req.body);

        if(!validationResult.success) {
            const errors = validationResult.error.issues.map(issue => ({
                    field : issue.path.join('.'),
                    message: issue.message,
                }));
                return res.status(400).json({
                    success: false,
                    errors:errors,
                });
        }
        const validatedData: SignUpInput  = validationResult.data;

        //check for existing user 
        const existingUser = await User.findOne({
            email : validatedData.email
        });

        if(existingUser) {
            return res.status(409).json({
                success : false,
                message : 'user with this email already exists',
        });
        }
        const user = await User.create({
            fname : validatedData.fname,
            lname : validatedData.lname,
            email : validatedData.email,
            password : validatedData.password,
            phoneNo : validatedData.phoneNo
        });

        return res.status(201).json({
            success: true,
            data : {
                id: user._id,
                fname : user.fname,
                email: user.email,
            },
        });
    } catch (error) {
        console.error('signup error:', error);
        return res.status(500).json({
            success : false,
            message : 'Internal server error',
        });
    }
}

