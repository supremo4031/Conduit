import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { sanitizeFields } from "../utils/security";

// get user by username
export async function getUserByUsername(username: string): Promise<User> {

    if(!username) throw new Error('Username does not exist');

    try {
        const repo = getRepository(User)
        const user = await repo.findOne({
            where: {
                username: username
            }
        })

        if(!user) throw new Error('User not found');
        return user;
    } catch (e) {
        throw e;
    }
}

// follow user
export async function followUser(username: string, email: string): Promise<User> {

	if (!username) throw new Error('Username does not exist');
	if (!email) throw new Error('Not an authenticated user');

	try {
		const repo = getRepository(User);
		const user = await repo.findOne({
			where: {
				username: username,
			},
            relations: ['followers']
		});
        if (!user) throw new Error('User not found');

        const curUser = await repo.findOne(email);
        if (!curUser) throw new Error('Not an authenticated user');

        user.followers.push(curUser);
        user.followersCount += 1;
        

        const newUser = await repo.save(user);
		if (!newUser) throw new Error('Cannot add to followers');

        curUser.followingsCount += 1;

        const newCurUser = await repo.save(curUser);
        if (!newCurUser) throw new Error('Cannot increase followings count');

		return sanitizeFields(curUser);
	} catch (e) {
		throw e;
	}
}



// unfollow user
export async function unfollowUser(username: string, email: string): Promise<User> {

	if (!username) throw new Error('Username does not exist');
	if (!email) throw new Error('Not an authenticated user');

	try {
		const repo = getRepository(User);
		const user = await repo.findOne({
			where: {
				username: username,
			},
			relations: ['followers'],
		});
		if (!user) throw new Error('User not found');

		const curUser = await repo.findOne(email);
		if (!curUser) throw new Error('Not an authenticated user');

        const newFollowers = user.followers.filter(u => {
            return u.email != email
        })

		user.followers = newFollowers;
		user.followersCount -= 1;

        

		const newUser = await repo.save(user);
		if (!newUser) throw new Error('Cannot add to followers');

        curUser.followingsCount -= 1;

        const newCurUser = await repo.save(curUser);
		if (!newCurUser) throw new Error('Cannot decrease followings count');

		return sanitizeFields(curUser);
	} catch (e) {
		throw e;
	}
}


// get all followers
export async function getAllFollowers(email: string): Promise<User[]> {

	if (!email) throw new Error('Not an authenticated user');

	try {
		const repo = getRepository(User);

		const curUser = await repo.findOne(email, {
            relations: ['followers']
        });
		if (!curUser) throw new Error('Not an authenticated user');

		const allFollowers = curUser.followers.map(u => { return sanitizeFields(u) })

		return allFollowers;
	} catch (e) {
		throw e;
	}
}


// get all followings
export async function getAllFollowings(email: string): Promise<User[]> {

	if (!email) throw new Error('Not an authenticated user');

	try {
		const repo = getRepository(User);

		const curUser = await repo.findOne(email, {
			relations: ['followings'],
		});
		if (!curUser) throw new Error('Not an authenticated user');

		const allFollowings = curUser.followings.map((u) => {
			return sanitizeFields(u);
		});

		return allFollowings;
	} catch (e) {
		throw e;
	}
}

