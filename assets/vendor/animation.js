import "assets/vendor/animejs/anime.min.js";

var zoom = anime({
    targets: '#zoom-in-up .cardblock',
    translatey: 250,
    easing: [.91, -0.54, .29, 1.56]
});

anime({
    targets: '.cardblock',
    left: '80%', // Animate all divs left position to 80%
    opacity: .8, // Animate all divs opacity to .8
    backgroundColor: '#FFF' // Animate all divs background color to #FFF
});