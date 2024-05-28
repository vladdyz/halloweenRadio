/*
 *      Name:       Vladislav Zolotukhin
 *      Date:       2023-11-17
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.

//Create event handler
const { artists, songs } = window;

//Card function
function createSongCard(songs) {
  // Create a <div> to hold the card
  const card = document.createElement("div");
  // Add the .card class to the <div>
  card.classList.add("card");
  // Create a song image, use the .card-image class
  const songImg = document.createElement("img");
  songImg.src = songs.imageURL;
  songImg.classList.add("card-image");
  const songURL = document.createElement("a");
  songURL.href = songs.url;
  songURL.appendChild(songImg);
  card.appendChild(songURL);
  const cardInfo = document.createElement("div");
  cardInfo.classList.add("card-details");
  const songName = document.createElement("h3");
  songName.textContent = songs.title;
  cardInfo.appendChild(songName);
  const songYear = document.createElement("p");
  const nodeYear = document.createTextNode("Year: ");
  songYear.appendChild(nodeYear); //prefixing Year: and Duration: to the respective properties via text nodes
  songYear.textContent = `${nodeYear.textContent} ${songs.year}`;
  cardInfo.appendChild(songYear);
  const duration = document.createElement("p");
  const nodeLength = document.createTextNode("Duration: ");
  duration.appendChild(nodeLength);
  let minutes = Math.floor(songs.duration / 60);
  let seconds = songs.duration - minutes * 60;
  duration.textContent = `${minutes}:${seconds}`;
  duration.insertBefore(nodeLength, duration.firstChild);
  cardInfo.appendChild(duration);
  card.appendChild(cardInfo);

  return card;
}

document.addEventListener("DOMContentLoaded", () => {
  //making dynamic buttons for all of the artists listed in artists.js
  //the buttons must be placed in the navbar, which had its own id

  const nav = document.querySelector("#menu");
  //if there are artists
  if (artists && artists.length) {
    artists.forEach((button) => {
      const btn = document.createElement("button");
      btn.textContent = button.name; //name of button is the name property of artist object
      displayArtistSongs(artists[0]); //have an artist already loaded
      btn.addEventListener("click", () => displayArtistSongs(button)); //when clicked, show tracks
      nav.appendChild(btn); //append buttons to the nav node (dynamic so we don't know how many)
    });
  } else {
    console.error("Artist data not found "); // in case artists.js is empty or not an array
  }
  //now to display the songs for each artist
  function displayArtistSongs(artist) {
    //change the Artist Name to be the currently selected artist
    //include dynamic anchor tags that link to the artists' websites
    const h2 = document.querySelector("#selected-artist");
    h2.textContent = artist.name;
    const artistLink1 = document.createElement("a");
    artistLink1.href = artist.urls[0].url;
    artistLink1.textContent = artist.urls[0].name;
    artistLink1.id = "artistlink";
    const node1 = document.createTextNode(" (");
    h2.appendChild(node1);
    h2.appendChild(artistLink1);
    const artistLink2 = document.createElement("a");
    artistLink2.href = artist.urls[1].url;
    artistLink2.textContent = artist.urls[1].name;
    artistLink2.id = "artistlink";
    const node2 = document.createTextNode(", ");
    h2.appendChild(node2);
    h2.appendChild(artistLink2);
    const node3 = document.createTextNode(")");
    h2.appendChild(node3);

    const songsContainer = document.querySelector("#songs");
    songsContainer.innerHTML = "";

    //create a new array out of the filtered songs
    //artists.artistID and songs.artistID must match, explicit must be false
    let filteredSongs = songs.filter(
      (track) => track.artistID === artist.artistID && !track.explicit
    );
    //I had a typo here (trackartistID) which caused me a lot of problems until I noticed it,
    //because I assumed I was using the filter method incorrectly :(
    //Adding a row to the table for each object in the filtered array

    filteredSongs.forEach((songs) => {
      const card = createSongCard(songs);

      songsContainer.appendChild(card);

      // For turning it back into a table instead of cards in
      //const tr = document.createElement("tr");
      //const anchor = document.createElement("a");
      //anchor.href = songs.url;
      //anchor.textContent = songs.title;
      //const title = document.createElement("td");
      //const year = document.createElement("td");
      //const duration = document.createElement("td");
      //title.appendChild(anchor);
      //year.textContent = songs.year;
      //let minutes = Math.floor(songs.duration / 60);
      //let seconds = songs.duration - minutes * 60;
      //duration.textContent = `${minutes}:${seconds}`;
      //tr.appendChild(title);
      //tr.appendChild(year);
      //tr.appendChild(duration);
      //tbody.appendChild(tr);
      //add click handler to the table rows that will show the song title in the console
      //format: (Song) by (Artist)
      //example: Salem by Dance with the Dead
      card.addEventListener("click", () => {
        console.log(`${songs.title} by ${artist.name}`);
      });
    });
  }
});

// For debugging, display all of our data in the console. You can remove this later.
console.log({ artists, songs }, "App Data");
