import express from "express"
import cors from 'cors'
import urlRoutes from './routes/urlRoutes.js'
import { getRedirect } from "./controllers/urlController.js"
import authRoutes from './routes/authRoutes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/shorten' , urlRoutes)
app.use('/auth' , authRoutes)
app.get('/:shortCode', getRedirect)


app.get('/' , (req , res) => {
    res.send('server is running')
})

export default app