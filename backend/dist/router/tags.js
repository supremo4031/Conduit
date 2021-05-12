"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagsRouter = void 0;
const express_1 = require("express");
const tags_1 = require("../controller/tags");
const route = express_1.Router();
// get all tags
route.get('/', async (req, res) => {
    try {
        const tags = await tags_1.getAllTags();
        if (!tags)
            return res.status(422).json({
                error: {
                    body: ['Tags not found'],
                },
            });
        return res.status(200).json({ tags });
    }
    catch (e) {
        return res.status(422).json({
            error: {
                body: ['Tags not found', e.message],
            },
        });
    }
});
exports.tagsRouter = route;
