const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');

// To get all posts
router.get('/', async (req, res)=>{
    try{
        const dbPostData = await Post.findAll({
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'creat']

            }
        ]
        })

    }




} )