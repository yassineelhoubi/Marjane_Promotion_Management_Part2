import Promotion from "../../models/Promotion.js"


const promoList = document.querySelector('tbody');//table body //list of promotion

window.onLoad = () => {
    getManagerPromotions();
}

const getManagerPromotions = () => {
    const promo = new Promotion()
    promo.getManagerPromotions().then(async (res) => {
        var output = ``;
        console.log(res)
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