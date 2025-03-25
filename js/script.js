const main = document.querySelector("#m_div");
const select = document.getElementById("select");
const search = document.getElementById("search");

function fetchCountries() {
  axios
    .get("https://restcountries.com/v3.1/all")
    .then((response) => displayCountries(response.data))
    .catch((error) => console.error("Маълумот гирифта нашуд:", error));
}

function displayCountries(countries) {
  main.innerHTML = "";
  const sort = countries.sort((a, b) => {
    if (a.name.common < b.name.common) return -1;
    if (a.name.common > b.name.common) return 1;
    return 0;
  });

  countries.forEach((country) => {
    const countryCard = document.createElement("div");
    countryCard.className =
      "p-4 border rounded-lg shadow-lg bg-white w-[270px] hover:shadow-xl hover:border-red-400 transform hover:translate-y-5 transition-all duration-700 ease-in-out";

    countryCard.innerHTML = `
        <img src="${country.flags.svg}" alt="${
      country.name.common
    }" class="w-full h-[150px] object-cover rounded-md border-2 border-gray-300">
        <h2 class="text-xl font-bold mt-4">${country.name.common}</h2>
        <p class="text-gray-600"><span class="font-bold text-black/85">State language:</span> ${
          country.languages
            ? Object.values(country.languages).join(", ")
            : "unknown"
        }</p>
            <p class="text-gray-600"><span class="font-bold text-black/85">Currency:</span> ${
              country.currencies
                ? Object.values(country.currencies)
                    .map((currency) => currency.name)
                    .join(", ")
                : "unknown"
            }</p>
            <p class="text-gray-600"><span class="font-bold text-black/85">Region:</span> ${
              country.region
                ? Object.values(country.region).join("")
                : "unknown"
            }</p>
            <p class="text-gray-600"><span class="font-bold text-black/85">Population:</span> ${
              country.population
                ? country.population.toLocaleString()
                : "unknown"
            } people</p>
            <p class="text-gray-600"><span class="font-bold text-black/85">Area:</span> ${
              country.area ? country.area.toLocaleString() : "unknown"
            } km<sup>2</sup></p>
        <p class="text-gray-600">
        <span class="font-bold text-black/85">Independent:</span> 
        ${
          country.independent !== undefined
            ? country.independent
              ? "Yes"
              : "No"
            : "Unknown"
        }
        </p>

    `;
    main.appendChild(countryCard);
  });
}

select.addEventListener("change", (e) => {
  let continent = e.target.value;
  axios
    .get(`https://restcountries.com/v3.1/region/${continent}`)
    .then((response) => {
      const countries = response.data;
      displayCountries(countries);
    })
    .catch((error) => console.error("Маълумот гирифта нашуд:", error));
});

fetchCountries();

function perfomSearch(searchValue) {
  if (searchValue) {
    axios
      .get(`https://restcountries.com/v3.1/name/${searchValue}`)
      .then((response) => {
        const countries = response.data;
        displayCountries(countries);
      })
      .catch((error) => console.error("Маълумот гирифта нашуд:", error));
  } else {
    fetchCountries();
  }
}

function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const debouncedSearch = debounce(perfomSearch, 1000);

search.addEventListener("input", (e) => {
  let searchValue = e.target.value;
  debouncedSearch(searchValue);
});

function something() {
  console.log("something");
}
