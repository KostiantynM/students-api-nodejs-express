const mongoose = require('mongoose');

let db;

const initConnection = async () =>
    
    db = await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  // notifying about successful connection
  .then(() => {
    console.log("Successfully connected to database");
  })
  // notifying about connection issue
  .catch((error) => {
    console.log("database connection failed. exiting now...");
    console.error(error);
    process.exit(1); // exit with signal 1 which means process exit with error
  });

const disconnect = async (ctx) => {
  const { logger } = ctx;
  if (!dbConnection) {
    return;
  }
  await Mongoose.disconnect();
  logger.info('connection closed successfully');
};

module.exports = {
    initConnection,
    disconnect,
    getDb: () => db,
};