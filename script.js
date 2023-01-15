// Define the API endpoint 
const baseUrl = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=324&apikey=yjLgPaMdPhUktIidIED0EDQYea5nxDmM"


const endpoint = "events.json";

// Define the required parameters
const apiKey = 'yjLgPaMdPhUktIidIED0EDQYea5nxDmM'

;
const eventLocation = {
  city: "",
  countryCode: "US"
};


// Build the full URL
const url = `${baseUrl}&city=${eventLocation.city}&countryCode=${eventLocation.countryCode}`;



// Make the API request
fetch(url)
  .then(response => response.json())
  .then(data => {
    // Get the event list container
    const eventList = document.getElementById("event-list");

    // Create an HTML string for the events
    const eventsHtml = data._embedded.events
      .map(
        event =>
          `<div>
            <h2>${event.name}</h2>
            <p>${event.dates.start.localDate}</p>
            <p>${event._embedded.venues[0].name}</p>
          </div>`
      )
      .join("");

    // Insert the HTML string into the event list container
    eventList.innerHTML = eventsHtml;
  });
 
 