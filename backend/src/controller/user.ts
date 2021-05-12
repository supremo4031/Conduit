// @collaps
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { hashPassword } from "../utils/password";
import { sanitizeFields } from "../utils/security";



// get current user
export async function getCurrentUser(email: string) {
    
    // here is some data
    if(!email) throw new Error("Email is undefined");

    const repo = getRepository(User)

    try {
        const user = await repo.findOne(email);
		if (!user) throw new Error('User not found');

        return sanitizeFields(user);
    } catch (e) {
        throw e;
    }

}


// update current user
export async function updateUser(email: string, newData: Partial<User>) {
	if (!newData) throw new Error('Updating fields are empty');

	try {
		const user = await getCurrentUser(email);

		if (!user) throw new Error('User not found');

		if (newData.image) user.image = newData.image;
		if (newData.bio) user.bio = newData.bio;
		if (newData.username) user.username = newData.username;
		if (newData.password) user.password = await hashPassword(newData.password);

		const repo = getRepository(User);
		const newUser = await repo.save(user);

		return sanitizeFields(newUser);
	} catch (e) {
		throw e;
	}
}