const fetch = require('node-fetch');

const key = 'AIzaSyA0qxlPlIRd9_uOmm4F59VPK7b8uZHy2XQ'
const address = 'Pacific Business Center, Hoshangabad Rd, Bhopal, Madhya Pradesh 462026';

fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`)
.then((res) => res.json())
.then((data) => console.log(data.results[0].geometry));