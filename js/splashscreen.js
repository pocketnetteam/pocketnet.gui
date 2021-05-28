let splashScreen = $('#splashScreen');
    splashScreenImg = splashScreen.find('img'),
    splashScreenTitle = splashScreen.find('h1')
    stopRotation = false;
// Logos variant color
let logos = ['img/splashscreen/pocketnet-logo-16.svg', 'img/splashscreen/pocketnet-logo-17.svg', 'img/splashscreen/pocketnet-logo-15.svg',
                'img/splashscreen/pocketnet-logo-14.svg', 'img/splashscreen/pocketnet-logo-18.svg', 'img/splashscreen/pocketnet-logo-19.svg'];
// Index in the array for the next logo variant
let nextLogoIndex = 0;
// Duration of all animations (in ms)
let zoomInDuration = 500, rotatingDuration = 1000, zoomOutDuration = 500;
// Interval
let interval;

// Function to start the ending process of the splash screen
hideSplashScreen = function() {
    // Set the boolean, so we can stop during the end of the next animation
    stopRotation = true;
}

// Function triggered at the end of each rotating animation
rotatingAnimationEnded = function() {
    if (!splashScreenImg || splashScreenImg.length <= 0)
        return;
    // Check if we need to stop rotating and fade out
    if (stopRotation) {
        splashScreenImg.removeClass('rotate');
        splashScreenImg.addClass('zoom-out');
        splashScreenTitle.addClass('fade-out');
        // When zoom out animation is done, completely remove the splash screen
        setTimeout(() => {
            // Clear interval if needed
            if (interval != undefined)
                clearInterval(interval);
            // Completely remove the splashscreen
            splashScreen.remove();
        }, zoomOutDuration);
    }
    // Wait until half the rotation is done
    setTimeout(() => {
        // Change the logo image
        splashScreenImg[0].src = logos[nextLogoIndex];
        // Increase index
        nextLogoIndex = (nextLogoIndex >= (logos.length - 1)) ? 0 : nextLogoIndex + 1;
    }, rotatingDuration * 0.5);
}

// Wait until the zoom in is done
setTimeout(() => {
    if (!splashScreenImg)
        return;
    // Start rotating the logo
    splashScreenImg.removeClass('zoom-in');
    splashScreenImg.addClass('rotate');
    // Triggered every times we reached the end of the rotating animation
    rotatingAnimationEnded();
    interval = setInterval(rotatingAnimationEnded, rotatingDuration);
}, zoomInDuration);