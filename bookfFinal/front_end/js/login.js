
document.getElementById("submit-btn").addEventListener("click",(e)=>{
    e.preventDefault();

    let user=document.getElementById("user-name").value
    let password=document.getElementById("pass-word").value



    fetch("http://localhost:3005/BookMyShow/login", {
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({
            user,password
        })

    })
    .then(async(res)=>{
        // console.log(res.status);
        const data=await res.json()
        let token=data.token
        localStorage.setItem("token",JSON.stringify(token))

        if(res.status==200){
            // alert("login sucessfull")
            window.location.href="/front_end/index.html"
            
        }
        else{
            alert("login Failed")
        }
    })
    .catch((error)=>{alert("server not connected")})

})