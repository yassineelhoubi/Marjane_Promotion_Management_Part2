export default class Product {
    constructor(id, name, quantity, idCategory) {
        this.id = id
        this.name = name
        this.quantity = quantity
        this.idCategory = idCategory
    }
    getProductsCenter() {
        return new Promise((resolve, reject) => {
            axios.get("http://localhost:3000/api/subAdmin/getProductsCenter", {
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem('token')
                }
            })
                .then((res) => { resolve(res); })
                .catch((err) => { reject(err); })
        });
    }

}