import express from 'express'
import dotenv from 'dotenv'
import exp from 'constants'

dotenv.config()

const app = express()
const PORTA = process.env.PORT
app.use(express.json())

app.listen(PORTA, ()=>{
    console.log(`Servidor emexecução na porta : ${PORTA}`)
})