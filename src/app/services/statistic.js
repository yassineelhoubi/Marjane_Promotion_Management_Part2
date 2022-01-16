import Promotion from "../models/Promotion.js";

var chartTwo = document.getElementById('chartTwo');
var chartOne = document.getElementById('chartOne');
window.onLoad = () => {
    promotionStatusStatistics()
}
const promotionStatusStatistics = () => {
    const promo = new Promotion();
    promo.getAllPromotions().then(async (res) => {
        console.log(res)
        var ongoingArr = [];
        var untreatedArr = [];
        var acceptedArr = [];
        var rejectedArr = [];
        await res.data.stats.forEach((e) => {

            if (e.status == "ongoing") {
                ongoingArr.push(e.status);
            }
            else if (e.status == "untreated") {
                untreatedArr.push(e.status);

            }
            else if (e.status == "accepted") {
                acceptedArr.push(e.status);
            }
            else if (e.status == "rejected") {
                rejectedArr.push(e.status);
            }


        })
        var ongoing = ongoingArr.length
        var untreated = untreatedArr.length
        var accepted = acceptedArr.length
        var rejected = rejectedArr.length
        console.log(ongoing, untreated, accepted, rejected)
        var myLineChart = new Chart(chartTwo, {
            type: 'line',
            data: {
                labels: ['ongoing', 'untreated', 'accepted', 'rejected'],
                datasets: [{
                    label: '# of Votes',
                    data: [ongoing, untreated, accepted, rejected],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },

        });
        /*  */
        var myChart = new Chart(chartOne, {
            type: 'bar',
            data: {
                labels: ['ongoing', 'untreated', 'accepted', 'rejected'],
                datasets: [{
                    label: '# of Votes',
                    data: [ongoing, untreated, accepted, rejected],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },

        });

    }).catch((err) => {
        console.log(err)
    })
}

