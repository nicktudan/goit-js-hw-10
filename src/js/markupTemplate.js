export function countryListTemplate({ flags, name }) {
    return `<li class="country-list__item">
        <img class="country-list__flag-img" src="${flags.svg}" alt="${name.official}" width = 100>
        <h2 class="country-list__name">${name.official}</h2>
    </li>`
};

export function countryCardTemplate({ flags, name, capital, population, languages }) {
    return `<div class="country-info__wrap">
        <img class="country-info__flag-img" src="${flags.svg}" alt="${name.official}" width = 100>
        <h2 class="country-info__name">${name.official}</h2>
        </div>
        <p class="country-info__capital"><span class="country-info__text">Capital: </span>${capital}</p>
        <p class="country-info__population"><span class="country-info__text">Population: </span>${population}</p>
        <p class="country-info__languages"><span class="country-info__text">Languages: </span>${Object.values(languages)}</p>`
};



// Напиши функцію fetchCountries(name), яка робить HTTP-запит 
// на ресурс name і повертає проміс з масивом країн - результатом запиту.
// Винеси її в окремий файл fetchCountries.js і зроби іменований експорт.

// Фільтрація полів
// У відповіді від бекенду повертаються об'єкти, велика частина властивостей яких,
// тобі не знадобиться.Щоб скоротити обсяг переданих даних,
// додай рядок параметрів запиту - таким чином цей бекенд реалізує фільтрацію полів.
// Ознайомся з документацією синтаксису фільтрів.

// Тобі потрібні тільки наступні властивості:

// name.official - повна назва країни
// capital - столиця
// population - населення
// flags.svg - посилання на зображення прапора
// languages - масив мов