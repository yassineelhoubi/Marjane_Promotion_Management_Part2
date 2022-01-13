export default class Promotion {
    constructor(id, percentage, pointsFidelity, idProduct, idSubAdmin, comment, status) {
        this.id = id
        this.percentage = percentage
        this.pointsFidelity = pointsFidelity
        this.idProduct = idProduct
        this.idSubAdmin = idSubAdmin
        this.comment = comment
        this.status = status

    }
    create() {
        return new Promise((resolve, reject) => {
            const config = {
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem('token')
                }
            }
            const obj = {
                percentage: this.percentage,
                pointsFidelity: this.pointsFidelity,
                idProduct: this.idProduct
            }

            console.log(obj)
            axios.post("http://localhost:3000/api/subAdmin/createPromo", obj, config)
                .then((res) => { resolve(res); })
                .catch((err) => { reject(err); })
        });
    }

}