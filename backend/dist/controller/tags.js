"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTags = void 0;
const typeorm_1 = require("typeorm");
const Tag_1 = require("../entity/Tag");
// get all tags
async function getAllTags() {
    try {
        const repo = typeorm_1.getRepository(Tag_1.Tag);
        const tags = await repo.find();
        if (!tags)
            throw new Error("No tags found");
        return tags;
    }
    catch (e) {
        throw e;
    }
}
exports.getAllTags = getAllTags;
