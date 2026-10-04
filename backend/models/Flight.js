const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
    flightNumber: String,
    airline: String,
    from: String,
    to: String,
    date: String,
    departureTime: String,
    arrivalTime: String,
    price: Number,
    seats: Number
});

module.exports = mongoose.model("Flight", flightSchema);