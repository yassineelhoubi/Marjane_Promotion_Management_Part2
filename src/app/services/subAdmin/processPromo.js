import Product from "../../models/Product.js"

const formCreatePromo = document.querySelector('#formCreatePromo'); //Form for create a new promotion

window.onLoad = () => {
    getProductsCenter()

}
const getProductsCenter = () => {
    const products = new Product();
    products.getProductsCenter()
        .then((res) => {
            res.data.products.map((e) => {
                formCreatePromo.product.innerHTML += `<option value="${e.id}">${e.name}</option>`;
            })
        })
        .catch((err) => {
            console.log(err)
        })
}