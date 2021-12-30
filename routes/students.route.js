const express = require('express');
const router = new express.Router();

const {
  students
} = require('../controllers')
 
router.get('/', students.getStudentsList
);
 
router.get('/:studentId',  students.getStudentById);

module.exports = router;