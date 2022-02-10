/**
 * 
 * @property {HTMLButtonELement} button
 */
export default class SelectMenu {

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

        this.activeDescendant = 0;

        this.stringFromKeysInput = "";

        this.clearStringFromKeysInput = null;
        
        this.registerEventListener();

    }

    registerEventListener() {

        this.container.addEventListener("click",  function(clickEvent) {

            clickEvent.stopPropagation();

        });

        this.button.addEventListener("click", this.open.bind(this));

        this.button.addEventListener("keydown", this.onKeydown.bind(this));
        
        this.optionsContainer.addEventListener("keydown", this.onKeydown.bind(this));

        this.options.forEach( (option) => {
        
            option.addEventListener("click", this.selectOption.bind(this));
    
        });
        
        document.addEventListener("keydown", this.preventWindowScroll.bind(this));

        document.addEventListener("click", this.close.bind(this));

    }

    unregisteredEvent() {

        this.optionsContainer.removeEventListener("keydown", this.onKeydown.bind(this));

        document.removeEventListener("keydown", this.preventWindowScroll);

    }
    
    getOptionsContainer() {

        const optionsContainerDOM = `
        <ul class="select-items select-hide" 
            role="listbox"
            tabindex="-1" 
            aria-labelledby="select-menu-label" 
            aria-activedescendant="popularity">
            <li id="popularity" role="option" aria-selected="true">
                Popularité
                <span class="fas fa-chevron-up select-menu__arrow"></span>
            </li>
            <li id="date" role="option" aria-selected="false">Date</li>
            <li id="title" role="option" aria-selected="false">Titre</li>
        </ul>`;

        this.container.innerHTML += optionsContainerDOM;

        const optionsContainer = this.container.querySelector(".select-items");

        return optionsContainer;

    }

    /**
     * 
     * @param {KeyboardEvent} keyboardEvent
     */
    onKeydown(keyboardEvent) {

        if (keyboardEvent.defaultPrevented) {

            return;

        }

        switch (keyboardEvent.key) {
        
            case "Enter":
                
                if (keyboardEvent.currentTarget === this.button) {

                    if (!this.isAlreadyInstantiate) {

                        new SelectMenu(this.currentPhotographer);

                    } else {

                        this.open(keyboardEvent);

                    }
                }
                
                if (keyboardEvent.currentTarget === this.optionsContainer) {

                    this.selectOption(keyboardEvent, this.currentPhotographer);

                    this.button.focus();
                }

                break;

            case "Escape":

                this.close(keyboardEvent);

                this.button.focus();

                break;
            
            case "ArrowUp": 
            
                this.moveFocusTo("previous");

                break;

            case "ArrowDown":
                
                this.moveFocusTo("next");

                break;

            case "Tab":
                
                this.close(keyboardEvent);

                this.button.focus();

                return;

            case "CapsLock":

                this.typeAhead(keyboardEvent.key)

                break;
                
            default:

                break;

        }

        /*  
            After the SHIFT key was pressed search if a printable character was pressed
            in combination with it and compare the first letter of the option label 
            with this printable character. If it match give the corresponding option 
            the focus.
        */
        if (keyboardEvent.shiftKey) {

            this.typeAhead(keyboardEvent.key);

        } else {

            /* 
                Same here but in the case when the SHIFT key wasn't pressed and only 
                the printable character was pressed.
            */
           this.typeAhead(keyboardEvent.key);

        }

        if (keyboardEvent.currentTarget !== this.button) {

            keyboardEvent.preventDefault();

        }

    }

    /**
     * @param {PointerEvent | KeyboardEvent} event
     */
    open(event) {
        
        if(!event.defaultPrevented) {

            event.preventDefault();

        }

        event.stopPropagation();

        if (this.optionsContainer.classList.contains("select-hide")) {

            this.optionsContainer.classList.remove("select-hide");

            this.optionsContainer.focus();

            this.options[this.activeDescendant].classList.add("active-option");

        }

    }

    close(event) {

        if ([this.optionsContainer, this.options, this.button, this.container].includes(event.target)) {

            /* event.preventDefault(); */

            event.stopPropagation();

        }

        if (!this.optionsContainer.classList.contains("select-hide")) {

            this.optionsContainer.classList.add("select-hide");

            this.button.setAttribute("aria-expanded", "false");

            this.unregisteredEvent();
        
        }

    }

    preventWindowScroll(event) {

        if (document.activeElement === this.optionsContainer) {

            if(event.key === "ArrowUp" || event.key === "ArrowDown") {

                event.preventDefault();

            }

        }

    }

    removeFocusIndicatorOfOption() {

        this.options.forEach( (option) => {

            if (option.classList.contains("active-option")) {
                
                option.removeAttribute("class");

            }

        });


    }

    sortMediaCards(currentPhotographer, media, sortBy) {

        switch (sortBy) {

            case "popularity":
                
                SelectMenu.sortByPopularity(media);
                
                this.updatePhotographerGallery(currentPhotographer);

                break;

            case "title":
                            
                SelectMenu.sortByTitle(media);
                
                this.updatePhotographerGallery(currentPhotographer);

                break;
            
            case "date":
                
                SelectMenu.sortByDate(media);
                
                this.updatePhotographerGallery(currentPhotographer);

                break;
        
            default:
                
                return;
                
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

    /**
     * Move the visible focus in the direction of the next or previous option.
     * 
     * @param {String} elementDirection can be set to "next" or "previous"
     */
    moveFocusTo(elementDirection) {

        if(document.activeElement === this.optionsContainer) {

            this.removeFocusIndicatorOfOption();

            if (elementDirection === "next") {

                if (this.activeDescendant < 2) {

                    this.activeDescendant++;

                }

            } else if (elementDirection === "previous") {

                if (this.activeDescendant > 0) {

                    this.activeDescendant--;

                }

            }

            this.optionsContainer.setAttribute("aria-activedescendant", `${this.options[this.activeDescendant].id}`);

            this.options[this.activeDescendant].classList.add("active-option");
        }

    }

    /**
     * @license W3C-Software-License (Possibility to type multiple characters in rapid succession for select an option was made with the clearTimeout portion of the findItemToFocus() method of this document : https://www.w3.org/TR/wai-aria-practices-1.1/examples/listbox/js/listbox.js)
     * 
     * @param {KeyboardEvent.key} key
     */
    typeAhead(key) {

        /*  */
        const printableCharacters = ["a", "b", "c", "d", "f", "g",
        "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", 
        "t", "u", "v", "w", "x", "y", "z", "<", ">", "à", "â", "é", 
        "ê", "è", "ç", "î", "ô", "ù", "û"];

        let character = key.toLowerCase();

        if (printableCharacters.includes(character)) {

            this.stringFromKeysInput += character;

            if(this.clearStringFromKeysInput) {

                clearInterval(this.clearStringFromKeysInput);
                this.clearStringFromKeysInput = null;

            }

            this.clearStringFromKeysInput = setTimeout(() => {

                this.stringFromKeysInput = "";
                this.clearStringFromKeysInput = null;

            }, 500);
            
            for (let index = 0; index < this.options.length; index++) {

                let optionText = this.options[index].innerText;

                const optionTextCaseInsensitive = optionText.toLowerCase();
            
                if (optionTextCaseInsensitive.startsWith(this.stringFromKeysInput)) {

                    this.removeFocusIndicatorOfOption();

                    this.activeDescendant = index;

                    this.optionsContainer.setAttribute("aria-activedescendant", `${this.options[this.activeDescendant].id}`);

                    this.options[this.activeDescendant].classList.add("active-option");

                    break;

                }

            }

        }

    }

    selectOption(event) {

        /* event.preventDefault(); */

        event.stopPropagation();
        
        var selectedOption = HTMLLIElement;

        var optionsList = Array.prototype.slice.call(this.options);

        if (event.currentTarget === this.optionsContainer) {

            selectedOption = event.currentTarget.querySelector(".active-option");

        } else {

            selectedOption = event.currentTarget;

        }

        optionsList.forEach( (option) => {

            option.setAttribute("aria-selected", "false");

            option.classList.remove("active-option");

        });

        this.activeDescendant = optionsList.indexOf(selectedOption);

        this.optionsContainer.setAttribute("aria-activedescendant", selectedOption.id);

        selectedOption.setAttribute("aria-selected", `true`);

        selectedOption.classList.add("active-option");

        this.sortMediaCards(this.currentPhotographer, this.currentPhotographer.media, selectedOption.id);

        this.button.innerHTML = `${selectedOption.innerText} <span class="fas fa-chevron-down select-menu__arrow"></span>`;

        this.close(event);

    }

}