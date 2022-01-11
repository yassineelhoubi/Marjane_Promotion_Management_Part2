export default class SubAdmin {
    constructor(id, lName, fName, email, password, idCenter) {
        this.lName = lName;
        this.fName = fName;
        this.id = id;
        this.email = email;
        this.password = password;
        this.idCenter = idCenter;
    }
    login() {
        return new Promise((resolve, reject) => {
            const obj = {
                email: this.email,
                password: this.password
            }
            axios.post("http://localhost:3000/api/subAdmin/login", obj)
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
                idCenter: this.idCenter,
            }
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            };
            axios.post("http://localhost:3000/api/admin/createSubAdmin", obj, config)
                .then((res) => { resolve(res); })
                .catch((err) => { reject(err); })
        });
    }
    getAll() {
        return new Promise((resolve, reject) => {
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            };
            axios.get("http://localhost:3000/api/admin/getAllSubAdmin", config)
                .then((res) => { resolve(res); })
                .catch((err) => { reject(err); })
        });
    }
    removeCenter() {
        return new Promise((resolve, reject) => {
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            };
            axios.put("http://localhost:3000/api/admin/removeCenter/" + this.id, config)
                .then((res) => { resolve(res); })
                .catch((err) => { reject(err); })

        });
    }

    delete() {
        return new Promise((resolve, reject) => {
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            };
            axios.delete("http://localhost:3000/api/admin/deleteSubAdmin/" + this.id, config)
                .then((res) => { resolve(res); })
                .catch((err) => { reject(err); })
        });
    }
    get() {
        return new Promise((resolve, reject) => {
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            };
            axios.get("http://localhost:3000/api/admin/getSubAdmin/" + this.id, config)
                .then((res) => { resolve(res); })
                .catch((err) => { reject(err); })
        });
    }
    update() {
        return new Promise((resolve, reject) => {
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            };
            const obj = {
                fName: this.fName,
                lName: this.lName,
                idCenter: this.idCenter,
            }
            axios.put("http://localhost:3000/api/admin/updateSubAdmin/" + this.id, obj, config)
                .then((res) => { resolve(res); })
                .catch((err) => { reject(err); })
        });
    }

}