'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');


// mensagem de erro para os codigo e onde será inserida
const renderError = function(msg){
    countriesContainer.insertAdjacentText('beforeend', msg);
    countriesContainer.style.opacity = 1; 
}

// cria o elemento HTML a partir do impute do que será colocado
const renderCountry = function (data, className=""){
    const html = `
    <article class="country ${className}">
            <img class="country__img" src="${data.flags.png}" />
            <div class="country__data">
                <h3 class="country__name">${data.name.common}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed(2)} people</p>
                <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
                <p class="country__row"><span>💰</span>${Object.values(data.currencies)[0].name}</p>
            </div>
        </article>
           
    `
    countriesContainer.insertAdjacentHTML("beforeend", html)
    countriesContainer.style.opacity = 1
}
///////////////////////////////////////
// function getCountriesData(country){
//     const request =  new XMLHttpRequest();
//     request.open("GET", `https://restcountries.com/v3.1/name/${country}`)
//     request.send()

//     request.addEventListener("load", function(){
//         const [data] = JSON.parse(this.responseText)
//         console.log(data);
//         const country = `
//         <article class="country">
//             <img class="country__img" src="${data.flags.png}" />
//             <div class="country__data">
//                 <h3 class="country__name">${data.name.common}</h3>
//                 <h4 class="country__region">${data.region}</h4>
//                 <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed(2)} people</p>
//                 <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
//                 <p class="country__row"><span>💰</span>${Object.values(data.currencies)[0].name}</p>
//             </div>
//         </article>
//         `
//         // console.log(Object.values(data.languages)[0]);
//         // console.log(Object.values(data.currencies)[0].name);
//         countriesContainer.insertAdjacentHTML("beforeend", country)
//         countriesContainer.style.opacity = 1
        
//     })
// }

// function getCountryAndNeighbour(country){
//     const request =  new XMLHttpRequest();
//     request.open("GET", `https://restcountries.com/v3.1/name/${country}`)
//     request.send()

//     request.addEventListener("load", function(){
//         const [data] = JSON.parse(this.responseText)
//         console.log(data);
       
//         // console.log(Object.values(data.languages)[0]);
//         // console.log(Object.values(data.currencies)[0].name);
        
//         renderCountry(data)

//         const neighbour = data.borders
//         if (!neighbour) return;

//         const request2 =  new XMLHttpRequest();
//         request2.open("GET", `https://restcountries.com/v3.1/alpha/${neighbour}`)
//         request2.send()
//         request2.addEventListener("load",function(){
//             const [data2] = JSON.parse(request2.responseText)
//             console.log(data2); 
//             renderCountry(data2,"neighbour")
//         })

//     })
// }
// getCountryAndNeighbour("portugal")
// getCountriesData("brazil")
// getCountriesData("usa")
// getCountriesData("germany")
// getCountriesData("china")

// const request = fetch(`https://restcountries.com/v3.1/name/brazil`)
// // console.log(request);
//  const getCountriesData = function(country){
//     fetch(`https://restcountries.com/v3.1/name/${country}`).then(function(response){
//         // console.log(response);
//         return response.json()
//     }).then(function(data){
//         console.log(data);
//         renderCountry(data[0])
//     })
//  }

// reduz a api de baixo ela faz a verificação caso for usada para outras partes do codigo
const getJson = function(url, messageErr = "Something went wrong"){
    return fetch(url)
    .then((response)=>{
        if(!response.ok)
            throw new Error (`${messageErr} (${response.status })`)
        return response.json()
    })
}
// const request = fetch(`https://restcountries.com/v3.1/name/brazil`)
// console.log(request);
// const getCountriesData = function(country){
//     fetch(`https://restcountries.com/v3.1/name/${country}`).then((response) =>{ response.json()})
//     .then((data)=>{ renderCountry(data[0])
//         const neighbour = data[0].borders[0]
//         if(!neighbour) return 
//         return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
//     })
//     .then(reponse => reponse.json())
//     .then(data=> renderCountry(data[0],"neighbour"))
//     .catch(err=>{
//         renderError(`Something went wrong ${err.message}. Try again!`);  
//     })
//     .finally(()=>{
//         countriesContainer.style.opacity = 1;
//     })
// }
/// minha api funciona a partir daqui, ela pega os dados a partir do impute do pais e adiciona os pais vizinho também
const getCountriesData = function(country){
    getJson(`https://restcountries.com/v3.1/name/${country}`,"Country not found" )
    .then((data)=>{ 
        renderCountry(data[0]);
        
        const neighbour = data[0].borders[0]
        if(!neighbour) throw new Error (`Countretury have not neighbour`)
        
        return getJson(`https://restcountries.com/v3.1/alpha/${neighbour}`, "Country neighbour not found")})
    .then(data=> {
        renderCountry(data[0],"neighbour")})
    .catch(err=>{
        renderError(`Something went wrong ${err.message}. Try again!`);  
    })
    .finally(()=>{
        countriesContainer.style.opacity = 1;
    })
}
// adicionar evento no botão para mostrar o pais
// btn.addEventListener("click", function(){
//      getCountriesData("japan")
//  })
// api geolocalização
// const whereAmI =  function(lat, log){
//     return fetch(`https://geocode.xyz/${lat},${log}?geoit=json`)
//     .then(res => {
//         if(!res.ok) 
//             throw new Error (`Problem with geocoding (${res.status })`)
//         return res.json()
//     }).then(data => {
//         console.log(data);
//         console.log(`You are in ${data.city} stay in ${data.country}`);
//         return fetch(`https://restcountries.com/v3.1/name/${data.country}`)})
//     .then(response => {
//         if(!response.ok) 
//             throw new Error (`Country not found (${response.status })`)
//         return response.json()})
//     .then(data=> renderCountry(data[0]))
//     .catch(err =>{
//         renderError(`Something went wrong ${err.message}`)
//     } )
// }
// whereAmI(52.508,13.381)
// whereAmI(19.037,72.873)
// whereAmI(-33.933,18.474)



// navigator.geolocation.getCurrentPosition(position=> console.log(position), err=> console.error(err))
// pegando posição do navegador e renderizando infos na tela
// const getPosition= function(){
//     return new Promise(function(resolve, reject){
//         navigator.geolocation.getCurrentPosition(resolve, reject)
//     })
// }

// // getPosition().then(pos => console.log(pos)).catch(err =>console.error(err))
// const whereAmI =  function(){
//     let lat;
//     let log;
//     getPosition().then(pos=>{
//         const{latitude:lat, longitude:log} = pos.coords
//         console.log();
//         return fetch(`https://geocode.xyz/${lat},${log}?geoit=json`)
//     })
//     .then(res => {
//         if(!res.ok) 
//             throw new Error (`Problem with geocoding (${res.status})`)
//         return res.json()
//     }).then(data => {
//         console.log(data);
//         console.log(`You are in ${data.city} stay in ${data.country}`);
//         return fetch(`https://restcountries.com/v3.1/name/${data.country}`)})
//     .then(response => {
//         if(!response.ok) 
//             throw new Error (`Country not found (${response.status })`)
//         return response.json()})
//     .then(data=> renderCountry(data[0]))
//     .catch(err =>{
//         renderError(`Something went wrong ${err.message}`)
//     } )
// }
// document.addEventListener("load", whereAmI())

const getPosition= function(){
    return new Promise(function(resolve, reject){
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}


const whereAmI = async function(){
    try {
    const pos = await getPosition()
    const {latitude:lat, longitude:log} = pos.coords
    const resGeo = await fetch(`https://geocode.xyz/${lat},${log}?geoit=json`)
    if(!resGeo.ok) throw new Error ("Problem getting location data")
    const dataGeo = await resGeo.json()
    const resolve = await fetch(`https://restcountries.com/v3.1/name/${dataGeo.country}`)
  
    if(!resolve.ok) throw new Error ("Problem getting country")
    const data = await resolve.json()
    renderCountry(data[0])
    return `Your city is ${dataGeo.city}`
    } 
    catch(err){
    renderError(err.message)
    }
    throw err;
};
// whereAmI()
(async function () {
    try{
    const city =  await whereAmI()
    console.log(`2 ${city}`);
    } 
    catch (err){
    console.error(err.message);
    }
    console.log("3");
})();
