import _ from 'lodash';
import './style.css';
import objectToQuery from './utils/objectToQuery';

const form = document.querySelector('form');
const input = document.querySelector('input#search');

const updateQueryParams = (searchParams) => {
  window.history.pushState(null, null, `${window.location.pathname}?${searchParams}`);
};

const locationQuery = async (location) => {
  const queryParams = objectToQuery({
    location,
  });
  updateQueryParams(queryParams);
  const resp = await fetch(`/.netlify/functions/search?${queryParams}`, {
    // method: 'POST',
  });
  const data = await resp.json();
  console.log(data);
};

const handleSubmit = (e) => {
  e.preventDefault();
  locationQuery(input.value);
};

form.addEventListener('submit', handleSubmit);

const hydrateFromParams = () => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  const location = params.get('location');
  if (location) {
    locationQuery(location);
    input.value = location;
  }
};

hydrateFromParams();
