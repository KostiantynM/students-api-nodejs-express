const express = require('express');
const students = require('../services/students');
const router = new express.Router();
 
router.get('/', async (req, res, next) => {
  let options = { 
    "sort": req.query.sort,
  };


  try {
    const result = await students.getStudentsList(options);
    res.status(result.status || 200).send(result.data);
  }
  catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  }
});
 
router.get('/:studentId', async (req, res, next) => {
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
});

module.exports = router;