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




app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body)
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


app.get('/users', async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    if (!updatedUser) return res.status(404).json({ message: 'User not found' })
    res.status(200).json(updatedUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


app.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    if (!deletedUser) return res.status(404).json({ message: 'User not found' })
    res.status(200).json({ message: 'User deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


const PORT =  3000
app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}/users`)
})
