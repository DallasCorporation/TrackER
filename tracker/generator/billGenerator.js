const axios = require("axios")

module.exports.init = function () {
    let buildingData = []
    setInterval(function(){
        // const userAction = async () => {
        //     const response = await fetch(`127.0.0.1:3000/api/bills/${id}`, {
        //       method: 'POST',
        //       body: myBody, // string or object
        //       headers: {
        //         'Content-Type': 'application/json'
        //       }
        //     });
        //     const myJson = await response.json(); //extract JSON from the http response
        //     // do something with myJson
        //   }
        const userAction = async () => {
            await axios.get(`http://127.0.0.1:3000/api/builds`).then((res) => {
            
            res.data.forEach(async element => {
                await axios.post(`http://127.0.0.1:3000/api/bills/${element._id}`, {
                    electric: 20,
                    gas: 23,
                    water: 56,
                    resources: []
                }).then((res) => console.log(res.data))
            });
            }); 
          }
        userAction()
       }, 900000);
    
  };