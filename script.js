// Date picker
document.addEventListener('DOMContentLoaded', (event) => {
    const fromDateInput = document.getElementById('from-date');
    const toDateInput = document.getElementById('to-date');

    flatpickr(fromDateInput, {
        dateFormat: 'Y-m-d',
        onChange: function(selectedDates, dateStr, instance) {
            toDateInput._flatpickr.set('minDate', dateStr);
        }
    });

    flatpickr(toDateInput, {
        dateFormat: 'Y-m-d',
        onChange: function(selectedDates, dateStr, instance) {
            fromDateInput._flatpickr.set('maxDate', dateStr);
        }
    });
});
// Depart and Return Search
$(document).ready(function() {
    var cities = [
        "Manila", "Quezon City", "Caloocan", "Las Piñas", "Makati", "Malabon", "Mandaluyong",
        "Marikina", "Muntinlupa", "Navotas", "Parañaque", "Pasay", "Pasig", "San Juan",
        "Taguig", "Valenzuela", "Cebu City", "Mandaue", "Lapu-Lapu", "Davao City",
        "Zamboanga City", "Antipolo", "Bacolod", "Baguio", "Cabanatuan", "Cagayan de Oro",
        "Calamba", "Dagupan", "Dasmariñas", "General Santos", "Iligan", "Iloilo City",
        "Lipa", "Lucena", "Mabalacat", "Malolos", "Meycauayan", "Olongapo", "San Carlos",
        "San Fernando", "San Jose del Monte", "Santa Rosa", "Santiago", "Tarlac City",
        "Tuguegarao", "Urdaneta", "Angeles", "Batangas City", "Butuan", "Cabanatuan",
        "Cabanatuan", "Cabanatuan", "Cabanatuan", "Calbayog", "Cavite City", "Cotabato City",
        "Dagupan", "Dumaguete", "Escalante", "Gapan", "Gingoog", "Iriga", "Isabela",
        "Kabankalan", "Kidapawan", "Koronadal", "La Carlota", "Lamitan", "Legazpi",
        "Ligao", "Maasin", "Malaybalay", "Marawi", "Masbate City", "Mati", "Murcia",
        "Naga", "Ormoc", "Oroquieta", "Ozamis", "Pagadian", "Palayan", "Panabo",
        "Passi", "Puerto Princesa", "Roxas", "Sagay", "Samal", "San Carlos", "San Jose",
        "San Pablo", "Silay", "Sipalay", "Sorsogon City", "Surigao City", "Tabaco",
        "Tabuk", "Tacloban", "Tacurong", "Tagaytay", "Tagbilaran", "Tangub", "Tanjay",
        "Tarlac City", "Toledo", "Trece Martires", "Tuguegarao", "Urdaneta", "Valencia",
        "Victorias", "Vigan", "Zamboanga City"
    ];

    $("#from").autocomplete({
        source: cities
    });

    $("#to").autocomplete({
        source: cities
    });
});


// for sign in and log in pop up
document.addEventListener('DOMContentLoaded', function() {
    // Get the modal elements
    var loginModal = document.getElementById("loginModal");
    var signupModal = document.getElementById("signupModal");

    // Get the button that opens the modal
    var loginBtn = document.getElementById("loginBtn");
    var signupBtn = document.getElementById("signupBtn");

    // Get the <span> elements that close the modal
    var closeLogin = document.getElementById("closeLogin");
    var closeSignup = document.getElementById("closeSignup");

    // When the user clicks the button, open the modal 
    loginBtn.onclick = function() {
        loginModal.style.display = "block";
    }

    signupBtn.onclick = function() {
        signupModal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    closeLogin.onclick = function() {
        loginModal.style.display = "none";
    }

    closeSignup.onclick = function() {
        signupModal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == loginModal) {
            loginModal.style.display = "none";
        }
        if (event.target == signupModal) {
            signupModal.style.display = "none";
        }
    }
});
