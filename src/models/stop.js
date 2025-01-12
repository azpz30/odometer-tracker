const mongoose = require('mongoose')

const Stop = mongoose.model('Stop', {
    distance: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
    },
    tripOf: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Trip'
    },
    owner: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }]
})

module.exports = Stop