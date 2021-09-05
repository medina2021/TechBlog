const {Post} = require('../models');

const postData = [
    {
        title: 'First Post',
        content: 'This is what my first post is about',
        user_id: 1
    },
    {
        title: 'Second Post',
        content: 'This is what my second post is about',
        user_id: 2
    },
    {
        title: 'Third Post',
        content: 'This is what my third post is about',
        user_id: 3
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
