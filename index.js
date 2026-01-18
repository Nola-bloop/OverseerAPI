import express from 'express'
const app = express()
const PORT = 8889

//routes
import usersRouter from './routes/users.route.js'
import clusterOutputRouter from './routes/clusterOutput.route.js'

app.use("/users", usersRouter);
app.use("/clusterOutput", clusterOutputRouter);

app.get('/', (req, res) => {
  res.send('Empty route.')
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})