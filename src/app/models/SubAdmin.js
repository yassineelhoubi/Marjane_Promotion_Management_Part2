export default class Admin {
    constructor(id, lName, fName, email, password, idCenter) {
        this.lName = lName;
        this.fName = fName;
        this.id = id;
        this.email = email;
        this.password = password;
        this.idCenter = idCenter;
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
    read() {
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

}