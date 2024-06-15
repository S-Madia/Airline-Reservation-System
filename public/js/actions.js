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

// Autocomplete Function
// Will Change cities next time
  document.addEventListener('DOMContentLoaded', function(){
        const fromport = document.querySelector("#from_airport");
        const toport = document.querySelector("#to_airport");
        const cities = [
            "Pampanga", "Davao", "Iloilo", "Aklan",
            "Ilocos Norte", "Lapu-Lapu City", "Pasay/Parañaque",
            "Puerto Princesa", "Silay", "Daraga", "Panglao",
            "Butuan", "Cauayan", "Datu Odin Sinsuat", "Tacloban",
            "Dipolog", "Sibulan", "General Santos", "Malay / Nabas",
            "Ozamiz", "Languindingan", "Pili", "Pagadian", "Roxas",
            "Bongao", "San Jose", "Morong", "Tuguegarao", "Zamboanga City",
            "Basco", "Calbayog", "Mambajao", "Catarman", "Magsaysay",
            "San Jose de Buenavista", "Coron", "Jolo", "Baguio",
            "Gasan", "Masbate City", "Ormoc", "Cavite City", "San Vicente",
            "Del Carmen", "Surigao City", "Tandag", "Alcantara", "Virac"
        ];
    
        const dlist = document.createElement("datalist");
        const opval = document.createElement("option");
        dlist.setAttribute("id", "airport")
        fromport.insertAdjacentElement("afterend", dlist);
        toport.insertAdjacentElement("afterend", dlist.cloneNode(true));
        
        for(let i=0; i < cities.length; i++){
            opval.setAttribute("value", cities[i]);
            dlist.appendChild(opval.cloneNode(true));
        }
  })

  