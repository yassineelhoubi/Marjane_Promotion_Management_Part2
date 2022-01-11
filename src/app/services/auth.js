import Manager from "../models/Manager.js";
import SubAdmin from "../models/SubAdmin.js";

const loginForm = document.querySelector('#loginForm');
const role = document.querySelector('#role'); // Hidden input to know the role of the user
const btnSubAdmin = document.querySelector('#btnSubAdmin');
const btnManager = document.querySelector('#btnManager');
window.asManager = () => {
    role.value = "manager"
    btnSubAdmin.classList.remove('bg-blue-700', 'text-white')
    btnManager.classList.add('bg-blue-700', 'text-white')
    
}
window.asSubAdmin = () => {
    btnSubAdmin.classList.add('bg-blue-700', 'text-white')
    btnManager.classList.remove('bg-blue-700', 'text-white')
    role.value = "subAdmin"

}
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = loginForm.email.value;
        const password = loginForm.password.value;
        if (role.value == "") {
            Swal.fire({
                icon: 'info',
                title: 'Oops...',
                text: 'Please Choose Your Role First',
            })
        }
        else if (email == "" || password == "") {
            Swal.fire({
                icon: 'info',
                title: 'Oops...',
                text: 'Incomplete information!',
            })

        } else {
            if (role.value == "manager") {
                const manager = new Manager(null, null, null, email, password);
                manager.login()
                    .then((res) => {
                        if (res.data.token !== undefined) {
                            localStorage.setItem('token', res.data.token);
                            // location.href = 'dashboard.html';
                        } else {
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
            else if (role.value == "subAdmin") {
                const subAdmin = new SubAdmin(null, null, null, email, password);
                subAdmin.login()
                    .then((res) => {
                        if (res.data.token !== undefined) {
                            localStorage.setItem('token', res.data.token);
                            location.href = 'subAdmin/dashboard.html';
                        } else {
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
        }

    })
}