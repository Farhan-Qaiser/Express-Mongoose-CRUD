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



const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
})



const User = mongoose.model('User', userSchema)

app.get('/users', async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body)
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})
