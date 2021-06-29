import './style.css';
import objectToQuery from './utils/objectToQuery';

const form = document.querySelector('form');
const input = document.querySelector('#search input');
const geoButton = document.querySelector('#geo_search');
const decisionEl = document.querySelector('#decision');
let data;
let decision = 'no';
let currentTemp;
let condition;
const trigger = 18;

const updateQueryParams = (searchParams) => {
  window.history.pushState(null, null, `${window.location.pathname}?${searchParams}`);
};

const warmTemp = (data) => {
  const { temp_max: tempMax, temp } = data.main;
  currentTemp = temp;

  if (tempMax >= trigger) {
    currentTemp = tempMax;
    return true;
  }
  if (temp >= trigger) {
    currentTemp = temp;
    return true;
  }
};

const renderDecision = () => {
  console.log(currentTemp);
  decisionEl.innerHTML = `
   <h2>${decision}</h2>
   <p>${condition} / ${currentTemp.toPrecision(2)}</p>
  `;
};

const setDecision = (data) => {
  const forecast = data.main;
  const code = data.weather[0].id;
  const { tempMax, temp } = forecast;
  const warm = warmTemp(data);

  condition = data.weather[0].description;

  if (code >= 800 && code < 804 && warmTemp) {
    decision = 'yes';
  }

  renderDecision();
};

const makeRequest = async (params) => {
  const queryParams = objectToQuery(params);
  updateQueryParams(queryParams);
  const resp = await fetch(`/.netlify/functions/search?${queryParams}`, {
    // method: 'POST',
  });
  data = await resp.json();
  console.log(data);
  setDecision(data);
};

const geoQuery = async (lat, lon) => {
  await makeRequest({ lat, lon });
  input.value = data.name;
};

const locationQuery = (location) => {
  makeRequest({
    location,
  });
};

const setPosition = async (position) => {
  const { latitude, longitude } = position.coords;
  await geoQuery(latitude, longitude);
};

const handleGeo = (e) => {
  e.preventDefault();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition);
  } else {
    console.log('no geo');
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  locationQuery(input.value);
};

geoButton.addEventListener('click', handleGeo);
form.addEventListener('submit', handleSubmit);

const hydrateFromParams = () => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  console.log('hydration');

  const location = params.get('location');
  const lat = params.get('lat');
  const lon = params.get('lon');
  if (location) {
    locationQuery(location);
    input.value = location;
  } else if (lat && lon) {
    geoQuery(lat, lon);
  }
};

hydrateFromParams();
