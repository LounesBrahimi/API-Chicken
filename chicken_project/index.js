const express = require('express');
const app = express();

const cors = require('cors');
require('./models/dataBaseConfigs');
const bodyParser = require('body-parser');

const chickenRoutes = require('./controllers/chickenController');

app.use(bodyParser.json());
app.use(cors({origin : 'https://cdpn.io'}));
app.use('/chickens', chickenRoutes);
app.use('/chickens/run', chickenRoutes);


app.listen(5500, () => console.log('Server started: 5500'));