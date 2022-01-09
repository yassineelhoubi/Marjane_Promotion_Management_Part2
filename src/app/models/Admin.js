export default class Admin {
    constructor(lName, fName, id, email, password) {
        this.lName = lName;
        this.fName = fName;
        this.id = id;
        this.email = email;
        this.password = password;
    }
    login() {
        return new Promise((resolve, reject) => {
            const obj = {
                email: this.email,
                password: this.password
            }
            axios.post("http://localhost:3000/api/admin/login", obj)
                .then((res) => { resolve(res); })
                .catch((err) => { reject(err); })
        });
    }


}