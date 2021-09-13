const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const mustLogin = require('../../utils/mustlogin');

// To get all posts
router.get('/', async (req, res)=> {
    console.log('==================');
    Post.findAll({
        attributes: ['id',
                    'title',
                    'content',
                    'created_at'
                ],
        order: [['created_at','DESC']],
        include: [
            {
            model: User,
            attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_input', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData.reverse()))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get one Post
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id',
                     'content',
                     'title',
                     'created_at'
        ],
    include: [
        {
            model: User,
            attributes: ['username']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_input', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
        ]
    })     
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post exists with this ID' });
          return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// Create a Post
router.post('/', mustLogin, (req,res) =>{
    Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
});

// Update a Post
router.put('/:id', mustLogin, (req,res) =>{
    Post.update({
        title: req.body.title,
        content: req.body.content
    },
    {
        where: {
            id: req.params.id
        }
    }).then(dbPostData => {
        if (!dbPostData) {
        }
        res.json(dbPostData);
    })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Delete a Post
router.delete('/:id', mustLogin, (req, res) =>{
    Post.destroy({
        where: {
            id:req.params.id
        }
    }).then(dbPostData =>{
        if(!dbPostData) {
            res.status(404).json({ message: 'No post exists with this ID'});
            return;
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;