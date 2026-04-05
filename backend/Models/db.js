const mongoose = require('mongoose');
const mongo_url = process.env.MONGO_URI;

mongoose.connect(mongo_url)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });