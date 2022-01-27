const queryString = window.location.search;
const urlParameters = new URLSearchParams(queryString);
const idString = urlParameters.get("id");

const photographerId = parseInt(idString);

async function getPhotographersDatas() {

    const photographersDatas = fetch("../data/photographers.json")
                    .then(function(result) {
                        if(result.ok) {
                            return result.json();
                        }
                    })
                    .then(function(photographersDatas) {
                        return photographersDatas;
                    })
                    .catch(function(error) {
                        console.log(`Fetch haven't succeed to retrieve the photographers datas. ${error}.`)
                    });

    return photographersDatas;

}

function getCurrentPhotographer(photographersData) {

    var currentPhotographer = new Photographer();

    photographersData.photographers.forEach( (photographer) => {

        if (photographer.id === photographerId) {

            currentPhotographer.name = photographer.name;
            currentPhotographer.id = photographer.id;
            currentPhotographer.location = `${photographer.city}, ${photographer.country}`;
            currentPhotographer.tagline = photographer.tagline;
            currentPhotographer.price = photographer.price;
            currentPhotographer.picture = `assets/photographers/photographers-id-photos/${photographer.portrait}`;

        }

    });

    photographersData.media.forEach( (media) => {

        if (media.photographerId === photographerId) {

            if(currentPhotographer.media[0] === undefined) {

                currentPhotographer.media[0] = Factory.createMedia(media);

            } else {

                currentPhotographer.media.push(Factory.createMedia(media));

            }

        }

    });

    return currentPhotographer;
}

function displayPhotographerBanner(currentPhotographer) {

    const photographerBanner = document.querySelector(".photographer-header");
    const bannerInfosDOM = currentPhotographer.getBannerInfosDOM();

    photographerBanner.innerHTML = bannerInfosDOM;

}

function displayMediaCards(currentPhotographer) {

    const photographerGallery = document.querySelector(".photographer-gallery");

    currentPhotographer.media.forEach( (media) => {

        const mediaCardDOM = currentPhotographer.getMediaCardDOM(media);

        photographerGallery.innerHTML += mediaCardDOM;

    });

}

function displayPhotographerFooter(currentPhotographer) {

    const photographerFooter = document.querySelector(".photographer-footer");

    const footerInfosDOM = currentPhotographer.getFooterInfosDOM();

    photographerFooter.innerHTML = footerInfosDOM;

}


async function displayData(photographersData) {
    
    var currentPhotographer = getCurrentPhotographer(photographersData);

    displayPhotographerBanner(currentPhotographer);

    displayMediaCards(currentPhotographer);

    displayPhotographerFooter(currentPhotographer);
    
    return "finished";
}

async function init() {
    // Récupère les données des photographes
    const photographersDatas = await getPhotographersDatas();

    if (await displayData(photographersDatas) === "finished") {

        Lightbox.init();

    }
}

document.addEventListener("DOMContentLoaded", init);