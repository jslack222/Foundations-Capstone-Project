require('dotenv').config();
const express = require("express");
const path = require("path");
const cors = require("cors")
const app = express();
const { seed, createAppt, getAppt, deleteAppt } = require('./controller.js')   
const { SERVER_PORT } = process.env

app.use(express.json())

app.use(express.static('Frontend'))

app.post('/seed', seed)

app.use(cors())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/index.html"))
}); 

app.get('/styles', (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/styles.css"))
})

app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/index.js"))
})


//appointments
app.post('/appointments', createAppt)
app.get('/appointments', getAppt)
// app.put('appointments', editAppt)
app.delete(`/appointments/:id`, deleteAppt)



const port = process.env.PORT || 5002;

app.listen(port, () => console.log(`listening on ${port}`));
