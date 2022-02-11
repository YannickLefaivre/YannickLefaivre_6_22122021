export default class ATVisibility {

    static toggleWebsiteHeaderATVisibility() {

        const websiteHeader = document.querySelector(".website-header");

        this.toggleATVisibilityFor(websiteHeader);

    }


    static toggleMainContentATVisibility() {

        const mainContent = document.querySelector("main");

        this.toggleATVisibilityFor(mainContent);

    }

    /**
     * Show or hide an element to assistive technologies, especially screen readers.
     * 
     * @param {HTMLElement} element
     */
    static toggleATVisibilityFor(element) {

        if (element.getAttribute("aria-hidden") === "false" && element.getAttribute("aria-hidden") === "false") {

            element.setAttribute("aria-hidden", "true");

            element.setAttribute("aria-hidden", "true");

        } else {

            element.setAttribute("aria-hidden", "false");

            element.setAttribute("aria-hidden", "false");

        }
        
    }

}