"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchPassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const SALT_ROUNDS = 10;
function hashPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt_1.default.hash(password, SALT_ROUNDS, (err, encrypted) => {
            if (err)
                return reject(err);
            resolve(encrypted);
        });
    });
}
exports.hashPassword = hashPassword;
function matchPassword(hash, password) {
    return new Promise((resolve, reject) => {
        bcrypt_1.default.compare(password, hash, (err, same) => {
            if (err)
                return reject(err);
            resolve(same);
        });
    });
}
exports.matchPassword = matchPassword;
