import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { generateToken } from '../utils/jwt';
import { hashPassword, matchPassword } from '../utils/password';
import { sanitizeFields } from '../utils/security';

interface UserCredential {
	username: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}

interface LoginCredential {
	email: string;
	password: string;
}

export async function createNewUser(user: UserCredential) {

	if (!user.username) throw new Error('username required');
	if (!user.email) throw new Error('email required');
	if (!user.password) throw new Error('password required');
	if (!user.firstName) throw new Error('first name required');
	if (!user.lastName) throw new Error('last name required');

	const repo = getRepository(User);
	const existing = await repo.findOne(user.email);
	if (existing) throw new Error('A user already exists with this email');
	const existingTwo = await repo.findOne({
		where: {
			username: user.username
		}
	})
	if (existingTwo) throw new Error('Username already exists');

	try {
		const newUser = await repo.save(
			new User(
				user.username,
				user.email,
				user.firstName,
				user.lastName,
				await hashPassword(user.password),
				[],
				[]
			)
		);

		newUser.token = await generateToken(user as User);
		return sanitizeFields(newUser);
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function loginUser(user: LoginCredential) {
	if (!user.email) throw new Error('email required');
	if (!user.password) throw new Error('password required');

	const repo = getRepository(User);
	const existing = await repo.findOne(user.email);
	if (!existing) throw new Error('No user found');

	const pass = await matchPassword(existing.password!, user.password);
	if (pass) {
		existing.token = await generateToken(user as User);
		return sanitizeFields(existing);
	} else throw new Error('Invalid Credentials');
}
