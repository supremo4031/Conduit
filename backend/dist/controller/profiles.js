"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFollowings = exports.getAllFollowers = exports.unfollowUser = exports.followUser = exports.getUserByUsername = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
const security_1 = require("../utils/security");
// get user by username
async function getUserByUsername(username) {
    if (!username)
        throw new Error('Username does not exist');
    try {
        const repo = typeorm_1.getRepository(User_1.User);
        const user = await repo.findOne({
            where: {
                username: username
            }
        });
        if (!user)
            throw new Error('User not found');
        return user;
    }
    catch (e) {
        throw e;
    }
}
exports.getUserByUsername = getUserByUsername;
// follow user
async function followUser(username, email) {
    if (!username)
        throw new Error('Username does not exist');
    if (!email)
        throw new Error('Not an authenticated user');
    try {
        const repo = typeorm_1.getRepository(User_1.User);
        const user = await repo.findOne({
            where: {
                username: username,
            },
            relations: ['followers']
        });
        if (!user)
            throw new Error('User not found');
        const curUser = await repo.findOne(email);
        if (!curUser)
            throw new Error('Not an authenticated user');
        user.followers.push(curUser);
        user.followersCount += 1;
        const newUser = await repo.save(user);
        if (!newUser)
            throw new Error('Cannot add to followers');
        curUser.followingsCount += 1;
        const newCurUser = await repo.save(curUser);
        if (!newCurUser)
            throw new Error('Cannot increase followings count');
        return security_1.sanitizeFields(curUser);
    }
    catch (e) {
        throw e;
    }
}
exports.followUser = followUser;
// unfollow user
async function unfollowUser(username, email) {
    if (!username)
        throw new Error('Username does not exist');
    if (!email)
        throw new Error('Not an authenticated user');
    try {
        const repo = typeorm_1.getRepository(User_1.User);
        const user = await repo.findOne({
            where: {
                username: username,
            },
            relations: ['followers'],
        });
        if (!user)
            throw new Error('User not found');
        const curUser = await repo.findOne(email);
        if (!curUser)
            throw new Error('Not an authenticated user');
        const newFollowers = user.followers.filter(u => {
            return u.email != email;
        });
        user.followers = newFollowers;
        user.followersCount -= 1;
        const newUser = await repo.save(user);
        if (!newUser)
            throw new Error('Cannot add to followers');
        curUser.followingsCount -= 1;
        const newCurUser = await repo.save(curUser);
        if (!newCurUser)
            throw new Error('Cannot decrease followings count');
        return security_1.sanitizeFields(curUser);
    }
    catch (e) {
        throw e;
    }
}
exports.unfollowUser = unfollowUser;
// get all followers
async function getAllFollowers(email) {
    if (!email)
        throw new Error('Not an authenticated user');
    try {
        const repo = typeorm_1.getRepository(User_1.User);
        const curUser = await repo.findOne(email, {
            relations: ['followers']
        });
        if (!curUser)
            throw new Error('Not an authenticated user');
        const allFollowers = curUser.followers.map(u => { return security_1.sanitizeFields(u); });
        return allFollowers;
    }
    catch (e) {
        throw e;
    }
}
exports.getAllFollowers = getAllFollowers;
// get all followings
async function getAllFollowings(email) {
    if (!email)
        throw new Error('Not an authenticated user');
    try {
        const repo = typeorm_1.getRepository(User_1.User);
        const curUser = await repo.findOne(email, {
            relations: ['followings'],
        });
        if (!curUser)
            throw new Error('Not an authenticated user');
        const allFollowings = curUser.followings.map((u) => {
            return security_1.sanitizeFields(u);
        });
        return allFollowings;
    }
    catch (e) {
        throw e;
    }
}
exports.getAllFollowings = getAllFollowings;
