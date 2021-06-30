import objectToQuery from './utils/objectToQuery';

const h1 = document.querySelector('h1');
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

const setTitle = (place) => {
  let heading;
  if (place) {
    heading = `is it shorts weather today in ${place.toLowerCase()}?`;
  } else {
    heading = 'is it shorts weather today?';
  }
  h1.innerHTML = heading;
  document.title = heading;
};

const warmTemp = () => {
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

  return false;
};

const renderLoading = () => {
  decisionEl.innerHTML = `
   <h2 class="loading">loading</h2>
  `;
};

const setLoading = () => {
  renderLoading();
};

const renderDecision = () => {
  decisionEl.innerHTML = `
   <h2>${decision}</h2>
   <p>${condition} / ${currentTemp.toPrecision(2)}</p>
  `;
};

const setDecision = () => {
  const code = data.weather[0].id;

  const warm = warmTemp(data);

  condition = data.weather[0].description;

  if (code >= 800 && code < 804 && warm) {
    decision = 'yes';
  } else {
    decision = 'no';
  }

  renderDecision();
};

const renderError = (message, reason) => {
  decisionEl.innerHTML = `
   <h2 class="error">${message}</h2>
   <p>${reason}</p>
  `;
};

const setError = () => {
  renderError('who knows', "that's not a place");
};

const makeRequest = async (params) => {
  const queryParams = objectToQuery(params);
  updateQueryParams(queryParams);
  const resp = await fetch(`/.netlify/functions/search?${queryParams}`);
  data = await resp.json();
  console.log(data);
  if (data.cod == 200) {
    setDecision();
  } else if (data.cod == 404) {
    setError();
  }
};

const geoQuery = async (lat, lon) => {
  setLoading();
  await makeRequest({ lat, lon });
  input.value = data.name;
  setTitle(data.name);
};

const locationQuery = (location) => {
  setLoading();
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
  setTitle(input.value);
};

geoButton.addEventListener('click', handleGeo);
form.addEventListener('submit', handleSubmit);

const hydrateFromParams = () => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const location = params.get('location');
  const lat = params.get('lat');
  const lon = params.get('lon');
  if (location) {
    locationQuery(location);
    input.value = location;
    setTitle(location);
  } else if (lat && lon) {
    geoQuery(lat, lon);
  }
};

hydrateFromParams();
