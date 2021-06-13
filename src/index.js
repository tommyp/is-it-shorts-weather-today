import _ from 'lodash';
import './style.css';
import objectToQuery from './utils/objectToQuery';

const form = document.querySelector('form');
const input = document.querySelector('input#search');

const updateQueryParams = (searchParams) => {
  window.history.pushState(null, null, `${window.location.pathname}?${searchParams}`);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const queryParams = objectToQuery({
    location: input.value,
  });

  updateQueryParams(queryParams);

  const resp = await fetch(`/.netlify/functions/search?${queryParams}`, {
    // method: 'POST',
  });
  const data = await resp.json();
  console.log(data);
};

form.addEventListener('submit', handleSubmit);
