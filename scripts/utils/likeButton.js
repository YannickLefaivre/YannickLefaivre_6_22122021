class LikeButton {

    static init(currentPhotographer) {

        const likeButtons = document.querySelectorAll(".like-button");

        likeButtons.forEach( (likeButton) => {

            likeButton.addEventListener("click", (event) => {

                event.preventDefault();

                LikeButton.addLikes(event);

                LikeButton.updateNumberOfLikesOfMediaInTheDataBase(event, currentPhotographer);

                LikeButton.updatePhotographerTotalOflikes(currentPhotographer);

            });

        });

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