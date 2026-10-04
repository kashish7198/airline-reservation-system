console.log("Booking routes loaded");
const express = require("express");
const Booking = require("../models/Booking");
const Flight = require("../models/Flight");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all bookings
router.get("/", authMiddleware, async (req, res) => {
    try {
        const bookings = await Booking.find({
            userId: req.userId
        });

        res.json(bookings);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching bookings"
        });
    }
});
// Add a new booking
router.post("/", authMiddleware, async (req, res) => {
    try {
        const flight = await Flight.findById(req.body.flightId);

if (!flight) {
    return res.status(404).json({ message: "Flight not found" });
}

if (flight.seats <= 0) {
    return res.status(400).json({ message: "No seats available" });
}

const newBooking = new Booking({
    ...req.body,
    userId: req.userId
});
const savedBooking = await newBooking.save();

flight.seats = flight.seats - 1;
await flight.save();

res.status(201).json(savedBooking);
    } catch (error) {
        res.status(500).json({ message: "Error adding booking" });
    }
});

// Delete a booking
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
       const booking = await Booking.findOne({
    _id: req.params.id,
    userId: req.userId
});

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        await Booking.findByIdAndDelete(req.params.id);

        const flight = await Flight.findById(booking.flightId);

        if (flight) {
            flight.seats = flight.seats + 1;
            await flight.save();
        }

        res.json({ message: "Booking cancelled successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error cancelling booking" });
    }
});

module.exports = router;