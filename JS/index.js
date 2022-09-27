//Copyright footer with current year
const currentYear = document.querySelector("#current-year");
currentYear.innerHTML = new Date().getFullYear();


//Variable declaration
const searchIcon = document.querySelector("#search-icon");
const cityInp = document.querySelector("#city-inp");
const errorBox = document.querySelector('.error-box');
const cityTitle = document.querySelector('#cityTitle');
const intro = document.querySelector('.introduction');
const totalScore = document.querySelector('.total-score-wrapper');
const citySummary = document.querySelector('.city-summary');
const scoreWrapper = document.querySelector('.score-wrapper');


//Add website's introduction
intro.innerHTML = `
    <p>Imagine to live and work in your <strong>dream city</strong>, which one could it be?</p>

    <p>If you already don't know, let's give a look to our selection of the greatest cities in the world
        and their <strong>quality levels</strong>.
    </p>
                                
    <p>Compare <strong>life quality data</strong> for hundreds of cities worldwide
        and get a <strong>city ranking</strong> based on your <strong>personal preferences</strong>.
    </p>`
;

//Add listeners
searchIcon.addEventListener('click', getData);

cityInp.addEventListener('keydown', function(event) {                    //Keyboard event listener
    if(event.key === 'Enter') {
        getData();
        console.error();
    }
});

cityInp.addEventListener('focus', () => {
    cityInp.value = "";
    errorBox.innerHTML = "";
})


//Fetch API function
async function getData() {
    const cityName = correctName(cityInp.value);
    
    const finalURL = `https://api.teleport.org/api/urban_areas/slug:${cityName}/scores/`;
    const response = await fetch(finalURL);
    const data = await response.json();
    console.log(finalURL);

    const imageURL = `https://api.teleport.org/api/urban_areas/slug:${cityName}/images/`;
    const response2 = await fetch(imageURL);
    const data2 = await response2.json();
    

    if(response.status !== 404) {
    cityInp.value = "";
    cityTitle.value = "";
    intro.innerHTML = "";
 
    let capitalizedName = cityName.toUpperCase().replaceAll("-", " ");
    cityTitle.innerHTML = `${capitalizedName}`;

    
    //Insert data into html
    totalScore.innerHTML = `<h2><strong>City score</strong>: ${(data.teleport_city_score).toFixed(2)} / 100</h2>`
    totalScore.style.borderBottom = "2px solid var(--turquoise)";

    citySummary.innerHTML = "";
    citySummary.innerHTML = `<h2><strong>Summary</strong>: </h2><p>${data.summary}</p>`;
    citySummary.style.borderBottom = "2px solid var(--turquoise)";

    scoreWrapper.innerHTML = "";
    data.categories.forEach((e) => {
        scoreWrapper.insertAdjacentHTML("afterbegin", `<h2><strong>${e.name}</strong>: ${(e.score_out_of_10).toFixed(2)} / 10</h2>`);
    });

    
    const headerBackground = document.querySelector('header');
    headerBackground.style.backgroundImage = `url(${data2.photos[0].image.web})`;
    
    }
    else {
        getError();
    }   
} 


//Function to handle the typo/input errors
function correctName(input){
    input = input.toLowerCase();
    input = input.trim();
    input = input.replaceAll(" ","-");
    return input;
};  


//Error function
function getError(){
    if(cityInp.length == 0) {
        errorBox.innerHTML = `<p>The input field cannot be empty!</p>`;
    }
    else {
        errorBox.innerHTML = `<p>Please, enter a valid city name.</p>`;
    }; 
}














