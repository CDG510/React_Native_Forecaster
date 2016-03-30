// c2af202ec0ae511e1dfc2f271529f969
var _ = require('lodash')
var rootUrl = "http://api.openweathermap.org/data/2.5/weather?APPID=c2af202ec0ae511e1dfc2f271529f969"
var KtoF = function(kelvin){
    return Math.round((kelvin-273.15) * 1.8 + 32) + ' ˚F'
}

module.exports = function(latitude, longitude){
    var url = `${rootUrl}&lat=${latitude}&lon=${longitude}`;
    console.log(url)
//fetch takes url, returns promise
    return fetch(url)
        .then(function(response){
            return response.json()
        })
        .then(function(json){
            return {
                city: json.name,
                temperature: KtoF(json.main.temp),
                description: _.capitalize(json.weather[0].description)
            }
        });
}
