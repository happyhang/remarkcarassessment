import axios from 'axios';

// Wrapping all API calls here.
// As in a normal application, you will need to customize API calls with
// specific headers (which is also likely shared across whole application),
// or validate the result with some shared logic.
const apiKey = '741fd8d3';
const baseUrl = 'http://www.omdbapi.com/?';

const enrichAuthQueryString = (url) => {
  let newUrl = baseUrl + url;
  if (newUrl.indexOf('?') === -1) {
    newUrl = `${newUrl}?`;
  } else {
    newUrl = `${newUrl}&`;
  }
  return `${newUrl}apikey=${apiKey}`;
};

async function get(url) {
  const finalUrl = enrichAuthQueryString(url);

  return axios.get(finalUrl);
}

const ApiService = {
  get,
};

export default ApiService;
