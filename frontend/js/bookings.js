const token = localStorage.getItem("token");

if (!token) {
    alert("Please login first.");
    window.location.href = "login.html";
}
const bookingList = document.getElementById("bookingList");

fetch("http://localhost:5000/api/bookings", {
    headers: {
        "Authorization": localStorage.getItem("token")
    }
})
    .then(response => response.json())
    .then(bookings => {

        if (bookings.length === 0) {
            bookingList.innerHTML = "<p>No bookings found.</p>";
            return;
        }

        bookings.forEach(booking => {

            const bookingCard = document.createElement("div");

            bookingCard.innerHTML = `
                <h2>Flight: ${booking.flightNumber}</h2>
                <p>Passenger: ${booking.passengerName}</p>
                <p>Email: ${booking.passengerEmail}</p>
                <p>Route: ${booking.from} → ${booking.to}</p>
                <p>Date: ${booking.date}</p>

                <button onclick="cancelBooking('${booking._id}')">
                    Cancel Booking
                </button>

                <hr>
            `;

            bookingList.appendChild(bookingCard);
        });
    })
    .catch(error => {
        console.log("Error fetching bookings:", error);
        bookingList.innerHTML = "<p>Error loading bookings.</p>";
    });

function cancelBooking(bookingId) {

    const confirmCancel = confirm("Are you sure you want to cancel this booking?");

    if (!confirmCancel) {
        return;
    }

    fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
    method: "DELETE",
    headers: {
        "Authorization": localStorage.getItem("token")
    }
})
        .then(response => response.json())
        .then(data => {
            alert(data.message);

            // Reload the page to show updated bookings
            location.reload();
        })
        .catch(error => {
            console.log("Error cancelling booking:", error);
            alert("Error cancelling booking.");
        });
}