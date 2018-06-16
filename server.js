const express = require('express');
const hbs = require('hbs')
var app = express();
const fs = require('fs');
const port = process.env.PORT || 3000;


hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');



app.use((req, res, next) => {

    console.log('Middle ware captured');
    var now = new Date().toString();
    var log = `${now} : ${req.method} : ${req.url}`
    console.log(log);
    fs.appendFile('Server.log', log + '\n', (err) => {
        if (err) {
            console.log('unable to uppend server.log')
        }
    })
    next();
})

app.use((req, res, next) => {
    res.render('maintaince.hbs', {
        pageTitle: 'Maintaince Work',
        welcomeMessage: 'We will be right back....',
    })
})

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to home page',
    })


});


app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        message: 'Thi is about page'
    });
})

app.get('/bad', (req, res) => {
    res.send({
        name: 'Error',
        message: 'This is a bad page you routed to'
    })
})


app.listen(port, ()=>{
    console.log(`Listening to ${port}`)
});