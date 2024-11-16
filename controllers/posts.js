import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createPost = async (req, res) => {
    const { title, content, slug } = req.body;
    try {
        const post = await prisma.post.create({
            data: { title, slug, content }
        });

        if (post.id) {
            return res.status(201).json({ data: post })
        }
    } catch (e) {
        console.error('#### FAILED TO CREATE POST : %o ', e);
        //Send failure data to log monitor
    }
};

const getPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany();
        if (posts.length > 0) {
            return res.json({ data: posts });
        } else {
            return res.json({ message: 'No Posts Available. Please Create new post' });
        }
    } catch (e) {
        console.error('#### FAILED TO GET POSTS : %o ', e);
        //Send failure data to log monitor
    }
}

const getPost = async (req, res) => {
    try {
        const { slug } = req.params;
        const post = await prisma.post.findFirst({
            where: {
                slug
            }
        });
        if (post) {
            return res.json({ data: post })
        } else {
            return res.json({ message: 'Post Not found' });
        }
    } catch (e) {
        console.error('#### FAILED TO GET POST : %o ', e);
        //Send failure data to log monitor
    }
}

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, slug } = req.body;
        const updatedPost = await prisma.post.update({
            where: { id: parseInt(id) },
            data: {
                ...(title ? { title } : {}),
                ...(content ? { content } : {}),
                ...(slug ? { slug } : {})
            }
        });
        if (updatedPost.id) {
            return res.json({ message: `Content updated successfully` })
        }
    } catch (e) {
        console.error('#### FAILED TO Update post : %o ', e);
        //Send failure data to log monitor
    }
}

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPost = await prisma.post.delete({ where: { id: parseInt(id) } });
        if (deletedPost) {
            return res.json({ message: "Post Deleted Successfully" });
        }
    } catch (e) {
        console.error('#### FAILED TO Delete post : %o ', e);
        //Send failure data to log monitor
    }
}

export {
    createPost,
    deletePost,
    getPost,
    getPosts,
    updatePost
};
