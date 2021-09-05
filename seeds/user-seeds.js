const {User} = require('../models');

const userData = [
    {
        username: 'lola2020',
        email: 'stephc@gmail.com',
        password: 'dreambig1'
    },
    {
        username: 'everm',
        email: 'everm@gmail.com',
        password: 'emerald123'
    },
    {
        username: 'mc25',
        email: 'michellecb@gmail.com',
        password: 'camila1'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;