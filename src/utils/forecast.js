const request=require('request')
const forecast=(latitude,longitude,callback)=>{
const url='http://api.weatherstack.com/current?access_key=19f44f7ca9e426a61c4e2b369ad7afd3&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)

request({url,json:true},(error,{body})=>{
    if(error){
        callback('Unable to connect to weather service!',undefined)
    } else if(body.error){
        callback('Unable to find the location!',undefined)

    }
    else{
        callback(undefined,body.current.weather_descriptions[0]+' .It is currently '+body.current.temperature+ ' degress out.It feels like '+body.current.feelslike+' degrees out.'+'The humidity is '+body.current.humidity+'%')
    }

})
}
module.exports=forecast

