// shashibmiit
// JmAtOuoTZR4AIPrq

const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");
const cors = require('cors')
app.use(cors())

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  })
  .then(console.log("Connected to mongodb"))
  .catch((err) => console.log(err));

  app.use("/api/auth",authRoute)

  app.listen('5000',() =>{
    console.log("Backend is running");
});
