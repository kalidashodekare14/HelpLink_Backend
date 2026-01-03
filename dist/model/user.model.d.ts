export interface IUser {
    image: string;
    name: string;
    email: string;
    password: string;
    isSocial: boolean;
    role?: "admin" | "donor" | "receiver" | "volunteer";
    isActive: boolean;
    gender: string;
    location: {
        division: string;
        district: string;
        upazila: string;
        address: string;
    };
}
export declare const User: import("mongoose").Model<IUser, {}, {}, {}, import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
//# sourceMappingURL=user.model.d.ts.map