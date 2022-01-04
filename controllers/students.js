const {
    students
} = require('../services');

const getStudentsList = async (req, res, next) => {
    const {logger, requestId} = req;
    let options = req.query;
    logger.info('[getStudentsList] requested', {requestId}); // warn, error
  
    try {
      const result = await students.getStudentsList(options, {logger: req.logger});
      res.status(result.status || 200).send(result.data);
    }
    catch (err) {
        logger.error('error accuared', {err, requestId});
      return res.status(500).send({
        error: err || 'Something went wrong.'
      });
    }
  }

const getStudentById = async (req, res, next) => {
    let options = { 
      "studentId": req.params.studentId,
    };
  
  
    try {
      const result = await students.getStudentById(options, {logger: req.logger});
      res.status(result.status || 200).send(result.data);
    }
    catch (err) {
      return res.status(500).send({
        error: err || 'Something went wrong.'
      });
    }
  }

const signup = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password
  } = req.body;

  try {
    const options = {
      firstName,
      lastName,
      email,
      password
    };
    const student = await students.signup(options, {logger: req.logger});

    res.status(200).json(student);
  } catch (err) {
    req.logger.error('Signup failed', err);
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  }
}

const login = async (req, res, next) => {
  const {
    login,
    password
  } = req.body;
  try {
    const options = {
      email: login,
      password
    }
    req.logger.info('Got login request with params', {options});
    const token = await students.login(options, {logger: req.logger});

    res.status(200).send(token);
  } catch (err) {
    req.logger.error(err);
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  }
}

module.exports = {
    getStudentsList,
    getStudentById,
    signup,
    login,
}