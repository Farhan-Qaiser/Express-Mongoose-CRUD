import express from 'express'
import mongoose from 'mongoose'
import cors from "cors";


const app = express()
app.use(cors())
app.use(express.json())


const mongoURI = 'mongodb://localhost:27017/users_management'
mongoose
  .connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err))
