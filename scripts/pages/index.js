async function getPhotographers() {

    const photographers = fetch("data/photographers.json")
                            .then(function(result) {
                                if(result.ok) {
                                    return result.json();
                                }
                            })
                            .then(function(photographersData) {
                                return photographersData.photographers;
                            })
                            .catch(function(error) {
                                console.log(`Fetch haven't succeed to retrieve the photographers datas. ${error}.`)
                            });
                            
    return photographers;
    
}

async function displayData(photographers) {

    const photographersSection = document.querySelector(".photographer-section");

    photographers.forEach( (photographer) => {

        const photographerModel = new Photographer(photographer.name, photographer.id, photographer.city, photographer.country, photographer.tagline, photographer.price, photographer.portrait);

        const userCardDOM = photographerModel.getCardDOM();

        photographersSection.innerHTML += userCardDOM;
        
    });

};

function includeIdOfTheChosenPhotographerInTheUrl() {

    const photographerPageLinks = document.querySelectorAll(".thumb-photographer a");

    /* 
        Listen if a link to the photographers page has been clicked. If yes,
        store in a variable the id of the photographer whose media should be
        be loaded in the photographer.html page. 
    */
    photographerPageLinks.forEach( (photographerPageLink) => {

        photographerPageLink.addEventListener("click", function(event) {

            event.preventDefault();
            
            let photographerID = event.currentTarget.getAttribute("id");

            window.document.location = `./pages/photographer.html?id=${photographerID}`;
        });
    });
}

async function init() {

    const photographers = await getPhotographers();

    displayData(photographers);

    includeIdOfTheChosenPhotographerInTheUrl();

};

document.addEventListener("DOMContentLoaded", init);