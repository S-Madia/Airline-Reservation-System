// Current form section index tracking
let currentFormIndex = 0;

// Array of form section IDs in order
const formSections = ['firstForm', 'secondForm', 'thirdForm','summaryForm', 'paymentForm'];

// Function to navigate between form sections
function navigate(direction) {
    // If moving to the next section, validate the current section's inputs
    if (direction === 'next') {
        const inputs = document.querySelectorAll(`#${formSections[currentFormIndex]} input`);
        for (let input of inputs) {
            if (input.required && !input.value.trim()) {
                alert('Please fill out all required fields.');
                return; // Stop navigation if a required input is empty
            }
        }
    }

    // Hide the current form section
    document.getElementById(formSections[currentFormIndex]).style.display = 'none';

    // Update currentFormIndex based on direction
    if (direction === 'next') {
        currentFormIndex++;
    } else if (direction === 'previous') {
        currentFormIndex--;
    }

    // Show the new current form section
    document.getElementById(formSections[currentFormIndex]).style.display = 'block';

    // Update button visibility based on currentFormIndex
    if (currentFormIndex === 0) {
        // At the beginning, hide Previous button
        document.querySelector('.btn.btn-primary[onclick="navigate(\'previous\')"]').style.display = 'none';
    } else {
        // Show Previous button if not at the beginning
        document.querySelector('.btn.btn-primary[onclick="navigate(\'previous\')"]').style.display = 'inline-block';
    }

    if (currentFormIndex === formSections.length - 1) {
        // At the last section, hide Next button and show Submit button
        document.querySelector('.btn.btn-primary[onclick="navigate(\'next\')"]').style.display = 'none';
        document.getElementById('submitButton').style.display = 'inline-block';
    } else {
        // Show Next button if not at the last section
        document.querySelector('.btn.btn-primary[onclick="navigate(\'next\')"]').style.display = 'inline-block';
        document.getElementById('submitButton').style.display = 'none';
    }
    updateBookingSummary();
}

let updateBookingSummary = () => {
    let firstname = document.querySelector("#firstname").value;
    let lastname = document.querySelector("#lastname").value;
    let service = document.querySelector("#service").value;
    let seat = document.querySelector("#seat").value;
    let travelClass = document.querySelector("#travelclass").value;

    // Show tags
    let showfname = document.querySelector("#showfname");
    let showlname = document.querySelector("#showlname");
    let showservice = document.querySelector("#showservice");
    let showseat = document.querySelector("#showseat");
    let showclass = document.querySelector("#showclass");

    showfname.innerText = "Firstname: " + firstname;
    showlname.innerText = "Lastname: " + lastname;
    showservice.innerText = "Service: " + service;
    showseat.innerText = "Seat: " + seat;
    showclass.innerText = "Travel Class: " + travelClass;
}
