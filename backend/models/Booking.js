const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    userId: String,
    passengerName: String,
    passengerEmail: String,
    flightId: String,
    flightNumber: String,
    from: String,
    to: String,
    date: String
});

module.exports = mongoose.model("Booking", bookingSchema);