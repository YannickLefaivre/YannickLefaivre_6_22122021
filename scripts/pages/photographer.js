import Factory from "../factories/factory.js";

import Photographer from "../photographers-data-management/photographer.js";

import ContactForm from "../utils/contactForm.js";
import Lightbox from "../utils/lightbox.js";
import SelectMenu from "../utils/selectMenu.js";
import LikeButton from "../utils/likeButton.js";

async function getPhotographersData() {

    const photographersData = fetch("../data/photographers.json")
                    .then(function(result) {
                        if(result.ok) {
                            return result.json();
                        }
                    })
                    .then(function(photographersData) {
                        return photographersData;
                    })
                    .catch(function(error) {
                        console.log(`Fetch haven't succeed to retrieve the photographers datas. ${error}.`)
                    });

    return photographersData;

}

function getCurrentPhotographer(photographersData) {

    var currentPhotographer = new Photographer();

    const queryString = window.location.search;
    const urlParameters = new URLSearchParams(queryString);
    const idString = urlParameters.get("id");

    const photographerId = parseInt(idString);

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

function displayBanner(currentPhotographer) {

    const photographerBanner = document.querySelector(".photographer-banner");
    const bannerInfosDOM = currentPhotographer.getBannerInfosDOM();

    photographerBanner.innerHTML = bannerInfosDOM;

}

function displayMediaCards(currentPhotographer) {

    const photographerGallery = document.querySelector(".photographer-gallery");

    SelectMenu.sortByPopularity(currentPhotographer.media);

    currentPhotographer.media.forEach( (media) => {

        const mediaCardDOM = currentPhotographer.getMediaCardDOM(media);

        photographerGallery.innerHTML += mediaCardDOM;

    });

}

function displayTotalOfLikesAndPrice(currentPhotographer) {

    const photographerFooter = document.querySelector(".photographer-likes-and-price");

    const footerInfosDOM = currentPhotographer.getComplementaryInfosDOM();

    photographerFooter.innerHTML = footerInfosDOM;

}


async function displayData(currentPhotographer) {

    displayBanner(currentPhotographer);

    displayMediaCards(currentPhotographer);

    displayTotalOfLikesAndPrice(currentPhotographer);
    
    return "finished";

}

async function init() {
    
    const photographersData = await getPhotographersData();
    
    const currentPhotographer = getCurrentPhotographer(photographersData);

    // Add the name of the current photographer in the page title
    document.title = `${currentPhotographer.name} - Fisheye`;

    if (await displayData(currentPhotographer) === "finished") {

        LikeButton.init(currentPhotographer);

        ContactForm.init();

        Lightbox.init();

        SelectMenu.init(currentPhotographer);

    }

}

document.addEventListener("DOMContentLoaded", init);