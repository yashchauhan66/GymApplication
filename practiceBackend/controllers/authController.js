import User from "../Model/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
export const signupHandler =async (req,res)=>{
    console.log(req.body)
    const {name,email,password} = req.body;// frontend data
    if(!name || !email || !password){
        return res.status(400).json({message: "All fields are required"});
    }
    console.log(password)
    const hassPassword=await bcrypt.hash(password, 10);
    const user = new User({
        name,
        email,
        password: hassPassword,
    });
    await user.save()
    res.status(201).json({message: "User created successfully"});
    console.log(name,email,password)
}


export const loginHandler=async (req,res)=>{
    const {email,password}=req.body;
    // console.log(req.body)
    // console.log(email,password)
    const user= await User.findOne({email});
    
    if(!user){
        return res.status(404).json({message: "User not found"});
        console.log("User not found");
    }

    const isMatch = bcrypt.compare(password ,user.password);

    if(!isMatch){
        return res.status(400).json({message: "Invalid credentials"});
    } 
    
    const token=jwt.sign(
     {email,password: user.password
     },
     'secret1243',
     {expiresIn: '7d'}
    )
    res.status(200).json({message: "Login successful", token});
    console.log("Login successful", token); 
}   
