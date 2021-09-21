const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const sequelize = require('../config/connection');

router.get('/', (req, res) => {
    Post.findAll({
        attributes:[
            'id',
            'title',
            'content',
            'created_at'
        ],
        include:[
            {
                model: Comment,
                attributes: ['id', 'comment_input', 'post_id', 'user_id', 'created_at'],
                include:{
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData =>{
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', { posts, loggedIn: req.session.loggedIn});
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
});

// Route to login after sign-up
router.get('/login', (req, res) =>{
    if(req.session.loggedIn){
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req,res)=> {
    res.render('signup');
});

// Get one Post
router.get('/post/:id', (req,res) => {
    Post.findOne({
        where:{
            id: req.params.id
        },
        attributes: [
            'id',
            'content',
            'title',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_input', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No post exists with this ID'});
            return;
        }

        const post = dbPostData.get({plain:true});

        console.log(post);
        res.render('single-post', {post, loggedIn: req.session.loggedIn});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});
// User to see all posts with comments
router.get('/posts-comments', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes:[
            'id',
            'content',
            'title',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_input', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
             if (!dbPostData){
             res.status(404).json({ message: 'No post exists with this ID'});
             return;
        }
        const post = dbPostData.get({plain:true});

    res.render('posts-comments', {post, loggedIn: req.session.loggedIn});
        })
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
        });
    });
module.exports = router;