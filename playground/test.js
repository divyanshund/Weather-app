const request = require('request');

var geocodeAddress = (address) => {
  var encodedAddress = encodeURIComponent(address);
  return new Promise((resolve,reject)=>{
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyCXVgNXyPhytjoXxk2mDDwo7Pd8CpTZcsE`,
      json: true
    }, (error, response, body) => {
      if(error){
      reject('Unable to connect to Google Servers');
      }
      else if(body.status==='ZERO_RESULTS'){
        reject('Unable to find that address');
      }
      else if (response.statusCode===404) {
        reject('Error 404');
      }
      else if(body.status==='OK'){
      resolve(
        {
        address: body.results[0].formatted_address,
        lattitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }
    });
  })



};

geocodeAddress('19146').then((location)=>{
  console.log(JSON.stringify(location,undefined,2));
},(errorMessage)=>{
  console.log(errorMessage);
})
