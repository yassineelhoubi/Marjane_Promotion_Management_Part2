
import Center from "../../models/Center.js";
import SubAdmin from "../../models/SubAdmin.js"

const createSubAdmin = document.querySelector('#createSubAdmin')//form for create new subAdmin
const createSubAdminModal = document.querySelector('.createSubAdminModal')//modal for create new subAdmin
const subAdminsList = document.querySelector('tbody')//table body //list of subAdmins

window.onLoad = () => {
    getCenters()
    getAllSubAdmin()
}

const getCenters = () => {
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

const getAllSubAdmin = () => {
    const subAdmin = new SubAdmin();
    subAdmin.read()
        .then((res) => {
            res.data.subAdmins.map((e) => {
                subAdminsList.innerHTML += `<tr class="hover:bg-grey-lighter">
                <td class="py-4 px-6 border-b border-grey-light">${e.fName}</td>
                <td class="py-4 px-6 border-b border-grey-light">${e.lName}</td>
                <td class="py-4 px-6 border-b border-grey-light">${e.email}</td>
                <td class="py-4 px-6 border-b border-grey-light">${e.Center[0]?.name}</td>
                <td class="py-4 px-6 border-b border-grey-light">
                    <button
                        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-2 border border-blue-500 hover:border-transparent rounded"><i
                            class="far fa-edit"></i></button>
                    <button
                        class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white px-2 border border-red-500 hover:border-transparent rounded"><i
                            class="fas fa-user-slash"></i></button>
                </td>
    
            </tr>`
            })
        })
        .catch((err) => {
            console.log(err)
        })
}

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
                getAllSubAdmin()
                createSubAdminModal.classList.toggle('hidden')
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
