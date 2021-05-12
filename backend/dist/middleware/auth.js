"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jwt_1 = require("../utils/jwt");
const SECRET_KEY = "karma-is-a-bitch";
// authorise the token valid or not
async function auth(req, res, next) {
    var _a, _b;
    const authHeader = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ');
    const cookies = (_b = req.headers.cookie) === null || _b === void 0 ? void 0 : _b.split(';');
    // check if authorisation header exists
    if (!authHeader && !cookies)
        return res.status(401).json({
            errors: {
                body: ['Authorisation failed', 'Not authorized user']
            }
        });
    // check if header is jwt or not
    if (authHeader && authHeader[0] != 'jwt')
        return res.status(401).json({
            errors: {
                body: ['Authorisation failed', 'Token Missing']
            }
        });
    // decode the token
    let token = '';
    if (authHeader) {
        token = authHeader[1];
    }
    else if (cookies) {
        const cookie = cookies[0].split('=');
        token = cookie[1];
    }
    try {
        const user = await jwt_1.decodeToken(token);
        if (!user)
            throw new Error("User not found in token");
        req.user = user;
        return next();
    }
    catch (e) {
        return res.status(401).json({
            errors: {
                body: ['Authorisation failed', e]
            },
        });
    }
}
exports.auth = auth;
