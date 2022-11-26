const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'})

const userRoute = require('./routes/user.route');
const { default: mongoose } = require('mongoose');

const app = express()
const port = process.env.PORT || 3000;

mongoose.connect(process.env.Database)
.then(con => {
    console.log('DB connection successfully')
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.get('/', (req,res) => {
    return res.send('Hello world');
});

app.use('/users',userRoute)

app.listen(port, () => console.log(`Example app listenning at http://localhost:${port}`));