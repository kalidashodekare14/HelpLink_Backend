import { model, Schema } from "mongoose";


export interface IUser {
    image: string,
    name: string,
    email: string,
    password: string,
    role?: "admin" | "donor" | "receiver" | "volunteer",
    location: {
        division: string,
        district: string,
        upazila: string,
        address: string
    },

}

const userSchema = new Schema<IUser>(
    {
        image: { type: String },
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, lowercase: true },
        password: { type: String, required: true, minLength: 6 },
        role: { type: String, enum: ["admin", "donor", "receiver", "volunteer"], default: "receiver" },
        location: {
            division: { type: String },
            district: { type: String },
            upazila: { type: String },
            address: { type: String }
        },
    },
    {
        timestamps: true
    }
);


userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj
}

export const User = model<IUser>("User", userSchema);

