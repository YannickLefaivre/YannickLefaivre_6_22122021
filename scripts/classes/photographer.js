class Photographer {
    /* 
        Wanted properties:
        
            totalOfLikes = 0;

            userProfilPicturePath = ./assets/photographers/photographers-id-photos/file_name.jpg;
        
        Wanted methods for photographer class:


            function getUserCardDOM(...children: HTMLElement[]) {
                return new Card(children);
            }

            function getMediaCardDOM(...children: HTMLElement[]) {
                return new Card(children);
            }
    */

    /* 
        Wanted version of media property:

        media = [pictures: new Picture(), videos: new Video()];
    */

    constructor(name, id, city, country, tagline, price, portrait, media) {
        this.name = name;
        this.id = id;
        this.location = `${city}, ${country}`;
        this.tagline = tagline;
        this.price = price;
        this.picture = `./assets/photographers/photographers-id-photos/${portrait}`;
        this.media = [media];
    }
    
    getCardDOM() {
        const userCard = 
        `<article class="thumb-photographer">
            <a href="./pages/photographer.html" id="${this.id}">
                <img class="user" src="${this.picture}" alt="">

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

        return (userCard);
    }

    getTotalOfLikes(media) {
        
        var totalOfLikes = 0;
        var numberOfLikesOfAllMedia = [];

        const reducer = (previousValue, currentValue) => previousValue + currentValue;

        media.forEach( (media) => {

            numberOfLikesOfAllMedia.push(media.likes);

        });
        
        totalOfLikes = numberOfLikesOfAllMedia.reduce(reducer);

        return totalOfLikes;

    }
}