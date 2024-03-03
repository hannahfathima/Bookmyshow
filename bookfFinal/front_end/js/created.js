
document.getElementById("submit-btn").addEventListener("click",(e)=>{
    e.preventDefault();

    let user=document.getElementById("user-name").value
    let password=document.getElementById("pass-word").value



    fetch("http://localhost:3005/BookMyShow/addUser",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({
            user,password
        })

    })
    .then((res)=>{
        console.log(res.status);
        if(res.status==201){
            alert("Registartion sucessfull")
            
        }
        else{
            alert("Registartion Failed")
        }
    })
    .catch((error)=>{alert("server not connected")})

})
document.getElementById("submit-btn").addEventListener("click", function() {
    window.location.href = "./Booklogin.html";
  });