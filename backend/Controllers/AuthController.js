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
        res.status(201).json({ message: "User created successfully", success: true });

    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Internal Server Error", success: false });
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
        const jwtToken = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        res.status(200).json({ message: "Login successful", success: true, jwtToken, email });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
}
module.exports = {
    signup,
    login
}
