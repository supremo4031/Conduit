"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profilesRouter = void 0;
const express_1 = require("express");
const profiles_1 = require("../controller/profiles");
const security_1 = require("../utils/security");
const auth_1 = require("../middleware/auth");
const route = express_1.Router();
// get user by username
route.get('/:username', auth_1.auth, async (req, res) => {
    try {
        const user = await profiles_1.getUserByUsername(req.params.username);
        if (!user)
            return res.status(422).json({
                errors: {
                    body: ['User not found']
                }
            });
        const newUser = security_1.sanitizeFields(user);
        return res.status(200).json({ newUser });
    }
    catch (e) {
        return res.status(422).json({
            errors: {
                body: ['User not found', e.message],
            },
        });
    }
});
// follow user
route.post('/:username/follow', auth_1.auth, async (req, res) => {
    try {
        const email = req.user.email;
        const user = await profiles_1.followUser(req.params.username, email);
        if (!user)
            return res.status(422).json({
                errors: {
                    body: ['Follower System is not working'],
                },
            });
        return res.status(200).json({ user });
    }
    catch (e) {
        return res.status(422).json({
            errors: {
                body: ['Follower System is not working', e.message],
            },
        });
    }
});
// unfollow user
route.delete('/:username/follow', auth_1.auth, async (req, res) => {
    try {
        const email = req.user.email;
        const user = await profiles_1.unfollowUser(req.params.username, email);
        if (!user)
            return res.status(422).json({
                errors: {
                    body: ['Unfollowing is not working'],
                },
            });
        return res.status(200).json({ user });
    }
    catch (e) {
        return res.status(422).json({
            errors: {
                body: ['Unfollowing is not working', e.message],
            },
        });
    }
});
// get all followers
route.get('/me/followers', auth_1.auth, async (req, res) => {
    try {
        const email = req.user.email;
        const users = await profiles_1.getAllFollowers(email);
        if (!users)
            return res.status(422).json({
                errors: {
                    body: ['Cannot get followers'],
                },
            });
        return res.status(200).json({ users });
    }
    catch (e) {
        return res.status(422).json({
            errors: {
                body: ['Cannot get followers', e.message],
            },
        });
    }
});
// get all followings
route.get('/me/followings', auth_1.auth, async (req, res) => {
    try {
        const email = req.user.email;
        const user = await profiles_1.getAllFollowings(email);
        if (!user)
            return res.status(422).json({
                errors: {
                    body: ['Cannot get followings'],
                },
            });
        return res.status(200).json({ user });
    }
    catch (e) {
        return res.status(422).json({
            errors: {
                body: ['Cannot get followings', e.message],
            },
        });
    }
});
exports.profilesRouter = route;
