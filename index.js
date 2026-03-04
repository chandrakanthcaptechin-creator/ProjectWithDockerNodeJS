const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json()); 


const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/crud';

mongoose.connect(mongoUri) 
  .then(() => console.log('connected'))
  .catch(err => console.error('Failed to connect:', err));

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true }
});

const Employee = mongoose.model('Employee', employeeSchema, 'employee');
app.post('/employee', async (req, res) => {
  try {
    const { name, age, email } = req.body;
    const employee = new Employee({ name, age, email });
    const saved = await employee.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/employee', async (req, res) => {
    
  try {
       const employees = await Employee.find();      
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/employee/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
      res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/employee/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, email } = req.body;
    const updated = await Employee.findByIdAndUpdate(
      id,
      { name, age, email },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Employee not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/employee/:id', async (req, res) => {
  try {
    console.log('entered');    
    const { id } = req.params;
    const deleted = await Employee.findByIdAndDelete(id);
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

