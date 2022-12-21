const express = require('express');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
const fs = require('fs');
const https = require("https");
const cors = require('cors');
const knex = require('knex');
const register = require('./Controllers/register.js');
const signIn = require('./Controllers/signin.js');
const imageBBox = require('./Controllers/image.js');
const profileId = require('./Controllers/profileId.js');

const app = express();
/*https.createServer({
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/cert.pem'),
}, app).listen(4000);*/

app.listen(process.env.PORT) // Command 'PORT=3000 node server.js'

app.use(bodyparser.json());
app.use(cors());

// For this time, make our database like this.
/*const database = {
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
}*/

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: 'test',
        database: 'smart-brain'
    }
});

app.get('/', (req, res) => {
    res.json('Server is running!')
})

// Signing In
app.post('/signin', (req, res) => { signIn.signInHandler(req, res, db, bcrypt); })

// Register
/* This function will be called, and then it will have (req, res) passed to it.
Like a function inside a function, same as sign in route above. */
app.post('/register', register.registerHandler(db, bcrypt));

// Retrive users
app.get('/users', (req, res) => {
    res.send(database.users);
})

// Profile page (Future development) (not used in the front-end);
app.get('/profile/:id', (req, res) => { profileId.profileIdHandler(req, res, db); })

// Image and rank page
app.put('/image', (req, res) => { imageBBox.imageHandler(req, res, db); })



/*
Sign in   --Success/UnSucsess
Register
Image and Rank    --more photos increase counter+1
/profile    --Profile page for the user
*/