const express = require('express')
const EmployeeRoute = express.Router();
const uuid = require('uuid').v4

const employeeSchema = require('./employee.model')

const multer = require('multer');
const { Error } = require('mongoose');

const DIR = './upload'

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,DIR);
    },
    filename: (req,file,cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuid() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null,true);
        }else {
            cb(null,false);
            return cb(new Error('Only jpaeg, jpg, png format allowed!'));
        }
    }
})

EmployeeRoute.get('/', async(req,res) => {
    try {
        const employees = await employeeSchema.find()
        res.json(employees)
    } catch (error) {
        res.send('Error '+error)
    }
})

EmployeeRoute.post('/add', upload.single("image"), async (req,res) => {
   
    const url = req.protocol + '://' + req.get('host');

    const employee = new employeeSchema({
        name: req.body.name,
        nic: req.body.nic,
        image: url + '/upload/' + req.file.file
    })

    try {
        const e1 = await employee.save();
        res.json(e1)
    } catch (error) {
        res.send(error)
    }
    
})

EmployeeRoute.get('/:id', async (req,res) => {
    try {
        const e1 = await employeeSchema.findById(req.params.id)
        res.json(e1)
    } catch (error) {
    res.send('Error '+error)        
    }
})

EmployeeRoute.patch('/:id', async (req,res) => {
    try {
        const e1 = await employeeSchema.findById(req.params.id);
        e1.name = req.body.name
        e1.nic = req.body.nic
        try {
            e1.save()
            res.json(e1)
        } catch (error) {
            res.send('Error '+error)            
        }
    } catch (error) {
        res.send('Error '+error)
    }
})

EmployeeRoute.delete('/:id', async (req,res) => {
    await employeeSchema.findByIdAndDelete(req.params.id).then(employee=>{
        res.json('Employee Deleted')
    }).catch( err=> res.status(400).json('Error '+err))
})

module.exports = EmployeeRoute