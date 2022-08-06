const axios = require("axios")
const moment = require("moment")


const getRandom = function (type, sqft) {
    let date = moment()
    switch (type) {
        case "Residential":
            {
                if (!(date.hours() > 21 && date.hours() <= 6) || (date.hours() > 10 && date.hours() < 12) || (date.hours() >= 14 && date.hours() < 19)) {
                    let rand = Math.random() * (sqft * 1.1) + 2 * sqft;
                    let power = Math.pow(10, 2);
                    return Math.floor(rand / 100) / power;
                }
                else {
                    let rand = Math.random() * sqft + sqft / 100;
                    let power = Math.pow(10, 2);
                    return Math.floor(rand / 100) / power;
                }
            }
        case "Airport":
        case "University":
            {
                if (!(date.hours() > 17 && date.hours() <= 8)) {
                    let rand = Math.random() * sqft + sqft / 100;
                    let power = Math.pow(10, 2);
                    return Math.floor(rand / 100) / power;
                }
                else {
                    let rand = Math.random() * (sqft * 1.1) + 2 * sqft;
                    let power = Math.pow(10, 2);
                    return Math.floor(rand / 100) / power;
                }
            }
        case "Shopping Mall":
        case "Bank":
        case "Court":
        case "Factory":
            {
                if (!(date.hours() > 18 && date.hours() <= 10)) {
                    let rand = Math.random() * sqft + sqft / 100;
                    let power = Math.pow(10, 2);
                    return Math.floor(rand / 100) / power;
                }
                else {
                    let rand = Math.random() * (sqft * 1.1 - sqft) + sqft;
                    let power = Math.pow(10, 2);
                    return Math.floor(rand / 100) / power;
                }
            }
        case "Skyscraper":
        case "City Hall":
            {
                let rand = Math.random() * (sqft * 2 - sqft) + sqft;
                let power = Math.pow(10, 2);
                return Math.floor(rand / 100) / power;
            }
        default:
            {
                let rand = Math.random() * (sqft * 1.3 - sqft) + sqft;
                let power = Math.pow(10, 2);
                return Math.floor(rand / 100) / power;
            }
    }

}

var myFunc01 = function () {
    var i = 0;
    while (i < 100) {
        (function (i) {
            setTimeout(function () {
                postData()
                console.log("NEW UPLOAD!!!")
            }, 300000 * i)
        })(i++)
    }
};

const postData = async () => {
    await axios.get(`http://127.0.0.1:3000/api/builds`).then((res) => {
        const date = moment().valueOf()
        res.data.forEach(async element => {
            await axios.post(`http://127.0.0.1:3000/api/bills/${element._id}`, {
                electric: getRandom(element.type, element.sqft),
                gas: getRandom(element.type, element.sqft),
                water: getRandom(element.type, element.sqft),
                resources: [],
                date: date,
                organizationId: element.organizationId
            }).then((res) => console.log(res.data)).catch(err => console.log(err))
        });
    });
}

module.exports.init = async function () {
    console.log("START")
    myFunc01()
};