import Product from "../../models/Product.js"
import Promotion from "../../models/Promotion.js"

const formCreatePromo = document.querySelector('#formCreatePromo'); //Form for create a new promotion
const createPromoModal = document.querySelector('.createPromoModal');//modal for create promo
window.onLoad = () => {
    getProductsCenter()

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