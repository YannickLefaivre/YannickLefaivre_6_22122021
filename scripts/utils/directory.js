export default class Directory {

    static getMediaDirectoryPath(currentPhotographer) {
        var firstName = currentPhotographer.name.match(/^\w+-?\w+(?!\w)/i);
        var mediaDirectoryName = firstName[0].toLowerCase();
    
        const mediaDirectoryPath = `../assets/photographers/${mediaDirectoryName}`;

        return mediaDirectoryPath;
    }

}