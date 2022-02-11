export default class LikeButton {

    static init(currentPhotographer) {

        const likeIcons = document.querySelectorAll(".like-button__icon");

        likeIcons.forEach( (likeIcon) => {

            likeIcon.addEventListener("click", (event) => {

                LikeButton.run(event, currentPhotographer);

            });

            likeIcon.addEventListener("keydown", (event) => {

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

    static addLikes(event) {

        const numberOflikes = event.currentTarget.previousElementSibling;
    
        var currentNumberOfLikes = parseInt(numberOflikes.innerText);
    
        currentNumberOfLikes++;
    
        numberOflikes.innerText = `${currentNumberOfLikes}`;
    
    }
    
    static updateNumberOfLikesOfMediaInTheDataBase(event, currentPhotographer) {
    
        currentPhotographer.media.forEach( (media) => {
    
            const mediaTitle = event.currentTarget.parentElement.previousElementSibling.innerText;
    
            const updatedNumberOfLikesString = event.currentTarget.previousElementSibling.innerText;
    
            const updatedNumberOfLikesInt = parseInt(updatedNumberOfLikesString);
    
            if (media.title === mediaTitle) {
    
                media.likes = updatedNumberOfLikesInt;
    
            }
    
        });
    
    }

    static updatePhotographerTotalOflikes(currentPhotographer) {

        const totalOfLikesParagraph = document.getElementById("total-of-likes");

        currentPhotographer.totalOfLikes = currentPhotographer.calculateTotalOfLikes();

        totalOfLikesParagraph.innerText = `${currentPhotographer.totalOfLikes}`;

    }

}