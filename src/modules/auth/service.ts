import bcrypt from 'bcrypt'
import { User } from '../../model/user.model';
import jwt from 'jsonwebtoken';
import { config } from '../../config/env';

export const AuthService = {
    registerUser: async (payload: any) => {
        const { name, email, password } = payload;
        const hashPassword = await bcrypt.hash(password, 14);
        const user = await User.create({ name: name, email: email, password: hashPassword });
        return user
    },
    loginUser: async (payload: any) => {
        const { email, password } = payload;
        const user = await User.findOne({ email }).select("+password");
        if (!user) throw new Error("User not found");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid Crenentials");

        const token = jwt.sign({ id: user._id, email: user.email }, config.jwt_secret, {
            expiresIn: "7d"
        })

        return { token, user };
    }
}