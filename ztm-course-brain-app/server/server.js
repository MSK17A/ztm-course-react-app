const express = require('express');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
const fs = require('fs');
const https = require("https");
const cors = require('cors');
const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");
const { clarifai_getBBoxes } = require('./helperFuncs.js');
const knex = require('knex');

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
app.post('/signin', (req, res) => {

    const { email, password } = req.body;

    db.select('email', 'hash').from('login').where('email', email)
        .then(data => {
            if (bcrypt.compareSync(password, data[0].hash)) {
                db.select('*').from('users').where('email', email)
                    .then(user => {
                        res.json(user[0]);

                    }).catch(err => { res.status(400).json('Unable to get user'); });
            }
            else {
                res.status(400).json('Wrong credentials');
            }
        }).catch(err => { res.status(400).json('Wrong credentials'); });

})

// Register
app.post('/register', (req, res) => {

    const { name, email, password } = req.body;

    const hash = bcrypt.hashSync(password, 10);

    db.transaction((trx) => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0].email,
                        name: name,
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0]);
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => res.status(400).json("Unable to register!"));
})

// Retrive users
app.get('/users', (req, res) => {
    res.send(database.users);
})

// Profile page (Future development) (not used in the front-end);
app.get('/profile/:id', (req, res) => {
    const { id } = req.params; // Params will get :id

    db.select('*').from('users').where('id', id).then(user => {

        if (user.length) { // Since the legnth (if user exists) will be more than zero, then it will be true.
            res.json(user[0]);
        } else {
            res.status(400).json('User not found!');
        }
    })
})

// Image and rank page
app.put('/image', (req, res) => {
    const { id, img_url } = req.body; // Params will get :id

    metadata.set("authorization", "Key 984ae0d1293347e6b040243f2da618a0");
    stub.PostModelOutputs(
        {
            // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
            model_id: "face-detection",
            inputs: [{ data: { image: { url: img_url } } }]
        },
        metadata,
        (err, response) => {
            const bboxes = clarifai_getBBoxes(response);
            if (err) {
                console.log("Error: " + err);
                res.json('An error has occured!')
                return;
            }
            if (response.status.code !== 10000) {
                console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
                res.status(400).json('Receiving image failure!')
                return;
            }

            // Increment the entries on the database.
            db('users')
                .where('id', '=', id)
                .increment('entries', 1).returning('entries')
                .then(entries => {

                    out = {
                        bboxes: bboxes,
                        entries: entries[0].entries
                    }
                    res.json(out); // return bounding boxes along with entries.
                });
        }
    );
})



/*
Sign in   --Success/UnSucsess
Register
Image and Rank    --more photos increase counter+1
/profile    --Profile page for the user
*/