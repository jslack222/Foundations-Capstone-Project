const express = require("express");

const path = require("path");

const app = express();









const port = process.env.PORT || 5002;

app.listen(port, () => console.log(`listening on ${port}`));
