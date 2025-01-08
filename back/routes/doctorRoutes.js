// routes/doctorRoutes.js
const express = require('express');
const Doctor = require('../models/doctor');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get all doctors
router.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Add a new doctor
router.post('/', async (req, res) => {
    const { name, specialty, experience, availableTimeSlots } = req.body;
    try {
        const doctor = new Doctor({ name, specialty, experience, availableTimeSlots });
        await doctor.save();
        res.status(201).json(doctor);
    } catch (err) {
        res.status(400).json({ message: 'Error creating doctor' });
    }
});



// Update doctor
router.put('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(doctor);
    } catch (err) {
        res.status(400).json({ message: 'Error updating doctor' });
    }
});

// Delete doctor
router.delete('/:id', async (req, res) => {
    try {
        await Doctor.findByIdAndDelete(req.params.id);
        res.json({ message: 'Doctor deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting doctor' });
    }
});

module.exports = router;
