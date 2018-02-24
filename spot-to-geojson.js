const axios = require('axios');
let geojsonTemplate = require('./geojsonTemplate')

const feedId = '0hN62C8mlLHPINqVLLi8qAv2qonI9biev';
const limit = 200;

axios.get(`https://api.findmespot.com/spot-main-web/consumer/rest-api/2.0/public/feed/${feedId}/message.json?limit=${limit}`)
    .then(spotResponse => {
        spotData = spotResponse.data;
        geojsonTemplate.features[0].properties.name = spotData.response.feedMessageResponse.feed.name;
        geojsonTemplate.features[0].properties.time = spotData.response.feedMessageResponse.messages.message[spotData.response.feedMessageResponse.count-1].dateTime;
        geojsonTemplate.features[0].properties.coordTimes = spotData.response.feedMessageResponse.messages.message.map(message => message.dateTime);
        geojsonTemplate.features[0].geometry.coordinates = spotData.response.feedMessageResponse.messages.message.map(message => [message.longitude, message.latitude, message.altitude]);
        console.log(JSON.stringify(geojsonTemplate));
    });