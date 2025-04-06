/* Horizontal Scrolling and Carousel JavaScript */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize horizontal scrolling for research interests
    initHorizontalScrolling('research-interests');
    
    // Initialize horizontal scrolling for projects
    initHorizontalScrolling('projects-grid');
    
    // Initialize publication carousel
    initPublicationCarousel();
});

// Initialize horizontal scrolling with controls
function initHorizontalScrolling(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Add horizontal scroll container class
    container.classList.add('horizontal-scroll-container');
    
    // Add scroll item class to children
    Array.from(container.children).forEach(child => {
        child.classList.add('scroll-item');
    });
    
    // Create scroll controls
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'scroll-controls';
    
    const leftButton = document.createElement('button');
    leftButton.className = 'scroll-button';
    leftButton.innerHTML = '&#10094;';
    leftButton.setAttribute('aria-label', 'Scroll left');
    
    const rightButton = document.createElement('button');
    rightButton.className = 'scroll-button';
    rightButton.innerHTML = '&#10095;';
    rightButton.setAttribute('aria-label', 'Scroll right');
    
    controlsDiv.appendChild(leftButton);
    controlsDiv.appendChild(rightButton);
    
    // Insert controls after the container
    container.parentNode.insertBefore(controlsDiv, container.nextSibling);
    
    // Add event listeners for scroll buttons
    leftButton.addEventListener('click', function() {
        container.scrollBy({
            left: -300,
            behavior: 'smooth'
        });
    });
    
    rightButton.addEventListener('click', function() {
        container.scrollBy({
            left: 300,
            behavior: 'smooth'
        });
    });
    
    // Add keyboard navigation
    container.tabIndex = 0;
    container.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            container.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
            e.preventDefault();
        } else if (e.key === 'ArrowRight') {
            container.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
            e.preventDefault();
        }
    });
}

// Initialize publication carousel
function initPublicationCarousel() {
    const publicationList = document.querySelector('.publication-list');
    if (!publicationList) return;
    
    // Create carousel container
    const carouselContainer = document.createElement('div');
    carouselContainer.className = 'publication-carousel';
    
    // Create carousel items from publication items
    const publicationItems = Array.from(publicationList.querySelectorAll('.publication-item'));
    
    // Create carousel inner container
    const carouselInner = document.createElement('div');
    carouselInner.className = 'carousel-container';
    
    // Add items to carousel
    publicationItems.forEach((item, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item';
        if (index === 0) carouselItem.classList.add('active');
        carouselItem.innerHTML = item.innerHTML;
        carouselInner.appendChild(carouselItem);
    });
    
    carouselContainer.appendChild(carouselInner);
    
    // Create carousel controls
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'carousel-controls';
    
    const prevButton = document.createElement('button');
    prevButton.className = 'carousel-button';
    prevButton.innerHTML = '&#10094;';
    prevButton.setAttribute('aria-label', 'Previous publication');
    
    const pauseButton = document.createElement('button');
    pauseButton.className = 'carousel-pause';
    pauseButton.innerHTML = '&#10074;&#10074;';
    pauseButton.setAttribute('aria-label', 'Pause carousel');
    
    const nextButton = document.createElement('button');
    nextButton.className = 'carousel-button';
    nextButton.innerHTML = '&#10095;';
    nextButton.setAttribute('aria-label', 'Next publication');
    
    controlsDiv.appendChild(prevButton);
    controlsDiv.appendChild(pauseButton);
    controlsDiv.appendChild(nextButton);
    
    carouselContainer.appendChild(controlsDiv);
    
    // Create carousel indicators
    const indicatorsDiv = document.createElement('div');
    indicatorsDiv.className = 'carousel-indicators';
    
    publicationItems.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'carousel-indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.setAttribute('data-index', index);
        indicatorsDiv.appendChild(indicator);
    });
    
    carouselContainer.appendChild(indicatorsDiv);
    
    // Replace publication list with carousel
    publicationList.parentNode.replaceChild(carouselContainer, publicationList);
    
    // Carousel functionality
    let currentIndex = 0;
    let interval;
    let isPaused = false;
    
    // Start automatic carousel
    startCarousel();
    
    function startCarousel() {
        if (!isPaused) {
            interval = setInterval(() => {
                goToSlide((currentIndex + 1) % publicationItems.length);
            }, 5000); // Change slide every 5 seconds
        }
    }
    
    function stopCarousel() {
        clearInterval(interval);
    }
    
    function goToSlide(index) {
        // Update current index
        currentIndex = index;
        
        // Update active slide
        const carouselItems = carouselContainer.querySelectorAll('.carousel-item');
        carouselItems.forEach(item => item.classList.remove('active'));
        carouselItems[index].classList.add('active');
        
        // Update indicators
        const indicators = carouselContainer.querySelectorAll('.carousel-indicator');
        indicators.forEach(indicator => indicator.classList.remove('active'));
        indicators[index].classList.add('active');
    }
    
    // Event listeners for controls
    prevButton.addEventListener('click', function() {
        stopCarousel();
        goToSlide((currentIndex - 1 + publicationItems.length) % publicationItems.length);
        startCarousel();
    });
    
    nextButton.addEventListener('click', function() {
        stopCarousel();
        goToSlide((currentIndex + 1) % publicationItems.length);
        startCarousel();
    });
    
    pauseButton.addEventListener('click', function() {
        isPaused = !isPaused;
        if (isPaused) {
            stopCarousel();
            pauseButton.innerHTML = '&#9658;'; // Play icon
        } else {
            startCarousel();
            pauseButton.innerHTML = '&#10074;&#10074;'; // Pause icon
        }
    });
    
    // Event listeners for indicators
    indicatorsDiv.addEventListener('click', function(e) {
        if (e.target.classList.contains('carousel-indicator')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            stopCarousel();
            goToSlide(index);
            startCarousel();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevButton.click();
        } else if (e.key === 'ArrowRight') {
            nextButton.click();
        } else if (e.key === ' ') {
            pauseButton.click();
            e.preventDefault();
        }
    });
}
