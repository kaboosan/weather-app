const request = require('request');

const forecast = (latitude, longitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/0c77f640b6a3e9580131989de419cbc2/' + latitude + ',' + longitude + '?lang=fr&units=si';

    request({url,
        json:true}, (error, response, body) => {
            if(error){
                callback("Impossible d'acceder service meteo", undefined);
            }
            else if(body.error){
                callback("Ville non reconnue!", undefined);
            }
            else{
                callback(undefined,{
                    summary: body.daily.data[0].summary,
                    temp: body.currently.temperature,
                    precip: body.currently.precipProbability
                } );
            }
        }
    )
}

module.exports = forecast;
