const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nic: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model('employeeSchema',employeeSchema)