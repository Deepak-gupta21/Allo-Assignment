// routes/appointmentRoutes.js
const express = require('express');
const Appointment = require('../models/appointment');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get all appointments
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Create an appointment
router.post('/', async (req, res) => {
    const { doctorName, patientName, time } = req.body;
    try {
        const appointment = new Appointment({ doctorName, patientName, time });
        await appointment.save();
        res.status(201).json(appointment);
    } catch (err) {
        res.status(400).json({ message: 'Error creating appointment' });
    }
});


// Update Appointment
router.put('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(appointment);
    } catch (err) {
        res.status(400).json({ message: 'Error updating appointmemt' });
    }
});

// Appointment delete
router.delete('/:id', async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.json({ message: 'Appointment deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting appointment' });
    }
});


module.exports = router;
