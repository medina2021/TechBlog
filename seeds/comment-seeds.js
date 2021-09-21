const {Comment} = require('../models');

const commentData = [
{
    comment_input: 'App looks great! Make sure you post quality stuff',
    user_id: 4,
    post_id: 1
},
{
    comment_input: 'Looks good! you should write about MongoDB',
    user_id: 5,
    post_id: 2
},
{
    comment_input: 'Yes, when will you write your first blog?',
    user_id: 6,
    post_id: 3
}
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;