module.exports = function (app) {
  /*
  * Routes
  */
  app.use('/students', require('./routes/students.route'));

};
