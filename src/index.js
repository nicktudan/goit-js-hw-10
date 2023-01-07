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

const changeBorderColor = color => (refs.inputSearchBox.style.borderColor = color);

refs.inputSearchBox.addEventListener('input', debounce(onInputSearchBox, DEBOUNCE_DELAY));

function onInputSearchBox(e) {
    e.preventDefault();
    cleanHTML();
    const searchCountry = refs.inputSearchBox.value.trim();
    if (searchCountry === '') {
        // cleanHTML();
        changeBorderColor('blue');
        return;
    }

    fetchCountries(searchCountry)
        .then(countries => {
            if (countries.length > 10) {
                Notify.info('Too many matches found. Please enter a more specific name.');
                // cleanHTML();
                changeBorderColor('red');
                return;
            }

            if (countries.length >= 2 && countries.length <= 10) {
                const listMarkup = countries.map(country => countryListTemplate(country));
                refs.countryList.innerHTML = listMarkup.join('');
                // refs.countryInfo.innerHTML = '';
                changeBorderColor('lightgreen');
            }
            
            if (countries.length === 1) {
                const cardMarkup = countries.map(country => countryCardTemplate(country));
                // refs.countryList.innerHTML = '';
                refs.countryInfo.innerHTML = cardMarkup.join('');
            }
        })
        .catch(err => {
            Notify.failure('Oops, there is no country with that name');
            // cleanHTML();
            changeBorderColor('red');
            return Error;
    })
}

function cleanHTML() {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
}
