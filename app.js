import { configDotenv } from 'dotenv';
import express from 'express';
import cors from 'cors';
import { createPost, deletePost, getPost, getPosts, updatePost } from './controllers/posts.js';

configDotenv();
const app = express();

app.use(cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());

app.post('/content', (req, res) => createPost(req, res));

app.get('/content', (req, res) => getPosts(req, res));

app.get('/content/:slug', (req, res) => getPost(req, res));

app.delete('/content/:id', (req, res) => deletePost(req, res));

app.put('/content/:id', (req, res) => updatePost(req, res));

const server = app.listen(process.env.PORT, () => console.log('Listening on PORT : %o ', process.env.PORT));
