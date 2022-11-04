const express = require('express');
const routerApi = require('./routes');
const { logErrors, errorHandler } = require('./middlewares/error.handler');
const app = express(); // express es el constructor para nuestra app,
const port = 3200;

app.use(express.json());
app.get('/', (req, res) => {
  res.send('new server en express');
});
app.get('/nueva-ruta', (req, res) => {
  res.send('new endpoint');
});

app.use(logErrors);
app.use(errorHandler);

routerApi(app);

app.listen(port, () => {
  console.log('mi puerto' + port); //log solo deberian estar para dev no produccion
});

//QUERY PARAMS
