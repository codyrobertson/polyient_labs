$('.gifplayer');
$('.gifplayer').gifplayer();

$gifs = $('.gif');

$gifs.each(function(i, gif) {
    $(gif).data('isPlaying', false);
});


$(window).scroll(function() {
    $gifs = $('.gif');

    $gifs.each(function(i, gif) {
        $gif = $(gif);

        if ($gif.visible(true)) {
            if (!$gif.data('isPlaying')) {
                $gif.find('.gifplayer').gifplayer('play');
                $gif.data('isPlaying', true);
            }

            if ($gif.find('.gp-gif-element').length > 1) {
                $gif.find('.gp-gif-element').first().remove();
            }
        } else {
            if ($gif.data('isPlaying')) {
                $gif.find('.gifplayer').gifplayer('stop');
                $gif.data('isPlaying', false);
            }
        }
    });
});