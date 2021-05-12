import { Router } from 'express';
import { followUser, getAllFollowers, getAllFollowings, getUserByUsername, unfollowUser } from '../controller/profiles';
import { sanitizeFields } from '../utils/security'
import { auth } from '../middleware/auth';
const route = Router();

// get user by username
route.get('/:username', auth, async (req, res) => {
    
    try {
        const user = await getUserByUsername(req.params.username);
        if(!user) return res.status(422).json({
            errors: {
                body: ['User not found']
            }
        })

        const newUser = sanitizeFields(user);
        return res.status(200).json({ newUser });
    } catch (e) {
        return res.status(422).json({
			errors: {
				body: ['User not found', e.message],
			},
		});
    }
})

// follow user
route.post('/:username/follow', auth, async (req, res) => {
	try {
        const email = (req as any).user.email;
        const user = await followUser(req.params.username, email);
        if(!user) return res.status(422).json({
			errors: {
				body: ['Follower System is not working'],
			},
		});

        return res.status(200).json({ user });
	} catch (e) {
        return res.status(422).json({
			errors: {
				body: ['Follower System is not working', e.message],
			},
		});
    }
});

// unfollow user
route.delete('/:username/follow', auth, async (req, res) => {

	try {
		const email = (req as any).user.email;
		const user = await unfollowUser(req.params.username, email);
		if (!user)
			return res.status(422).json({
				errors: {
					body: ['Unfollowing is not working'],
				},
			});

		return res.status(200).json({ user });
	} catch (e) {
		return res.status(422).json({
			errors: {
				body: ['Unfollowing is not working', e.message],
			},
		});
	}
});


// get all followers
route.get('/me/followers', auth, async (req, res) => {

	try {
		const email = (req as any).user.email;
		const users = await getAllFollowers(email);
		if (!users)
			return res.status(422).json({
				errors: {
					body: ['Cannot get followers'],
				},
			});

		return res.status(200).json({ users });
	} catch (e) {
		return res.status(422).json({
			errors: {
				body: ['Cannot get followers', e.message],
			},
		});
	}
});


// get all followings
route.get('/me/followings', auth, async (req, res) => {

	try {
		const email = (req as any).user.email;
		const user = await getAllFollowings(email);
		if (!user)
			return res.status(422).json({
				errors: {
					body: ['Cannot get followings'],
				},
			});

		return res.status(200).json({ user });
	} catch (e) {
		return res.status(422).json({
			errors: {
				body: ['Cannot get followings', e.message],
			},
		});
	}
});



export const profilesRouter = route;  