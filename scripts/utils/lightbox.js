import ATVisibility from "./atVisibility.js";
import TrapTabKey from "./trapTabKey.js"

/**
    Code made by follow Grafikart's tutorial on creating Lightbox in JS Vanilla.
    @tutorial The tutorial can be found here: https://grafikart.fr/tutoriels/lightbox-javascript-1224
*/
export default class Lightbox {

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
        
        this.modalOverlay = this.buildDOM(mediaLink);
        this.modalBody = this.modalOverlay.querySelector(".lightbox-modal-content");

        this.loadMediaAndItTitle(mediaLink, mediaType, mediaTitle);
        this.linksOfAllMedia = linksOfAllMedia;

        // Previously focused element before the modal was opened
        this.focusedElementBeforeModal = document.activeElement;

        this.button = this.modalOverlay.querySelector(".close-button");
        
        this.onKeyup = this.onKeyup.bind(this);

        document.body.classList.add("main-wrapper--modal-open");
        document.body.appendChild(this.modalOverlay);
        
        this.button.focus();

        document.addEventListener("keyup", this.onKeyup);
    }

    loadMediaAndItTitle(currentMediaLink, mediaType, mediaTitle) {

        this.currentMediaLink = null;

        const closeUpView = this.modalOverlay.querySelector(".close-up-view");

        const currentMediaURL = currentMediaLink.getAttribute("href");

        let media = "";

        if (mediaType instanceof HTMLVideoElement) {

            media = `
            <video tabindex="0" controls class="close-up-view__media" src="${currentMediaURL}" aria-labelledby="media-title"
        ></video>`

        } else {

            media = `
            <img
                tabindex="0"
                class="close-up-view__media"
                src="${currentMediaURL}"
                alt="${mediaTitle}"
            />`;

        }

        const mediaAndTitle = `
        ${media}
        
        <p id="media-title" class="close-up-view__title">${mediaTitle}</p>`;

        this.currentMediaLink = currentMediaLink;

        closeUpView.innerHTML = mediaAndTitle;
    }

    onKeyup(event) {

        if (event.key === "Escape") {

            this.close(event);

        } else if (event.key === "ArrowLeft") {

            this.previous(event);

        } else if (event.key === "ArrowRight") {

            this.next(event);

        }

    }

    previouslyFocusedElement() {

        this.focusedElementBeforeModal.focus();

    }


    close(event) {

        event.preventDefault();

        this.modalOverlay.classList.add("modal--close");

        ATVisibility.toggleATVisibilityFor(this.modalOverlay);

        ATVisibility.toggleMainContentATVisibility();

        ATVisibility.toggleWebsiteHeaderATVisibility();

        document.body.classList.remove("main-wrapper--modal-open");

        window.setTimeout(() => {

            this.modalOverlay.removeChild(this.modalBody);

        }, 500);

        document.removeEventListener("keyup", this.onKeyup);
        
        this.previouslyFocusedElement();
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

        this.modalOverlay.querySelector(".next-button").setAttribute("href", `${mediaLink.getAttribute("href")}`);

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

        this.modalOverlay.querySelector(".previous-button").setAttribute("href", `${mediaLink.getAttribute("href")}`);

        this.loadMediaAndItTitle(mediaLink, mediaType, mediaTitle);

    }

    buildDOM() {

        const modalOverlay = document.getElementById("lightbox");
        
        modalOverlay.classList.remove("modal--close");

        modalOverlay.innerHTML = `
        <div class="lightbox-modal-content" tabindex="0">
            <div class="close-up-view">
            </div>
            
            <a href="#" class="lightbox-navigation-button previous-button" aria-label="Previous-image">
                <span
                    class="lightbox-navigation-button__icon fas fa-chevron-left"
                ></span>
            </a>

            <a href="#" class="lightbox-navigation-button next-button" aria-label="Next-image">
                <span
                    class="lightbox-navigation-button__icon fas fa-chevron-right"
                ></span>
            </a>

            <button id="close-button" class="close-button" aria-label="Close dialog">
                <svg
                    aria-hidden="true"
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
        </div>`;

        const modalBody = document.querySelector(".lightbox-modal-content")

        ATVisibility.toggleATVisibilityFor(this.modalOverlay);

        ATVisibility.toggleWebsiteHeaderATVisibility();

        ATVisibility.toggleMainContentATVisibility();

        modalOverlay.querySelector(".close-button").addEventListener("click", this.close.bind(this));
        modalOverlay.querySelector(".next-button").addEventListener("click", this.next.bind(this));
        modalOverlay.querySelector(".previous-button").addEventListener("click", this.previous.bind(this));

        modalOverlay.addEventListener("keydown", (event) => {
            
            TrapTabKey.init(event, modalBody);
        
        });

        return modalOverlay;

    }
    
}