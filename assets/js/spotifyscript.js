let artist = "Don Toliver";

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