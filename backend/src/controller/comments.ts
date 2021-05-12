import { getRepository } from "typeorm";
import { Article } from "../entity/Article";
import { Comment } from "../entity/Comment";
import { User } from "../entity/User";
import { sanitizeFields } from "../utils/security";


interface CommentData {
    body: string,
    slug: string
}

// create a comment
export async function addCommentToArticle(comment: CommentData, email: string, slug: string): Promise<Comment> {

    if(!comment) throw new Error('Comment cannot be empty');
    if(!email) throw new Error('User is invalid');

    try {
        const commentRepo = getRepository(Comment)
        const userRepo = getRepository(User)
        const articleRepo = getRepository(Article)

        const user = await userRepo.findOne(email)
        if(!user) throw new Error('User does not exist');

        const article = await articleRepo.findOne(slug);
        if(!article) throw new Error('Article does not exist');

        const newComment = await commentRepo.save(new Comment(
            comment.body, 
            article, 
            sanitizeFields(user)
        ))
        
        return newComment;
    } catch (e) {
        throw e;
    }
}


// get comments from an article
export async function getCommentFromArticle(slug: string): Promise<Comment[]> {

    if(!slug) throw new Error('slug is required');

    try {
        const repo = getRepository(Comment);
        const comments = await repo.find({
            where: {
                article: { 
                    slug: slug
                }
            }
        })

        return comments
    } catch (e) {
        throw e; 
    }
}

// delete a comment
export async function deleteComment(id: string): Promise<boolean> {

    if(!id) throw new Error('Id is not valid')

    try {
        const repo = getRepository(Comment);
        const isDeleted = await repo.delete(id);

        if(!isDeleted) throw new Error('Cannot be deleted');

        return true;
    } catch (e) {
        throw e;
    }
}