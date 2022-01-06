const express = require('express');
const app = express();

require('./models/dataBaseConfigs');

const chickenRoutes = require('./controllers/chickenController');

app.use('/chickens', chickenRoutes);


app.listen(5500, () => console.log('Server started: 5500'));