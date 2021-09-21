const router = require('express').Router();
const { Comment } = require('../../models');
const sequelize = require('../../config/connection');
const mustLogin = require('../../utils/mustlogin')

// Get all comments
    router.get('/', (req,res) => {
        Comment.findAll({})
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err =>{
            console.log(err);
            res.status(500).json(err);
        })
    });

// Get only one comment
    router.get('/:id', (req,res) =>{
        Comment.findAll({
            where: {
                id: req.params.id}
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err =>{
            console.log(err);
            res.status(500).json(err);
        })
    });

// Create Comment
router.post('/', mustLogin, (req, res) =>{
    if(req.session){
        Comment.create({
            comment_input: req.body.comment_input,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    }
});
// Update Comment
router.put('/:id', mustLogin, (req, res) =>{
        Comment.update({
            comment_input: req.body.comment_input,
        },
        {
            where: {
                id: req.params.id
            }
        }).then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comment exists with this ID '});
                return;
            }
            res.json(dbCommentData);
        }).catch(err =>{
            console.log(err);
            res.status(500).json(err);
        });
});

// Delete Comment
router.delete('/:id', mustLogin, (req,res) =>{
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbCommentData => {
        if (!dbCommentData){
            res.status(404).json({ message: 'No comment exists with this ID'});
            return;
        }
        res.json(dbCommentData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;