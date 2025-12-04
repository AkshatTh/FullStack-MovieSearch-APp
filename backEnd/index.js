import app from './server.js'
import mongodb from 'mongodb'
import ReviewsDAO from './dao/reviewsDAO.js'

const MongoClient = mongodb.MongoClient

const uri = `mongodb+srv://at6710:tgt1234567@cluster0.rr0huvs.mongodb.net/?appName=Cluster0`
const port = 8000

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500
    }
)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})