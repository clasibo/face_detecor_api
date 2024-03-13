const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'test',
      database : 'face_detector_db'
    }  
  });

/*db.select('*').from('users').then(data => {
    console.log(data)
});*/
/*
const database = {
    users: [
        {
            id: '123',
            name:'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name:'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ],
    login: {
        id: '987',
        hash:'',
        email:'john@gmail.com'
    }
}
*/
app.get('/', (req, res) => {
    res.send(db.users)
})

app.post('/signin', (req, res) => {signin.handleSignin (req, res, bcrypt, db)})
app.post('/register', (req, res) => {register.handleRegister (req, res, bcrypt, db)})

    /*this was used initial when we worked with the database object
    database.users.push({
        id: Number(database.users[database.users.length - 1].id)+ 1,
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })  
    res.json(database.users[database.users.length - 1])  
})
*/
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

/*app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++
           return res.json(user.entries);
        }
    })
        if(!found) {
            res.status(400).json('not found')
        }
})
*/
/*
bcrypt.hash(password, null, null, function(err, hash) {
    // Store hash in your password DB.
});

bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
    // result == true
});
bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
    // result == false
});
*/
app.listen(process.env.PORT || 2000, () => {
    console.log(`success .. the app is running on ${process.env.PORT}`)
})




/*
/root --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image--> PUT --> user 

*/