const express = require('express');
const db = require('./db/connection');
const routes = require('./controllers');

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server listening on localhost:${PORT}!`);
});
});