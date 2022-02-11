import Directory from "../utils/directory.js";

import Video from "../media/video.js";

export default class Photographer {

    constructor(name, id, city, country, tagline, price, portrait, media) {
        this.name = name;
        this.id = id;
        this.location = `${city}, ${country}`;
        this.tagline = tagline;
        this.price = price;
        this.picture = `assets/photographers/photographers-id-photos/${portrait}`;
        this.media = [media];
    }
    
    getCardDOM() {
        const userCard = `
        <article class="thumb-photographer">
            <a href="./pages/photographer.html?id=${this.id}" aria-label="${this.name} - Fisheye">
                <img class="user" src="./${this.picture}" alt="" />

                <h2 class="thumb-photographer__heading">
                    ${this.name}
                </h2>
            </a>

            <div class="thumb-photographer-datas">
                <p class="thumb-photographer-datas__location" lang="en">
                    ${this.location}
                </p>

                <p class="thumb-photographer-datas__tagline">
                    ${this.tagline}
                </p>

                <p class="thumb-photographer-datas__price-per-day">
                    ${this.price}€/jour
                </p>
            </div>
        </article>`;

        return userCard;
    }
    
    getBannerInfosDOM() {

        const bannerInfos = `
        <div class="photograph-profil">
            <h1 class="photograph-profil__name">${this.name}</h1>

            <p class="photograph-profil__location" lang="en">${this.location}</p>

            <p class="photograph-profil__tagline">${this.tagline}</p>
        </div>

        <button id="contact-button" class="button contact-button">
            Contactez-moi
        </button>

        <img
            class="user user--photographer-banner-id-photo"
            src="../${this.picture}"
            alt="${this.name}"
        />`;

        return bannerInfos;

    }

    getMediaCardDOM(media) {

        const mediaDirectoryPath = Directory.getMediaDirectoryPath(this);
        var mediaOuterHTML = "";
        var mediaSource = "";

        if (media instanceof Video) {

            mediaSource = `${mediaDirectoryPath}/videos/${media.video}`;
            mediaOuterHTML =` 
            <video aria-label="${media.description}">
                <source src="${mediaSource}" type="video/mp4"" />

                Votre navigateur ne prend pas en charge le contenu video en HTML5.
            </video>`;

        } else {

            mediaSource = `${mediaDirectoryPath}/pictures/${media.image}`;
            mediaOuterHTML = `<img src="${mediaSource}" alt="${media.description}" />`;

        }

        const mediaCard = `
        <article class="thumbnail-card">
            <a href="${mediaSource}" class="thumbnail-card__lightbox-link" aria-label="${media.title}, closeup view">
                ${mediaOuterHTML}
            </a>

            <div class="thumbnail-card-details">
                <h3 class="thumbnail-card-details__title" title="${media.title}" lang="en">
                    ${media.title}
                </h3>

                <button class="like-button sr-only-container" aria-label="${media.likes} likes">
                    <span class="like-button__number-of-likes">${media.likes}</span>
                    <span class="like-button__icon fas fa-heart" aria-hidden="true"></span>
                </button>
            </div>
        </article>`;

        return mediaCard;
    }

    calculateTotalOfLikes() {
        
        var totalOfLikes = 0;
        var numberOfLikesOfAllMedia = [];

        const reducer = (previousValue, currentValue) => previousValue + currentValue;

        this.media.forEach( (media) => {

            numberOfLikesOfAllMedia.push(media.likes);

        });
        
        totalOfLikes = numberOfLikesOfAllMedia.reduce(reducer);

        return totalOfLikes;

    }

    getComplementaryInfosDOM() {

        this.totalOfLikes = this.calculateTotalOfLikes();

        const footerInfos = `
        <p class="sr-only-container">
            <span id="total-of-likes">
                ${this.totalOfLikes} <span class="sr-only-container__elements">J'aime</span> <span class="fas fa-heart"></span>
            </span>

            <span>
                ${this.price}€ / jour
            </span>
        </p>`;

        return footerInfos;
    }
}