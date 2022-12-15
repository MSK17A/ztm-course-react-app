const express = require('express');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
const fs = require('fs');
const https = require("https");
const cors = require('cors');
const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");
const { clarifai_getBBoxes, update_entries } = require('./helperFuncs.js');

const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();

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

    //res.json(database.users);
    console.log("Users retrived!");
})

// Signing In
app.post('/signin', (req, res) => {

    bcrypt.compare(req.body.password, database.users[0].password).then((result) => {
        if (req.body.email === database.users[0].email
            && result) {
            res.json(database.users[0]);
        }
        else
            res.status(400).send("Get lost!!!");
    })

})

// Register
app.post('/register', (req, res) => {

    user = {
        id: '125',
        name: req.body.name,
        email: req.body.email,
        password: '',
        entries: 0,
        joined: new Date()
    }

    bcrypt.hash(req.body.password, 10, function (err, hash) {
        console.log(hash.toString());
        user.password = hash;
        database.users.push(user)

        res.json(database.users[database.users.length - 1]);
    });
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
    const { id, img_url } = req.body; // Params will get :id
    let bboxes = [];
    let found = false;

    metadata.set("authorization", "Key 984ae0d1293347e6b040243f2da618a0");
    stub.PostModelOutputs(
        {
            // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
            model_id: "face-detection",
            inputs: [{ data: { image: { url: img_url } } }]
        },
        metadata,
        (err, response) => {
            const bboxes = clarifai_getBBoxes(err, response);
            update_entries(database.users, id, bboxes, res);
        }
    );
})



/*
Sign in   --Success/UnSucsess
Register
Image and Rank    --more photos increase counter+1
/profile    --Profile page for the user
*/