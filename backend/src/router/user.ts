import { Router } from 'express';
import { getCurrentUser, updateUser } from '../controller/user';
import { auth } from '../middleware/auth';
import { hashPassword } from '../utils/password';
const route = Router();

// get current user
route.get('/', auth, async (req, res) => {
    try {
        const email = (req as any).user.email
        const user = await getCurrentUser(email)

        if(!user) return res.status(403).json({
			errors: {
				body: ['No such email found']
			},
		});

        return res.status(200).json({user})
    } catch (e) {
        console.log(e.message);
        
        return res.status(403).json({
            errors: {
                body: [e.message]
            }
        })
    }
})


// update current user
route.patch('/', auth, async (req, res) => {
    try {
        const email = (req as any).user.email;
		
        const newUser = await updateUser(email, req.body.user);
        if(!newUser) return res.status(403).json({
            errors: {
                body: ['Cannot update user', 'Something went wrong']
            }
        })

        console.log(newUser)

        return res.status(200).json({ newUser })

    } catch (e) {
        return res.status(200).json({
            errors: {
                body: [e]
            }
        });
    }
})


export const userRouter = route

