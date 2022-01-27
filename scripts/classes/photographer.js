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
            <a href="./pages/photographer.html" id="${this.id}">
                <img class="user" src="./${this.picture}" alt="">

                <h2 class="thumb-photographer__heading">
                    ${this.name}
                </h2>
            </a>

            <div class="thumb-photographer-datas">
                <p class="thumb-photographer-datas__location">
                    ${this.location}
                </p>

                <p class="thumb-photographer-datas__tagline">
                    ${this.tagline}
                </p>

                <p class="thumb-photographer-datas__price-per-day">
                    ${this.price}€ / jour
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
            mediaOuterHTML = `<video src="${mediaSource}"></video>`;

        } else {

            mediaSource = `${mediaDirectoryPath}/pictures/${media.image}`;
            mediaOuterHTML = `<img src="${mediaSource}" alt="${media.title}" />`;

        }

        const mediaCard = `
        <article class="thumbnail-card">
            <a href="${mediaSource}" class="thumbnail-card__lightbox-link">
                ${mediaOuterHTML}
            </a>

            <div class="thumbnail-card-details">
                <p class="thumbnail-card-details__title">
                    ${media.title}
                </p>

                <div class="thumbnail-card-details-likes-infos">
                    <p class="thumbnail-card-details-likes-infos__number-of-likes">
                        ${media.likes}
                    </p>

                    <button class="likes-button">
                        <span class="fas fa-heart"></span>
                    </button>
                </div>
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

    getFooterInfosDOM() {

        var totalOfLikes = this.calculateTotalOfLikes();

        const footerInfos = `
        <p>
            ${totalOfLikes} <span class="fas fa-heart"></span>
        </p>

        <p>
            ${this.price}€ / jour
        </p>`;

        return footerInfos;
    }
}