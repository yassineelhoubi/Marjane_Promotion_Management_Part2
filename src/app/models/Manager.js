export default class Manager {
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
            axios.post("http://localhost:3000/api/manager/login", obj)
                .then((res) => { resolve(res); })
                .catch((err) => { reject(err); })
        });
    }


}