const express = require('express')
const mongoose = require('mongoose')

const EmployeeRoute = require('./employee.route')

const Config = require('./DB')

const EmpployeeRoute = require('./employee.route')

const port = 4000

const app = express()

mongoose.connect(Config.DB, {useNewUrlParser: true})
const connection = mongoose.connection

connection.on('open', () => {
    console.log('DB is connected...')
})

app.use(express.json())

app.get('/',(req,res) => {
    res.send("Hello")
})


app.use('/employee',EmployeeRoute);

app.listen(port,() => {
    console.log("Server is started..")
})
