const url = window.location.href;
const search = new URLSearchParams(url.split("?")[1]);
const id = search.get("id");
let pstr = "";

fetch(`http://localhost:3005/BookMyShow/movieDetails/${id}`, { method: "POST" })
  .then((res) => res.json())
  .then((data) => {
    pstr = data.Movie_Poster;
    document.getElementById("form").innerHTML = `
    <form action="" class="form" id="frm">
      <div class="input-box">
        <label>Movie Title</label>
        <input id="movie-title-value" value="${data.Movie_Title}" type="text" placeholder="Enter full Movie Title" />
      </div>
      <div class="input-box">
        <label>Genre</label>
        <input id="genre-value" value="${data.Genre}" type="text" placeholder="Genre" />
      </div>
      <div class="input-box">
        <label>Language</label>
        <input id="language-value" value="${data.Languages}" type="text" placeholder="Available language" />
      </div>
      <div class="column">
        <div class="input-box">
          <label>Rating</label>
          <input id="rating-value" value="${data.Rating}" type="number" placeholder="Rating out of 10" />
        </div>
        <div class="input-box">
          <label>Release date</label>
          <input id="release-date-value" value="${data.Release_Date}" type="date" placeholder="Enter the date of Release" />
        </div>
      </div>
      <div class="input-box description">
        <div class="formfield">
          <label for="textarea">Description</label>
          <textarea id="textarea-value" rows="5" placeholder="Enter short description about the movie...">${data.Description}</textarea>
        </div>
      </div>
      <div class="image-preview">
        <div class="poster-preview" id="aaa">
          <img src="${pstr}" id="pstr" alt="" style="height: 100%;">
        </div>
        <div class="banner-preview">
          <img src="${data.Movie_Banner}" alt="" style="width: 100%;">
        </div>
      </div>
      <div>
        <label for="upload-poster-value">Upload Movie poster</label>
        <input id="upload-poster-value" type="file"/>
      </div>
      <div>
        <label for="upload-banner-value">Upload Movie Banner</label>
        <input id="upload-banner-value" type="file"/>
      </div>
      <a href="./movies/Details.html?id=${data._id}"><button type="button" id="submit-btn">Submit</button></a>
    </form>`;

    document.getElementById("upload-poster-value").addEventListener('change', async (e) => {
      const res = await convertToBase64(e.target.files[0]);
      pstr = res;
      document.getElementById("pstr").src = pstr;
    });

    document.getElementById("submit-btn").addEventListener('click', () => {
      const Movie_Title = document.getElementById("movie-title-value").value;
      const Genre = document.getElementById("genre-value").value;
      const Languages = document.getElementById("language-value").value;
      const Rating = document.getElementById("rating-value").value;
      const Release_Date = document.getElementById("release-date-value").value;
      const Description = document.getElementById("textarea-value").value;

      fetch(`http://localhost:3005/BookMyShow/editDetails/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Movie_Title,
          Genre, 
          Languages,
          Rating,
          Release_Date,
          Description,
          Movie_Poster: pstr,
        }),
      })
      .then((res) => {
        if(res.status==201)
        {
          alert("Data Added")
        }
        else
        {
          alert("data not added")
        }
      })
      .catch((error)=>{alert("server not connected")})
    });
  });

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
