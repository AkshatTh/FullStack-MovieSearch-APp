import express from 'express'
import cors from 'cors'
import reviews from './api/reviews.route.js'
import path from 'path'

const app = express()

app.use(cors())
app.use(express.json())


app.use("/api/v1/reviews", reviews)


// serve client static files if present
const clientBuildPath = path.resolve(process.cwd(), 'client', 'build')
app.use(express.static(clientBuildPath))

// fallback for client-side routing — do NOT pass a route string like '*' or '/*'
app.use((req, res) => {
	res.sendFile(path.join(clientBuildPath, 'index.html'))
})


export default app