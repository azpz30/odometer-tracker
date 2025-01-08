const mongoose = require('mongoose');
const User = require('./models/user');
const Trip = require('./models/trip');
const Stop = require('./models/stop');

mongoose.connect('mongodb://127.0.0.1:27017/odometer-tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

const testDatabase = async () => {
    try {
        // Create a user
        const user = new User({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'secureLlama123',
        });
        await user.save();
        console.log('User created:', user);

        // Create a stop
        const stop = new Stop({
            distance: 15.5,
            owner: user._id,
        });
        await stop.save();
        console.log('Stop created:', stop);

        // Create a trip
        const trip = new Trip({
            fuelCharge: 30.25,
            distance: 150.75,
            owner: user._id,
            stops: [stop._id],
        });
        await trip.save();
        console.log('Trip created:', trip);

        // Fetch and populate data
        const fetchedTrip = await Trip.findById(trip._id).populate('stops').exec();
        console.log('Fetched Trip with Stops:', fetchedTrip);
    } catch (error) {
        console.error('Error during database operations:', error);
    } finally {
        mongoose.connection.close(); // Close the connection
    }
};

testDatabase();
