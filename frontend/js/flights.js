const params = new URLSearchParams(window.location.search);

const from = params.get("from");
const to = params.get("to");
const date = params.get("date");

const flightList = document.getElementById("flightList");

fetch("http://localhost:5000/api/flights")
    .then(response => response.json())
    .then(flights => {

        const filteredFlights = flights.filter(flight =>
            flight.from.toLowerCase() === from.toLowerCase() &&
            flight.to.toLowerCase() === to.toLowerCase() &&
            flight.date === date
        );

        if (filteredFlights.length === 0) {
            flightList.innerHTML = "<p>No flights found.</p>";
            return;
        }

        filteredFlights.forEach(flight => {

            const flightCard = document.createElement("div");

            flightCard.innerHTML = `
                <h2>${flight.airline} - ${flight.flightNumber}</h2>
                <p>${flight.from} → ${flight.to}</p>
                <p>Date: ${flight.date}</p>
                <p>${flight.departureTime} → ${flight.arrivalTime}</p>
                <p>Price: ₹${flight.price}</p>
                <p>Available Seats: ${flight.seats}</p>

                <button onclick="bookFlight('${flight._id}')">
                    Book Now
                </button>

                <hr>
            `;

            flightList.appendChild(flightCard);
        });
    })
    .catch(error => {
        console.log("Error fetching flights:", error);
        flightList.innerHTML = "<p>Error loading flights.</p>";
    });


function bookFlight(flightId) {
    window.location.href = `booking.html?flightId=${flightId}`;
}