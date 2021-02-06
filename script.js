const c = (i) => document.getElementById(i);

function getCountryData(countryName) {
  fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
    .then((res) => res.json())
    .then((data) => displayData(data))
    .catch((err) => console.log(err));
}

getCountryData("Bangladesh");

c("search_btn").addEventListener("click", () => {
  const input = c("search_input");
  getCountryData(input.value);
  input.value = "";
});

function displayData(countryData) {
  if (!countryData.status) {
    countryData.map((country) => {
      const {
        flag,
        name,
        altSpellings,
        capital,
        languages,
        nativeName,
        population,
        region,
        borders,
        currencies,
      } = country;

      c("country_info").innerHTML = `
            <div class="row text-center break-word">
                <div class="col-12">
                <img src=${flag} class="img-fluid p-5" alt="Country Flag">
                </div>
                <div class="clo-12 mb-3">
                    <h2>${altSpellings[2]}</h2>
                </div>
                <div class="col-6 fw-bold">Name</div>
                <div class="col-6">${name}</div>
                <div class="col-6 fw-bold">Native Name</div>
                <div class="col-6">${nativeName}</div>
                <div class="col-6 fw-bold">Capital</div>
                <div class="col-6">${capital}</div>
                <div class="col-6 fw-bold">Languages</div>
                <div class="col-6">${languages.map(
                  (language) => language.name
                )}</div>
                <div class="col-6 fw-bold">Population</div>
                <div class="col-6">${population}</div>
                <div class="col-6 fw-bold">Region</div>
                <div class="col-6">${region}</div>
                <div class="col-6 fw-bold">Borders</div>
                <div class="col-6">${borders.map((b) => b)}</div>
                <div class="col-6 fw-bold">Currencies</div>
                <div class="col-6">${currencies.map(
                  (c) => `${c.name} ${c.symbol}`
                )}</div>
            </div>`;
    });
  } else {
    c(
      "country_info"
    ).innerHTML = `<h2 style="margin-top:50px">Country not found</h2>`;
  }
}

c("search_input").addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    c("search_btn").click();
  }
});
