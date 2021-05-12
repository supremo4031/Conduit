import { getRepository } from "typeorm";
import { Tag } from "../entity/Tag";

// get all tags
export async function getAllTags(): Promise<Tag[]> {

    try {
        const repo = getRepository(Tag)
        const tags = await repo.find();
        if(!tags) throw new Error("No tags found");

        return tags;
    } catch (e) {
        throw e;
    }
}