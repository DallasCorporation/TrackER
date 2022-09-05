const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = [
    './routes/activity.js',
    './routes/bills.js',
    './routes/buildings.js',
    './routes/locate.js',
    // './routes/mailer.js',
    './routes/organization.js',
    './routes/renewable.js',
    './routes/userPreference.js',
    './routes/users.js',
]


const doc = {
    info: {
        version: "1.0.0",
        title: "TrackER",
        description: "TrackER End Points Documentation ."
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
}


swaggerAutogen(outputFile, endpointsFiles, doc)