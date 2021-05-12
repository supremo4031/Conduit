"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const Article_1 = require("./entity/Article");
const Comment_1 = require("./entity/Comment");
const Tag_1 = require("./entity/Tag");
const User_1 = require("./entity/User");
const articles_1 = require("./router/articles");
const profiles_1 = require("./router/profiles");
const tags_1 = require("./router/tags");
const user_1 = require("./router/user");
const users_1 = require("./router/users");
var cors = require('cors');
var cookieparser = require('cookie-parser');
const app = express_1.default();
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
app.use(express_1.default.json());
app.use(cors(corsOptions));
app.use(cookieparser());
app.use('/api/users', users_1.usersRouter);
app.use('/api/user', user_1.userRouter);
app.use('/api/articles', articles_1.articlesRouter);
app.use('/api/profiles', profiles_1.profilesRouter);
app.use('/api/tags', tags_1.tagsRouter);
app.get('/', (req, res) => {
    res.json({
        response: "Fucked up totally"
    });
});
async function start() {
    await typeorm_1.createConnection({
        type: 'postgres',
        database: 'conduit',
        username: 'conduit',
        password: 'conduit',
        entities: [Article_1.Article, User_1.User, Comment_1.Comment, Tag_1.Tag],
        synchronize: true,
        // dropSchema: true,
        logging: true,
        logger: 'advanced-console'
    });
    app.listen(port, () => {
        console.log(`server is running http://localhost:${port}`);
    });
}
start();
