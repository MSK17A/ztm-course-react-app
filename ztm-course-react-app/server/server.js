const express = require('express');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
const fs = require('fs');
const https = require("https");
const cors = require('cors');

const app = express();
/*https.createServer({
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/cert.pem'),
}, app).listen(4000);*/

app.listen(4000)

app.use(bodyparser.json());
app.use(cors());

// For this time, make our database like this.
const database = {
    users: [
        {
            id: '123',
            name: 'Mr. Bean',
            email: 'mr@bean.com',
            password: '$2b$10$vzXYLLC3Lpg5q2uuKeH/L.LxN.IilsWAjPx21yJTejopMXkT29B66', // cookies
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'Sally@bean.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.json(database.users);
    console.log("Users retrived!");
})

// Signing In
app.post('/signin', (req, res) => {

    bcrypt.compare(req.body.password, database.users[0].password).then((result) => {
        if (req.body.email === database.users[0].email
            && result) {
            res.json("Hello " + database.users[0].name);
        }
        else
            res.status(400).send("Get lost!!!");
    })

})

// Register
app.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        console.log(hash.toString());
    });

    user = {
        id: '125',
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        entries: 0,
        joined: new Date()
    }

    database.users.push(user)
    res.json("Sucessfully registerd!!!");
})

// Retrive users
app.get('/users', (req, res) => {
    res.send(database.users);
})

// Profile page
app.get('/profile/:id', (req, res) => {
    const { id } = req.params; // Params will get :id
    let found = false;

    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (found === false) {
        res.status(404).json("no such user");
    }
})

// Image and rank page
app.post('/image', (req, res) => {
    const { id } = req.body; // Params will get :id
    let found = false;

    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(404).json("no such user");
    }
})
/*
Sign in   --Success/UnSucsess
Register
Image and Rank    --more photos increase counter+1
/profile    --Profile page for the user
*/