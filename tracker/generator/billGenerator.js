const axios = require("axios")
const moment = require("moment")


const getRandom = function (type, sqft) {
    let date = new Date()
    let value = 0
    if (type === "Home")
        if (!(date.getHours() > 21 && date.getHours() <= 6) || (date.getHours() > 10 && date.getHours() < 12) || (date.getHours() >= 14 && date.getHours() < 19)) {
            let rand = Math.random() * sqft / 100;
            let power = Math.pow(10, 2);
            value = Math.floor(rand / 100) / power;
        }
        else {
            let rand = Math.random() * (sqft * 1.1 - sqft) + sqft;
            let power = Math.pow(10, 2);
            value = Math.floor(rand / 100) / power;
        }
    if (type === "School")
        if (!(date.getHours() > 17 && date.getHours() <= 8)) {
            let rand = Math.random() * sqft / 100;
            let power = Math.pow(10, 2);
            value = Math.floor(rand) / power;
        }
        else {
            let rand = Math.random() * (sqft * 1.1 - sqft) + sqft;
            let power = Math.pow(10, 2);
            value = Math.floor(rand) / power;
        }

    return value
}
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

var myFunc01 = function() {
    var i = 0;
    while (i < 100) {
      (function(i) {
        setTimeout(function() {
            postData()
            console.log("NEW UPLOAD!!!")
        }, 300000 * i)
      })(i++)
    }
  };

const postData = async () => {
    await axios.get(`http://127.0.0.1:3000/api/builds`).then((res) => {
    const date= moment().valueOf()    
    res.data.forEach(async element => {
            await axios.post(`http://127.0.0.1:3000/api/bills/${element._id}`, {
                electric: getRandom(element.type, element.sqft),
                gas: getRandom(element.type, element.sqft),
                water: getRandom(element.type, element.sqft),
                resources: [],
                date: date,
            }).then((res) => console.log(res.data)).catch(err => console.log(err))
        });
    });
}

module.exports.init = async function () {
    console.log("START")
    myFunc01()
};