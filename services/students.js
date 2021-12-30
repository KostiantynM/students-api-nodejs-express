module.exports = {
  /**
  * 
  * @param options.sort To sort results 

  */
  getStudentsList: async (options) => {

    // Implement your business logic here...
    //
    // Return all 2xx and 4xx as follows:
    //
    // return {
    //   status: 'statusCode',
    //   data: 'response'
    // }

    // If an error happens during your business logic implementation,
    // you can throw it as follows:
    //
    // throw new Error('<Error message>'); // this will result in a 500

    var data = {
        "limit": "<integer>",
        "results": "<array>",
        "skip": "<integer>",
        "total": "<integer>",
      },
      status = '200';

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

    // Implement your business logic here...
    //
    // Return all 2xx and 4xx as follows:
    //
    // return {
    //   status: 'statusCode',
    //   data: 'response'
    // }

    // If an error happens during your business logic implementation,
    // you can throw it as follows:
    //
    // throw new Error('<Error message>'); // this will result in a 500

    var data = {
        "_id": "<string>",
        "firstName": "<string>",
        "lastName": "<string>",
      },
      status = '200';

    return {
      status: status,
      data: data
    };  
  },
};
