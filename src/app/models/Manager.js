export default class Manager {
    constructor(id, fName, lName, email, password, idCategory) {
        this.lName = lName;
        this.fName = fName;
        this.id = id;
        this.email = email;
        this.password = password;
        this.idCategory = idCategory;
    }
    login() {
        return new Promise((resolve, reject) => {
            const obj = {
                email: this.email,
                password: this.password
            }
            axios.post("http://localhost:3000/api/manager/login", obj)
                .then((res) => { resolve(res); })
                .catch((err) => { reject(err); })
        });
    }
    getAllManagerCenter() {
        return new Promise((resolve, reject) => {
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            };
            axios.get("http://localhost:3000/api/subAdmin/getAllManagerCenter", config)
                .then((res) => { resolve(res); })
                .catch((err) => { reject(err); })
        });
    }
    create() {
        return new Promise((resolve, reject) => {
            const obj = {
                fName: this.fName,
                lName: this.lName,
                email: this.email,
                password: this.password,
                idCategory: this.idCategory,
            }
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            };
            axios.post("http://localhost:3000/api/subAdmin/createManager", obj, config)
                .then((res) => { resolve(res); })
                .catch((err) => { reject(err); })
        });
    }
    delete() {
        return new Promise((resolve, reject) => {
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            };
            axios.delete("http://localhost:3000/api/subAdmin/deleteManager/" + this.id, config)
                .then((res) => { resolve(res); })
                .catch((err) => { reject(err); })
        });
    }

}