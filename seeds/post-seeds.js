const { Post } = require('../models');

const postData = [
    {
        title: 'First Post',
        content: 'This is my first post. Let me know what you guys think?',
        user_id: 1
    },
    {
        title: 'Second Post',
        content: 'This is my second post. What should I write about? ',
        user_id: 2
    },
    {
        title: 'Third Post',
        content: 'This is my third post. Any comments?',
        user_id: 3
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
