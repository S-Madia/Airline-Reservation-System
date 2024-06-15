document.addEventListener('DOMContentLoaded', function() {
    // Mapping of payment methods to icon URLs
    const paymentIcons = {
        creditCard: "https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg",
        paypal: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
        grabPay: "https://upload.wikimedia.org/wikipedia/commons/3/36/Grab_Logo.svg",
        maya: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Maya_Logo.png",
        gcash: "https://upload.wikimedia.org/wikipedia/commons/4/4b/GCash_Logo.svg"
        // Add other payment methods as needed
    };

    document.querySelectorAll('input[name="paymentMethod"]').forEach(function(input) {
        input.addEventListener('change', function() {
            var selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
            var iconUrl = paymentIcons[selectedPaymentMethod] || ''; // Get the icon URL or default to empty string

            // Update icon image source and width
            var iconElement = document.getElementById('icon');
            if (iconElement) {
                iconElement.setAttribute('src', iconUrl);
                iconElement.setAttribute('width', '50');
            }

            // Show or hide additional information based on whether a valid payment method is selected
            var additionalInfoElement = document.getElementById('additional-info');
            if (additionalInfoElement) {
                if (iconUrl) {
                    additionalInfoElement.style.display = 'block';
                } else {
                    additionalInfoElement.style.display = 'none';
                }
            }
        });
    });
});
