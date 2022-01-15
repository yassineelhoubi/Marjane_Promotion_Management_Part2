import Product from "../../models/Product.js"
import Promotion from "../../models/Promotion.js"

const formCreatePromo = document.querySelector('#formCreatePromo'); //Form for create a new promotion
const createPromoModal = document.querySelector('.createPromoModal');//modal for create promo
const promoList = document.querySelector('tbody');//table body //list of promotion
window.onLoad = () => {
    getProductsCenter();
    getPromotionsCenter();

}
const getProductsCenter = () => {
    const products = new Product();
    products.getProductsCenter()
        .then((res) => {
            res.data.products.map((e) => {
                formCreatePromo.product.innerHTML += `<option value="${e.id}">${e.name} - Qty : ${e.quantity}</option>`;
            })
        })
        .catch((err) => {
            console.log(err)
        })
}

/* create new subAdmin */
if (formCreatePromo) {
    formCreatePromo.addEventListener('submit', (e) => {
        e.preventDefault()
        const percentage = formCreatePromo.percentage.value;
        const pointsFidelity = formCreatePromo.pointsFidelity.value;
        const idProduct = formCreatePromo.product.value;
        const promo = new Promotion(null, percentage, pointsFidelity, idProduct)
        promo.create()
            .then((res) => {
                console.log(res);
                getPromotionsCenter()
                if (res.data.status === true) {
                    createPromoModal.classList.toggle('hidden')
                    Swal.fire({
                        icon: 'success',
                        title: res.data.response,
                    })
                } else {
                    Swal.fire({
                        icon: 'info',
                        title: 'Oops...',
                        text: res.data.response,
                    })
                }
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

const getPromotionsCenter = () => {
    const promo = new Promotion()
    promo.getPromotionsCenter().then(async (res) => {
        var output = ``;
        await res.data.forEach((e) => {
            output += `<tr class="hover:bg-grey-lighter">
                <td class="py-4  px-6  border-b border-grey-light">${e.Product.name}</td>
                <td class="py-4  px-6  border-b border-grey-light">${e.Product.category.name}</td>
                <td class="py-4  px-6  border-b border-grey-light">${e.percentage} %</td>
                <td class="py-4  px-6  border-b border-grey-light">${e.pointsFidelity}</td>
                <td class="py-4  px-6  border-b border-grey-light">${e.status}</td>
                <td class="py-4  px-6  border-b border-grey-light">${e.comment}</td>
                </tr>`
        })
        promoList.innerHTML = output
    })
        .catch((err) => {
            console.log(err)
        })
}