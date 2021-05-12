import { Router } from 'express';
import { getAllTags } from '../controller/tags';
const route = Router();

// get all tags
route.get('/', async (req, res) => {
	try {
		const tags = await getAllTags();
		if (!tags)
			return res.status(422).json({
				error: {
					body: ['Tags not found'],
				},
			});

		return res.status(200).json({ tags });
	} catch (e) {
		return res.status(422).json({
			error: {
				body: ['Tags not found', e.message],
			},
		});
	}
});

export const tagsRouter = route;
