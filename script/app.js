let active = document.querySelector('.active');
let nextBtn = document.querySelector('.next');
let prevBtn = document.querySelector('.prev');
let imgs = document.querySelectorAll('.imgs img');
let imgTitle = document.querySelector('.img-title');
let images;
let currentSlide = 0;
let intervalId = 0;
let playBtn = document.querySelector(".play-btn");
let playIcon = document.querySelector(".play-btn i");

async function getImages() {
    let response = await fetch('content.json');
    let data = await response.json();   
    return data;
}

document.addEventListener('DOMContentLoaded', async () => {
     images = await getImages();
     console.log(images);
    if (images.length > 0 && images[0].img) { 
        let title = images[0].title;
        active.src = "imgs/" + images[0].img;
        active.alt = title;
        imgTitle.textContent = title;
    } else {
        console.error("No images found in content.json");
    }
    const imgsContainer = document.querySelector('.imgs');

    for (let i = 0; i < images.length; i++) {
        let img = document.createElement('img');
        img.src = "imgs/" + images[i].img;
        img.alt = images[i].title;
        img.className = "tumbnail w-1/8 cursor-pointer hover:opacity-100 opacity-70 ease-in transition-all duration-250";
        imgsContainer.appendChild(img);
        img.addEventListener('click', () => setActiveImage(i));
        
    }
    autoPlay();
});

function setActiveImage(index) {
    let imgs = document.querySelectorAll('.imgs img');
    currentSlide = index;
    active.src = "imgs/" + images[currentSlide].img;
    imgTitle.textContent = images[currentSlide].title;
    console.log(index);
    imgs.forEach(img => {
        img.classList.remove('opacity-100'); // Remove active class
        img.classList.add('opacity-70'); // Set opacity to 70 for all
    });
    if(imgs[index]){
        
        imgs[index].classList.add('opacity-100');
        console.log('Images:', imgs); // Check all the images
        console.log('Active image at index:', index);
    }
    
}

// Function to go to the next slide
function goToNextSlide() {
    currentSlide = (currentSlide + 1) % images.length; // Loop back to the first image
    setActiveImage(currentSlide);
}

// Function to go to the previous slide
function goToPrevSlide() {
    currentSlide = (currentSlide - 1 + images.length) % images.length; // Loop back to the last image
    setActiveImage(currentSlide);
}

// Event listeners for the next and previous buttons
nextBtn.addEventListener('click', goToNextSlide);
prevBtn.addEventListener('click', goToPrevSlide);

function autoPlay(){
    intervalId = setInterval(goToNextSlide,3000);
}

function pauseAutoPlay() {
    // Stop the interval to pause the slideshow
    clearInterval(intervalId);
}

playBtn.addEventListener('click', () => {
    playIcon.classList.toggle('fa-circle-play');
    playIcon.classList.toggle('fa-circle-pause');
    if(playIcon.classList.contains('fa-circle-pause')){
        console.log("autoplay");
        autoPlay();
    }else{
        console.log("pause");
        pauseAutoPlay();

    }
});