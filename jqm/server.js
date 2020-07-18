const express = require('express');
const scheduleJob = require('./handlers/scheduleJob');

const app = express();

app.disable('x-powered-by');

app.use(express.json());


// Routes
app.post('/jobs/schedule', scheduleJob);

app.all('*', (req, res) => res.sendStatus(404));


// Run
app.listen(process.env.SERVER_PORT);