class Photographer {

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
        const userCard = 
        `<article class="thumb-photographer">
            <a href="./pages/photographer.html?id=${this.id}" id="${this.id}">
                <img class="user" src="./${this.picture}" alt="" />

                <h2 class="thumb-photographer__heading">
                    ${this.name}
                </h2>
            </a>

            <div class="thumb-photographer-datas">
                <p class="thumb-photographer-datas__location">
                    ${this.location}
                </p>

                <p class="thumb-photographer-datas__tagline" lang="fr">
                    ${this.tagline}
                </p>

                <p class="thumb-photographer-datas__price-per-day" lang="fr">
                    ${this.price}€/jour
                </p>
            </div>
        </article>`;

        return userCard;
    }
    
    getBannerInfosDOM() {

        const bannerInfos = `
        <section class="photograph-profil">
            <h1 class="photograph-profil__name">${this.name}</h1>

            <p class="photograph-profil__location">${this.location}</p>

            <p class="photograph-profil__tagline">${this.tagline}</p>
        </section>

        <button id="contact-button" class="button contact-button">
            Contactez-moi
        </button>

        <img
            class="user user--photographer-header-id-photo"
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
            mediaOuterHTML = `
            <video>
                <source src="${mediaSource}" type="video/mp4" />

                Votre navigateur ne prend pas en charge le contenu video en HTML5.
            </video>`;

        } else {

            mediaSource = `${mediaDirectoryPath}/pictures/${media.image}`;
            mediaOuterHTML = `<img src="${mediaSource}" alt="${media.description}" />`;

        }

        const mediaCard = `
        <div class="thumbnail-card">
            <a href="${mediaSource}" class="thumbnail-card__lightbox-link" aria-label="${media.title}, closeup view">
                ${mediaOuterHTML}
            </a>

            <div class="thumbnail-card-details">
                <p class="thumbnail-card-details__title">
                    ${media.title}
                </p>

                <button class="like-button" aria-label="likes">
                    <span class="like-button__number-of-likes">${media.likes}</span>
                    <span class="like-button__icon fas fa-heart" aria-hidden="true"></span>
                </button>
            </div>
        </div>`;

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

    getFooterInfosDOM() {

        this.totalOfLikes = this.calculateTotalOfLikes();

        const footerInfos = `
        <p id="total-of-likes">
            ${this.totalOfLikes} <span class="fas fa-heart"></span>
        </p>

        <p>
            ${this.price}€ / jour
        </p>`;

        return footerInfos;
    }
}