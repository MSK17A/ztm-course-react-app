const express = require('express');
const bodyParser = require('body-parser');

const app = express().disable('x-powered-by');

//This is a middleware (I don't know why though...)
/*
app.use((req, res, next) => {
    console.log("<h1>Hello, World!</h1>")
    var data = '';

    req.on('data', (chunk) => {
        data += chunk;
    })

    req.on('end', () => {
        req.body = data;
        next();
    })
})
*/
app.use(bodyParser.urlencoded(
    {
        extended: false
    }
));
app.use(bodyParser.json());

// Below are the requests (get, post... etc).
app.get('/', (req, res) => {
    console.log(req.query); // You can try localhost:3000/?name=4&age=31, and see what you get on the console.
    console.log(req.headers);
    res.send("Getting root");
})

app.get('/404', (req, res) => {

    res.status(404).send("Cannot find");
})

app.post('/PostUser', (req, res) => {

    const user = {
        Name: 'Mister',
        ID: '9999999'
    }
    res.send(user);
    console.log(req.body);
})
app.listen(3000);