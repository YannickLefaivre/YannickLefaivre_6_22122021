async function getPhotographers() {
    const photographers = fetch("./data/photographers.json")
                            .then(function(result) {
                                if(result.ok) {
                                    return result.json();
                                }
                            })
                            .then(function(photographersDatas) {
                                return photographersDatas.photographers; // renvoie les données des photographes (nom, ville, pays, etc...)
                            })
                            .catch(function(error) {
                                console.log(`Fetch haven't succeed to retrieve the photographers datas. ${error}.`)
                            });
                            
    return photographers;
}

async function displayData(photographers) {
    const photographersThumbnails = document.querySelectorAll(".thumb-photographer");

    /* 
        Parcours la liste de miniatures de photographe tout en ajoutant leur données 
        au emplacement prévu à cette effet dans le HTML.
    */
    for(i = 0; i < photographers.length && i < photographersThumbnails.length; i++) {
        photographersThumbnails[i]
            .querySelector("a[href=\"./pages/photographer.html\"]")
            .setAttribute("id", `${photographers[i].id}`
        );

        photographersThumbnails[i]
            .querySelector(".user")
            .setAttribute(
                "src", 
                `./assets/photographers/photographers-id-photos/${photographers[i].portrait}`
        );

        photographersThumbnails[i].querySelector(".thumb-photographer__heading").textContent = photographers[i].name;

        photographersThumbnails[i].querySelector(".thumb-photographer-datas__location").textContent = `${photographers[i].city}, ${photographers[i].country}`;

        photographersThumbnails[i].querySelector(".thumb-photographer-datas__tagline").textContent = photographers[i].tagline;

        photographersThumbnails[i].querySelector(".thumb-photographer-datas__price-per-day").textContent = `${photographers[i].price}€/day`;
    }
    
/* 
    Provient du code de base. Laisser-là en commentaire pour l'instant 
    avant d'être sûr de n'en pas avoir besoin plus tard.

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
    }); 
*/
};

async function init() {
    // Récupère les datas des photographes
    const photographers = await getPhotographers();
    displayData(photographers);
};

init();
    