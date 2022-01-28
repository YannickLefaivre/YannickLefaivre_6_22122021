class ContactForm {

    static init() {
        
        const contactButton = document.getElementById("contact-button");
        
        contactButton.addEventListener("click", event => { 
            
            event.preventDefault();

            new ContactForm();
        
        });

    }

    constructor() {

        this.element = this.buildDOM();
        
        document.body.appendChild(this.element);

        this.storeFormElements();

        this.element.querySelector(".close-button").addEventListener("click", this.close.bind(this));

        this.form.addEventListener("submit", this.onSubmit.bind(this));

    }

    buildDOM() {

        const dom = document.createElement("aside");

        this.currentPhotographerName = document.querySelector(".photograph-profil__name").innerText;

        dom.classList.add("modal", "contact-modal");

        dom.innerHTML = `
        <div class="contact-modal-content">
            <header class="contact-modal-header">
                <h2 class="contact-modal-header__heading">
                    Contactez-moi
                    <br />
                    ${this.currentPhotographerName}
                </h2>

                <button class="close-button close-button--contact-modal">
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
            </header>

            <form id="modal-form" name="reserve" action="index.html" method="post">
                <div id="data-form-first-name" class="form-data">
                    <label for="first-name">Prénom</label>
                    <input 
                        class="text-control"
                        type="text"
                        id="first-name"
                        name="first-name"
                        required
                    />

                    <p class="form-data__error-message hidden-content">  </p>
                </div>

                <div id="data-form-last-name" class="form-data">
                    <label for="last-name">Nom</label>
                    <input
                        class="text-control"
                        type="text"
                        id="last-name"
                        name="last-name"
                        required
                    />

                    <p class="form-data__error-message hidden-content">  </p>
                </div>

                <div id="data-form-email" class="form-data form-data--email">
                    <label for="email">E-mail</label>
                    <input 
                        class="text-control" 
                        type="email" 
                        id="email" 
                        name="email" 
                        required
                    />

                    <p class="form-data__error-message hidden-content"></p>
                </div>

                <div id="data-form-message" class="form-data form-data--message">
                    <label for="message">Votre message</label>
                    <textarea 
                        class="text-control 
                        textarea" 
                        id="message"
                        name="message"
                        required 
                        cols="30" 
                        rows="10" 
                    >
                    </textarea>

                    <p class="form-data__error-message hidden-content"></p>
                </div>

                <button type="submit" class="button submit-button" value="Submit" formnovalidate>Envoyer</button>
            </form>
        </div>`;

        document.body.classList.toggle("main-wrapper--modal-open");

        return dom;

    }

    storeFormElements() {

        this.firstNameField = document.getElementById("data-form-first-name");
        this.lastNameField = document.getElementById("data-form-last-name");
        this.emailField = document.getElementById("data-form-email");
        this.messageField = document.getElementById("data-form-message");

        this.form = document.getElementById("modal-form");
        
    }

    close(event) {

        event.preventDefault();

        this.element.classList.toggle("modal--close");

        document.body.classList.toggle("main-wrapper--modal-open");

        window.setTimeout(() => {

            this.element.parentElement.removeChild(this.element);

        }, 500);

    }
    
    getInputValue(inputFromToGetTheValue) {

        var inputValue = document.getElementById(inputFromToGetTheValue).value;
      
        return inputValue;
      
    }
    
    displayErrorMessage(concernedField, errorMessageToDisplay) {

        const errorMessageParagraph = concernedField.querySelector(".form-data__error-message");

        if(errorMessageParagraph.classList.contains("hidden-content")) {

            const contentContainer = this.element.querySelector(".contact-modal-content");

            errorMessageParagraph.classList.toggle("hidden-content");
            
            errorMessageParagraph.textContent = errorMessageToDisplay;
    
            contentContainer.classList.add("contact-modal-content--error-message-visible");

        }
      
    }

    /** 
     * Redonne à la propriété height de la *div.contact-modal-content* une valeur fixe. 
     * Sinon height est défini sur *auto* quand le message d'erreur est visible.
     */
    resetContentContainerHeight() {

        const contentContainer = this.element.querySelector(".contact-modal-content");

        contentContainer.classList.remove("contact-modal-content--error-message-visible");

    }
      
    deleteErrorMessage(concernedField) {
        
        const errorMessageParagraph = concernedField.querySelector(".form-data__error-message");
        const allErrorMessageParagraphs = document.querySelectorAll(".form-data__error-message");

        var canResetContentContainerHeight = false;

        if (!errorMessageParagraph.classList.contains("hidden-content")) {

            concernedField.querySelector(".form-data__error-message").classList.toggle("hidden-content");

            const contentContainer = this.element.querySelector(".contact-modal-content");

        }

        for (let i = 0; i < allErrorMessageParagraphs.length - 1; i++) {

            if (!errorMessageParagraph.classList.contains("hidden-content")) {

                canResetContentContainerHeight = true;

            } else {

                canResetContentContainerHeight = false;
                break;

            }

        }

        if(canResetContentContainerHeight) {

            this.resetContentContainerHeight();
            
        }

    }

    validateNameField(nameInput, nameField) {

        // First and last name pattern to check the validity of the associated field
        var namePattern = /^[a-zA-Z]{2,}$/g;

        var fieldName = "";

        if(nameInput === "first-name") {

            fieldName = "Prénom";

        } else {

            fieldName = "Nom";

        }

        var errorMessage = `Veuillez entrer au minimum 2 lettres ou plus dans le champ ${fieldName}.`;
        
      
        if(!namePattern.test(this.getInputValue(nameInput)) || this.getInputValue(nameInput) === 0) {
      
          this.displayErrorMessage(nameField, errorMessage);
      
          return false;

        } else {

          this.deleteErrorMessage(nameField);
      
        }
      
        return true;

    }

    validateEmailField() {

        var emailInputValue = this.getInputValue("email");
      
        /* 
          Email address validation regex found on the input element page, in the email type section, 
          of the standard HTML Living specification than I modified for not allow email adress with dotless domain name.
        */
        var emailPattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z](?:[a-zA-Z]{0,61}[a-zA-Z])?)$/;
      
       
        if(!emailPattern.test(emailInputValue) || emailInputValue.length === 0) {
      
          this.displayErrorMessage(this.emailField, "Veuillez saisir une adresse électronique valide.");
      
          return false;
      
        } else {
      
            this.deleteErrorMessage(this.emailField);
      
        }
      
        return true;

    }

    validateMessageField() {

        if(this.getInputValue("message") === 0) {

            this.displayErrorMessage(this.messageField, "Vous devez laisser un message.");

        } else {

            this.deleteErrorMessage(this.messageField);

        }

    }

    onSubmit(event) {

        event.preventDefault();

        let dataIsSubmittable = "";

        if (!this.validateNameField(
            "first-name",
            this.firstNameField)) {

            dataIsSubmittable = "No";

        }

        if (!this.validateNameField(
            "last-name",
            this.lastNameField)) {

            dataIsSubmittable = "No";

        }

        if (!this.validateEmailField()) {
            
            dataIsSubmittable = "No";

        }

        if (!this.validateMessageField()) {
            
            dataIsSubmittable = "No";

        }

        if (dataIsSubmittable === "No") {
            
            return false;

        } else {

            this.submitForm();

            return false;
            
        }

    }

    submitForm() {

        this.visitorFirstName = this.getInputValue("first-name");
        this.visitorLastName = this.getInputValue("last-name");
        this.visitorEmail = this.getInputValue("email");
        this.visitorMessage = this.getInputValue("message");

        console.log(`${this.visitorFirstName} ${this.visitorLastName} <${this.visitorEmail}>
        For: ${this.currentPhotographerName}
        Object: ...
        Message:
        
            ${this.visitorMessage}`
        );

    }

}
