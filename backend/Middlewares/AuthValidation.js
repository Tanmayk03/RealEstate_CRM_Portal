const Joi = require('joi');

const signupValidation =  (req,res,next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(100).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        const msg = error.details.map((d) => d.message.replace(/"/g, "")).join(" ");
        return res.status(400).json({ message: msg, success: false });
    }
    next();
}
const loginValidation =  (req,res,next) => {
    const schema = Joi.object({
        password: Joi.string().min(6).max(100).required(),
        email: Joi.string().email().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        const msg = error.details.map((d) => d.message.replace(/"/g, "")).join(" ");
        return res.status(400).json({ message: msg, success: false });
    }
    next();
}
module.exports = { signupValidation, loginValidation };