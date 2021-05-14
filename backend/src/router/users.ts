import { Router } from 'express';
import { createNewUser, loginUser } from '../controller/users';
const route = Router();

// login current user
route.post('/login', async (req, res) => {
    try {
        const user = await loginUser({
            email: req.body.email,
            password: req.body.password
        })
        
        const date = new Date();
        const days = 1;
		const expiry = 1000 * 60 * 60 * 24 * days;
        date.setTime(date.getTime() + expiry);
        res.cookie('jwt', user.token, {
            expires: date,
            httpOnly: true
        });

        return res.status(200).json({user})
    } catch (e) {
        return res.status(404).json({
            errors: {
                body: [e.message]
            }
        })
    }
})


// create current user
route.post('/', async (req, res) => {
    try {
        const user = await createNewUser({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        })

        const date = new Date();
        const days = 1;
        const expiry = (1000 * 60 * 60 * 24) * days;
		date.setTime(date.getTime() + expiry);
		res.cookie('jwt', user.token, {
			expires: date,
			httpOnly: true,
		});

        return res.status(201).json({user})
    } catch (error) {
        return res.status(404).json({
            errors: {
                body: [error.message]
            }
        })
    }
})

export const usersRouter = route