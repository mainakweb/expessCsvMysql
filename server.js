const express = require('express')
const app = express()
const port = 2005
const controllers = require('./controllers');

app.get('/',(req, res) => {return res.send('<h1>welcome to Exmanation API</h1>.');});

app.get('/uploadCsvInsertDb', controllers.uploadCsv);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  }
  )


