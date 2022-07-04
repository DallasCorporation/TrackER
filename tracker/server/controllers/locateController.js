const axios = require('axios')
const asyncHandler = require('express-async-handler')


const locateCoords = asyncHandler(async (req, res) => {
    axios.get(`http://api.positionstack.com/v1/forward?access_key=42400f2d6d777645ac7654f315483bda&query=${req.params.name}&limit=1`)
        .then(response => {
            res.status(201).json(response.data)
        }).catch(error => {
            console.log(error.code);
        });
})

module.exports = {
    locateCoords,
}