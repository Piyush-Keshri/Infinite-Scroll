const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'z6URTlck_kPyHtBvaPzBoIE5EUG4_uOo4Z6JkjN2SiA';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images wre loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
   
}

//Helper Function to set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    //run function For each object in photosArray
    photosArray.forEach((photo) => {
        //Creating <a> to link to unsplash
        const item = document.createElement('a');
        // item.setAttribute('href',photo.links.html);
        // item.setAttribute('target','_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        //Create image per photo
        const img = document.createElement('img');
        // img.setAttribute('src',photo.urls.regular);
        // img.setAttribute('alt',photo.description);
        // img.setAttribute('title',photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.description,
        });

        // Event Listener,check when each is finished loading.
        img.addEventListener('load', imageLoaded);

        // Put image inside anchor element and then put both inside imageContainerElement
        item.appendChild(img);
        imageContainer.appendChild(item);
    });

}

// Get Photos from Unsplash API
async function getPhotos() {

    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }

    catch (error) {
        // Catch error
    }
}

// Check to see if scrolling near bottom of the page, Load More Photos
window.addEventListener('scroll', () => {

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

//On Load
getPhotos();
