"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createNewUser = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
const jwt_1 = require("../utils/jwt");
const password_1 = require("../utils/password");
const security_1 = require("../utils/security");
async function createNewUser(user) {
    if (!user.username)
        throw new Error('username required');
    if (!user.email)
        throw new Error('email required');
    if (!user.password)
        throw new Error('password required');
    if (!user.firstName)
        throw new Error('first name required');
    if (!user.lastName)
        throw new Error('last name required');
    const repo = typeorm_1.getRepository(User_1.User);
    const existing = await repo.findOne(user.email);
    if (existing)
        throw new Error('A user already exists with this email');
    const existingTwo = await repo.findOne({
        where: {
            username: user.username
        }
    });
    if (existingTwo)
        throw new Error('Username already exists');
    try {
        const newUser = await repo.save(new User_1.User(user.username, user.email, user.firstName, user.lastName, await password_1.hashPassword(user.password), [], []));
        newUser.token = await jwt_1.generateToken(user);
        return security_1.sanitizeFields(newUser);
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
exports.createNewUser = createNewUser;
async function loginUser(user) {
    if (!user.email)
        throw new Error('email required');
    if (!user.password)
        throw new Error('password required');
    const repo = typeorm_1.getRepository(User_1.User);
    const existing = await repo.findOne(user.email);
    if (!existing)
        throw new Error('No user found');
    const pass = await password_1.matchPassword(existing.password, user.password);
    if (pass) {
        existing.token = await jwt_1.generateToken(user);
        return security_1.sanitizeFields(existing);
    }
    else
        throw new Error('Invalid Credentials');
}
exports.loginUser = loginUser;
