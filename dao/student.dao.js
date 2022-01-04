const {student} = require('../models');

class StudentDao {
    constructor(options) {
        this.modelStudent = options.modelStudent;
    }

    async getStudentsList (options) {
        const { 
            sort,
            skip,
            limit
         } = options;

        const results = await this.modelStudent.find({})
        .sort({
            [sort.field]: sort.order
        })
        .skip(skip)
        .limit(limit);
        const total = await this.modelStudent.count({});

        return {
            results,
            total
        };
    }

    async getStudentById (options) {
        const {studentId} = options;

        const student = await this.modelStudent.findById(studentId);

        return student;
    }

    async signup (options) {
        const student = await this.modelStudent.create(options);

        return student;
    }

    async findByAuth (options) {
        console.log('Find by auth callde', {options});
        const student = await this.modelStudent.findOne(options);

        return student;
    }

    async saveToken ({_id, token}) {
        //search  query
        //payload
        await this.modelStudent.update({_id}, {token});
    }
}

module.exports = new StudentDao({
    modelStudent: student
})