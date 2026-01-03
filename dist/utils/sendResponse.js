"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    res.status(data.success ? 200 : 400).json(data);
};
exports.default = sendResponse;
//# sourceMappingURL=sendResponse.js.map