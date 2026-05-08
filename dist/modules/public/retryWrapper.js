"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
const generateWithRetry = async (fn, retries = 2) => {
    try {
        return await fn();
    }
    catch (err) {
        if (retries === 0)
            throw err;
        await sleep(2000);
        return generateWithRetry(fn, retries - 1);
    }
};
exports.default = generateWithRetry;
//# sourceMappingURL=retryWrapper.js.map