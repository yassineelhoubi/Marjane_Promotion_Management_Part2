import Manager from "../../models/Manager.js"
import Category from "../../models/Category.js"
const managersList = document.querySelector('tbody');//table body //list of managers
const formCreateManager = document.querySelector('#formCreateManager');//form for create new subAdmin
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
                    <button onclick="deleteOrRemeveCenter(${e.id})"
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