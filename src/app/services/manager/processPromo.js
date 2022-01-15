import Promotion from "../../models/Promotion.js"


const promoList = document.querySelector('tbody');//table body //list of promotion
const updatePromoModal = document.querySelector('.updatePromoModal');//modal for update promo
const contentModalUpdatePromo = document.querySelector('.contentModalUpdatePromo');//modal for update promo
const formUpdatePromo = document.querySelector('#formUpdatePromo');//form for update promo

window.onLoad = () => {
    getManagerPromotions();
}

const getManagerPromotions = () => {
    const promo = new Promotion()
    promo.getManagerPromotions().then(async (res) => {
        var output = ``;
        await res.data.promotions.forEach((e) => {
            output += `<tr class="hover:bg-grey-lighter">
                <td class="py-4 px-6 border-b border-grey-light">${e.Product.name}</td>
                <td class="py-4 px-6 border-b border-grey-light">${e.Product.category.name}</td>
                <td class="py-4 px-6 border-b border-grey-light">${e.percentage} %</td>
                <td class="py-4 px-6 border-b border-grey-light">${e.pointsFidelity}</td>
                <td class="py-4 px-6 border-b border-grey-light">${e.status}</td>
                <td class="py-4 px-6 border-b border-grey-light">${e.comment}</td>
                <td class="py-4 px-6 border-b border-grey-light">
                <button onclick="updatePromo(${e.id})"
                    class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-2 border border-blue-500 hover:border-transparent rounded"><i
                        class="far fa-edit"></i></button>
                </td>
                </tr>`
        })
        promoList.innerHTML = output
    })
        .catch((err) => {
            console.log(err)
        })
}

window.updatePromo = (id) => {
    updatePromoModal.classList.toggle('hidden')

    contentModalUpdatePromo.innerHTML = `
    <div class="flex flex-wrap -mx-2 space-y-4 md:space-y-0">
    <input value="${id}" name="id" type="hidden"/>
    <div class="w-full px-2 md:w-1/2">
        <label class="block mb-1" for="product">Status</label>
        <div class="relative inline-block w-full text-gray-700">
            <select name="status"
                class="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline">
                <option value="accepted" >Accepted</option>
                <option value="rejected" >Rejected</option>
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
    <div class="w-full px-2 md:w-1/2">
        <label class="block mb-1" for="percentage">Comment</label>
        <input
            class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
            type="text" name="comment" />
    </div>
</div>
    `
}
/* create new subAdmin */
if (formUpdatePromo) {
    formUpdatePromo.addEventListener('submit', (e) => {
        e.preventDefault()
        const comment = formUpdatePromo.comment.value;
        const status = formUpdatePromo.status.value;
        const id = formUpdatePromo.id.value;
        console.log(comment, status, id)
        const promo = new Promotion(id, null, null, null, null, comment, status)
        promo.promoValidate()
            .then((res) => {
                getManagerPromotions()
                updatePromoModal.classList.toggle('hidden')
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