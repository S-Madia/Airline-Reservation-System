document.addEventListener('DOMContentLoaded', function() {
    var tripTypeSelect = document.getElementById('trip-type');
    var returnDateSection = document.getElementById('return-date-section');

    function toggleReturnDateSection() {
        if (tripTypeSelect.value === 'one-way') {
            returnDateSection.style.display = 'none';
        } else {
            returnDateSection.style.display = 'block';
        }
    }

    tripTypeSelect.addEventListener('change', toggleReturnDateSection);

    // Initial check to set the correct display state on page load
    toggleReturnDateSection();

    const fromDateInput = document.getElementById('from-date');
    const toDateInput = document.getElementById('to-date');

    flatpickr(fromDateInput, {
        dateFormat: 'Y-m-d',
        onChange: function(selectedDates, dateStr) {
            toDateInput._flatpickr.set('minDate', dateStr);
        }
    });

    flatpickr(toDateInput, {
        dateFormat: 'Y-m-d',
        onChange: function(selectedDates, dateStr) {
            fromDateInput._flatpickr.set('maxDate', dateStr);
        }
    });

    var cities = [
        "Manila", "Quezon City", "Caloocan", "Las Piñas", "Makati", "Malabon", "Mandaluyong",
        "Marikina", "Muntinlupa", "Navotas", "Parañaque", "Pasay", "Pasig", "San Juan",
        "Taguig", "Valenzuela", "Cebu City", "Mandaue", "Lapu-Lapu", "Davao City",
        "Zamboanga City", "Antipolo", "Bacolod", "Baguio", "Cabanatuan", "Cagayan de Oro",
        "Calamba", "Dagupan", "Dasmariñas", "General Santos", "Iligan", "Iloilo City",
        "Lipa", "Lucena", "Mabalacat", "Malolos", "Meycauayan", "Olongapo", "San Carlos",
        "San Fernando", "San Jose del Monte", "Santa Rosa", "Santiago", "Tarlac City",
        "Tuguegarao", "Urdaneta", "Angeles", "Batangas City", "Butuan", "Cabanatuan",
        "Calbayog", "Cavite City", "Cotabato City", "Dumaguete", "Escalante", "Gapan",
        "Gingoog", "Iriga", "Isabela", "Kabankalan", "Kidapawan", "Koronadal", "La Carlota",
        "Lamitan", "Legazpi", "Ligao", "Maasin", "Malaybalay", "Marawi", "Masbate City",
        "Mati", "Murcia", "Naga", "Ormoc", "Oroquieta", "Ozamis", "Pagadian", "Palayan",
        "Panabo", "Passi", "Puerto Princesa", "Roxas", "Sagay", "Samal", "San Jose",
        "San Pablo", "Silay", "Sipalay", "Sorsogon City", "Surigao City", "Tabaco",
        "Tabuk", "Tacloban", "Tacurong", "Tagaytay", "Tagbilaran", "Tangub", "Tanjay",
        "Tarlac City", "Toledo", "Trece Martires", "Tuguegarao", "Valencia", "Victorias",
        "Vigan", "Zamboanga City"
    ];

    $("#from").autocomplete({
        source: cities
    });

    $("#to").autocomplete({
        source: cities
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const tripTypeSelect = document.getElementById('trip-type');
    const returnDateSection = document.getElementById('return-date-section');

    function toggleReturnDateSection() {
      if (tripTypeSelect.value === 'round-trip') {
        returnDateSection.style.display = 'block';
      } else {
        returnDateSection.style.display = 'none';
      }
    }

    tripTypeSelect.addEventListener('change', toggleReturnDateSection);

    // Initialize the form to hide the return date if one-way is selected by default
    toggleReturnDateSection();
  });

  