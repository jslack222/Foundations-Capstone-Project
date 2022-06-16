require('dotenv').config();
const express = require("express");
const path = require("path");
const cors = require("cors")
const app = express();
const { SERVER_PORT } = process.env

app.use(express.json())
app.use(cors())


//maybe I will need
// app.post('/seed', seed)

//appointments
// app.post('/appointments', createAppt)
// app.get('/appointments', getAppt)
// app.put('appointments', editAppt)
// app.delete('appointments', deleteAppt)



const port = process.env.PORT || 5002;

app.listen(port, () => console.log(`listening on ${port}`));
