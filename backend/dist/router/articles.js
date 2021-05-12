"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articlesRouter = void 0;
const express_1 = require("express");
const articles_1 = require("../controller/articles");
const comments_1 = require("../controller/comments");
const auth_1 = require("../middleware/auth");
// @collaps
const route = express_1.Router();
// create an article
route.post('/', auth_1.auth, async (req, res) => {
    try {
        const article = await articles_1.createArticle(req.body.article, req.user.email);
        if (!article)
            res.status(422).json({
                errors: {
                    body: ['Article cannot be created', 'Something went wrong'],
                },
            });
        return res.status(201).json({ article });
    }
    catch (e) {
        return res.status(422).json({
            errors: {
                body: ['Article cannot be created', e.message],
            },
        });
    }
});
// update an article
route.patch('/:slug', auth_1.auth, async (req, res) => {
    try {
        const newArticle = await articles_1.updateArticle(req.params.slug, req.body.article);
        if (!newArticle)
            return res.status(422).json({
                errors: {
                    body: ['Article cannot be updated'],
                },
            });
        return res.status(200).json({ newArticle });
    }
    catch (e) {
        return res.status(422).json({
            errors: {
                body: ['Article cannot be updated', e.message],
            },
        });
    }
});
// delete an article
route.delete('/:slug', auth_1.auth, async (req, res) => {
    try {
        const isDeleted = await articles_1.deleteArticle(req.params.slug);
        if (!isDeleted)
            return res.status(422).json({
                errors: {
                    body: ['Cannot delete article'],
                },
            });
        return res.status(200).json({
            status: 'Deleted',
        });
    }
    catch (e) {
        return res.status(422).json({
            errors: {
                body: ['Cannot delete article', e.message],
            },
        });
    }
});
// get all articles
route.get('/all', async (req, res) => {
    try {
        const articles = await articles_1.getAllArticle();
        if (!articles)
            return res.status(404).json({
                errors: {
                    body: ['No article found'],
                },
            });
        return res.status(200).json({ articles });
    }
    catch (e) {
        return res.status(404).json({
            errors: {
                body: ['No article found', e.message],
            },
        });
    }
});
// get feed articles
route.get('/feed', auth_1.auth, async (req, res) => {
    try {
        const email = req.user.email;
        const articles = await articles_1.getFeedArticle(email);
        if (!articles)
            return res.status(404).json({
                errors: {
                    body: ['No article found'],
                },
            });
        return res.status(200).json({ articles });
    }
    catch (e) {
        return res.status(404).json({
            errors: {
                body: ['No article found', e.message],
            },
        });
    }
});
// get favorited articles
route.get('/favorites', auth_1.auth, async (req, res) => {
    try {
        const email = req.user.email;
        const articles = await articles_1.getFavoritedArticle(email);
        if (!articles)
            return res.status(404).json({
                errors: {
                    body: ['No article found'],
                },
            });
        return res.status(200).json({ articles });
    }
    catch (e) {
        return res.status(404).json({
            errors: {
                body: ['No article found', e.message],
            },
        });
    }
});
// get article by slug
route.get('/:slug', async (req, res) => {
    try {
        const article = await articles_1.getArticleBySlug(req.params.slug);
        if (!article)
            return res.status(404).json({
                errors: {
                    body: ['No article found'],
                },
            });
        return res.status(200).json({ article });
    }
    catch (e) {
        return res.status(404).json({
            errors: {
                body: ['No article found', e.message],
            },
        });
    }
});
// get article by query: tag, author, limit, offset, page
route.get('/', async (req, res) => {
    try {
        if (req.query.tag) {
            const article = await articles_1.getArticleByTag(req.query.tag.toString());
            if (!article)
                return res.status(404).json({
                    errors: {
                        body: ['No article found'],
                    },
                });
            return res.status(200).json({ article });
        }
        else if (req.query.author) {
            const article = await articles_1.getArticleByUsername(req.query.author.toString());
            if (!article)
                return res.status(404).json({
                    errors: {
                        body: ['No article found'],
                    },
                });
            return res.status(200).json({ article });
        }
        else if (req.query.page) {
            let limit = "10";
            if (req.query.limit)
                limit = req.query.limit.toString();
            const article = await articles_1.getArticleByPage(req.query.page.toString(), limit);
            if (!article)
                return res.status(404).json({
                    errors: {
                        body: ['No article found'],
                    },
                });
            return res.status(200).json({ article });
        }
        else if (req.query.limit) {
            const article = await articles_1.getArticleByLimit(req.query.limit.toString());
            if (!article)
                return res.status(404).json({
                    errors: {
                        body: ['No article found'],
                    },
                });
            return res.status(200).json({ article });
        }
        else if (req.query.offset) {
            const article = await articles_1.getArticleByOffset(req.query.offset.toString());
            if (!article)
                return res.status(404).json({
                    errors: {
                        body: ['No article found'],
                    },
                });
            return res.status(200).json({ article });
        }
    }
    catch (e) {
        return res.status(404).json({
            errors: {
                body: ['No article found', e.message],
            },
        });
    }
});
// favorite article
route.post('/:slug/favorite', auth_1.auth, async (req, res) => {
    try {
        const email = req.user.email;
        const article = await articles_1.favoriteArticle(req.params.slug, email);
        if (!article)
            return res.status(422).json({
                errors: {
                    body: ['Article cannot be favorited'],
                },
            });
        return res.status(200).json({ article });
    }
    catch (e) {
        return res.status(422).json({
            errors: {
                body: ['Article cannot be favorited', e.message],
            },
        });
    }
});
// unfavorite article
route.delete('/:slug/favorite', auth_1.auth, async (req, res) => {
    try {
        const email = req.user.email;
        const article = await articles_1.unfavoriteArticle(req.params.slug, email);
        if (!article)
            return res.status(422).json({
                errors: {
                    body: ['Article cannot be unfavorited'],
                },
            });
        return res.status(200).json({ article });
    }
    catch (e) {
        return res.status(422).json({
            errors: {
                body: ['Article cannot be unfavorited', e.message],
            },
        });
    }
});
// create a comment
route.post('/:slug/comments', auth_1.auth, async (req, res) => {
    try {
        const email = req.user.email;
        // req.body.comment.id = uuidv4();
        req.body.comment.slug = req.params.slug;
        const comment = await comments_1.addCommentToArticle(req.body.comment, email, req.params.slug);
        if (!comment)
            return res.status(422).json({
                errors: {
                    body: ['Cannot add comment'],
                },
            });
        return res.status(201).json({ comment });
    }
    catch (e) {
        return res.status(422).json({
            errors: {
                body: ['Cannot add comment', e.message],
            },
        });
    }
});
// get all comments from an article
route.get('/:slug/comments', auth_1.auth, async (req, res) => {
    try {
        const comments = await comments_1.getCommentFromArticle(req.params.slug);
        if (!comments)
            return res.status(422).json({
                errors: {
                    body: ['Cannot get comments'],
                },
            });
        return res.status(200).json({ comments });
    }
    catch (e) {
        return res.status(422).json({
            errors: {
                body: ['Cannot get comments', e.message],
            },
        });
    }
});
// delete a comment
route.delete('/:slug/comments/:id', auth_1.auth, async (req, res) => {
    try {
        const deleted = await comments_1.deleteComment(req.params.id);
        if (!deleted)
            return res.status(422).json({
                errors: {
                    body: ['Cannot delete comment'],
                },
            });
        return res.status(200).json({
            status: 'Successfully deleted',
        });
    }
    catch (e) {
        return res.status(422).json({
            errors: {
                body: ['Cannot delete comment', e.message],
            },
        });
    }
});
exports.articlesRouter = route;
