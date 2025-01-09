// models/doctor.js
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    experience: { type: Number, required: true },
    availableTimeSlots: { type: [String], required: true }, // Example: ['10:00 AM', '11:00 AM']
});

module.exports = mongoose.model('Doctor', doctorSchema);
