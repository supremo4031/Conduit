import { getRepository } from 'typeorm';
import { Article } from '../entity/Article';
import { Tag } from '../entity/Tag';
import { User } from '../entity/User';
import { sanitizeFields } from '../utils/security';
import { slugify } from '../utils/stringutils';
import { v4 as uuidv4 } from 'uuid';

interface ArticleData {
	title: string;
	description: string;
	body: string[];
	tagList: string[];
}

// create article
export async function createArticle(
	data: ArticleData,
	email: string
): Promise<Article> {
	// data validation
	if (!data.title) throw new Error('Title cannot be empty');
	if (!data.description) throw new Error('Description cannot be empty');
	if (!data.body) throw new Error('Body cannot be empty');
	if (!data.tagList) throw new Error('TagList cannot be empty');

	const articleRepo = getRepository(Article);
	const userRepo = getRepository(User);

	try {
		const user = await userRepo.findOne(email);
		if (!user) throw new Error('User does not exist');

		const existing = await articleRepo.findOne(slugify(data.title), {
			relations: ['tagList'],
		});
		if (existing) throw new Error('Article already exists');

		const tagRepo = getRepository(Tag);
		const tagList: Array<Tag> = [];

		for (let i = 0; i < data.tagList.length; i++) {
			const tag = data.tagList[i];
			const existing = await tagRepo.findOne({
				where: {
					tagName: tag,
				},
			});
			if (!existing) {
				const t = await tagRepo.save(new Tag(tag));
				tagList.push(t);
			} else tagList.push(existing);
		}

		console.log('********************************');
		console.log(tagList);
		console.log('********************************');

		const uuid = uuidv4();
		const slugified = slugify(data.title);
		const title = slugified + '-' + uuid;

		const article = await articleRepo.save(
			new Article(
				title,
				data.title,
				data.description,
				data.body,
				tagList,
				[],
				sanitizeFields(user)
			)
		);

		return article;
	} catch (e) {
		throw new Error(e.message);
	}
}

// delete article
export async function deleteArticle(slug: string): Promise<boolean> {
	// if slug is empty
	if (!slug) throw new Error('Slug cannot be empty');

	const repo = getRepository(Article);

	try {
		const existing = await repo.findOne(slug);
		if (!existing) throw new Error('Article does not exist');

		const article = await repo.delete(slug);
		console.log(article);

		return true;
	} catch (e) {
		throw e;
	}
}

// update article
export async function updateArticle(
	slug: string,
	data: Partial<ArticleData>
): Promise<Article> {
	// if slug is empty
	if (!slug) throw new Error('Slug cannot be empty');

	const repo = getRepository(Article);

	try {
		const article = await repo.findOne(slug);

		if (!article) throw new Error('Article does not exist');

		if (data.title) article.title = data.title;
		if (data.description) article.description = data.description;
		if (data.body) article.body = data.body;

		const tagRepo = getRepository(Tag);
		const tagList: Array<Tag> = [];

		if (data.tagList) {
			for (let i = 0; i < data.tagList.length; i++) {
				const tag = data.tagList[i];
				const existing = await tagRepo.findOne({
					where: {
						tagName: tag,
					},
				});
				if (!existing) {
					const t = await tagRepo.save(new Tag(tag));
					tagList.push(t);
				} else tagList.push(existing);
			}
		}

        article.tagList = tagList;

		const newArticle = await repo.save(article);
		if (!newArticle) throw new Error('Article cannot be updated');

		return newArticle;
	} catch (e) {
		throw e;
	}
}

// get all articles
export async function getAllArticle(): Promise<Article[]> {
	try {
		const repo = getRepository(Article);
		const articles = await repo.find();

		if (!articles) throw new Error('No article found');

		return articles;
	} catch (e) {
		throw e;
	}
}

// get feed articles
export async function getFeedArticle(email: string): Promise<Article[]> {
	try {
		const repo = getRepository(Article);
		const articles = await repo.find({
			where: {
				author: {
					email: email,
				},
			},
		});

		if (!articles) throw new Error('No article found');

		return articles;
	} catch (e) {
		throw e;
	}
}

// get favorited articles
export async function getFavoritedArticle(email: string): Promise<Article[]> {
	try {
		const repo = getRepository(User);
		const user = await repo.findOne(email, {
			relations: ['favoritedArticles'],
		});

		if (!user) throw new Error('User is not found');

		return user.favoritedArticles;
	} catch (e) {
		throw e;
	}
}

// get articles by slug
export async function getArticleBySlug(slug: string): Promise<Article> {
	// check if slug is empty
	if (!slug) throw new Error('Slug cannot be empty');

	try {
		const repo = getRepository(Article);
		const article = await repo.findOne(slug, {
            relations: ['tagList']
        });

		if (!article) throw new Error('No article found with the given slug');

		return article;
	} catch (e) {
		throw e;
	}
}

// get articles by tag
export async function getArticleByTag(tagName: string): Promise<Article[]> {
	if (!tagName) throw new Error('Provide a tag');

	try {
		const repo = getRepository(Tag);
		const tag = await repo.findOne({
			where: {
				tagName: tagName,
			},
			relations: ['articles'],
		});

		if (!tag) throw new Error('Tag not found');
		const articles = tag.articles;

		return articles;
	} catch (e) {
		throw e;
	}
}

// get articles by username
export async function getArticleByUsername(
	username: string
): Promise<Article[]> {
	if (!username) throw new Error('No username provided');

	try {
		const repo = getRepository(User);
		const user = await repo.findOne({
			where: {
				username: username,
			},
			relations: ['articles'],
		});

		if (!user) throw new Error('Username not found');
		const articles = user.articles;

		return articles;
	} catch (e) {
		throw e;
	}
}

// get articles by page
export async function getArticleByPage(page:string, limit: string): Promise<Article[]> {
	try {
		const repo = getRepository(Article);
        const skip = ((+page) - 1) * (+limit);
		const articles = await repo.find({
			take: +limit,
			skip: skip,
			select: ['title', 'author', 'createdAt', 'slug', 'description'],
			relations: ['author']
		});

		articles.map((article) => {
			let author = article.author;
			article.author = sanitizeFields(author);
			return article;
		})

		if (!articles) throw new Error('No article found');

		return articles;
	} catch (e) {
		throw e;
	}
}

// get articles by limit
export async function getArticleByLimit(limit: string): Promise<Article[]> {
	try {
		const repo = getRepository(Article);
		const articles = await repo.find({
			take: +limit,
		});

		if (!articles) throw new Error('No article found');

		return articles;
	} catch (e) {
		throw e;
	}
}

// get articles by offset
export async function getArticleByOffset(offset: string): Promise<Article[]> {
	try {
		const repo = getRepository(Article);
		const articles = await repo.find({
			skip: +offset,
		});

		if (!articles) throw new Error('No article found');

		return articles;
	} catch (e) {
		throw e;
	}
}

// favorite article
export async function favoriteArticle(
	slug: string,
	email: string
): Promise<Article> {
	if (!slug) throw new Error('Article slug cannot be empty');
	if (!email) throw new Error('User not found');

	try {
		const articleRepo = getRepository(Article);
		const userRepo = getRepository(User);

		const user = await userRepo.findOne(email);
		if (!user) throw new Error('User not found');

		const article = await articleRepo.findOne(slug, {
			relations: ['favorited'],
		});
		if (!article) throw new Error('No article found with the given slug');

		article.favorited.push(sanitizeFields(user));
		article.favoritesCount += 1;

		const newArticle = await articleRepo.save(article);
		if (!newArticle) throw new Error('Article cannot be favorited');

		return newArticle;
	} catch (e) {
		throw e;
	}
}

// unfavorite article
export async function unfavoriteArticle(
	slug: string,
	email: string
): Promise<Article> {
	if (!slug) throw new Error('Article slug cannot be empty');
	if (!email) throw new Error('User not found');

	try {
		const articleRepo = getRepository(Article);
		const userRepo = getRepository(User);

		const user = await userRepo.findOne(email);
		if (!user) throw new Error('User not found');

		const article = await articleRepo.findOne(slug, {
			relations: ['favorited'],
		});
		if (!article) throw new Error('No article found with the given slug');

		const newFavorite = article.favorited.filter((u) => {
			return u.email != email;
		});

		article.favorited = newFavorite;
		article.favoritesCount -= 1;

		const newArticle = await articleRepo.save(article);
		if (!newArticle) throw new Error('Article cannot be unfavorited');

		return newArticle;
	} catch (e) {
		throw e;
	}
}
