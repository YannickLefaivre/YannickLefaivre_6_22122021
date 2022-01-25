async function getPhotographers() {

    const photographers = fetch("data/photographers.json")
                            .then(function(result) {
                                if(result.ok) {
                                    return result.json();
                                }
                            })
                            .then(function(photographersDatas) {
                                return photographersDatas.photographers;
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

function getChoosenPhotographerId() {

    const photographerPageLinks = document.querySelectorAll(".thumb-photographer a");

    /* 
        Ecoute si un lien vers la page des photographes a été cliquer. Si oui, 
        stocker dans une variable l'id du photographe dont les média doivent 
        être charger dans la page photographer.html . 
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

    // Récupère les datas des photographes
    const photographers = await getPhotographers();

    displayData(photographers);

    getChoosenPhotographerId();

};

document.addEventListener("DOMContentLoaded", init);