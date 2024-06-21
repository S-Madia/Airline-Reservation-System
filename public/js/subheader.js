// Define variables to store flight information
let from = "";
let to = "";
let depart = "";
let dreturn = "";
let tripType = "";

// Function to set flight information and store in localStorage
let setFlight = () => {
    from = document.querySelector("#from_airport").value;
    to = document.querySelector("#to_airport").value;
    depart = document.querySelector("#from-date").value;
    dreturn = document.querySelector("#to-date").value;
    tripType = document.querySelector("#trip-type").value;

    // Store the flight information in localStorage
    localStorage.setItem("from", from);
    localStorage.setItem("to", to);
    localStorage.setItem("depart", depart);
    localStorage.setItem("dreturn", dreturn);
    localStorage.setItem("tripType", tripType);

    console.log("Flight information set:", from, to, depart, dreturn, tripType);
};

// Function to update flight information in the subheader
let updateFlightInfo = () => {
    let route = document.querySelector("#route");
    let departDate = document.querySelector("#departDate");
    let returnFlight = document.querySelector("#returnFlight");
    let returnRoute = document.querySelector("#returnRoute");
    let returnDate = document.querySelector("#returnDate");

    console.log("Elements:", route, departDate, returnFlight, returnRoute, returnDate);

    // Retrieve the flight information from localStorage
    from = localStorage.getItem("from");
    to = localStorage.getItem("to");
    depart = localStorage.getItem("depart");
    dreturn = localStorage.getItem("dreturn");
    tripType = localStorage.getItem("tripType");

    console.log("Flight Info:", from, to, depart, dreturn, tripType);

    // Update elements only if they exist
    if (route && departDate && returnFlight && returnRoute && returnDate) {
        route.innerText = from + " to " + to;
        departDate.innerText = depart;

        if (tripType === "round-trip") {
            returnFlight.innerText = "Returning Flight";
            returnRoute.innerText = to + " to " + from;
            returnDate.innerText = dreturn;
        } else {
            returnFlight.innerText = "";
            returnRoute.innerText = "";
            returnDate.innerText = "";
        }
    } else {
        console.error("One or more elements not found!");
    }
};


// Event listener for DOMContentLoaded to update flight info in subheader
document.addEventListener("DOMContentLoaded", () => {
    updateFlightInfo();
});
