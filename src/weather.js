const request=require('request')
const url='https://api.darksky.net/forecast/7384573b6c234ddc16abecc82f48cab2/37.8267,-122.4233?units=us'
request({url:url,json:true},(error,response)=>
{ 
if(error){
console.log('unable to coneect to location')
}
else if(response.body.error)
{
console.log('unable to Find to location')
}
else 
{
const x=response.body.currently.temperature
const y=response.body.currently.precipProbability
console.log(response.body.currently.summary+'It is currently '+x+'degrees out.there is a '+y+'chance of rain.')
}
// console.log(response.body)
})
// //Geocoding//address
//const geocode=(address,callback)=>{


const geocode=(address,callback)=>{
const url1='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic29uYWxpOTciLCJhIjoiY2syaGRmbzZwMDI1ODNicWNvNmU4M3V0MyJ9.UFay-Dq5k7vw9gmMmZ-2Rg'
request({url:url1,json:true},(error,resp)=>{
    //console.log(resp.body.features)
if(error)
    {
    callback('unable to connect',undefined)           
    }
    else if(!resp.body.features)
        {
        callback('unable to find location',undefined)           
        }
    else{
    callback(undefined,{
        lat:resp.body.features[0].center[1],
        long:resp.body.features[0].center[0],
        location:resp.body.features[0].place_name
    })           
        }
    })
}


geocode('Philadelphia New York',(error,data)=>
{
console.log('Error',error)
console.log("data",data)
})



const forecast=(lat,long,callback)=>{
const urll='https://api.darksky.net/forecast/7384573b6c234ddc16abecc82f48cab2/'+lat+','+long
request({url:urll,json:true},(error,resp)=>{
if(error){
    callback('unable to connect',undefined)           
    }
    // else if(resp.body.error)
    //     {
    //     callback('unable to find location',undefined)           
    //     } 
else{
    callback(undefined,resp.body.currently.summary+'It is currently '+resp.body.currently.temperature+'degrees out.there is a '+resp.body.currently.precipProbability+'chance of rain.')           
}
})
}






module.exports=geocode
module.exports=forecast
//    res.send({
//     forecast:'It is snowing',
//     location:'india',
//     address:req.query.location
//  })