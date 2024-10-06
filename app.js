const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const { error } = require('console');

const app = express();
let port = 3000;
let user = {
    name : "geethasree",
    email : "geethasree@gmail.com",
    password : "geethasree@1234"
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname,'public','index.html'));
    });

app.get('/about', (req, res, next) => {
    // res.sendFile(path.join(__dirname, 'public','about.html'));
    res.render('about');
});

app.get('/login', (req, res, next) => {
    // res.sendFile(path.join(__dirname,'public', 'login.html'));
    res.render('login');
});


app.get('/register', (req, res, next) => {
    // res.sendFile(path.join(__dirname,'public', 'register.html'));
    res.render('register');
});

app.post('/login_in', (req, res) => {
    // res.sendFile(path.join(__dirname,'public', 'dashboard.html'));
    // console.log(req.body.id, req.body.password);
    if(user.email == req.body.id && user.password == req.body.password){
        res.render('dashboard',{id : user.email, user : user.name});
    }else{
        res.render('login',{error : "Invalid email or password"});
    }
});

app.post('/register_in', (req, res) => {
    // add to list
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    console.log(user);
    // console.log(req.body.name, req.body.password, req.body.email);
    res.render('login');
}
);



app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})
