import bcrypt from "bcryptjs";
import { User } from '../../model/user.model';
import jwt from 'jsonwebtoken';
import { config } from '../../config/env';

export const AuthService = {
    registerUser: async (payload: any) => {
        const { name, email, password, role } = payload;
        const hashPassword = await bcrypt.hash(password, 14);
        const queryUser = await User.findOne({ email: email });
        if (queryUser) {
            throw Error("User already exits");
        }
        const user = await User.create(
            {
                name: name,
                email: email,
                password: hashPassword,
                role: role
            }
        );
        return user
    },
    loginUser: async (payload: any) => {
        const { email, password } = payload;
        const user = await User.findOne({ email }).select("+password");
        if (!user) throw new Error("User not found");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid Crenentials");

        if (user.isActive === false) {
            throw new Error("Your account has been disabled")
        }

        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, config.jwt_secret, {
            expiresIn: "7d"
        })

        return { token, user };
    },
    socialLogin: async (payload: any) => {
        const { name, email, image } = payload;
        const user = await User.findOne({ email })
        if (!user) {
            const saveUser = await User.create(
                {
                    name: name,
                    email: email,
                    image: image,
                    isSocial: true,
                }
            )
            const token = jwt.sign(
                { id: saveUser?._id, email: saveUser?.email, role: saveUser?.role },
                config.jwt_secret,
                { expiresIn: "7d" }
            );
            return {
                token,
                user: saveUser
            }
        }

        const token = jwt.sign(
            { id: user?._id, email: user?.email, role: user?.role },
            config.jwt_secret,
            { expiresIn: "7d" }
        );

        return {
            token,
            user: user
        }

    }
}