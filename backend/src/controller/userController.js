import { signInService } from "../service/userService.js";

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