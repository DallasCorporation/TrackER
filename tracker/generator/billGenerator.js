const axios = require("axios")


const getRandom = function (type, sqft) {
    let date = new Date()
    let value = 0
    if (type === "Home")
        if ((date.getHours() > 21 && date.getHours() <= 6) || (date.getHours() > 10 && date.getHours() < 12) || (date.getHours() >= 14 && date.getHours() < 19)) {
            let rand = Math.random() * (sqft * 2 - sqft) + sqft;
            let power = Math.pow(10, 2);
            value = Math.floor(rand * power) / power;
        }
        else {
            let rand = Math.random() * (sqft * 1.1 - sqft) + sqft;
            let power = Math.pow(10, 2);
            value = Math.floor(rand * power) / power;
        }



    if (type === "School")
        if ((date.getHours() > 17 && date.getHours() <= 8)) {
            let rand = Math.random() * (sqft * 1.1 - sqft) + sqft;
            let power = Math.pow(10, 2);
            value = Math.floor(rand * power) / power;
        }
        else {
            let rand = Math.random() * (sqft * 2 - sqft) + sqft;
            let power = Math.pow(10, 2);
            value = Math.floor(rand * power) / power;
        }

    return value
}

module.exports.init = function () {
    setTimeout(() => {
        const userAction = async () => {
            await axios.get(`http://127.0.0.1:3000/api/builds`).then((res) => {
                res.data.forEach(async element => {
                    await axios.post(`http://127.0.0.1:3000/api/bills/${element._id}`, {
                        electric: getRandom(element.type, element.sqft),
                        gas: getRandom(element.type, element.sqft),
                        water: getRandom(element.type, element.sqft),
                        resources: [],
                        date: Date.now(),
                    }).then((res) => console.log(res.data)).catch(err => console.log(err))
                });
            });
        }
        userAction()
    }, 300000);

};