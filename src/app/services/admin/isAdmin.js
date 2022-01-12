
function isAdmin() {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };
    axios.get('http://localhost:3000/api/admin/checkAuth', config)
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