"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getCurrentUser = void 0;
// @collaps
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
const password_1 = require("../utils/password");
const security_1 = require("../utils/security");
// get current user
async function getCurrentUser(email) {
    // here is some data
    if (!email)
        throw new Error("Email is undefined");
    const repo = typeorm_1.getRepository(User_1.User);
    try {
        const user = await repo.findOne(email);
        if (!user)
            throw new Error('User not found');
        return security_1.sanitizeFields(user);
    }
    catch (e) {
        throw e;
    }
}
exports.getCurrentUser = getCurrentUser;
// update current user
async function updateUser(email, newData) {
    if (!newData)
        throw new Error('Updating fields are empty');
    try {
        const user = await getCurrentUser(email);
        if (!user)
            throw new Error('User not found');
        if (newData.image)
            user.image = newData.image;
        if (newData.bio)
            user.bio = newData.bio;
        if (newData.username)
            user.username = newData.username;
        if (newData.password)
            user.password = await password_1.hashPassword(newData.password);
        const repo = typeorm_1.getRepository(User_1.User);
        const newUser = await repo.save(user);
        return security_1.sanitizeFields(newUser);
    }
    catch (e) {
        throw e;
    }
}
exports.updateUser = updateUser;
