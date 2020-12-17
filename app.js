const express = require('express');
const app = express();
const path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var fileupload = require('express-fileupload');

const port = 8000;


app.set('view engine', 'ejs');
app.set('views', __dirname + '/public');
app.use(express.static('public'));
app.use(fileupload());


const db = require('./models/index');
const { addUser , deleteUser ,getUseById ,updateUser} = require('./public/router/User');


//định nghĩa biến db toàn cục
global.db = db;


app.get('/', (req, res) => {
    const getAll = db.User.findAll();
    getAll.then((data) => {
        const arrDt = [];
        for (const user in data) {
            arrDt.push(data[user]['dataValues']);
        }
        res.render('index.ejs', {
            title: 'tất cả user',
            user: arrDt,
        })
    }).catch(err => {
        console.log(err);
    })
})


app.get('/add', (req, res) => {
    res.render('views/addUser.ejs', {
        title: 'Thêm thành viên'
    })
})

app.post('/add', urlencodedParser, addUser);

app.get('/delete/:id',deleteUser);

app.get('/edit/:id',getUseById);

app.post('/edit/:id',updateUser)

app.listen(port, () => {
    console.log('server is running at port ', port);
})

