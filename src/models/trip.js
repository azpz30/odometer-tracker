const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    fuelCharge: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
    },
    distance: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    stops: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stop',
    }]
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
