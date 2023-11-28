import { carSchema } from "./Car";
const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    departure: {
        country: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true   
        },
        address: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        }
    },
    destination: {
        country: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true   
        },
        address: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        }
    },
    date: {
        type: String,
        required: true
    },
    totalTime: {
        type: String,
        required: true
    },
    seats: {
        available: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true
        }
    },
    services: {
        smoking: {
            type: Boolean,
            required: true
        },
        childSeat: {
            type: Boolean,
            required: true
        },
        pets: {
            type: Boolean,
            required: true
        },
        alcohol: {
            type: Boolean,
            required: true
        },
        luggage: {
            type: Boolean,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    },
    car: {
        type: carSchema,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    driverId: {
        type: String,
        required: true
    },
    passengerIDs: {
        type: Array,
        required: true
    },
    successful: {
        type: Boolean,
        required: true
    },
    __v: {
        type: String
    }
});

const Trip = mongoose.model('Trips', tripSchema);

export default Trip;