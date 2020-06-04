const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')

const userRouter = require('./routes/UserRouter')

const app = express()
const port = 3001

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

const db = require("../config/keys").mongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.use(passport.initialize())

require('../config/passport')(passport);

app.use('/api/users', userRouter)

app.listen(port, () => console.log(`Server running on ${port}`))