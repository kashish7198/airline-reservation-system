console.log("Flight routes loaded");
const express = require("express");
const Flight = require("../models/Flight");

const router = express.Router();

// Get all flights
router.get("/", async (req, res) => {
    try {
        const flights = await Flight.find();
        res.json(flights);
    } catch (error) {
        res.status(500).json({ message: "Error fetching flights" });
    }
});
// Get one flight by ID
router.get("/:id", async (req, res) => {
    try {
        const flight = await Flight.findById(req.params.id);

        if (!flight) {
            return res.status(404).json({ message: "Flight not found" });
        }

        res.json(flight);
    } catch (error) {
        res.status(500).json({ message: "Error fetching flight" });
    }
});
// Add a new flight
router.post("/", async (req, res) => {
    try {
        const newFlight = new Flight(req.body);
        const savedFlight = await newFlight.save();

        res.status(201).json(savedFlight);
    } catch (error) {
        res.status(500).json({ message: "Error adding flight" });
    }
});

module.exports = router;