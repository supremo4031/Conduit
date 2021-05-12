"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_1 = require("../controller/user");
const auth_1 = require("../middleware/auth");
const route = express_1.Router();
// get current user
route.get('/', auth_1.auth, async (req, res) => {
    try {
        const email = req.user.email;
        const user = await user_1.getCurrentUser(email);
        if (!user)
            return res.status(403).json({
                errors: {
                    body: ['No such email found']
                },
            });
        return res.status(200).json({ user });
    }
    catch (e) {
        console.log(e.message);
        return res.status(403).json({
            errors: {
                body: [e.message]
            }
        });
    }
});
// update current user
route.patch('/', auth_1.auth, async (req, res) => {
    try {
        const email = req.user.email;
        const newUser = await user_1.updateUser(email, req.body.user);
        if (!newUser)
            return res.status(403).json({
                errors: {
                    body: ['Cannot update user', 'Something went wrong']
                }
            });
        console.log(newUser);
        return res.status(200).json({ newUser });
    }
    catch (e) {
        return res.status(200).json({
            errors: {
                body: [e]
            }
        });
    }
});
exports.userRouter = route;
