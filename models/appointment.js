// models/appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    doctorName: { type: String, required: true },
    patientName: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ['In Queue', 'With Doctor', 'Completed'], default: 'In Queue' },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
