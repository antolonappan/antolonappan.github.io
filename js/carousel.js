/* Publication Carousel JavaScript */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize publication carousel
    initPublicationCarousel();
});

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
    
    // Create progress bar
    const progressContainer = document.createElement('div');
    progressContainer.className = 'carousel-progress';
    const progressBar = document.createElement('div');
    progressBar.className = 'carousel-progress-bar';
    progressContainer.appendChild(progressBar);
    carouselContainer.appendChild(progressContainer);
    
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
    const intervalDuration = 5000; // 5 seconds per slide
    let progressValue = 0;
    let progressInterval;
    
    // Start automatic carousel
    startCarousel();
    
    function startCarousel() {
        if (!isPaused) {
            // Clear any existing intervals
            clearInterval(interval);
            clearInterval(progressInterval);
            
            // Reset progress bar
            progressValue = 0;
            progressBar.style.width = '0%';
            
            // Start progress bar animation
            progressInterval = setInterval(() => {
                progressValue += 1;
                progressBar.style.width = `${(progressValue / (intervalDuration / 100))}%`;
                
                if (progressValue >= intervalDuration / 100) {
                    progressValue = 0;
                }
            }, 100);
            
            // Start carousel interval
            interval = setInterval(() => {
                goToSlide((currentIndex + 1) % publicationItems.length);
            }, intervalDuration);
        }
    }
    
    function stopCarousel() {
        clearInterval(interval);
        clearInterval(progressInterval);
        progressBar.style.width = '0%';
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
        
        // Reset progress bar
        progressValue = 0;
        progressBar.style.width = '0%';
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
    
    // Pause on hover
    carouselContainer.addEventListener('mouseenter', function() {
        if (!isPaused) {
            stopCarousel();
        }
    });
    
    carouselContainer.addEventListener('mouseleave', function() {
        if (!isPaused) {
            startCarousel();
        }
    });
}
