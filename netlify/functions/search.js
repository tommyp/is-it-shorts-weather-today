const fetch = require('node-fetch');

const objectToQuery = (data) => Object.keys(data)
  .map((key) => {
    if (data[key]) {
      return `${key}=${data[key]}`;
    }
    return null;
  })
  .filter((fragment) => fragment !== null)
  .join('&');

const url = 'https://api.openweathermap.org/data/2.5/weather';

const handler = async (event) => {
  const params = {};

  params.appid = process.env.OPENWEATHER_API_KEY;

  const {
    units, location, lat, lon,
  } = event.queryStringParameters;

  params.units = units || 'metric';

  if (location) {
    params.q = location.replace('%20', ' ');
  } else if (lat && lon) {
    params.lat = lat;
    params.lon = lon;
  }

  console.log(params);

  const qs = objectToQuery(params);

  const resp = await fetch(`${url}?${qs}`);
  const data = await resp.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

module.exports = { handler };
