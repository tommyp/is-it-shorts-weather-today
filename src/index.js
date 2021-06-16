import _, { at, set } from 'lodash';
import './style.css';
import objectToQuery from './utils/objectToQuery';

const form = document.querySelector('form');
const input = document.querySelector('input#search');
const geoButton = document.querySelector('#geo_search');

const updateQueryParams = (searchParams) => {
  window.history.pushState(null, null, `${window.location.pathname}?${searchParams}`);
};

const makeRequest = async (params) => {
  const queryParams = objectToQuery(params);
  updateQueryParams(queryParams);
  const resp = await fetch(`/.netlify/functions/search?${queryParams}`, {
    // method: 'POST',
  });
  const data = await resp.json();
  console.log(data);
};

const geoQuery = (lat, lon) => {
  makeRequest({ lat, lon });
};

const locationQuery = (location) => {
  makeRequest({
    location,
  });
};

const setPosition = (position) => {
  const { latitude, longitude } = position.coords;
  geoQuery(latitude, longitude);
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
