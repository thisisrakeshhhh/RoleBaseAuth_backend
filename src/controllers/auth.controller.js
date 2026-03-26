//all the api logic will be written here for the routerfiles
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) {
    try {
        const { username, email, password, role = "user" } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Username, email, and password are required",
            });
        }

        const isUserAlreadyExist = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        });

        if (isUserAlreadyExist) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hash,
            role
        });

        const token = jwt.sign({
            id: user._id,
            role: user.role,
        }, process.env.JWT_SECRET);

        res.cookie("token", token);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            }
        });

    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

async function loginUser(req, res) {

    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    })
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid credentials",
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);


    if (!isPasswordValid) {
        return res.status(401).json({})
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role,
    }, process.env.JWT_SECRET)

    res.cookie("token", token);


    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        }
    })


}

module.exports = { registerUser, loginUser };


// query = {
//     $or: [
//         {username: username},
//         {email: email}
//     ]
// }