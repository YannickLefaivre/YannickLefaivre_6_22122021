/**
    Code largely made using Grafikart's tutorial on creating Lightbox in JS Vanilla.
    The tutorial can be found here: https://grafikart.fr/tutoriels/lightbox-javascript-1224
*/
class Lightbox {

    static init() {

        const links = document.querySelectorAll(`a[href$=".jpg"], a[href$=".mp4"]`);

        links.forEach( (link) => {

            link.addEventListener("click", (event) => {

                event.preventDefault();
                
                const mediaLink = event.currentTarget;
                const mediaType = event.currentTarget.firstElementChild;
                const mediaTitle = event.currentTarget.parentElement.querySelector(".thumbnail-card-details__title").innerText;

                new Lightbox(mediaLink, links, mediaType, mediaTitle);
            });

        });
    }
    
    constructor(mediaLink, linksOfAllMedia, mediaType, mediaTitle) {
        
        this.element = this.buildDOM(mediaLink);
        this.loadMediaAndItTitle(mediaLink, mediaType, mediaTitle);
        this.linksOfAllMedia = linksOfAllMedia;
        
        document.body.classList.add("main-wrapper--modal-open");
        document.body.appendChild(this.element);
    }

    loadMediaAndItTitle(currentMediaLink, mediaType, mediaTitle) {

        this.currentMediaLink = null;

        const closeUpView = this.element.querySelector(".close-up-view");

        const currentMediaURL = currentMediaLink.getAttribute("href");

        let media = "";

        if (mediaType instanceof HTMLVideoElement) {

            media = `
            <video controls class="close-up-view__media" src="${currentMediaURL}"
        ></video>`

        } else {

            media = `
            <img
                class="close-up-view__media"
                src="${currentMediaURL}"
                alt=""
            />`;

        }

        const mediaAndTitle = `
        ${media}
        
        <p class="close-up-view__title">${mediaTitle}</p>`;

        this.currentMediaLink = currentMediaLink;

        closeUpView.innerHTML = mediaAndTitle;
    }

    close(event) {

        event.preventDefault();

        this.element.classList.add("modal--close");

        document.body.classList.remove("main-wrapper--modal-open");

        window.setTimeout(() => {

            this.element.parentElement.removeChild(this.element);

        }, 500);
    }
    
    next(event) {

        event.preventDefault();


        for (let i = 0; i < this.linksOfAllMedia.length - 1; i++) {

            if (this.linksOfAllMedia[i].getAttribute("href") === this.currentMediaLink.getAttribute("href")) {

                this.currentIndex = i;
                break;

            }

        }

        if (this.currentIndex === this.linksOfAllMedia.length - 1) {

            this.currentIndex = 0;

        } else {

            this.currentIndex++;

        }

        let mediaLink = this.linksOfAllMedia[this.currentIndex];
        let mediaType = this.linksOfAllMedia[this.currentIndex].firstElementChild;
        let mediaTitle = this.linksOfAllMedia[this.currentIndex].parentElement.querySelector(".thumbnail-card-details__title").innerText;

        this.element.querySelector(".next-button").setAttribute("href", `${mediaLink.getAttribute("href")}`);

        this.loadMediaAndItTitle(mediaLink, mediaType, mediaTitle);
    }

    previous(event) {

        event.preventDefault();

        for (let i = 0; i < this.linksOfAllMedia.length - 1; i++) {

            if (this.linksOfAllMedia[i].getAttribute("href") === this.currentMediaLink.getAttribute("href")) {

                this.currentIndex = i;
                break;

            }

        }

        if (this.currentIndex === 0) {

            this.currentIndex = this.linksOfAllMedia.length -1;

        } else {

            this.currentIndex--;

        }

        let mediaLink = this.linksOfAllMedia[this.currentIndex];
        let mediaType = this.linksOfAllMedia[this.currentIndex].firstElementChild;
        let mediaTitle = this.linksOfAllMedia[this.currentIndex].parentElement.querySelector(".thumbnail-card-details__title").innerText;

        this.element.querySelector(".previous-button").setAttribute("href", `${mediaLink.getAttribute("href")}`);

        this.loadMediaAndItTitle(mediaLink, mediaType, mediaTitle);

    }

    buildDOM() {

        const dom = document.createElement("aside");

        dom.classList.add("modal");

        dom.innerHTML = `
        <div class="lightbox-modal-content">
            <button class="close-button">
                <svg
                    class="close-button__icon"
                    width="42"
                    height="42"
                    viewBox="0 0 42 42"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z"
                        fill="currentColor"
                    />
                </svg>
            </button>

            <a href="#" class="lightbox-navigation-button previous-button">
                <span
                    class="lightbox-navigation-button__icon fas fa-chevron-left"
                ></span>
            </a>

            <div class="close-up-view">
            </div>

            <a href="#" class="lightbox-navigation-button next-button">
                <span
                    class="lightbox-navigation-button__icon fas fa-chevron-right"
                ></span>
            </a>
        </div>`;

        dom.querySelector(".close-button").addEventListener("click", this.close.bind(this));
        dom.querySelector(".next-button").addEventListener("click", this.next.bind(this));
        dom.querySelector(".previous-button").addEventListener("click", this.previous.bind(this));

        return dom;

    }
}