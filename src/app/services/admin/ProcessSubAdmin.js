
import Center from "../../models/Center.js";

window.getCenters = () => {
    const center = new Center();
    center.getCenters()
        .then((res) => {
            res.data.centers.map((e) => {
                createSubAdmin.center.innerHTML += `<option value="${e.id}">${e.name}</option>`
            })
        })
        .catch((err) => {
            console.log(err)
        })
}



