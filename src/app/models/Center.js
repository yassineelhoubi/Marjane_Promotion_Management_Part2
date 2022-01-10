export default class Center {
    constructor(id, name) {
        this.id = id
        this.name = name
    }
    getCenters() {
        return new Promise((resolve, reject) => {
            axios.get("http://localhost:3000/api/admin/getCenters", {
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem('token')
                }
            })
                .then((res) => { resolve(res); })
                .catch((err) => { reject(err); })
        });
    }

}