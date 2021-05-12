"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = "karma-is-a-bitch";
async function generateToken(user) {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign({
            email: user.email,
            password: user.password
        }, SECRET_KEY, (err, encoded) => {
            if (err)
                return reject(err);
            resolve(encoded);
        });
    });
}
exports.generateToken = generateToken;
async function decodeToken(token) {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, SECRET_KEY, (err, decoded) => {
            if (err)
                return reject(err);
            else
                return resolve(decoded);
        });
    });
}
exports.decodeToken = decodeToken;
