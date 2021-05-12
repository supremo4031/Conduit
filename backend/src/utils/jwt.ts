import { User } from "../entity/User";
import jwt from 'jsonwebtoken';

const SECRET_KEY = "karma-is-a-bitch"

export async function generateToken(user: User) : Promise<string> {
    
    return new Promise<string>((resolve, reject) => {
        jwt.sign({
            email: user.email,
            password: user.password
        }, SECRET_KEY, (err: any, encoded: string | undefined) => {
            if(err) return reject(err);
            resolve(encoded as string);
        })
    })

}

export async function decodeToken(token: string): Promise<User> {

	return new Promise<User>((resolve, reject) => {
		jwt.verify(token, SECRET_KEY, (err, decoded: object | undefined) => {
			if (err) return reject(err);
            else return resolve(decoded as User)
		});
	});
}

