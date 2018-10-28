const request =  require('request');


var getweather = (lat,lng,callback) => {
request({
  url: `https://api.darksky.net/forecast/426db188288bda7c7669c7e21175c04a/${lat},${lng}?units=si`,
  json: true
},(error,response,body)=>{
  if(error){
  callback('Unable to connect to forecast.io servers');
  }else if(response.statusCode === 400){
    callback('Unable to fetch weather');
  }
  else if(!error && response.statusCode===200){
  callback(undefined,{
    temperature: body.currently.temperature,
    apparentTemperature: body.currently.apparentTemperature
  })
  }
})
};

module.exports.getweather = getweather;
