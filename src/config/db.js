const mongoose = require('mongoose');
const debug = require('debug')('app:db');

const connectMongodb =  () => {
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);
    mongoose.connect(process.env.MONGO_URI)
        .then((conn) => {debug(`MongoDB Connected on ${conn.connection.host}:${conn.connection.port} with Databse: ${conn.connection.name}`.info.bold.italic)})
        .catch((err) => {debug(`MongoDB Connection Failed: ${err.message}`.error)});
}

module.exports = connectMongodb;