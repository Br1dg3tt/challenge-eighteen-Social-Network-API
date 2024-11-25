const connection = require('../config/connection');
connection.on('error', (err) => err);

const User = require('./models/User');
const Thought = require('./models/Thought');

const userData = require('./userData.json');
const thoughtData = require('./thoughtData.json');

console.log('Seeding Data');

connection.once('open', async () => {
    console.log('Now Connected to Database');
    console.info('Seeding Data');

    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        await connection.db.dropCollection('users');
    }

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
        await connection.db.dropCollection('thoughts');
    }

    await User.collection.insertMany(userData);
    await Thought.collection.insertMany(thoughtData);

    console.table(userData);
    console.table(thoughtData);

    console.info('Data Seeded');
    process.exit(0);
});