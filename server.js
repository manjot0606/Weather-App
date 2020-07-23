var express=require('express');
var request=require('request-promise');
var mongoose=require('mongoose');
var app=express();
app.set('view engine','ejs');
var routes=require('routes');
var request=require('request');
var http=require('http');
var url=require('url');
var path=require('path');
var bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use( bodyParser.urlencoded({extended:true}));
app.set('port',process.env.PORT || 8001);
app.set('views',path.join(__dirname,'views'));


//var city='';


var url1="mongodb://localhost:27017/express-weather";

var cityschema=new mongoose.Schema({
name:String

})
//model
var citymodel=mongoose.model('city',cityschema);
var la=new citymodel({name:'Chandigarh'});
la.save();


app.listen(8001);


async  function getweather(cities){
var weather_data=[];

  for(var city_obj of cities)
  { var city=city_obj;
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=271d1234d3f497eed5b1d80a07b3fcd1`;
var response_body= await request(url);//return promise
var weather_json=JSON.parse(response_body);
var weather={
  city :city,
  temperature: weather_json.main.temp,
  description:weather_json.weather[0].description,
  icon:weather_json.weather[0].icon
}
weather_data.push(weather);
  }
  return weather_data;
}






app.get('/',function(req,res){

/*citymodel.find({},function(err,cities){

console.log(cities);

})*/


    var weather_data={weather: weather};
      res.render('weather',weather_data); //send data to screen


})

http.createServer(app).listen(app.get('port'),function()
{
  console.log('express is listening on port'+app.get('port'));
});
