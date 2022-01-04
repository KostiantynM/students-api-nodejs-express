const express = require('express');
const router = new express.Router();

const {
  students
} = require('../controllers');
const {
  toHashPassword,
);
} = require('../middlewares');

router.post('/', toHashPassword, students.signup);
router.get('/:studentId',  students.getStudentById);

module.exports = router;