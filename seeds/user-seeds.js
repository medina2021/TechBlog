const { User } = require('../models');

const userData = [
    {
        username: 'lola2020',
        email: 'stephc@gmail.com',
        password: 'dreamb'
    },
    {
        username: 'everm',
        email: 'everm@gmail.com',
        password: 'emeral'
    },
    {
        username: 'mc25',
        email: 'michellecb@gmail.com',
        password: 'michel'
    },
    {
        username: 'montythedog',
        email: 'monty@gmail.com',
        password: 'monty1'
    },
    {
        username: 'Missy',
        email: 'missy@gmail.com',
        password: 'misses'
    },
    {
        username: 'CamilaM',
        email: 'camilam@gmail.com',
        password: 'camila1'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;