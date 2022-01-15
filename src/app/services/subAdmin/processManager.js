import Manager from "../../models/Manager.js"
import Category from "../../models/Category.js"
const managersList = document.querySelector('tbody');//table body //list of managers
const formCreateManager = document.querySelector('#formCreateManager');//form for create manager
const createManagerModal = document.querySelector('.createManagerModal');//modal for create manager
const updateManagerModal = document.querySelector('.updateManagerModal');//modal for update Manager info
const contentModalupdateManager = document.querySelector('.contentModalUpdateManager')
const formUpdateManager = document.querySelector('#formUpdateManager'); // form for update manager
window.onLoad = () => {
    const createManager = true
    getAllManagerCenter()
    getCategoriesCenter(createManager)
}

const getCategoriesCenter = (createManager) => {
    const category = new Category();
    category.getCategoriesCenter()
        .then((res) => {
            res.data.categories.map((e) => {
                createManager ? formCreateManager.category.innerHTML += `<option value="${e.id}">${e.name}</option>`
                    : formUpdateManager.category.innerHTML += `<option value="${e.id}">${e.name}</option>`;
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
                    <button onclick="updateManager(${e.id})"
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

/* Update Manager Info */
window.updateManager = (id) => {
    const manager = new Manager(id)
    manager.get().then(async (res) => {
        const obj = res.data.manager;
        contentModalupdateManager.innerHTML = `<div class="flex flex-wrap -mx-2 space-y-4 md:space-y-0">
        <input value="${obj.id}" name="managerId" hidden />
        <div class="w-full px-2 md:w-1/2">
            <label class="block mb-1" for="fName">First name</label>
            <input
                class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                type="text" name="fName" value="${obj.fName}" />
        </div>
        <div class="w-full px-2 md:w-1/2">
            <label class="block mb-1" for="lName">Last name</label>
            <input
                class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                type="text" name="lName" value="${obj.lName}"/>
        </div>
    </div>
    <div class="flex flex-wrap">
        <div class="w-full">
            <label class="block mb-1" for="center">Category</label>
            <div class="relative inline-block w-full text-gray-700">
                <select name="category" value="${obj.idCategory}"
                    class="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline">
                    <option value="" selected disabled hidden>Choose Center</option>&
                </select>
                <div
                    class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd" fill-rule="evenodd"></path>
                    </svg>
                </div>
            </div>
        </div>
    </div>`
        updateManagerModal.classList.toggle('hidden')
        getCategoriesCenter(false);

    })
        .catch((err) => {
            console.log(err)
        })
}
// submit update SubAdmin
if (formUpdateManager) {
    formUpdateManager.addEventListener('submit', (e) => {
        e.preventDefault()
        const fName = formUpdateManager.fName.value;
        const lName = formUpdateManager.lName.value;
        const idCenter = formUpdateManager.category.value;
        const id = formUpdateManager.managerId.value;
        const manager = new Manager(id, lName, fName, null, null, idCenter)
        manager.update()
            .then((res) => {
                // updated
                updateManagerModal.classList.toggle('hidden')//To hide the modal
                getAllManagerCenter()//to refresh the list
                Swal.fire({
                    icon: 'success',
                    title: 'Update with Success',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Something went wrong!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    })
}