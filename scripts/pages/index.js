import Photographer from "../photographers-data-management/photographer.js";

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

/* Display the card of every photographers on the home page. */
function displayData(photographers) {

    const photographersSection = document.querySelector(".photographer-section");

    photographers.forEach( (photographer) => {

        const photographerModel = new Photographer(photographer.name, photographer.id, photographer.city, photographer.country, photographer.tagline, photographer.price, photographer.portrait);

        const userCardDOM = photographerModel.getCardDOM();

        photographersSection.innerHTML += userCardDOM;
        
    });

}

async function init() {

    const photographers = await getPhotographers();

    displayData(photographers);

};

document.addEventListener("DOMContentLoaded", init);