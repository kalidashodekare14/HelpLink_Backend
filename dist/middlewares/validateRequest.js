"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateRequest = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params
        });
        next();
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Validation Error",
            errors: error.errors,
        });
    }
};
exports.default = validateRequest;
//# sourceMappingURL=validateRequest.js.map