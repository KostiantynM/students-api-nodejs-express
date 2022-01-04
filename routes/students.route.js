const express = require('express');
const router = new express.Router();

const {
  students
} = require('../controllers');
const {
  toHashPassword,
  auth,
} = require('../middlewares');


 
router.get('/', auth, students.getStudentsList);

router.post('/', toHashPassword, students.signup);
router.post('/login', students.login);
 
router.get('/:studentId', auth, students.getStudentById);

router.get('/hello', auth, (req,res,next) => {
  const {
    _id,
    firstName
  } = req.ctx.requester;
  res.status(200).json({
    hello: `Hello ${firstName}, Your Id is ${_id}`
  })
});

module.exports = router;