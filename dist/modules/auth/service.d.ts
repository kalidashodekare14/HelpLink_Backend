export declare const AuthService: {
    registerUser: (payload: any) => Promise<import("mongoose").Document<unknown, {}, import("../../model/user.model").IUser, {}, {}> & import("../../model/user.model").IUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    loginUser: (payload: any) => Promise<{
        token: string;
        user: import("mongoose").Document<unknown, {}, import("../../model/user.model").IUser, {}, {}> & import("../../model/user.model").IUser & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    socialLogin: (payload: any) => Promise<{
        token: string;
        user: import("mongoose").Document<unknown, {}, import("../../model/user.model").IUser, {}, {}> & import("../../model/user.model").IUser & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
};
//# sourceMappingURL=service.d.ts.map