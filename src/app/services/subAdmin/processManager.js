import Manager from "../../models/Manager.js"
import Category from "../../models/Category.js"
const managersList = document.querySelector('tbody');//table body //list of managers
const formCreateManager = document.querySelector('#formCreateManager');//form for create new subAdmin
const createManagerModal = document.querySelector('.createManagerModal');//modal for create new subAdmin
window.onLoad = () => {
    getAllManagerCenter()
    getCategoriesCenter()
}

const getCategoriesCenter = () => {
    const category = new Category();
    category.getCategoriesCenter()
        .then((res) => {
            res.data.categories.map((e) => {
                formCreateManager.category.innerHTML += `<option value="${e.id}">${e.name}</option>`;
            })
        })
        .catch((err) => {
            console.log(err)
        })
}
const getAllManagerCenter = () => {
    const manager = new Manager();
    manager.getAllManagerCenter()
        .then(async (res) => {
            var output = ``;
            await res.data.managers.forEach((e) => {
                output += `<tr class="hover:bg-grey-lighter">
                <td class="py-4 px-6 border-b border-grey-light">${e.fName}</td>
                <td class="py-4 px-6 border-b border-grey-light">${e.lName}</td>
                <td class="py-4 px-6 border-b border-grey-light">${e.email}</td>
                <td class="py-4 px-6 border-b border-grey-light">${e.categoName}</td>
                <td class="py-4 px-6 border-b border-grey-light">
                    <button onclick="updateSubAdmin(${e.id})"
                        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-2 border border-blue-500 hover:border-transparent rounded"><i
                            class="far fa-edit"></i></button>
                    <button onclick="deleteManager(${e.id})"
                        class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white px-2 border border-red-500 hover:border-transparent rounded"><i
                            class="fas fa-user-slash"></i></button>
                </td>
    
            </tr>`
            })
            managersList.innerHTML = output
        })
        .catch((err) => {
            console.log(err)
        })
}

/* create new subAdmin */
if (formCreateManager) {
    formCreateManager.addEventListener('submit', (e) => {
        e.preventDefault()
        const fName = formCreateManager.fName.value;
        const lName = formCreateManager.lName.value;
        const email = formCreateManager.email.value;
        const password = formCreateManager.password.value;
        const idCategory = formCreateManager.category.value;
        const manager = new Manager(null, fName, lName, email, password, idCategory)
        manager.create()
            .then((res) => {
                getAllManagerCenter()
                createManagerModal.classList.toggle('hidden')
                Swal.fire({
                    icon: 'success',
                    title: res.data.response,
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

/* alert to confirm delete manager */
window.deleteManager = (id) => {
    Swal.fire({
        title: 'delete Manager?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it',
        cancelButtonText: "Cancel"
    }).then((result) => {
        if (result.isConfirmed) {
            const manager = new Manager(id)
            manager.delete()
                .then(() => {
                    // deleted
                    getAllManagerCenter()
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'this Manager has been deleted.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }).catch((err) => {
                    // error
                    console.log(err)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                })
        }
    })
}