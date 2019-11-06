const express=require('express')
const path=require('path')
const hbs=require('hbs')
// const request=require('request')
const geocode=require('./weather.js')
const viewpath=path.join('__dirname','../templates/views')

const app=express()

//const pubpath=path.join(__dirname,'../public')
//aapp.use(express.static(pubpath))
const partialpath=path.join(__dirname,'../templates/partials')
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)
app.get('',(req,res)=>
{
res.render('index',{
name:'Sonal Jagtap'
})
})
app.get('/help',(req,res)=>
{
res.render('help',{
msg:'HelpFul  info',
name:'Sonal Jagtap'
})
})
app.get('/about',(req,res)=>
{
res.render('about',{
msg:'About  info',
name:'Sonal Jagtap'
})
})
app.get('/products',(req,res)=>
{    if(!req.query.search)
{
        return res.send({
            error:'You must provide a search term'
        })
}
console.log(req.query)
res.send({
    product:[]
})
})



app.get('/weather',(req,res)=>
{
if(!req.query.location)
{
        return res.send({
            error:'You must provide a search term'
        })
}

geocode(req.query.address,(error,{lat,long,location})=>
{
if(error)
    {         return res.send({error})
    }
    forecast(lat,long,(error,forecastdata)=>{
        if(error)
{         return res.send({error})
}
res.send({
    forecast:forecastdata,
    location,
    address:req.query.address
      })
      })
}
)
})


app.get('/help/*',(req,res)=>
{
res.send('Help article not found')
})

app.get('*',(req,res)=>
{
res.send('My 404 page')
})





app.listen(3000, function (){
console.log('Node server is running..')
})

