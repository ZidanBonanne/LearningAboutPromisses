'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

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
const request = fetch(`https://restcountries.com/v3.1/name/brazil`)
// console.log(request);
 const getCountriesData = function(country){
    fetch(`https://restcountries.com/v3.1/name/${country}`).then((response) => response.json()
    ).then((data)=> renderCountry(data[0]))
 }

 getCountriesData("brazil")