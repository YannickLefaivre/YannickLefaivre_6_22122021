export default class LikeButton {

    static init(currentPhotographer) {

        const likeButtons = document.querySelectorAll(".like-button");

        likeButtons.forEach( (likeButton) => {

            likeButton.addEventListener("click", (event) => {

                LikeButton.run(event, currentPhotographer);

            });

        });

    }

    /**
     * Enables all Like button functionality
     */
    static run(event, currentPhotographer) {

        event.preventDefault();

        LikeButton.addLikes(event);

        LikeButton.updateNumberOfLikesOfMediaInTheDataBase(event, currentPhotographer);
        
        LikeButton.updatePhotographerTotalOflikes(currentPhotographer);

    }

    /**
     * @param {MouseEvent | KeyboardEvent} event 
     */
    static addLikes(event) {

        const numberOflikes = event.currentTarget.firstElementChild;
        const likeButton = event.currentTarget;
    
        var currentNumberOfLikes = parseInt(numberOflikes.innerText);
    
        currentNumberOfLikes++;
    
        numberOflikes.innerText = `${currentNumberOfLikes}`;
        
        likeButton.setAttribute("aria-label", `${currentNumberOfLikes} likes`);
    
    }
    
    static updateNumberOfLikesOfMediaInTheDataBase(event, currentPhotographer) {
    
        currentPhotographer.media.forEach( (media) => {
    
            const mediaTitle = event.currentTarget.previousElementSibling.innerText;
    
            const updatedNumberOfLikesString = event.currentTarget.firstElementChild.innerText;
    
            const updatedNumberOfLikesInt = parseInt(updatedNumberOfLikesString);
    
            if (media.title === mediaTitle) {
    
                media.likes = updatedNumberOfLikesInt;
    
            }
    
        });
    
    }

    static updatePhotographerTotalOflikes(currentPhotographer) {

        const totalOfLikesParagraph = document.getElementById("total-of-likes");

        currentPhotographer.totalOfLikes = currentPhotographer.calculateTotalOfLikes();

        totalOfLikesParagraph.innerHTML = `${currentPhotographer.totalOfLikes} <span class="sr-only-container__elements">J'aime</span> <span class="fas fa-heart"></span>`;

    }

}