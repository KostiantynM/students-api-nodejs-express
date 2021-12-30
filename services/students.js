const {studentDao} = require('../dao');

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
};
