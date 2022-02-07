class SelectMenu {

    static init(currentPhotographer) {

        new SelectMenu(currentPhotographer);

    }

    constructor(currentPhotographer) {
        
        this.isAlreadyInstantiate = true;

        this.currentPhotographer = currentPhotographer;

        this.container = document.querySelector(".select-menu");

        this.optionsContainer = this.getOptionsContainer();

        this.button = this.container.querySelector(".select-menu__selected-item");
        
        this.button.setAttribute("aria-expanded", "true");
       
        this.options = this.optionsContainer.querySelectorAll("li");
        
        this.closeCallbackCallCount = 0;

        this.activeDescendant = 0;

        this.registerEventListener();

    }

    registerEventListener() {

        this.container.addEventListener("click",  function(clickEvent) {

            clickEvent.stopPropagation();

        })

        this.button.addEventListener("click", this.open.bind(this));

        this.options.forEach( (option) => {
        
            option.addEventListener("click", this.selectOption.bind(this));
    
        });

        document.addEventListener("keyup", this.onKeyup.bind(this));
            
        document.addEventListener("click", this.close.bind(this));

    }

    unregisteredEvent() {

        this.options.forEach( (option) => {
        
            option.removeEventListener("click", this.selectOption.bind(this));
    
        });

    }
    
    getOptionsContainer() {

        const optionsContainerDOM = `
        <ul class="select-items select-hide" 
            role="listbox"
            tabindex="0" 
            aria-labelledby="select-menu-label" 
            aria-activedescendant="popularité">
            <li id="popularité" role="option" aria-selected="true">
                Popularité
                <span class="fas fa-chevron-up select-menu__arrow"></span>
            </li>
            <li id="date" role="option" aria-selected="false">Date</li>
            <li id="titre" role="option" aria-selected="false">Titre</li>
        </ul>`;

        this.container.innerHTML += optionsContainerDOM;

        const optionsContainer = this.container.querySelector(".select-items");

        return optionsContainer;

    }

    onKeyup(event) {
        
        event.preventDefault();

        event.stopPropagation();

        if (event.key === "Enter" && event.currentTarget.nodeName === this.button.nodeName) {

            if (!this.isAlreadyInstantiate) {

                new SelectMenu(this.currentPhotographer);

            }

        } else if (event.key === "Enter" && event.currentTarget.nodeName === this.options.nodeName) {

            this.selectOption(event, this.currentPhotographer);

        } else if (event.key === "Escape") {

            this.close(event);
        
        } else if (event.key === "ArrowUp" && document.activeElement === this.optionsContainer) {

            this.removeFocusIndicatorOfOption();

            this.optionsContainer.setAttribute("aria-activedescendant", `${this.options[this.activeDescendant].id}`);

            this.options[this.activeDescendant].classList.add("active-option");

            if (this.activeDescendant === 0) {

                this.activeDescendant = 2;

            } else {

                this.activeDescendant--;

            }
                
        } else if (event.key === "ArrowDown" && document.activeElement === this.optionsContainer) {

            this.removeFocusIndicatorOfOption();

            this.optionsContainer.setAttribute("aria-activedescendant", `${this.options[this.activeDescendant].id}`);

            this.options[this.activeDescendant].classList.add("active-option");

            if (this.activeDescendant === 3) {

                this.activeDescendant = 0;

            } else {

                this.activeDescendant++;

            }
        }
    }

    open(event) {

        event.preventDefault();

        event.stopPropagation();

        if (this.optionsContainer.classList.contains("select-hide")) {

            this.optionsContainer.classList.remove("select-hide");

            this.optionsContainer.focus();

            this.options[this.activeDescendant].classList.add("active-option");

        }

    }

    close(event) {

        event.preventDefault();

        event.stopPropagation();

        if (!this.optionsContainer.classList.contains("select-hide")) {

            this.optionsContainer.classList.add("select-hide");

            this.button.setAttribute("aria-expanded", "false");

            this.unregisteredEvent();

            /* document.removeEventListener("keydown", this.close); */
        
        }

    }

    removeFocusIndicatorOfOption() {

        this.options.forEach( (option) => {

            if (option.classList.contains("active-option")) {
                
                option.classList.remove("active-option");

            }

        });


    }

    sortMediaCards(currentPhotographer, media, sortBy) {

        if(sortBy !== undefined) {

            this.currentFilter = sortBy;

        }

        switch (sortBy) {

            case "Popularité":
                
                SelectMenu.sortByPopularity(media);
                
                this.updatePhotographerGallery(currentPhotographer);

                break;

            case "Titre":
                            
                SelectMenu.sortByTitle(media);
                
                this.updatePhotographerGallery(currentPhotographer);

                break;
            
            case "Date":
                
                SelectMenu.sortByDate(media);
                
                this.updatePhotographerGallery(currentPhotographer);

                break;
        
            default:
                
                break;
                
        }

    }

    static ascendingSort(a, b) {

        if (a > b) {

            return 1;

        }
        
        if (a < b) {

            return -1;

        }

        return 0;

    }

    static descendingSort(a, b) {

        if (a > b) {

            return -1;

        }
        
        if (a < b) {

            return 1;

        }

        return 0;

    }

    static sortByPopularity(media) {

       media.sort( (previousMedia, nextMedia) => {

            return SelectMenu.descendingSort(previousMedia.likes, nextMedia.likes);

       });

    }

    static sortByDate(media) {

       media.sort( (previousMedia, nextMedia) => {

            return SelectMenu.descendingSort(previousMedia.date, nextMedia.date);

       });

    }

    static sortByTitle(media) {
        
        media.sort( (previousMedia, nextMedia) => {

            return SelectMenu.ascendingSort(previousMedia.title, nextMedia.title);

       });

    }

    updatePhotographerGallery(currentPhotographer) {

        const photographerGallery = document.querySelector(".photographer-gallery");

        photographerGallery.innerHTML = "";

        currentPhotographer.media.forEach( (media) => {
    
            const mediaCardDOM = currentPhotographer.getMediaCardDOM(media);
    
            photographerGallery.innerHTML += mediaCardDOM;
    
        });

        Lightbox.init();

        LikeButton.init(currentPhotographer);
    }

    selectOption(event) {

        event.preventDefault();

        event.stopPropagation();

        this.sortMediaCards(this.currentPhotographer, this.currentPhotographer.media, event.currentTarget.innerText);

        this.options.forEach( (option) => {

            option.setAttribute("aria-selected", "false");

        })

        document.getElementById(`${this.currentFilter.toLowerCase()}`).setAttribute("aria-selected", `true`);

        this.button.innerHTML = `${this.currentFilter} <span class="fas fa-chevron-down select-menu__arrow"></span>`;

        this.close(event);

    }

}