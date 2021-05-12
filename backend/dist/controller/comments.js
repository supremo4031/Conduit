"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.getCommentFromArticle = exports.addCommentToArticle = void 0;
const typeorm_1 = require("typeorm");
const Article_1 = require("../entity/Article");
const Comment_1 = require("../entity/Comment");
const User_1 = require("../entity/User");
const security_1 = require("../utils/security");
// create a comment
async function addCommentToArticle(comment, email, slug) {
    if (!comment)
        throw new Error('Comment cannot be empty');
    if (!email)
        throw new Error('User is invalid');
    try {
        const commentRepo = typeorm_1.getRepository(Comment_1.Comment);
        const userRepo = typeorm_1.getRepository(User_1.User);
        const articleRepo = typeorm_1.getRepository(Article_1.Article);
        const user = await userRepo.findOne(email);
        if (!user)
            throw new Error('User does not exist');
        const article = await articleRepo.findOne(slug);
        if (!article)
            throw new Error('Article does not exist');
        const newComment = await commentRepo.save(new Comment_1.Comment(comment.body, article, security_1.sanitizeFields(user)));
        return newComment;
    }
    catch (e) {
        throw e;
    }
}
exports.addCommentToArticle = addCommentToArticle;
// get comments from an article
async function getCommentFromArticle(slug) {
    if (!slug)
        throw new Error('slug is required');
    try {
        const repo = typeorm_1.getRepository(Comment_1.Comment);
        const comments = await repo.find({
            where: {
                article: {
                    slug: slug
                }
            }
        });
        return comments;
    }
    catch (e) {
        throw e;
    }
}
exports.getCommentFromArticle = getCommentFromArticle;
// delete a comment
async function deleteComment(id) {
    if (!id)
        throw new Error('Id is not valid');
    try {
        const repo = typeorm_1.getRepository(Comment_1.Comment);
        const isDeleted = await repo.delete(id);
        if (!isDeleted)
            throw new Error('Cannot be deleted');
        return true;
    }
    catch (e) {
        throw e;
    }
}
exports.deleteComment = deleteComment;
