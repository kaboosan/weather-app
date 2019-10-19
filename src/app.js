const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define path for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Define template engine and folder to use for web pages
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

//On definit le chemin ou se trouve les resource static
app.use(express.static(publicPath))

//Resource html avec hbs
app.get('', (req, res) => {
    res.render('index', {
        title:"Weather",
        core: "Votre meteo",
        name: 'The RObot'
    });
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About',
        name: 'The RObot'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        description: 'Vous etes sur une page d\'aide',
        name: 'The RObot'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        description: 'Help page not found!',
        name: 'The RObot'
    })
})

//On definit le endpoint de la ressource
app.get('/weather',(req, res) => {
    if(!req.query.location){
       return res.send({
           error: 'No city added' 
        })
    }
    else{
        geocode(req.query.location, (error, {latitude, longitude, location} = {})=>{
            if(error){
                return res.send({
                    error: 'Error : ' + error 
                 })
            }
        
            forecast(latitude, longitude, (error, {summary, temp, precip}) => {
                if(error){
                    return res.send({
                        error: 'Error : ' + error 
                     })
                }
                res.send({
                    forecast: { 
                         summary,
                         temp,
                         precip: precip*100                         
                     }, 
                     location
                 })
              })
        })

    }
});

app.get('*', (req, res) => {
    res.render('404', {
        description:'My 404 error page',
        name: 'The RObot'
    })
})

app.listen(port, () => {
    console.log("Serveur up sur port " + port);
})