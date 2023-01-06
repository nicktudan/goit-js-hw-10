export function fetchCountries(name) {

    const BASE_URL = 'https://restcountries.com/v3.1/';
    const filters = '?fields=name,capital,population,flags,languages';

    return fetch(`${BASE_URL}name/${name}${filters}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
}