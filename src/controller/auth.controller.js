
import authService from '../service/auth.service.js';

export const registerController = async (req, res, next) => {
    const { name, email, password, phone } = req.body;

    if (!name || !email | !password | !phone) {
        return res.status(404).json({
            message: "Invalid Data",
        });
    }

    try {

        const user = await authService.registerService({ name, email, password, phone })

        res.status(201).json({ message: "user created successfully", user });

    } catch (err) {
        next(err);
    }
}

export const loginController = async function (req, res, next) {
    const { email, password } = req.body;
    if (!email | !password) {
        return res.status(404).json({
            message : "email and password required",
        });
    }


    try {

        const token = await authService.loginService({email, password})

        res.json({
            message: 'logIn successful',
            user: token,
        })
    } catch (err) {
        next(err)
    }
}