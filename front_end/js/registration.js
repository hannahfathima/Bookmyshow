// import convertToBase64 from "./base64.js";
let movie_title_value = document.getElementById("movie-title-value");
let genre_value = document.getElementById("genre-value");
let language_value = document.getElementById("language-value");
let rating_value = document.getElementById("rating-value");
let date_value = document.getElementById("release-date-value");
let description_value = document.getElementById("textarea-value");



document.getElementById("frm").addEventListener("submit",async(e)=>{
  e.preventDefault();
  const poster=await convertToBase64(e.target[6].files[0]);
  const banner=await convertToBase64(e.target[7].files[0]);

  movie_title = movie_title_value.value;
  genre = genre_value.value;
  language = language_value.value;
  rating = rating_value.value;
  date = date_value.value;
  description = description_value.value;

  fetch("http://localhost:3005/BookMyShow/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Movie_Title:movie_title,
      Genre: genre,
      Rating: rating,
      Release_Date:date,
      Languages: language,
      Description:description,
      Movie_Banner:banner,
      Movie_Poster:poster
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
    
})


function convertToBase64(file) {
  return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
          resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
          reject(error)
      }
    })
}

document.getElementById("btnreg").addEventListener("click", function() {
  window.location.href = "../index.html";
});




