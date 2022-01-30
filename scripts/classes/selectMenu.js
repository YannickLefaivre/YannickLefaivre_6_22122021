class SelectMenu {

    static init(currentPhotographer) {

        const selectMenuContainer = document.querySelector(".select-menu");

        selectMenuContainer.addEventListener("click", function(event) {

            event.preventDefault();

            event.stopImmediatePropagation();

            new SelectMenu(currentPhotographer, selectMenuContainer);
            
        });

    }

    constructor(currentPhotographer, selectMenuContainer) {

        this.currentPhotographer = currentPhotographer;

        this.container = selectMenuContainer;

        this.open();

        this.button = this.container.querySelector(".select-menu__selected-item");

        this.options.forEach( (option) => {
            
            option.addEventListener("click", this.selectOption.bind(this));
    
        });
            
        document.addEventListener("click", this.close.bind(this));

    }

    open() {

        const optionsContainerDOM = `
        <ul class="select-items">
            <li>
                Popularité
                <span class="fas fa-chevron-up select-menu__arrow"></span>
            </li>
            <li>Date</li>
            <li>Titre</li>
        </ul>`;

        this.container.innerHTML += optionsContainerDOM;
        
        this.optionsContainer = this.container.querySelector(".select-items");

        this.options = this.optionsContainer.querySelectorAll("li");

    }

    close(event) {

        event.preventDefault();

        if (this.container.querySelector(this.optionsContainer.nodeName) !== null) {

            this.optionsContainer.classList.add("select-hide");

            document.removeEventListener("click", this.close.bind(this));

            window.setTimeout( () => {

                this.container.removeChild(this.optionsContainer);

            }, 500);

        }

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
    }

    selectOption(event) {

        event.preventDefault();

        event.stopImmediatePropagation();

        this.sortMediaCards(this.currentPhotographer, this.currentPhotographer.media, event.currentTarget.innerText);

        this.button.innerHTML = `${this.currentFilter} <span class="fas fa-chevron-down select-menu__arrow"></span>`;

        this.close(event);

    }

}