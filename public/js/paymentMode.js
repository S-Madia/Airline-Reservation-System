$(document).ready(function() {
    $('input[name="paymentMethod"]').on('change', function() {
        var selectedPaymentMethod = $('input[name="paymentMethod"]:checked').val();
        var iconUrl = '';

        // Determine icon URL based on selected payment method
        switch (selectedPaymentMethod) {
            case 'creditCard':
                iconUrl = "https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg";
                break;
            case 'paypal':
                iconUrl = 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg';
                break;
                case 'grabPay':
                iconUrl = "https://upload.wikimedia.org/wikipedia/commons/3/36/Grab_Logo.svg" ;
                break;
                           case 'maya':
                iconUrl = "https://upload.wikimedia.org/wikipedia/commons/f/f5/Maya_Logo.png";
                break;
                case 'gcash':
                iconUrl = "https://upload.wikimedia.org/wikipedia/commons/4/4b/GCash_Logo.svg";
                break;
            // Add cases for other payment methods as needed
            default:
                iconUrl = ''; // Default to empty string if no icon URL is found
        }

        // Update icon image source and width
        $('#icon').attr('src', iconUrl).attr('width', '50');

        // Show additional information if a valid payment method is selected
        if (iconUrl !== '') {
            $('#additional-info').show();
        } else {
            $('#additional-info').hide();
        }
    });
});