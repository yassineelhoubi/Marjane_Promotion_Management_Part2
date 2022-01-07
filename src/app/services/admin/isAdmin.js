
function isAdmin(){
    obj ={
        token : localStorage.getItem('token'),
        role : "ADMIN"
    }
    console.log(obj)
    axios.post('http://localhost:3000/api/admin/checkAuth',obj)
    .then((res)=>{
        if (res.data.isLogged == false ) {
            document.location.href = './login.html'
          }
    })
    
}
isAdmin();