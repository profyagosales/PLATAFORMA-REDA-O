const Theme = require('../models/theme');
const Plan = require('../models/plan');
const Payment = require('../models/payment');

const students = [];
const corrections = [];

module.exports = {
  // Theme operations
  listThemes: () => Theme.findAll(),
  createTheme: data => Theme.create(data),
  updateTheme: (id, data) => Theme.update(id, data),
  removeTheme: id => Theme.remove(id),

  // Plan operations
  listPlans: () => Plan.findAll(),
  createPlan: data => Plan.create(data),
  updatePlan: (id, data) => Plan.update(id, data),
  removePlan: id => Plan.remove(id),

  // Payment operations
  listPayments: () => Payment.findAll(),
  createPayment: data => Payment.create(data),
  updatePayment: (id, data) => Payment.update(id, data),
  removePayment: id => Payment.remove(id),

  // Student operations
  listStudents: () => students,
  addStudent: data => {
    const student = { id: students.length ? students[students.length - 1].id + 1 : 1, ...data };
    students.push(student);
    return student;
  },
  removeStudent: id => {
    const index = students.findIndex(s => s.id === Number(id));
    if (index !== -1) {
      students.splice(index, 1);
      return true;
    }
    return false;
  },

  // Correction operations
  listCorrections: () => corrections,
  addCorrection: data => {
    const correction = { id: corrections.length ? corrections[corrections.length - 1].id + 1 : 1, ...data };
    corrections.push(correction);
    return correction;
  }
};
