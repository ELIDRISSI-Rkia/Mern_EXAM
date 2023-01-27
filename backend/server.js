const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Student = require('./model/student');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());
mongoose.connect('mongodb://localhost:27017/students', { useNewUrlParser: true, useUnifiedTopology: true });
const studentRoutes = require('./routes/student');
app.use('/students', studentRoutes);


app.get('/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.post('/students', async (req, res) => {
  const student = new Student({
    name: req.body.name,
    email: req.body.email,
    major: req.body.major
  });
  await student.save();
  res.json({ status: 'Student saved' });
});

app.put('/students/:id', async (req, res) => {
  const { id } = req.params;
  const student = {
    name: req.body.name,
    email: req.body.email,
    major: req.body.major
  };
  await Student.findByIdAndUpdate(id, {$set: student}, {new: true});
  res.json({ status: 'Student updated' });
});

app.delete('/students/:id', async (req, res) => {
  await Student.findByIdAndRemove(req.params.id);
  res.json({ status: 'Student deleted' });
});

app.listen(4000, () => {
  console.log('Server on port', 4000);
});
