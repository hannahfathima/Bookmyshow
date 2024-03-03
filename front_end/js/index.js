async function getMovies() {
    const Movie = await fetch("http://localhost:3005/BookMyShow/movies");
    const data = await Movie.json();
    s = "";
    data.map((dt) => {
      s += `<div class="card">
      <a href="./pages/movies/Details.html?id=${dt._id}"><img class="card-img" src="${dt.Movie_Poster}" alt=""></a>
      <div class="discription">
          <div class="film"><span class="film-name">${dt.Movie_Title}</span></div>
          <div><span class="genre">${dt.Genre}</span></div>
      </div>
  </div>`;
    });
    document.getElementById("show").innerHTML = s;


const key=localStorage.key(0);
const value=JSON.parse(localStorage.getItem(key));
fetch("http://localhost:3005/BookMyShow/home",{
    headers:{Authorization:`Bearer ${value}`},
})
.then((res)=>res.json())
.then((data)=>{
    const{msg}=data;
    document.getElementById("name").innerHTML=msg
    ?`${msg}<button class="logout" onclick="del()">Logout</button><div class="bttt"><button class="logout">
    <a  href="./pages/registration.html" id="regas">Register</a></button></div>`
    :`<button class="logout"><a href="./pages/Booklogin.html">Login</a></button> `;
})
.catch((error)=>{
    console.log(error);
})

}
function del(){
    localStorage.clear();
    location.reload()
    alert("Session Expired")
}


  getMovies();
  async function SearchFunction() {
    let inp=document.getElementById("search-bar").value
    const Movie = await fetch("http://localhost:3005/BookMyShow/movies");
    const data = await Movie.json();
    s = "";
    data.filter((dt) => {
  
      if(dt.Movie_Title.startsWith(inp)){
        s += `<div class="card">
      <a href="./pages/Details.html?id=${dt._id}"><img class="card-img" src="${dt.Movie_Poster}" alt=""></a>
      <div class="discription">
          <div class="film"><span class="film-name">${dt.Movie_Title}</span></div>
          <div><span class="genre">${dt.Genre}</span></div>
      </div>
  </div>`;
      }
    });
    document.getElementById("show").innerHTML = s;
  }
 