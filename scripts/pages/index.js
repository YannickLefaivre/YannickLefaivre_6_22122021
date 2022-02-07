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

}

function goToSelectedPhotographerPage(event) {
    
    event.preventDefault();

    let photographerId = event.currentTarget.getAttribute("id");

    window.document.location = `./pages/photographer.html?id=${photographerId}`;

}

async function init() {

    const photographers = await getPhotographers();

    displayData(photographers);

    const photographerPageLinks = document.querySelectorAll(`a[href^="./pages/photographer.html"]`);

    photographerPageLinks.forEach( (link) => {

        link.addEventListener("click", goToSelectedPhotographerPage);

    });

};

document.addEventListener("DOMContentLoaded", init);