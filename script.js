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
