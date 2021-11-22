const DATA_URL = 'https://restcountries.com/v3.1/name/';

const fetchCountries = name => {
  return fetch(`${DATA_URL}/${name}?fields=name,capital,population,flags,languages`).then(res => {
    console.log(res);
    if (!res.ok) {
      return Promise.reject(new Error(error));
    }
    return res.json();
  });
};

export default fetchCountries;
