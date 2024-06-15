// flightInfo.js

// Fetch flight information from the server
export async function fetchFlightInfo(flightId, type) {
    try {
        const response = await fetch(`/flight/${flightId}`);
        if (!response.ok) {
            throw new Error('Flight not found');
        }
        const flight = await response.json();

        // Ensure the elements exist before setting their properties
        if (type === 'departure') {
            if (document.getElementById('code')) document.getElementById('code').value = `${flight._id}`;
            if (document.getElementById('label')) document.getElementById('label').textContent = "Departure: ";
            if (document.getElementById('showroute')) document.getElementById('showroute').textContent = `Route: ${flight.routecode}`;
            if (document.getElementById('showstartingLocation')) document.getElementById('showstartingLocation').textContent = `Starting Location: ${flight.startingLocation}`;
            if (document.getElementById('showdestination')) document.getElementById('showdestination').textContent = `Destination: ${flight.destination}`;
            if (document.getElementById('showdeparture')) document.getElementById('showdeparture').textContent = `Departure: ${new Date(flight.departure).toLocaleString()}`;
            if (document.getElementById('showprice')) document.getElementById('showprice').textContent = `Price: P${flight.price}`;
            return flight.price; // Return the price for calculation
        } else if (type === 'return') {
            if (document.getElementById('rcode')) document.getElementById('rcode').value = `${flight._id}`;
            if (document.getElementById('rlabel')) document.getElementById('rlabel').textContent = "Return: ";
            if (document.getElementById('rshowroute')) document.getElementById('rshowroute').textContent = `Return Route: ${flight.routecode}`;
            if (document.getElementById('rshowstartingLocation')) document.getElementById('rshowstartingLocation').textContent = `Return Starting Location: ${flight.startingLocation}`;
            if (document.getElementById('rshowdestination')) document.getElementById('rshowdestination').textContent = `Return Destination: ${flight.destination}`;
            if (document.getElementById('rshowdeparture')) document.getElementById('rshowdeparture').textContent = `Return Departure: ${new Date(flight.departure).toLocaleString()}`;
            if (document.getElementById('rshowprice')) document.getElementById('rshowprice').textContent = `Return Price: P${flight.price}`;
            return flight.price; // Return the price for calculation
        }
    } catch (error) {
        console.error('Error retrieving flight information:', error);
    }
}

// Function to calculate and display the total price
export function calculateTotal(departurePrice, returnPrice) {
    let total = departurePrice + returnPrice;
    if (document.getElementById('totalexp')) document.getElementById('totalexp').innerText = "Total: P" + total;
    if (document.getElementById('totalAmount')) document.getElementById('totalAmount').innerText = "Total: P" + total;
}

// Retrieve and display trip type
document.addEventListener('DOMContentLoaded', function() {
    const tripType = sessionStorage.getItem('tripType');
    if (document.getElementById('triptype')) {
        document.getElementById('triptype').value =`${tripType}`;
    }
});
