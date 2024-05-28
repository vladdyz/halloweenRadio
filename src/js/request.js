//DOM Elements for adding songs to the request form

let songCount = 1; //This var will keep track of the amount of songs, because the ids should be different
//It will increment each time the user pushes the button to request a new song
//Because there is already a minimum of one song that must be requested present, it starts at 1

document.getElementById("addSongButton").addEventListener("click", function () {
  const newSong = document.getElementById("songsadd");
  const addSongForm = document.createElement("div");
  addSongForm.classList.add("resetThis"); //Had to add a special class identification for the reset button, remove firstchild didn't work
  addSongForm.innerHTML = `
       
        <input type="text" id="songName${songCount}" class="songName" name="Song[${songCount}]" placeholder="Put the name of your song here" required>
        <input type="url" id="songURL${songCount}" class="songURL" name="URL[${songCount}]" placeholder="Link your music video here" required><br>
        <label for="explicit${songCount}" class="checkbox"><i class="fa-solid fa-crow"></i> Contains Explicit Lyrics?</label>
        <input type="checkbox" id="explicit${songCount}" class="explicit" name="Explicit[${songCount}]"><br>
    `;
  // <label for="songName${songCount}" class="nametext">Suggested Song(s)</label><br> //Didn't end up needing this in the DOM,
  newSong.appendChild(addSongForm);

  songCount++;
});

//There is a reset button at the end of the form, for good UI/UX design it should also delete the DOM contents from above
//Otherwise they will persist even when the form input is reset. What if the user decides they want to submit fewer songs?

//Delete function
function removeSongElements() {
  const deleteDOM = document.querySelectorAll(".resetThis");
  deleteDOM.forEach((removeSong) => {
    removeSong.remove();
  });
}

document.getElementById("refresh").addEventListener("click", function () {
  // Reset form contents
  document.getElementById("requestform").reset();

  // Remove dynamically added song elements
  removeSongElements();
});

//JS below details posting the contents of the form

let requestForm = document.getElementById("requestform");
requestForm.addEventListener("submit", () => {
  let suggestedArtist = document.getElementById("artist").value;
  let genre = document.getElementById("genre").value;
  let socialMedia = document.getElementById("website").value;
  let socialMediaArray = socialMedia.split(",").map((link) => {
    let linkName;
    if (link.includes("bandcamp")) {
      linkName = "Bandcamp";
    } else if (link.includes("wiki")) {
      linkName = "Wikipedia page";
    } else {
      linkName = "Band Link";
    }
    return { url: link.trim(), name: linkName };
  });
  let songsArray = [];
  let songName = document.getElementById("songName").value;
  let songURL = document.getElementById("songURL").value;
  let explicit = document.getElementById("explicit").checked;
  songsArray.push({ songName, songURL, explicit });
  if (songCount > 1) {
    for (let i = 1; i < songCount; i++) {
      let songName = document.getElementById(`songName${i}`).value;
      let songURL = document.getElementById(`songURL${i}`).value;
      let explicit = document.getElementById(`explicit${i}`).checked;

      songsArray.push({ songName, songURL, explicit });
    }
  }
  let description = document.getElementById("formDesc").value;
  let data = {
    suggestedArtist,
    genre,
    urls: socialMediaArray,
    songs: songsArray,
    description
  };
  console.log(data);
  fetch("https://httpbin.org/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then((response) => response.json());
});
/* 
      ∧＿∧
  ~  (´･ω･ )    Thanks for the semester, see you later! ~ 
 ~   ( O┳O) 
  ~ ◎ヽJ┻◎     */
