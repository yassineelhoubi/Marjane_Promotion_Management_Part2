import Admin from "../../models/Admin.js";
const loginForm = document.querySelector('#loginForm')
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = loginForm.email.value;
        const password = loginForm.password.value
        if (email == "" || password == "") {
            Swal.fire({
                icon: 'info',
                title: 'Oops...',
                text: 'Incomplete information!',
            })

        } else {
            const admin = new Admin(null, null, null, email, password);
            admin.login()
                .then((res) => {
                    if(res.data.token !== undefined){
                        localStorage.setItem('token', res.data.token);
                        location.href = 'dashboard.html';
                    }else{
                        Swal.fire({
                            icon: 'info',
                            title: 'Oops...',
                            text: res.data.error,
                        })
                    }
                })
                .catch((err) => {
                    console.log(err)
                });
        }

    })
}
window.logout = () => {
    localStorage.removeItem("token");
    location.href = 'login.html';
}