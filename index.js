const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/crud';

mongoose.connect(mongoUri)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

/* Schema */
const employeeSchema = new mongoose.Schema({
  empID: String,
  name: String,
  DOJ: String,
  resign: String,
  DOR: String
});

/* Model */
const Employee = mongoose.model('Employee', employeeSchema, 'employee');


// CREATE
app.post('/employee', async (req, res) => {
  try {

    const employee = new Employee(req.body);

    const savedEmployee = await employee.save();

    res.status(201).json(savedEmployee);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }
});


// READ ALL
app.get('/employee', async (req, res) => {
  try {
console.log('enter');

    const employees = await Employee.find();

    res.json(employees);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }
});


// READ ONE
app.get('/employee/:id', async (req, res) => {
  try {

    const employee = await Employee.findById(req.params.id);

    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    res.json(employee);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }
});


// UPDATE
app.put('/employee/:id', async (req, res) => {
  try {

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedEmployee)
      return res.status(404).json({ message: "Employee not found" });

    res.json(updatedEmployee);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }
});


// DELETE
app.delete('/employee/:id', async (req, res) => {
  try {

    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);

    if (!deletedEmployee)
      return res.status(404).json({ message: "Employee not found" });

    res.json({ message: "Employee deleted successfully" });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});