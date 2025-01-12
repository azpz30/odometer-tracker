const express = require('express')
const Trip = require('../models/trip')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/trips/new', auth, async (req, res) => {
    const trip = new Trip({
        fuelCharge: req.body.fuelCharge,
        distance: 0,
        owner: req.user._id,
        stops: [] 
    })

    try {
        await trip.save()
        res.status(201).send(trip)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/trips', auth, async (req, res) => {
    try {
        await req.user.populate('trips').execPopulate()
        res.send(req.user.trips)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/trips/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const trip = await Trip.findOne({ _id, owner: req.user._id })

        if (!trip) {
            return res.status(404).send()
        }

        res.send(trip)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/trips/:id', auth, async (req, res) => {
    try {
        const trip = await Trip.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!trip) {
            res.status(404).send()
        }

        res.send(trip)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/trip/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['fuelCharge']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const trip = await Trip.findOne({ _id: req.params.id, owner: req.user._id})

        if (!trip) {
            return res.status(404).send()
        }

        updates.forEach((update) => trip[update] = req.body[update])
        await trip.save()
        res.send(trip)
    } catch (e) {
        res.status(400).send(e)
    }
})