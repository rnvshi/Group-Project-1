// Define the API endpoint 
const baseUrl = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=200&apikey=yjLgPaMdPhUktIidIED0EDQYea5nxDmM"

const endpoint = "events.json";

// Define the required parameters
const apiKey = 'yjLgPaMdPhUktIidIED0EDQYea5nxDmM';

let submit = document.getElementById("submit-button");

submit.addEventListener("click", () => {
  city = document.getElementById("city-name").value;
  dateStart = document.getElementById("start-date").value;
  dateEnd = document.getElementById("end-date").value;
  // Build the full URL
  const url = `${baseUrl}&city=${city}&countryCode=US&startDateTime=${dateStart}T00:00:00Z&endDateTime=${dateEnd}T00:00:00Z`;

  // Make the API request
  let test = fetch(url)
    .then(response => response.json())
    .then(data => {

      // Get the event list container
      const eventList = document.getElementById("event-list");

      // Create an HTML string for the events

      const eventsHtml = data._embedded.events

      for (i = 0; i < (data._embedded.events).length; i++) {

        let div = document.createElement("div");
        div.classList.add("eventCard");
        let h2 = document.createElement("h2");
        h2.textContent = eventsHtml[i].name;
        let p1 = document.createElement("p");
        p1.textContent = eventsHtml[i]._embedded.venues[0].name;
        let p2 = document.createElement("p");
        p2.textContent = eventsHtml[i].dates.start.localDate;
        let artistBtn = document.createElement("button");
        artistBtn.textContent = "Spotify";
        artistBtn.dataset.artist = eventsHtml[i]._embedded.attractions[0].name;
        artistBtn.classList.add("artistBtn");

        div.appendChild(h2);
        div.appendChild(p1);
        div.appendChild(p2);
        div.appendChild(artistBtn);
        eventList.appendChild(div);

        artistBtn.addEventListener("click", () => {
          console.log("this has been clicked");
          console.log(artistBtn.dataset.artist);

          let artist = artistBtn.dataset.artist;

          const options = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': '123d9ffd9emsh54932a03d259025p1bf516jsnb6b492f310a9',
              'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
            }
          };

          fetch('https://spotify23.p.rapidapi.com/search/?q=' + artist + '&type=artists&offset=0&limit=10&numberOfTopResults=5', options)
            .then(response => response.json())
            .then(response => {

              let retrieveInfo = JSON.parse(JSON.stringify(response)).artists;
              let artistSpotlight = retrieveInfo.items[0].data; // selects the top search query for artist input
              let artistID = artistSpotlight.uri.split(":")[2]; // artist uri => input into track search fetch

              fetch('https://spotify23.p.rapidapi.com/artist_overview/?id=' + artistID, options)
                .then(response => response.json())
                .then(response => {

                  let spotlightCard = document.getElementById("spotlightCard");
                  let spotlightAvi = document.getElementById("spotlightAvi");
                  let spotlightName = document.getElementById("spotlightName");
                  let spotlightBio = document.getElementById("spotlightBio");

                  spotlightCard.classList.add("spotlightCard");

                  spotlightAvi.src = artistSpotlight.visuals.avatarImage.sources[0].url;
                  spotlightName.textContent = artistSpotlight.profile.name;

                  let spotlightAlbum = document.querySelector("iframe");
                  let albumCode = response.data.artist.discography.popularReleases.items[0].releases.items[0].id;
                  spotlightAlbum.src = "https://open.spotify.com/embed/album/" + albumCode + "?utm_source=generator";

                  let modalBtn = document.getElementById("modalBtn");
                  modalBtn.style.display = "block";

                  spotlightBio.textContent = response.data.artist.profile.biography.text;

                })
                .catch(err => console.error(err));

            })
            .catch(err => console.error(err));
        });

      };

    });
});

// Get the bio modal
var modalBtn = document.getElementById("modalBtn");
var modal = document.getElementById("modal");
var closeBtn = document.getElementsByClassName("close")[0];

modalBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", outsideClick);

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

// Get the alert modal
var alertInv = document.getElementById("alert");
var closeAlBtn = document.getElementById("closeAlert");
let alertText = document.getElementById("alertText");

closeAlBtn.addEventListener("click", () => {
  alertInv.style.display = "none";
});

var submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", function () {
  // Get the start date and end date input fields
  var startDateInput = document.getElementById("start-date");
  let endDateInput = document.getElementById("end-date");
  let cityInput = document.getElementById("city-name").value;

  // Get the values entered in the input fields
  var startDate = startDateInput.value;
  let endDate = endDateInput.value;

  console.log(startDate);
  console.log(endDate);

  // Validate the input dates
  if (!startDate || !endDate || !cityInput) {
    alertInv.style.display = "block";
    alertText.textContent = "please input a valid city name & date range";
    return;
  }
  if (startDate >= endDate) {
    alertInv.style.display = "block";
    alertText.textContent = "End date should be greater than start date";
    return;
  };

});

function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  } else if (e.target == alertInv) {
    alertInv.style.display = "none";
  }
}



submit.addEventListener("click", () => {
  // Get the city name from the input field
  let city = document.getElementById("city-name").value;
  
  // Save the city name to local storage
  localStorage.setItem("city", city);
  
  // Retrieve the city name from local storage
  let storedCity = localStorage.getItem("city");

  

  console.log(storedCity);
  
  
  // Build the full URL
  const url = `${baseUrl}&city=${city}&countryCode=US&startDateTime=${dateStart}T00:00:00Z&endDateTime=${dateEnd}T00:00:00Z`;

  // Make the API request
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const eventList = document.getElementById("event-list");
      let eventsHtml = "";
      data._embedded.events.forEach(event => {
         
      });
      eventList.innerHTML = eventsHtml;
      
    });
});
let storedCity = localStorage.getItem("city");
let city = storedCity ? storedCity : document.getElementById("city-name").value;

if(typeof(Storage) !== "undefined") {
  // Code for localStorage/sessionStorage.
} else {
  // Sorry! No Web Storage support..
}

