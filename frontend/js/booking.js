const token = localStorage.getItem("token");

if (!token) {
    alert("Please login first.");
    window.location.href = "login.html";
}
const params = new URLSearchParams(window.location.search);

const flightId = params.get("flightId");

console.log("Selected Flight ID:", flightId);

fetch(`http://localhost:5000/api/flights/${flightId}`)
    .then(response => response.json())
    .then(flight => {

        console.log("Selected Flight:", flight);

        const flightDetails = document.getElementById("flightDetails");

        flightDetails.innerHTML = `
            <h2>${flight.airline} - ${flight.flightNumber}</h2>
            <p>${flight.from} → ${flight.to}</p>
            <p>Date: ${flight.date}</p>
            <p>${flight.departureTime} → ${flight.arrivalTime}</p>
            <p>Price: ₹${flight.price}</p>
            <p>Available Seats: ${flight.seats}</p>
        `;
    })
    .catch(error => {
        console.log("Error fetching flight:", error);
    });


const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const passengerName = document.getElementById("passengerName").value;
    const passengerEmail = document.getElementById("passengerEmail").value;

    fetch(`http://localhost:5000/api/flights/${flightId}`)
        .then(response => response.json())
        .then(flight => {

            const bookingData = {
                passengerName: passengerName,
                passengerEmail: passengerEmail,
                flightId: flight._id,
                flightNumber: flight.flightNumber,
                from: flight.from,
                to: flight.to,
                date: flight.date
            };

            return fetch("http://localhost:5000/api/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                },
                body: JSON.stringify(bookingData)
            });
        })
        .then(response => response.json())
        .then(data => {
            console.log("Booking successful:", data);
            alert("Booking successful!");
        })
        .catch(error => {
            console.log("Booking error:", error);
            alert("Error creating booking.");
        });
});