require("dotenv").config();
const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require("mongoose");

//definindo rota para o serviço
const serviceRoute = require('./routes/service');

/**
 * Database setup
 */
mongoose.connect(
    process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//usando a rota para o serviço
app.use( '/', serviceRoute )


app.listen('3000', () => {
    console.log('servidor iniciado na porta 3000 http://localhost:3000')
})