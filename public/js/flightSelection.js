// flightSelection.js

// Track selected flight IDs
let selectedDepartureId = null;
let selectedReturnId = null;

// Handle flight selection
function selectFlight(flightType, flightCardClass) {
  document.querySelectorAll(flightCardClass).forEach(card => {
    card.addEventListener('click', function() {
      document.querySelectorAll(flightCardClass).forEach(c => c.classList.remove('selected'));
      this.classList.add('selected');
      if (flightType === 'departure') {
        selectedDepartureId = this.getAttribute('data-flight-id');
      } else if (flightType === 'return') {
        selectedReturnId = this.getAttribute('data-flight-id');
      }
    });
  });
}

// Initialize flight selection based on trip type
function initFlightSelection() {
  if (tripType === "round-trip") {
    selectFlight('departure', '.flight-card.departure');
    selectFlight('return', '.flight-card.return');
  } else {
    selectFlight('departure', '.flight-card.departure');
  }
  sessionStorage.setItem('tripType', tripType);
  
}

// Handle continue button click
document.getElementById('continueBtn').addEventListener('click', function() {
  if (tripType === "round-trip") {
    if (selectedDepartureId && selectedReturnId) {
      console.log("Selected Departure Flight ID:", selectedDepartureId);
      console.log("Selected Return Flight ID:", selectedReturnId);
      // Redirect to the guestDetails page with the selected flight IDs
      window.location.href = `/guestDetails?departureId=${selectedDepartureId}&returnId=${selectedReturnId}`;
    } else {
      alert('Please select both a departure and a return flight.');
    }
  } else {
    if (selectedDepartureId) {
      console.log("Selected Departure Flight ID:", selectedDepartureId);
      // Redirect to the guestDetails page with the selected departure flight ID
      window.location.href = `/guestDetails?departureId=${selectedDepartureId}`;
    } else {
      alert('Please select a departure flight.');
    }
  }
  sessionStorage.setItem('tripType', tripType);
});

// Initialize the selection process
initFlightSelection();
