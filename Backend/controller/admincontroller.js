import { hash } from "bcrypt";
import { createAdmin } from "../model/adminmodel.js";
import { hashPassword } from "../utils/hash.js";

export const addAdmin = async (req, res) => {
    const{ email,username,password}= req.body;

    if (!email || !username || !password){
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }

    try{
        const hashedPassword= await hashPassword(password);

        const adminId= await createAdmin(email, username, hashedPassword);
        res.status(201).json({
            success: true,
            message: "Admin added successfully",
            userId,
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to add admin",
            error: error.message
        })

    }
};