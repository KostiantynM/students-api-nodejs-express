const {
    students
} = require('../services');

const getStudentsList = async (req, res, next) => {
    let options = req.query;
  
  
    try {
      const result = await students.getStudentsList(options);
      res.status(result.status || 200).send(result.data);
    }
    catch (err) {
        console.log('error accuared', err)
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
      const result = await students.getStudentById(options);
      res.status(result.status || 200).send(result.data);
    }
    catch (err) {
      return res.status(500).send({
        error: err || 'Something went wrong.'
      });
    }
  }

module.exports = {
    getStudentsList,
    getStudentById,
}