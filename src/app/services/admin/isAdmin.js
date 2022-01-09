
function isAdmin() {
    obj = {
        token: localStorage.getItem('token'),
        role: "ADMIN"
    }
    axios.post('http://localhost:3000/api/admin/checkAuth', obj)
        .then((res) => {
            if (res.data.isLogged == false) {
                document.location.href = './login.html'
            }
            else {
                document.querySelector('body').classList.remove('hidden')
            }
        })

}
isAdmin();