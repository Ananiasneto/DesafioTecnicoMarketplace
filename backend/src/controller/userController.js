import { getUserService, signInService,signUpService } from "../service/userService.js";

export async function signIn(req, res, next) {
    const { email, password } = req.body;
    try {
        const user = await signInService({ email, password });
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }   
}
export async function signUp(req, res, next) {
    const { name, email, password,phone} = req.body;
    const imageUrl = req.file ? req.file.filename : null;
    try {
        const user = await signUpService({ email, password, name, phone, imageUrl });
        return res.status(201).json(user);
    } catch (error) {
        next(error);
    }   
}
export async function getUser(req, res, next) {
    const userId = parseInt(req.params.id);
    try {
        const user = await getUserService(userId);
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }   
}