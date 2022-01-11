import Center from "../../models/Center.js";

const centersList = document.querySelector('tbody');//table body //list of centers

window.onLoad = () => {
    getCenters()
}
/* bring Centers */
const getCenters = (createNewSubAdmin) => {
    const center = new Center();

    center.getCenters()
        .then(async (res) => {
            var output = ``;
            await res.data.centers.forEach((e) => {
                output += `<tr class="hover:bg-grey-lighter">
                    <td class="py-4 sm:px-48 px-6  border-b border-grey-light">${e.name}</td>
                    <td class="py-4 px-6  border-b border-grey-light">
                        <button 
                            class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-2 border border-blue-500 hover:border-transparent rounded"><i
                                class="far fa-edit"></i></button>
                        <button 
                            class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white px-2 border border-red-500 hover:border-transparent rounded"><i
                                class="fas fa-user-slash"></i></button>
                    </td>
                    </tr>`
            })
            centersList.innerHTML = output
        })
        .catch((err) => {
            console.log(err)
        })

}