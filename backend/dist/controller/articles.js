"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unfavoriteArticle = exports.favoriteArticle = exports.getArticleByOffset = exports.getArticleByLimit = exports.getArticleByPage = exports.getArticleByUsername = exports.getArticleByTag = exports.getArticleBySlug = exports.getFavoritedArticle = exports.getFeedArticle = exports.getAllArticle = exports.updateArticle = exports.deleteArticle = exports.createArticle = void 0;
const typeorm_1 = require("typeorm");
const Article_1 = require("../entity/Article");
const Tag_1 = require("../entity/Tag");
const User_1 = require("../entity/User");
const security_1 = require("../utils/security");
const stringutils_1 = require("../utils/stringutils");
const uuid_1 = require("uuid");
// create article
async function createArticle(data, email) {
    // data validation
    if (!data.title)
        throw new Error('Title cannot be empty');
    if (!data.description)
        throw new Error('Description cannot be empty');
    if (!data.body)
        throw new Error('Body cannot be empty');
    if (!data.tagList)
        throw new Error('TagList cannot be empty');
    const articleRepo = typeorm_1.getRepository(Article_1.Article);
    const userRepo = typeorm_1.getRepository(User_1.User);
    try {
        const user = await userRepo.findOne(email);
        if (!user)
            throw new Error('User does not exist');
        const existing = await articleRepo.findOne(stringutils_1.slugify(data.title), {
            relations: ['tagList'],
        });
        if (existing)
            throw new Error('Article already exists');
        const tagRepo = typeorm_1.getRepository(Tag_1.Tag);
        const tagList = [];
        for (let i = 0; i < data.tagList.length; i++) {
            const tag = data.tagList[i];
            const existing = await tagRepo.findOne({
                where: {
                    tagName: tag,
                },
            });
            if (!existing) {
                const t = await tagRepo.save(new Tag_1.Tag(tag));
                tagList.push(t);
            }
            else
                tagList.push(existing);
        }
        console.log('********************************');
        console.log(tagList);
        console.log('********************************');
        const uuid = uuid_1.v4();
        const slugified = stringutils_1.slugify(data.title);
        const title = slugified + '-' + uuid;
        const article = await articleRepo.save(new Article_1.Article(title, data.title, data.description, data.body, tagList, [], security_1.sanitizeFields(user)));
        return article;
    }
    catch (e) {
        throw new Error(e.message);
    }
}
exports.createArticle = createArticle;
// delete article
async function deleteArticle(slug) {
    // if slug is empty
    if (!slug)
        throw new Error('Slug cannot be empty');
    const repo = typeorm_1.getRepository(Article_1.Article);
    try {
        const existing = await repo.findOne(slug);
        if (!existing)
            throw new Error('Article does not exist');
        const article = await repo.delete(slug);
        console.log(article);
        return true;
    }
    catch (e) {
        throw e;
    }
}
exports.deleteArticle = deleteArticle;
// update article
async function updateArticle(slug, data) {
    // if slug is empty
    if (!slug)
        throw new Error('Slug cannot be empty');
    const repo = typeorm_1.getRepository(Article_1.Article);
    try {
        const article = await repo.findOne(slug);
        if (!article)
            throw new Error('Article does not exist');
        if (data.title)
            article.title = data.title;
        if (data.description)
            article.description = data.description;
        if (data.body)
            article.body = data.body;
        const tagRepo = typeorm_1.getRepository(Tag_1.Tag);
        const tagList = [];
        if (data.tagList) {
            for (let i = 0; i < data.tagList.length; i++) {
                const tag = data.tagList[i];
                const existing = await tagRepo.findOne({
                    where: {
                        tagName: tag,
                    },
                });
                if (!existing) {
                    const t = await tagRepo.save(new Tag_1.Tag(tag));
                    tagList.push(t);
                }
                else
                    tagList.push(existing);
            }
        }
        article.tagList = tagList;
        const newArticle = await repo.save(article);
        if (!newArticle)
            throw new Error('Article cannot be updated');
        return newArticle;
    }
    catch (e) {
        throw e;
    }
}
exports.updateArticle = updateArticle;
// get all articles
async function getAllArticle() {
    try {
        const repo = typeorm_1.getRepository(Article_1.Article);
        const articles = await repo.find();
        if (!articles)
            throw new Error('No article found');
        return articles;
    }
    catch (e) {
        throw e;
    }
}
exports.getAllArticle = getAllArticle;
// get feed articles
async function getFeedArticle(email) {
    try {
        const repo = typeorm_1.getRepository(Article_1.Article);
        const articles = await repo.find({
            where: {
                author: {
                    email: email,
                },
            },
        });
        if (!articles)
            throw new Error('No article found');
        return articles;
    }
    catch (e) {
        throw e;
    }
}
exports.getFeedArticle = getFeedArticle;
// get favorited articles
async function getFavoritedArticle(email) {
    try {
        const repo = typeorm_1.getRepository(User_1.User);
        const user = await repo.findOne(email, {
            relations: ['favoritedArticles'],
        });
        if (!user)
            throw new Error('User is not found');
        return user.favoritedArticles;
    }
    catch (e) {
        throw e;
    }
}
exports.getFavoritedArticle = getFavoritedArticle;
// get articles by slug
async function getArticleBySlug(slug) {
    // check if slug is empty
    if (!slug)
        throw new Error('Slug cannot be empty');
    try {
        const repo = typeorm_1.getRepository(Article_1.Article);
        const article = await repo.findOne(slug, {
            relations: ['tagList']
        });
        if (!article)
            throw new Error('No article found with the given slug');
        return article;
    }
    catch (e) {
        throw e;
    }
}
exports.getArticleBySlug = getArticleBySlug;
// get articles by tag
async function getArticleByTag(tagName) {
    if (!tagName)
        throw new Error('Provide a tag');
    try {
        const repo = typeorm_1.getRepository(Tag_1.Tag);
        const tag = await repo.findOne({
            where: {
                tagName: tagName,
            },
            relations: ['articles'],
        });
        if (!tag)
            throw new Error('Tag not found');
        const articles = tag.articles;
        return articles;
    }
    catch (e) {
        throw e;
    }
}
exports.getArticleByTag = getArticleByTag;
// get articles by username
async function getArticleByUsername(username) {
    if (!username)
        throw new Error('No username provided');
    try {
        const repo = typeorm_1.getRepository(User_1.User);
        const user = await repo.findOne({
            where: {
                username: username,
            },
            relations: ['articles'],
        });
        if (!user)
            throw new Error('Username not found');
        const articles = user.articles;
        return articles;
    }
    catch (e) {
        throw e;
    }
}
exports.getArticleByUsername = getArticleByUsername;
// get articles by page
async function getArticleByPage(page, limit) {
    try {
        const repo = typeorm_1.getRepository(Article_1.Article);
        const skip = ((+page) - 1) * (+limit);
        const articles = await repo.find({
            take: +limit,
            skip: skip,
            select: ['title', 'author', 'createdAt', 'slug', 'description'],
            relations: ['author']
        });
        articles.map((article) => {
            let author = article.author;
            article.author = security_1.sanitizeFields(author);
            return article;
        });
        if (!articles)
            throw new Error('No article found');
        return articles;
    }
    catch (e) {
        throw e;
    }
}
exports.getArticleByPage = getArticleByPage;
// get articles by limit
async function getArticleByLimit(limit) {
    try {
        const repo = typeorm_1.getRepository(Article_1.Article);
        const articles = await repo.find({
            take: +limit,
        });
        if (!articles)
            throw new Error('No article found');
        return articles;
    }
    catch (e) {
        throw e;
    }
}
exports.getArticleByLimit = getArticleByLimit;
// get articles by offset
async function getArticleByOffset(offset) {
    try {
        const repo = typeorm_1.getRepository(Article_1.Article);
        const articles = await repo.find({
            skip: +offset,
        });
        if (!articles)
            throw new Error('No article found');
        return articles;
    }
    catch (e) {
        throw e;
    }
}
exports.getArticleByOffset = getArticleByOffset;
// favorite article
async function favoriteArticle(slug, email) {
    if (!slug)
        throw new Error('Article slug cannot be empty');
    if (!email)
        throw new Error('User not found');
    try {
        const articleRepo = typeorm_1.getRepository(Article_1.Article);
        const userRepo = typeorm_1.getRepository(User_1.User);
        const user = await userRepo.findOne(email);
        if (!user)
            throw new Error('User not found');
        const article = await articleRepo.findOne(slug, {
            relations: ['favorited'],
        });
        if (!article)
            throw new Error('No article found with the given slug');
        article.favorited.push(security_1.sanitizeFields(user));
        article.favoritesCount += 1;
        const newArticle = await articleRepo.save(article);
        if (!newArticle)
            throw new Error('Article cannot be favorited');
        return newArticle;
    }
    catch (e) {
        throw e;
    }
}
exports.favoriteArticle = favoriteArticle;
// unfavorite article
async function unfavoriteArticle(slug, email) {
    if (!slug)
        throw new Error('Article slug cannot be empty');
    if (!email)
        throw new Error('User not found');
    try {
        const articleRepo = typeorm_1.getRepository(Article_1.Article);
        const userRepo = typeorm_1.getRepository(User_1.User);
        const user = await userRepo.findOne(email);
        if (!user)
            throw new Error('User not found');
        const article = await articleRepo.findOne(slug, {
            relations: ['favorited'],
        });
        if (!article)
            throw new Error('No article found with the given slug');
        const newFavorite = article.favorited.filter((u) => {
            return u.email != email;
        });
        article.favorited = newFavorite;
        article.favoritesCount -= 1;
        const newArticle = await articleRepo.save(article);
        if (!newArticle)
            throw new Error('Article cannot be unfavorited');
        return newArticle;
    }
    catch (e) {
        throw e;
    }
}
exports.unfavoriteArticle = unfavoriteArticle;
