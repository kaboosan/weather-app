const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2Fib29zYW4iLCJhIjoiY2sxcWZja2FqMHptbTNvcWZ5M3ZkNmV4YSJ9.oVSKPHlfLnr3nkde5zadHw&limit=1';

    request({url,
        json: true},
        (error, response, body) => {
            if(error){
               callback("Impossible d'acceder au Geocoding", undefined);
            }
            else if(body.features.length === 0){
                callback("Ville non reconnue!", undefined);
            }
            else{
                callback(undefined, {
                    latitude:body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                });
            }
        })
}

module.exports = geocode;