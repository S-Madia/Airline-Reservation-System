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
        returnDateSection.style.display = 'flex';
      } else {
        returnDateSection.style.display = 'none';
      }
    }

    tripTypeSelect.addEventListener('change', toggleReturnDateSection);

    // Initialize the form to hide the return date if one-way is selected by default
    toggleReturnDateSection();
  });

// Autocomplete Function
  document.addEventListener('DOMContentLoaded', function(){
        const fromport = document.querySelector("#from_airport");
        const toport = document.querySelector("#to_airport");
      
        const cities = [
          "Alcantara - TBH", "Aklan - KLO", "Baguio - BAG", "Basco - BSO", "Bongao - TWT",
          "Butuan - BXU", "Catarman - CRM", "Cavite City - SGL", "Cauayan - CYZ", "Coron - USU",
          "Datu Odin Sinsuat - CBO", "Davao - DVO", "Del Carmen - IAO", "Dipolog - DPL", "Gasan - MRQ",
          "General Santos - GES", "Ilocos Norte - LAO", "Iloilo - ILO", "Jolo - JOL", "Languindingan - CGY",
          "Lapu-Lapu City - CEB", "Magsaysay - CYU", "Mambajao - CGM", "Malay / Nabas - MPH", "Morong - SFS",
          "Ormoc - OMC", "Ozamiz - OZC", "Pampanga - CRK", "Panglao - TAG", "Pasay/Parañaque - MNL",
          "Pili - WNP", "Puerto Princesa - PPS", "Roxas - RXS", "San Jose - SJI", "San Jose de Buenavista - EUQ",
          "San Vicente - SWL", "Sibulan - DGT", "Silay - BCD", "Surigao City - SUG", "Tandag - TDG",
          "Tacloban - TAC", "Tuguegarao - TUG", "Virac - VRC", "Zamboanga City - ZAM"]
    
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

let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menu.addEventListener("click", function () {
  navbar.classList.toggle("active");
  
});

window.onscroll = () => {
  navbar.classList.remove("active");
};