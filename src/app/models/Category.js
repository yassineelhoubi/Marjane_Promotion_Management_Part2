export default class Category {
    constructor(id, name) {
        this.id = id
        this.name = name
    }
    getCategoriesCenter() {
        return new Promise((resolve, reject) => {
            axios.get("http://localhost:3000/api/subAdmin/getCategoriesCenter", {
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem('token')
                }
            })
                .then((res) => { resolve(res); })
                .catch((err) => { reject(err); })
        });
    }

}