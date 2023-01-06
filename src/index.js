import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { countryListTemplate, countryCardTemplate } from './js/markupTemplate';


const DEBOUNCE_DELAY = 300;

const refs = {
    inputSearchBox: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

refs.inputSearchBox.addEventListener('input', debounce(onInputSearchBox, DEBOUNCE_DELAY));

function onInputSearchBox(e) {
    e.preventDefault();
    const searchCountry = refs.inputSearchBox.value.trim();
    if (searchCountry === '') {
        cleanHTML();
        return;
    }

    fetchCountries(searchCountry)
        .then(countries => {
            if (countries.length > 10) {
                Notify.info('Too many matches found. Please enter a more specific name.');
                cleanHTML();
                return;
            }

            if (countries.length >= 2 && countries.length <= 10) {
                const listMarkup = countries.map(country => countryListTemplate(country));
                refs.countryList.innerHTML = listMarkup.join('');
                refs.countryInfo.innerHTML = '';
            }
            
            if (countries.length === 1) {
                const cardMarkup = countries.map(country => countryCardTemplate(country));
                refs.countryList.innerHTML = '';
                refs.countryInfo.innerHTML = cardMarkup.join('');
            }
        })
        .catch(err => {
            Notify.failure('Oops, there is no country with that name');
            cleanHTML();
            return Error;
    })
}

function cleanHTML() {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
}