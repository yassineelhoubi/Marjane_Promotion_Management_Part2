
import Center from "../../models/Center.js";
import SubAdmin from "../../models/SubAdmin.js";

const formCreateSubAdmin = document.querySelector('#formCreateSubAdmin');//form for create new subAdmin
const createSubAdminModal = document.querySelector('.createSubAdminModal');//modal for create new subAdmin
const updateSubAdminModal = document.querySelector('.updateSubAdminModal');//modal for update subAdmin info
const formUdateSubAdmin = document.querySelector('#formUpdateSubAdmin');//form for create new subAdmin
const contentModalUpdateSubAdmin = document.querySelector('.contentModalUpdateSubAdmin');// space for create modal content for update subAdmin
const subAdminsList = document.querySelector('tbody');//table body //list of subAdmins

window.onLoad = () => {
    const createNewSubAdmin = true
    getCenters(createNewSubAdmin)
    getAllSubAdmin()
}
/* bring Centers */
const getCenters = (createNewSubAdmin) => {
    const center = new Center();
    if(createNewSubAdmin){
        center.getCenters()
            .then((res) => {
                res.data.centers.map((e) => {
                    formCreateSubAdmin.center.innerHTML += `<option value="${e.id}">${e.name}</option>`
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }else{
        center.getCenters()
            .then((res) => {
                res.data.centers.map((e) => {
                    formUdateSubAdmin.center.innerHTML += `<option value="${e.id}">${e.name}</option>`
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
}
/* Bring and show subAdmins */
const getAllSubAdmin = () => {
    const subAdmin = new SubAdmin();
    subAdmin.getAll()
        .then(async (res) => {
            var output = ``;
            await res.data.subAdmins.forEach((e) => {
                output += `<tr class="hover:bg-grey-lighter">
                <td class="py-4 px-6 border-b border-grey-light">${e.fName}</td>
                <td class="py-4 px-6 border-b border-grey-light">${e.lName}</td>
                <td class="py-4 px-6 border-b border-grey-light">${e.email}</td>
                <td class="py-4 px-6 border-b border-grey-light">${e.Center[0]?.name}</td>
                <td class="py-4 px-6 border-b border-grey-light">
                    <button onclick="updateSubAdmin(${e.id})"
                        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-2 border border-blue-500 hover:border-transparent rounded"><i
                            class="far fa-edit"></i></button>
                    <button onclick="deleteOrRemeveCenter(${e.id})"
                        class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white px-2 border border-red-500 hover:border-transparent rounded"><i
                            class="fas fa-user-slash"></i></button>
                </td>
    
            </tr>`
            })
            subAdminsList.innerHTML = output
        })
        .catch((err) => {
            console.log(err)
        })
}
/* create new subAdmin */
if (formCreateSubAdmin) {
    formCreateSubAdmin.addEventListener('submit', (e) => {
        e.preventDefault()
        const fName = formCreateSubAdmin.fName.value;
        const lName = formCreateSubAdmin.lName.value;
        const email = formCreateSubAdmin.email.value;
        const password = formCreateSubAdmin.password.value;
        const idCenter = formCreateSubAdmin.center.value;
        const subAdmin = new SubAdmin(null, fName, lName, email, password, idCenter)
        subAdmin.create()
            .then((res) => {
                getAllSubAdmin()
                formCreateSubAdminModal.classList.toggle('hidden')
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
/* alert to confirm delete or remove center */
window.deleteOrRemeveCenter = (id) => {
    Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete Sub-Admin',
        cancelButtonText: "just, remove Center"
    }).then((result) => {
        //   delete sub-Admin
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Delete Sub-Admin?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                //   confirm to delete sub-Admin
                if (result.isConfirmed) {
                    const subAdmin = new SubAdmin(id)
                    subAdmin.delete()
                        .then(() => {
                            // deleted
                            getAllSubAdmin()
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'this Sub-Admin has been deleted.',
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
            //   remove Center
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
                title: 'Remove Center?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, Remove it!'
            }).then((result) => {
                // confirmed
                if (result.isConfirmed) {
                    const subAdmin = new SubAdmin(id)
                    subAdmin.removeCenter()
                        .then(() => {
                            // center was removed
                            getAllSubAdmin()
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'The Center was Removed..',
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
    })
}

/* Update Sub Admin Info */
window.updateSubAdmin = (id) => {
    const subAdmin = new SubAdmin(id)
    subAdmin.get().then((res) => {
        
        const obj = res.data.result;
        contentModalUpdateSubAdmin.innerHTML=`<div class="flex flex-wrap -mx-2 space-y-4 md:space-y-0">
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
            <label class="block mb-1" for="center">Center</label>
            <div class="relative inline-block w-full text-gray-700">
                <select name="center" value="${obj.Center[0].id}"
                    class="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline">
                    <option value="" selected disabled hidden>Choose Center</option>
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
        updateSubAdminModal.classList.toggle('hidden')
        getCenters(false);
        
    })
        .catch((err) => {
            console.log(err)
        })

}