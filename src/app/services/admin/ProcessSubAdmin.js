
import Center from "../../models/Center.js";
import SubAdmin from "../../models/SubAdmin.js"
window.getCenters = () => {
    const center = new Center();
    center.getCenters()
        .then((res) => {
            res.data.centers.map((e) => {
                createSubAdmin.center.innerHTML += `<option value="${e.id}">${e.name}</option>`
            })
        })
        .catch((err) => {
            console.log(err)
        })
}


const createSubAdmin = document.querySelector('#createSubAdmin')
if (createSubAdmin) {

    createSubAdmin.addEventListener('submit', (e) => {
        e.preventDefault()
        const fName = createSubAdmin.fName.value;
        const lName = createSubAdmin.lName.value;
        const email = createSubAdmin.email.value;
        const password = createSubAdmin.password.value;
        const idCenter = createSubAdmin.center.value;
        const subAdmin = new SubAdmin(null, fName, lName, email, password, idCenter)
        subAdmin.create()
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Oops...',
                    text: res.data.response,
                })
            })
            .catch((err) => {
                console.log(err)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Can\'t create',
                })
            })
    })
}
