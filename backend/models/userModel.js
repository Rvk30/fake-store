const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
    },
    username: {
        type: String,
        required: [true, 'Please add a username'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
    },
    name: {
        firstname: {
            type: String,
            required: [true, 'Please add a first name'],
        },
        lastname: {
            type: String,
            required: [true, 'Please add a last name'],
        },
    },
    address: {
        geolocation: {
            lat: {
                type: String,
                required: false,
            },
            long: {
                type: String,
                required: false,
            },
        },
        city: {
            type: String,
            required: false,
        },
        street: {
            type: String,
            required: false,
        },
        number: {
            type: Number,
            required: false,
        },
        zipcode: {
            type: String,
            required: false,
        },
    },
    phone: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);