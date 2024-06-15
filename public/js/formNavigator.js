// function navigate(fromId, toId) {
//     document.getElementById(fromId).style.display = "none";
//     document.getElementById(toId).style.display = "block";
//   }

      // Current form section index tracking
      let currentFormIndex = 0;

      // Array of form section IDs in order
      const formSections = ['firstForm', 'secondForm', 'thirdForm','summaryForm', 'paymentForm'];

      // Function to navigate between form sections
      function navigate(direction) {
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
      }
