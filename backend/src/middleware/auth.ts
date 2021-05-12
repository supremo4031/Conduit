import { NextFunction, Request, Response } from "express";
import { decodeToken } from "../utils/jwt";

const SECRET_KEY = "karma-is-a-bitch";

// authorise the token valid or not
export async function auth(req: Request, res: Response, next: NextFunction) {
    
    const authHeader = req.header('Authorization')?.split(' ');
    const cookies = req.headers.cookie?.split(';');

    // check if authorisation header exists
    if(!authHeader && !cookies) return res.status(401).json({ 
        errors: {
            body: ['Authorisation failed', 'Not authorized user']
        }
    })

    // check if header is jwt or not
    if(authHeader && authHeader[0] != 'jwt') return res.status(401).json({
		errors: {
			body: ['Authorisation failed', 'Token Missing']
		}
	});

    // decode the token
    let token = '';
    if(authHeader) {
        token = authHeader[1];
    } else if(cookies) {
        const cookie = cookies[0].split('=');
        token = cookie[1];
    }
    try {
        const user = await decodeToken(token);
        if(!user) throw new Error("User not found in token");

        (req as any).user = user;
		return next();
    } catch (e) {
        return res.status(401).json({
			errors: {
				body: ['Authorisation failed', e]
			},
		});
    }
     
}