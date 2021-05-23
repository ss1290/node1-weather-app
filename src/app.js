const path=require('path')
const express=require('express')
const hbs=require('hbs')
const forecast = require('./utils/forecast')
const geocode=require('./utils/geocode')
const { getMaxListeners } = require('process')

const app=express()
const port=process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


//Setup handlebars engine  and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'WEATHA',
        name:' Sonu Shashank'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Sonu Shashank'
    })

})
app.get('/help',(req,res)=>{
    res.render('help',{
        helpMessage:'For any help email us to sonushashankmot@gmail.com',
        title:'Help',
        name:'Sonu Shashank'
    })

})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address!'
        })
    }
var address=req.query.address
geocode(address,(error,{latitude,longitude,location}={})=>{
    if (error){
        return res.send({error})
    }
    forecast(latitude,longitude,(error,forecastdata)=>{
        if (error){
            return res.send({error})
        }
        
        res.send({
            forecast:forecastdata,
            location,
            address:address
        })
    })
})
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Sonu Shashank',
        error:'Help Article not found.'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Sonu Shashank',
        error:'Page not found.'
        
    })



})
app.listen(port,()=>{
    console.log('Server is up on port port '+port)
})

