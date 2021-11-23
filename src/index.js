import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import fetchCountries from './services/fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

const createMarkupLi = obj => {
  const markup = obj
    .map(
      ({ name: { official }, flags: { svg } }) => `<div class ="js-list">
        <div>
        <img src="${svg}" alt="flag" width="20" class ="js-img">
        </div>
        <h1>${official}</h1>
        </div>`,
    )
    .join('');
  clearMarkup();
  countryList.innerHTML = markup;
};

const createMarkupList = dataList => {
  const markupList = dataList
    .map(({ name: { official }, capital, population, flags: { svg }, languages }) => {
      const languagesKey = Object.values(languages).join(', ');
      return `<div class ="js-list">
        <div>
        <img src="${svg}" alt="flag" width="20" class ="js-img">
        </div>
        <h1>${official}</h1>
        </div>
<ul>
  <li class="js-item">Capital:<span class ="js-icon">${capital}</span></li>
  <li class="js-item">Population:<span class ="js-icon">${population}</span></li>
  <li class="js-item">Languages:<span class ="js-icon">${languagesKey}</span></li>
</ul>
`;
    })
    .join('');
  clearMarkup();
  info.innerHTML = markupList;
};

const hebdlerCountrys = e => {
  const inputName = e.target.value.trim();
  if (!inputName.value) {
    return;
  }
  fetchCountries(inputName)
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return;
      }
      if (data.length < 10 && data.length > 1) {
        createMarkupLi(data);
      }
      if (data.length == 1) {
        createMarkupList(data);
      } else {
        return false;
      }
    })
    .catch(err => {
      info.innerHTML = '';
      countryList.innerHTML = '';
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
};
const clearMarkup = () => {
  info.innerHTML = '';
  countryList.innerHTML = '';
};

input.addEventListener('input', debounce(hebdlerCountrys, DEBOUNCE_DELAY));
