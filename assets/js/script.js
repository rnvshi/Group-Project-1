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
let test = fetch(url)
  .then(response => response.json())
  .then(data => {

    // Get the event list container
    const eventList = document.getElementById("event-list");

    // Create an HTML string for the events

    const eventsHtml = data._embedded.events

    console.log(data._embedded.events);

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

                console.log(response.data.artist.discography.popularReleases.items[0].releases.items[0]); // top track in popular releases
                console.log(response.data.artist.profile.biography.text); // artist biography
              })
              .catch(err => console.error(err));

          })
          .catch(err => console.error(err));
      });

    };

    //     .map(
    //     event =>
    //       `<div>
    //           <h2>${event.name}</h2>
    //           <p>${event.dates.start.localDate}</p>
    //           <p>${event._embedded.venues[0].name}</p>
    //           <p>${JSON.stringify(event._embedded.attractions[0].name)}</p>
    //           <button class = "spotify">${"Spotify"}</button>
    //         </div > `
    //   )
    // .join("");

    //Insert the HTML string into the event list container
    // eventList.innerHTML = eventsHtml;

  });
