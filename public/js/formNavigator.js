// Current form section index tracking
let currentFormIndex = 0;

// Array of form section IDs in order
const formSections = ['firstForm', 'secondForm', 'thirdForm', 'summaryForm', 'paymentForm'];

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

    // Update step class before changing the index
    updateStepClass(currentFormIndex, direction);

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
        document.querySelector('#previousBtn').style.display = 'none';
    } else {
        // Show Previous button if not at the beginning
        document.querySelector('#previousBtn').style.display = 'inline-block';
    }

    if (currentFormIndex === formSections.length - 1) {
        // At the last section, hide Next button and show Submit button
        document.querySelector('#nextBtn').style.display = 'none';
        document.getElementById('submitButton').style.display = 'inline-block';
    } else {
        // Show Next button if not at the last section
        document.querySelector('#nextBtn').style.display = 'inline-block';
        document.getElementById('submitButton').style.display = 'none';
    }
    
    // Update the booking summary if applicable
    updateBookingSummary();
    console.log(currentFormIndex);
}

// Function to update step classes in the progress bar
function updateStepClass(stepIndex, direction) {
    const stepIds = ['step-guestDetails', 'step-addOns', 'step-addOns', 'step-payment', 'step-payment'];
    
    if (direction === 'next' && stepIndex < stepIds.length - 1) {
        const currentStep = document.getElementById(stepIds[stepIndex]);
        const nextStep = document.getElementById(stepIds[stepIndex + 1]);
        
        if (currentStep) {
            currentStep.classList.remove('completed');
        }
        if (nextStep) {
            nextStep.classList.add('completed');
        }
    } else if (direction === 'previous' && stepIndex > 0) {
        const currentStep = document.getElementById(stepIds[stepIndex]);
        const prevStep = document.getElementById(stepIds[stepIndex - 1]);
        
        if (currentStep) {
            currentStep.classList.remove('completed');
        }
        if (prevStep) {
            prevStep.classList.add('completed');
        }
    }
}

// Function to update the booking summary
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
