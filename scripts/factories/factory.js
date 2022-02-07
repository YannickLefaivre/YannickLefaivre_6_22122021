class Factory {

    static createMedia(media, file) {
        if (media.hasOwnProperty("video")) {

            return new Video(media.id, media.photographerId, media.title, media.video, media.likes, media.date, media.price, media.description);

        } else {

            return new Photo(media.id, media.photographerId, media.title, media.image, media.likes, media.date, media.price, media.description);

        }
    }

}