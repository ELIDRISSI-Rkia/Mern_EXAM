const Student = require('../model/student');

exports.getAll = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};

exports.create = async (req, res) => {
  const student = new Student({
    name: req.body.name,
    email: req.body.email,
    major: req.body.major
  });
  await student.save();
  res.json({ status: 'Student saved' });
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const student = {
    name: req.body.name,
    email: req.body.email,
    major: req.body.major
  };
  await Student.findByIdAndUpdate(id, {$set: student}, {new: true});
  res.json({ status: 'Student updated' });
};

exports.delete = async (req, res) => {
  await Student.findByIdAndRemove(req.params.id);
  res.json({ status: 'Student deleted' });
};
