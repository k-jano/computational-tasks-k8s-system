const express = require('express');
const dequeueJob = require('./handlers/dequeueJob');
const scheduleJob = require('./handlers/scheduleJob');
const completeJob = require('./handlers/completeJob');

const app = express();

app.disable('x-powered-by');

app.use(express.json());


// Routes
app.post('/jobs/schedule', scheduleJob);

app.get('/jobs/dequeue', dequeueJob);

app.put('/jobs/:id/complete', completeJob);

app.all('*', (req, res) => res.sendStatus(404));


// Run
app.listen(process.env.SERVER_PORT);