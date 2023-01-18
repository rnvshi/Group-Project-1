// Define the API endpoint 
const baseUrl = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=324&apikey=yjLgPaMdPhUktIidIED0EDQYea5nxDmM"

const endpoint = "events.json";

// Define the required parameters
const apiKey = 'yjLgPaMdPhUktIidIED0EDQYea5nxDmM';


const eventLocation = {
  city: "",
  countryCode: "US"
};

// Build the full URL
const url = `${baseUrl}&city=${eventLocation.city}&countryCode=${eventLocation.countryCode}`;

// Make the API request
let test = fetch(url)
  .then(response => response.json())
  .then(data => {

    // Get the event list container
    const eventList = document.getElementById("event-list");

    // Create an HTML string for the events

    const eventsHtml = data._embedded.events

    for (i = 0; i < (data._embedded.events).length; i++) {

      let h2 = document.createElement("h2");
      h2.textContent = eventsHtml[i].name;
      let p1 = document.createElement("p");
      p1.textContent = eventsHtml[i]._embedded.venues[0].name;
      let p2 = document.createElement("p");
      p2.textContent = eventsHtml[i].dates.start.localDate;
      let artistBtn = document.createElement("button");
      artistBtn.textContent = "Spotify";
      artistBtn.dataset.artist = eventsHtml[i]._embedded.attractions[0].name;

      eventList.appendChild(h2);
      eventList.appendChild(p1);
      eventList.appendChild(p2);
      eventList.appendChild(artistBtn);

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
            console.log(retrieveInfo);

            let artistSpotlight = retrieveInfo.items[0].data; // selects the top search query for artist input
            console.log(artistSpotlight);

            console.log(artistSpotlight.profile);
            console.log(artistSpotlight.profile.name); // artist name
            console.log(artistSpotlight.visuals.avatarImage.sources[0].url); // artist image
            console.log(artistSpotlight.uri.split(":")[2]); // artist uri => input into track search fetch

            let artistID = artistSpotlight.uri.split(":")[2];

            fetch('https://spotify23.p.rapidapi.com/artist_overview/?id=' + artistID, options)
              .then(response => response.json())
              .then(response => {

                console.log(response.data.artist.discography.popularReleases.items); // top track in popular releases

                let spotlightAvi = document.getElementById("spotlightAvi");
                let spotlightName = document.getElementById("spotlightName");
                let spotlightBio = document.getElementById("spotlightBio");

                spotlightAvi.src = artistSpotlight.visuals.avatarImage.sources[0].url;
                spotlightName.textContent = artistSpotlight.profile.name;

                let spotlightTrack = document.querySelector("iframe");
                let albumCode = response.data.artist.discography.popularReleases.items[0].releases.items[0].id;

                spotlightTrack.src = "https://open.spotify.com/embed/album/" + albumCode + "?utm_source=generator";

                spotlightBio.textContent = response.data.artist.profile.biography.text;

              })
              .catch(err => console.error(err));

          })
          .catch(err => console.error(err));
      });

    };

  });

// Get the modal
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

function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}

var dateButton = document.querySelector("button.date-button");
dateButton.addEventListener("click", function () {
  // Get the start date and end date input fields
  var startDateInput = document.getElementById("start-date");
  var endDateInput = document.getElementById("end-date");

  // Get the values entered in the input fields
  var startDate = startDateInput.value;
  var endDate = endDateInput.value;

  // Validate the input dates
  if (!startDate || !endDate) {
    alert("please select a start date and an end date");
    return;
  }
  // Check if end date is greater than start date
  if (startDate >= endDate) {
    alert("End date should be greater than start date.");
    return;
  }
  // If the input is valid, use the start and end date to filter the events
  filterEventsByDate(startDate, endDate);
});

function filterEventsByDate(startDate, endDate) {
  // Code to filter events based on the start and end date
  // This could involve making an API call to a database, or
  // filtering through an existing array of events in your JavaScript code
  var filteredEvents = events.filter(function (event) {
    return event.date >= startDate && event.date <= endDate;
  });

  // Update the event list with the filtered events
  updateEventList(filteredEvents);
}

function updateEventList(events) {
  // Code to update the event list on the page with the provided events
  var eventList = document.getElementById("event-list");
  eventList.innerHTML = "";
  events.forEach(function (event) {
    var eventItem = document.createElement("div");
    eventItem.innerHTML = event.name + " - " + event.date;
    eventList.appendChild(eventItem);
  });
}








