$(function() {
    let selectedDepartureId = null;
    let selectedReturnId = null;
    
    if (tripType === "round-trip") {
        $('.flight-card.departure').on('click', function() {
            $('.flight-card.departure').removeClass('selected');
            $(this).addClass('selected');
            selectedDepartureId = $(this).data('flight-id');
        });

        $('.flight-card.return').on('click', function() {
            $('.flight-card.return').removeClass('selected');
            $(this).addClass('selected');
            selectedReturnId = $(this).data('flight-id');
        });
    } else {
        $('.flight-card.departure').on('click', function() {
            $('.flight-card.departure').removeClass('selected');
            $(this).addClass('selected');
            selectedDepartureId = $(this).data('flight-id');
        });
    }

    $('#continueBtn').on('click', function() {
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
       
    });
});
