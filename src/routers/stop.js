const express = require('express')
const Stop = require('../models/stop')
const Trip = require('../models/trip')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/stops', auth, async (req, res) => {
    const { tripID, odometerReading, passengers } = req.body;

    try {
        const trip = await Trip.findById(tripID);
        if (!trip) {
            return res.status(404).send({ error: 'Trip not found' });
        }

        if (BigInt(odometerReading) <= trip.currentOdometer) {
            return res.status(400).send({ error: 'Odometer reading must be greater than the current odometer value' });
        }
        const calculatedDistance = BigInt(odometerReading) - trip.currentOdometer;

        const stop = new Stop({
            distance: Number(calculatedDistance),
            tripOf: tripID,
            owner: [req.user._id, ...(passengers || [])],
        });
        await stop.save();

        trip.currentOdometer = BigInt(odometerReading);
        trip.distance = (trip.distance || 0) + Number(calculatedDistance);
        await trip.save();

        res.status(201).send(stop);
        console.log('New Stop Created Successfully!');
    } catch (e) {
        res.status(400).send(e);
    }
});


module.exports = router