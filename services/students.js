const logger = require('../common/logger');
const {studentDao} = require('../dao');
const {token} = require('../drivers');

module.exports = {
  /**
  * 
  * @param options.sort To sort results 

  */
  getStudentsList: async (options) => {
    const { 
      sort = {
          field: "lastName",
          order: 1
      },
      skip = 0,
      limit = 2
   } = options;
    
    const {
      results,
      total
    } = await studentDao.getStudentsList({
      sort,
      skip,
      limit
    });

    var data = {
        limit,
        results,
        skip,
        total,
      },
      status = 200;

    return {
      status: status,
      data: data
    };
  },

  /**
  * 
  * @param options.studentId To retrieve student 

  */
  getStudentById: async (options) => {

    const student = await studentDao.getStudentById(options)

    var data = student,
      status = '200';

    return {
      status: status,
      data: data
    };  
  },

  signup: async (options, ctx) => {
    try {
      const student = await studentDao.signup(options);
      return student;

    } catch (err) {
      ctx.logger.error('Failed to signup', err);
      throw err;
    }
  },
  
  login: async (options) => {
    // token --->>> _id, firstName
    const student = await studentDao.findByAuth(options);
  

    if (!student) {
      throw 'NotFound'
    }

    const studentToken = token.sign({
      _id: student._id,
      firstName: student.firstName
    });

    await studentDao.saveToken({
      _id: student._id,
      token:studentToken
    });

    return studentToken;
  }
};
