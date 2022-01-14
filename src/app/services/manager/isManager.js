
function isManager() {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };
    axios.get('http://localhost:3000/api/manager/checkAuth', config)
        .then((res) => {
            if (res.data.isLogged == false) {
                document.location.href = '../index.html'
            }
            else {
                document.querySelector('body').classList.remove('hidden')
            }
        })

}
isManager();