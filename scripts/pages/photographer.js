async function getPhotographersDatas() {
    const photographersDatas = fetch("../data/photographers.json")
                    .then(function(result) {
                        if(result.ok) {
                            return result.json();
                        }
                    })
                    .then(function(photographersDatas) {
                        return photographersDatas;
                    })
                    .catch(function(error) {
                        console.log(`Fetch haven't succeed to retrieve the photographers datas. ${error}.`)
                    });

    return photographersDatas;
}

async function displayData(photographersDatas) {
    const mediaThumbnails = document.querySelectorAll(".thumbnails-card");

    if(photographerID != null || photographerID != undefined) {
        console.log("The variable photographerID was successly shared.");
    } else {
        console.log("The variable photographerID wasn't shared.")
    }

    photographersDatas.photographers.forEach((photographer) => {
        if(photographer.id == photographerID) {
            currentPhotographer = photographer;
        }
    })

    photographersDatas.media.forEach((media) => {
        if(media.photographerID == photographerID) {
            currentPhotographerMedia += media;  
        }
    })

    /* 
        Parcours la liste de miniatures de média tout en ajoutant leur données 
        au emplacement prévu à cette effet dans le code HTML.
    */
    mediaThumbnails.forEach((mediaThumbnail) => {
        mediaThumbnail
            .querySelector("img")
            .setAttribute("src", `${currentPhotographerMedia.image}`
        );

        mediaThumbnail
            .querySelector("video")
            .setAttribute("src", `${currentPhotographerMedia.image}`
        );
    });
}

async function init() {
    const photographersDatas = await getPhotographersDatas();
    displayData(photographersDatas);
}

init();