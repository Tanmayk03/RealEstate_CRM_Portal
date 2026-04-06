const UserModel = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');    

const signup = async(req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists", success: false });
        }
        const userModel = new UserModel({name, email, password});
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        const role = userModel.role || 'user';
        const jwtToken = jwt.sign(
            { id: userModel._id, email: userModel.email, name: userModel.name, role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        res.status(201).json({
            message: "User created successfully",
            success: true,
            jwtToken,
            user: { email: userModel.email, name: userModel.name, role },
        });

    }catch(err){
        console.error(err);
        const msg =
            err.name === "MongoServerError" || err.name === "MongoNetworkError"
                ? "Database error. Check MongoDB is running and MONGO_URI is correct."
                : "Internal Server Error";
        res.status(500).json({ message: msg, success: false });
    }

}
const login = async (req, res) => {
    try {
        const {  email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: "Invalid credentials", success: false });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(403).json({ message: "Invalid credentials", success: false });
        }
        const role = user.role || 'user';
        const jwtToken = jwt.sign(
            { id: user._id, email: user.email, name: user.name, role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            user: { email: user.email, name: user.name, role },
        });
    } catch (err) {
        console.error(err);
        const msg =
            err.name === "MongoServerError" || err.name === "MongoNetworkError"
                ? "Database error. Check MongoDB is running and MONGO_URI is correct."
                : "Internal Server Error";
        res.status(500).json({ message: msg, success: false });
    }
}
module.exports = {
    signup,
    login
}
