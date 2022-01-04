const mongoose = require('mongoose');

let db;

const initConnection = async (ctx) =>
    
    db = await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  // notifying about successful connection
  .then(() => {
    ctx.logger.info("Successfully connected to database");
  })
  // notifying about connection issue
  .catch((error) => {
    ctx.logger.error("database connection failed. exiting now...", error);
    process.exit(1); // exit with signal 1 which means process exit with error
  });

const disconnect = async (ctx) => {
  if (!dbConnection) {
    return;
  }
  await Mongoose.disconnect();
  ctx.logger.info('connection closed successfully');
};

module.exports = {
    initConnection,
    disconnect,
    getDb: () => db,
};