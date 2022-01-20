class Media {
    id = 0;
    photographerId = 0; 
    title = "title";
    file = "image.jpg";
    likes = 0;
    date = 0000-00-00; 
    price = 0;

    constructor(id, photographerId, title, file, likes, date, price) {
        this.id = id;
        this.photographerId = photographerId;
        this.title = title;
        this.file = file;
        this.likes = likes;
        this.date = date;
        this.price = price;
    }
}

class Photographer {
    name = "name";
    id = 0;
    location = "country, city";
    tagline = "tagline";
    price = 0;
    portrait = "portrait.jpg";

    media = [new Media(0, 0, "title", "file_name.jpg", 0, 0000-00-00, 0)];

    constructor(name, id, city, country, tagline, price, portrait, media) {
        this.name = name;
        this.id = id;
        this.location = `${city}, ${country}`;
        this.tagline = tagline;
        this.price = price;
        this.portrait = portrait;
        this.media = [media];
    }
}

function photographerFactory(data) {
    const photographer = new Photographer(data.name, data.id, data.city, data.country, data.tagline, data.price, data.portrait, data.media);

    const picture = `assets/photographers/photographers-id-photos/${photographer.portrait}`;

    function getUserCardDOM() {
        const userCard = document.createElement( 'article' );
        const userCardPageLink = document.createElement("a");
        const userCardPicture = document.createElement( 'img' );
        const userCardHeading = document.createElement("h2");
        const userCardDetailsContainer = document.createElement("div");
        const locationParagraph = document.createElement("p");
        const taglineParagraph = document.createElement("p");
        const priceParagraph = document.createElement("p");

        userCard.classList.add("thumb-photographer");

        userCardPageLink.setAttribute("href", "./pages/photographer.html");
        userCardPageLink.setAttribute("id", photographer.id);

        userCardPicture.classList.add("user");
        userCardPicture.setAttribute("src", picture);

        userCardHeading.classList.add("thumb-photographer__heading");
        userCardHeading.textContent = photographer.name;

        userCardDetailsContainer.classList.add("thumb-photographer-datas");

        locationParagraph.classList.add("thumb-photographer-datas__location");
        locationParagraph.textContent = photographer.location;

        taglineParagraph.classList.add("thumb-photographer-datas__tagline");
        taglineParagraph.textContent = photographer.tagline;

        priceParagraph.textContent = `${photographer.price}€ / day`;
        priceParagraph.classList.add("thumb-photographer-datas__price-per-day");

        userCardPageLink.appendChild(userCardPicture);
        userCardPageLink.appendChild(userCardHeading);

        userCardDetailsContainer.appendChild(locationParagraph);
        userCardDetailsContainer.appendChild(taglineParagraph);
        userCardDetailsContainer.appendChild(priceParagraph);

        userCard.appendChild(userCardPageLink);
        userCard.appendChild(userCardDetailsContainer);

        return (userCard);
    }

    photographer["getUserCardDOM"] = getUserCardDOM;

    return photographer;
}