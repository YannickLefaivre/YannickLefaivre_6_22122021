const queryString = window.location.search;
const urlParameters = new URLSearchParams(queryString);
const photographerId = urlParameters.get("id");

parseInt(photographerId);

async function getPhotographersDatas() {

    const photographersDatas = fetch("../../../data/photographers.json")
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

        if (photographer.id == photographerId) {

            currentPhotographer.name = photographer.name;
            currentPhotographer.id = photographer.id;
            currentPhotographer.location = `${photographer.city}, ${photographer.country}`;
            currentPhotographer.tagline = photographer.tagline;
            currentPhotographer.price = photographer.price;
            currentPhotographer.portrait = photographer.portrait;

        }

    });

    photographersData.media.forEach( (media) => {

        if (media.photographerId == photographerId) {

            if(media.hasOwnProperty("image")) {

                var currentPhotographerMedia = new Media(media.id, media.photographerId, media.title, media.image, media.likes, media.date, media.price);

                if(currentPhotographer.media[0] == undefined) {

                    currentPhotographer.media[0] = currentPhotographerMedia;

                } else {

                    currentPhotographer.media.push(currentPhotographerMedia);

                }

            } else {

                var currentPhotographerMedia = new Media(media.id, media.photographerId, media.title, media.video, media.likes, media.date, media.price);
                
                if(currentPhotographer.media[0] == undefined) {

                    currentPhotographer.media[0] = currentPhotographerMedia;

                } else {

                    currentPhotographer.media.push(currentPhotographerMedia);

                }

            }

        }

    });

    return currentPhotographer;
}

function displayPhotographerBannerInfos(currentPhotographer) {

    const photographerBanner = document.querySelector(".photographer-header");

    photographerBanner.querySelector(".photograph-profil__name").textContent = currentPhotographer.name;
    photographerBanner.querySelector(".photograph-profil__location").textContent = currentPhotographer.location;
    photographerBanner.querySelector(".photograph-profil__tagline").textContent = currentPhotographer.tagline;
    photographerBanner.querySelector(".user").setAttribute("src", `../assets/photographers/photographers-id-photos/${currentPhotographer.portrait}`);

}

/* 
    Récupère le prénom du photographe dont la page est actuellement affiché 
    et en crée une version en miniscule, sans majuscule pour la correspondance 
    avec le nom du dossier qui contient ses media/oeuvres. 
*/
function getMediaDirectoryPath(currentPhotographer) {

    var currentPhotographerFirstName = currentPhotographer.name.match(/^\w+-?\w+(?!\w)/i);
    var currentPhotographerMediaDirectoryName = currentPhotographerFirstName[0].toLowerCase();

    const photographersMediaDirectoryPath = `../../assets/photographers/${currentPhotographerMediaDirectoryName}`;

    return photographersMediaDirectoryPath;

}

function createMediaCard(currentPhotographer, media) {

    const card = document.createElement("article");
    const lightboxLink = document.createElement("a");
    const detailsContainer = document.createElement("div");
    const title = document.createElement("p");
    const likesButton = document.createElement("button");
    const likesButtonIcon = document.createElement("span");

    var mediaDOMElement = undefined;

    var videoExtensionPattern = /.mp4/g;

    var mediaDirectoryPath = getMediaDirectoryPath(currentPhotographer);

    if(videoExtensionPattern.test(media.file)) {

        mediaDOMElement = document.createElement("video");

        mediaDOMElement.setAttribute("src", `${mediaDirectoryPath}/videos/${media.file}`);
        
    } else {

        mediaDOMElement = document.createElement("img");
    
        mediaDOMElement.setAttribute("src", `${mediaDirectoryPath}/pictures/${media.file}`);

    }
    
    card.classList.add("thumbnail-card");
    
    lightboxLink.classList.add("thumbnail-card__lightbox-link");
    lightboxLink.setAttribute("href", "#");

    detailsContainer.classList.add("thumbnail-card-details");

    title.classList.add("thumbnail-card-details__title")
    title.textContent = media.title;

    likesButton.classList.add("likes-button");
    likesButton.textContent = media.likes;

    likesButtonIcon.classList.add("likes-button__icon", "fas", "fa-heart");

    lightboxLink.appendChild(mediaDOMElement);
    
    likesButton.appendChild(likesButtonIcon);

    detailsContainer.appendChild(title);
    detailsContainer.appendChild(likesButton);

    card.appendChild(lightboxLink);
    card.appendChild(detailsContainer);

    return card;
}

function displayMediaCards(currentPhotographer) {

    const photographerGallery = document.querySelector(".photographer-gallery");

    currentPhotographer.media.forEach( (media) => {

        const mediaCard = createMediaCard(currentPhotographer, media);

        photographerGallery.appendChild(mediaCard);

    });

}

function displayTotalOfLikes(currentPhotographer) {

    const photographerTotalOfLikes = document.querySelector(".photographer-footer__numbers-of-likes");

    const reducer = (previousValue, currentValue) => previousValue + currentValue;

    var totalOfLikes = 0;
    var numberOfLikesOfAllMedia = [];
    
    currentPhotographer.media.forEach( (media) => {

        numberOfLikesOfAllMedia.push(media.likes);

    });
    totalOfLikes = numberOfLikesOfAllMedia.reduce(reducer);
    photographerTotalOfLikes.insertAdjacentText("afterbegin", `${totalOfLikes}`);

}

function displayPhotographerPrice(currentPhotographer) {

    const photographerPrice = document.querySelector(".photographer-footer__price-per-hours");

    photographerPrice.textContent = `${currentPhotographer.price}€ / jour`;

}


async function displayData(photographersData) {
    
    var currentPhotographer = getCurrentPhotographer(photographersData);

    displayPhotographerBannerInfos(currentPhotographer);

    displayMediaCards(currentPhotographer);

    displayTotalOfLikes(currentPhotographer);

    displayPhotographerPrice(currentPhotographer);
    
}

async function init() {
    // Récupère les données des photographes
    const photographersDatas = await getPhotographersDatas();

    displayData(photographersDatas);

}

document.addEventListener("DOMContentLoaded", init);