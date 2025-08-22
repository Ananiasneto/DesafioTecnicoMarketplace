import { signInService,signUpService } from "../service/userService.js";

export async function signIn(req, res) {
    const { email, password } = req.body;
    try {
        const user = await signInService({ email, password });
        return res.status(200).json(user);
    } catch (error) {
        if (error.message === 'User not found' || error.message === 'Invalid password') {
            return res.status(401).json({ message: error.message });
        }
        console.error('Error during sign-in:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }   
}
export async function signUp(req, res) {
    const { name, email, password,phone} = req.body;
    const imageUrl = req.file ? req.file.path : null;
    try {
        const user = await signUpService({ email, password, name, phone, imageUrl });
        return res.status(201).json(user);
    } catch (error) {
        if (error.message === 'Email already exists' || error.message === 'Failed to create user') {
            return res.status(401).json({ message: error.message });
        }
        console.error('Error during sign-up:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }   
}