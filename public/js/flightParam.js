import { fetchFlightInfo, calculateTotal } from '/getFlightInfo.js';

// Example usage: Fetch flight information for demonstration
const params = new URLSearchParams(window.location.search);
const departureId = params.get('departureId');
const returnId = params.get('returnId');

let departurePrice = 0;
let returnPrice = 0;

async function loadFlightInfo() {
  if (departureId) {
    departurePrice = await fetchFlightInfo(departureId, 'departure');
  }
  if (returnId) {
    returnPrice = await fetchFlightInfo(returnId, 'return');
  }

  // Calculate and display the total price
  calculateTotal(departurePrice, returnPrice);
}

loadFlightInfo();