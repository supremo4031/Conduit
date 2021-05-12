require('dotenv').config();
import express from 'express';
import { createConnection } from 'typeorm';
import { Article } from './entity/Article';
import { Comment } from './entity/Comment';
import { Tag } from './entity/Tag';
import { User } from './entity/User';
import { articlesRouter } from './router/articles';
import { profilesRouter } from './router/profiles';
import { tagsRouter } from './router/tags';
import { userRouter } from './router/user';
import { usersRouter } from './router/users';

var cors = require('cors')
var cookieparser = require('cookie-parser');

const app = express();
const port = 4000;

const corsOptions = {
	//To allow requests from client
	origin: [
		'http://localhost:3000',
		'http://127.0.0.1',
		'http://localhost:4000',
	],
	credentials: true,
	exposedHeaders: ['set-cookie'],
};

app.use(express.json());
app.use(cors(corsOptions))
app.use(cookieparser())

app.use('/api/users', usersRouter)
app.use('/api/user', userRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/profiles', profilesRouter);
app.use('/api/tags', tagsRouter);


app.get('/', (req, res) => {
    res.json({
        response : "Fucked up totally"
    })
})

async function start() {

    await createConnection({
        type: 'postgres',
        database: 'conduit',
        username: 'conduit',
        password: 'conduit',
        entities: [Article, User, Comment, Tag],
        synchronize: true,
        // dropSchema: true,
        logging: true,
        logger: 'advanced-console'
    })

    app.listen(port, () => {
        console.log(`server is running http://localhost:${port}`);
    })
}

start();

