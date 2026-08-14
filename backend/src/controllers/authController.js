import { User } from '../models/user.models.js'
import jwt from 'jsonwebtoken'
import validator from 'validator'

const registerUser = async (req , res) => {

    try{
        const {email , password} = req.body
        if(!email || !validator.isEmail(email) || !password){
            return res.status(400).json({
                message: 'all fields are required'
            })
        }

        if (password.length < 6) return res.status(400).json({ message: 'password must be at least 6 characters' })

        //findById searches mongoDB on _id
        const existingUser = await User.findOne({email})

        if(existingUser){
            return res.status(409).json({
                message: 'user is already registered'
            })
        }

        const newUser = await User.create({
            email,
            password
        })


        return res.status(201).json({
            message: 'user created successfully',
            user: {id: newUser._id , email: newUser.email}
        })

    }catch(err){
        console.error(err)
        
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
}




const loginUser = async (req , res) => {

    try{
        const {email , password} = req.body
        if(!email || !password){
            return res.status(400).json({
                message: 'all fields are required'
            })
        }


        const user = await User.findOne({email})


        if(!user){
            return res.status(401).json({
                message: 'invalid credentials'
            })
        }


        let correctPassword = await user.comparePassword(password)

        if(!correctPassword){
            return res.status(401).json({ message: 'invalid credentials' })
        }
        

        //token has {payload , secret , options}
        //here payload tells user with _id
        //secret is used to cryptographically sign the token
        //token is for authentication

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        )

        return res.status(200).json({
            message: 'login successful',
            token,
            user: { id: user._id, email: user.email }
        })


    }catch(err){
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
}

export {registerUser , loginUser}