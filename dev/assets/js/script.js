'use strict';




//----------------------------------------------------/
// TheSaaS
//----------------------------------------------------/
//
+

function($, window) {

    var polyient = {
        name: 'RealBlocks',
        version: '1.4.5',
    };

    polyient.defaults = {
        googleApiKey: null,
        googleAnalyticsId: null,
        smoothScroll: true,
    }

    // Breakpoint values
    //
    polyient.breakpoint = {
        xs: 576,
        sm: 768,
        md: 992,
        lg: 1200
    };


    // Config application
    //
    polyient.config = function(options) {
        //$.extend(true, polyient.defaults, options);

        // Rteurn config value
        if (typeof options === 'string') {
            return polyient.defaults[options];
        }


        // Save configs
        $.extend(true, polyient.defaults, options);


        // Make necessary changes
        //
        if (!polyient.defaults.smoothScroll) {
            SmoothScroll.destroy();
        }



        // Google map
        // 
        if ($('[data-provide~="map"]').length && window["google.maps.Map"] === undefined) {
            $.getScript("https://maps.googleapis.com/maps/api/js?key=" + polyient.defaults.googleApiKey + "&callback=polyient.map");
        }


        // Google Analytics
        //
        if (polyient.defaults.googleAnalyticsId) {
            (function(i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r;
                i[r] = i[r] || function() {
                    (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * new Date();
                a = s.createElement(o),
                    m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m)
            })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

            ga('create', polyient.defaults.googleAnalyticsId, 'auto');
            ga('send', 'pageview');
        }

    }



    // Initialize the application
    //
    polyient.init = function() {


        polyient.topbar();
        polyient.parallax();
        polyient.carousel();
        polyient.scrolling();
        polyient.counter();
        polyient.aos();
        polyient.typed();
        polyient.contact();
        polyient.mailer();
        polyient.constellation();
        polyient.shuffle();


        // Lightbox
        $(document).on('click', '[data-provide~="lightbox"]', lity);


        // Object fit
        // 
        objectFitPolyfill($('.bg-video'));
        objectFitPolyfill($('#timer'));
        objectFitPolyfill($('#timer'));


        // Video-wrapper
        $(document).on('click', '.video-wrapper .btn', function() {
            var wrapper = $(this).closest('.video-wrapper');
            wrapper.addClass('reveal');

            if (wrapper.find('video').length)
                wrapper.find('video').get(0).play();

            if (wrapper.find('iframe').length) {
                var iframe = wrapper.find('iframe');
                var src = iframe.attr('src');

                if (src.indexOf('?') > 0)
                    iframe.get(0).src += "&autoplay=1";
                else
                    iframe.get(0).src += "?autoplay=1";
            }
        });



        // Upload
        //
        $(document).on('click', '.file-browser', function() {
            var browser = $(this);
            var file = browser.closest('.file-group').find('[type="file"]');
            if (browser.hasClass('form-control')) {
                setTimeout(function() {
                    file.trigger('click');
                }, 300);
            } else {
                //console.log( $browser.closest('.file-group').find('[type="file"]').length );
                file.trigger('click');
            }
        });

        // Event to change file name after file selection
        $(document).on('change', '.file-group [type="file"]', function() {
            var input = $(this);
            var filename = input.val().split('\\').pop();
            input.closest('.file-group').find('.file-value').val(filename).text(filename).focus();
        });



        // FadeOUt header
        $(window).on('scroll', function() {
            var st = $(this).scrollTop() - 200;
            $('.header.fadeout').css('opacity', (1 - st / window.innerHeight));
        });



        // Drawer
        // 
        $(document).on('click', '.drawer-toggler, .drawer-close, .drawer-backdrop', function() {
            $('body').toggleClass('drawer-open');
        });



    };




    //----------------------------------------------------/
    // Parallax
    //----------------------------------------------------/
    polyient.parallax = function() {

        $('[data-parallax]').each(function() {
            var parallax = $(this);
            var options = {
                imageSrc: parallax.data('parallax'),
                speed: 0.3,
                bleed: 50
            };

            if ($(this).hasClass('header')) {
                options.speed = 0.6;
            }

            options = $.extend(options, polyient.getDataOptions(parallax));

            parallax.parallax(options);

        });

    }



    //----------------------------------------------------/
    // Google map
    //----------------------------------------------------/
    polyient.map = function() {

        $('[data-provide~="map"]').each(function() {

            var setting = {
                lat: '',
                lng: '',
                zoom: 13,
                markerLat: '',
                markerLng: '',
                markerIcon: '',
                style: ''
            }

            setting = $.extend(setting, polyient.getDataOptions($(this)));

            var map = new google.maps.Map($(this)[0], {
                center: {
                    lat: Number(setting.lat),
                    lng: Number(setting.lng)
                },
                zoom: Number(setting.zoom)
            });

            var marker = new google.maps.Marker({
                position: {
                    lat: Number(setting.markerLat),
                    lng: Number(setting.markerLng)
                },
                map: map,
                animation: google.maps.Animation.DROP,
                icon: setting.markerIcon
            });

            var infowindow = new google.maps.InfoWindow({
                content: $(this).dataAttr('info', '')
            });

            marker.addListener('click', function() {
                infowindow.open(map, marker);
            });

            switch (setting.style) {
                case 'light':
                    map.set('styles', [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }]);
                    break;

                case 'dark':
                    map.set('styles', [{ "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#000000" }, { "lightness": 40 }] }, { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#000000" }, { "lightness": 16 }] }, { "featureType": "all", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#000000" }, { "lightness": 17 }, { "weight": 1.2 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 20 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 21 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#000000" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 16 }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 19 }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 17 }] }])
                    break;

                default:
                    if (Array.isArray(setting.style)) {
                        map.set('styles', setting.style);
                    }
            }

        });

    }




    //----------------------------------------------------/
    // Carousel
    //----------------------------------------------------/
    polyient.carousel = function() {

        $('.swiper-container').each(function() {
            var options = {
                autoplay: 3000,
                speed: 1000,
                loop: true,
                breakpoints: {
                    // when window width is <= 640px
                    480: {
                        slidesPerView: 1
                    }
                }
            };

            var swiper = $(this);

            if (swiper.find('.swiper-button-next').length) {
                options.nextButton = '.swiper-button-next';
            }

            if (swiper.find('.swiper-button-prev').length) {
                options.prevButton = '.swiper-button-prev';
            }

            if (swiper.find('.swiper-pagination').length) {
                options.pagination = '.swiper-pagination';
                options.paginationClickable = true;
            }

            options = $.extend(options, polyient.getDataOptions(swiper));

            new Swiper(swiper, options);
        });

    }












    //----------------------------------------------------/
    // jQuery CountTo and Count Down
    //----------------------------------------------------/
    polyient.counter = function() {

        // CountTo
        var waypoints = $('[data-provide~="counter"]:not(.counted)').waypoint({
            handler: function(direction) {
                $(this.element).countTo().addClass('counted');
            },
            offset: '100%'
        });


        // Count Down - OLD
        /*
        $('[data-countdown]').each(function() {
          var format = '%D day%!D %H:%M:%S';
          var countdown = $(this);
          if ( countdown.hasDataAttr('format') )
            format = countdown.data('format');

          countdown.countdown( countdown.data('countdown'), function(event) {
            countdown.html(event.strftime( format ));
          } )

        });
        */

        // Count Down
        $('[data-countdown]').each(function() {
            var format = '';
            format += '<div class="row gap-items-3">';
            format += '<div class="col"><h5>%D</h5><small>Day%!D</small></div>';
            format += '<div class="col"><h5>%H</h5><small>Hour%!H</small></div>';
            format += '<div class="col"><h5>%M</h5><small>Minute%!M</small></div>';
            format += '<div class="col"><h5>%S</h5><small>Second%!S</small></div>';
            format += '</div>';

            if ($(this).hasDataAttr('format')) {
                format = $(this).data('format');
            }

            $(this).countdown($(this).data('countdown'), function(event) {
                $(this).html(event.strftime(format));
            })

        });

    }




    //----------------------------------------------------/
    // Animate on scroll
    //----------------------------------------------------/
    polyient.aos = function() {
        AOS.init({
            offset: 220,
            duration: 1500,
            //disable: 'mobile',
            //startEvent: 'load',
        });

        // Preview fix which wasn't working very well
        /*
        $(window).on('load', function() {
          AOS.refresh();
        });
        */

        //$(window).on('resize', function () { AOS.refresh(); });
        //$(window).on('load', function() { setTimeout(AOS.refreshHard, 150); });

    }



    //----------------------------------------------------/
    // Topbar functionality
    //----------------------------------------------------/
    polyient.topbar = function() {

        var body = $('body');
        $(window).on('scroll', function() {
            if ($(document).scrollTop() > 10) {
                body.addClass('body-scrolled');
            } else {
                body.removeClass('body-scrolled');
            }
        });


        // Open menu on click
        //
        $(document).on('click', '.nav-toggle-click .nav-link', function(e) {
            var link = $(this),
                item = link.closest('.nav-item'),
                siblings = item.siblings('.nav-item');

            if ('#' == link.attr('href')) {
                e.preventDefault();
            }

            siblings.removeClass('show');
            siblings.find('.nav-item.show').removeClass('show');
            item.toggleClass('show');
        });


        // Topbar toggler
        // 
        $(document).on('click', '.topbar-toggler', function() {
            //body.toggleClass('topbar-reveal').prepend('<div class="topbar-backdrop"></div>');
            body.toggleClass('topbar-reveal');
            $(this).closest('.topbar').prepend('<div class="topbar-backdrop"></div>');
        });

        $(document).on('click', '.topbar-backdrop', function() {
            body.toggleClass('topbar-reveal');
            $(this).remove();
        });


        // Dropdown for small screens
        //
        $(document).on('click', '.topbar-reveal .topbar-nav .nav-item > .nav-link', function() {
            var item = $(this),
                submenu = item.next('.nav-submenu'),
                parent = item.closest('.nav-submenu');
            item.closest('.topbar-nav').find('.nav-submenu').not(submenu).not(parent).slideUp();
            submenu.slideToggle();
        });

        // Close nav if a scrollto link clicked
        //
        $(document).on('click', '.topbar-reveal .topbar-nav .nav-link', function() {
            if ($(this).hasDataAttr('scrollto')) {
                body.removeClass('topbar-reveal');
                $('.topbar-backdrop').remove();
            }
        });

    }



    //----------------------------------------------------/
    // Typed
    //----------------------------------------------------/
    polyient.typed = function() {

        $('[data-type]').each(function() {
            var strings = $(this).data('type').split(',');
            var options = {
                strings: strings,
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 800,
                loop: true
            };

            options = $.extend(options, polyient.getDataOptions($(this)));
            var typed = new Typed($(this)[0], options);
        });

        /*
        $('[data-type]').each(function(){
          var el = $(this);
          var strings = el.data('type').split(',');
          var options = {
            strings: strings,
            typeSpeed: 50,
            backDelay: 800,
            loop: true
          }

          options = $.extend( options, polyient.getDataOptions(el) );

          el.typed(options);
        });
        */

    }



    //----------------------------------------------------/
    // Contact form - This is depricated
    //----------------------------------------------------/
    polyient.contact = function() {

        $(document).on('click', '#contact-send', function() {

            var name = $("#contact-name").val();
            var email = $("#contact-email").val();
            var message = $("#contact-message").val();
            var dataString = 'name=' + name + '&email=' + email + '&message=' + message;
            var validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var error = $('#contact-error');

            if (email.length < 1) {
                error.html('Please enter your email address.').fadeIn(500);
                return;
            }

            if (!validEmail.test(email)) {
                error.html('Please enter a valid email address.').fadeIn(500);
                return;
            }

            $.ajax({
                type: "POST",
                url: "assets/php/sendmail_depricated.php",
                data: dataString,
                success: function() {
                    error.fadeOut(400);
                    $('#contact-success').fadeIn(1000);
                    $("#contact-name, #contact-email, #contact-message").val('');
                },
                error: function() {
                    error.html('There is a problem in our email service. Please try again later.').fadeIn(500);
                }
            });
        });
    }




    //----------------------------------------------------/
    // Mailer function
    //----------------------------------------------------/
    polyient.mailer = function() {

        var validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        $('[data-form="mailer"]').each(function() {

            var form = $(this);
            var email = form.find('[name="email"]');
            var message = form.find('[name="message"]');
            var email_form_group = email.closest('.form-group');
            var message_form_group = message.closest('.form-group');

            form.on('submit', function() {

                form.children('.alert-danger').remove();

                if (email.length) {
                    if (email.val().length < 1 || !validEmail.test(email.val())) {
                        email_form_group.addClass('has-danger');
                        return false;
                    }
                }


                if (message.length) {
                    if (message.val().length < 1) {
                        message_form_group.addClass('has-danger');
                        return false;
                    }
                }

                $.ajax({
                        type: "POST",
                        url: form.attr('action'),
                        data: form.serializeArray(),
                    })
                    .done(function(data) {
                        var response = $.parseJSON(data);
                        if ('success' == response.status) {
                            form.find('.alert-success').fadeIn(1000);
                            form.find(':input').val('');
                        } else {
                            form.prepend('<div class="alert alert-danger">' + response.message + '</div>');
                            console.log(response.reason)
                        }
                    });

                return false;
            });

            email.on('focus', function() {
                email_form_group.removeClass('has-danger');
            });

            message.on('focus', function() {
                message_form_group.removeClass('has-danger');
            });

        });

    }





    //----------------------------------------------------/
    // Constellation
    //----------------------------------------------------/
    polyient.constellation = function() {
        var color = 'rgba(255, 255, 255, .8)',
            distance = 120;

        if ($(window).width() < 700) {
            distance = 25;
        }

        $('.constellation').each(function() {

            if ('dark' == $(this).data('color')) {
                color = 'rgba(0, 0, 0, .5)';
            }

            var length = $(this).dataAttr('length', 100);
            var radius = $(this).dataAttr('radius', 150);

            $(this).constellation({
                distance: distance,
                length: length,
                radius: radius,
                star: {
                    color: color,
                    width: 1
                },
                line: {
                    color: color,
                    width: 0.2
                }
            });
        });

    }



    //----------------------------------------------------/
    // Shuffle.js
    //----------------------------------------------------/
    polyient.shuffle = function() {
        if (undefined === window['Shuffle'] || 0 === $('[data-provide="shuffle"]').length) {
            return;
        }

        var Shuffle = window.Shuffle;

        Shuffle.options.itemSelector = '[data-shuffle="item"]';
        Shuffle.options.sizer = '[data-shuffle="sizer"]';
        Shuffle.options.delimeter = ',';
        Shuffle.options.speed = 500;


        $('[data-provide="shuffle"]').each(function() {

            var list = $(this).find('[data-shuffle="list"]');
            var filter = $(this).find('[data-shuffle="filter"]');
            var search = $(this).find('[data-shuffle="search"]');
            var shuffleInstance = new Shuffle(list);

            if (filter.length) {

                $(filter).find('[data-shuffle="button"]').each(function() {
                    $(this).on('click', function() {
                        var btn = $(this);
                        var isActive = btn.hasClass('active');
                        var btnGroup = btn.data('group');

                        $(this).closest('[data-shuffle="filter"]').find('[data-shuffle="button"].active').removeClass('active');

                        var filterGroup;
                        if (isActive) {
                            btn.removeClass('active');
                            filterGroup = Shuffle.ALL_ITEMS;
                        } else {
                            btn.addClass('active');
                            filterGroup = btnGroup;
                        }

                        shuffleInstance.filter(filterGroup);
                    });
                });

            } //End if


            if (search.length) {
                search.on('keyup', function() {
                    var searchText = $(this).val().toLowerCase();
                    shuffleInstance.filter(function(element, shuffle) {
                        var itemText = element.textContent.toLowerCase().trim();
                        return itemText.indexOf(searchText) !== -1;
                    });
                });
            }


            $(this).imagesLoaded(function() {
                shuffleInstance.layout()
            });


        });


    }




    // Convert data-attributes options to Javascript object
    //
    polyient.getDataOptions = function(el, castList) {
        var options = {};

        $.each($(el).data(), function(key, value) {

            key = polyient.dataToOption(key);

            // Escape data-provide
            if (key == 'provide') {
                return;
            }

            if (castList != undefined) {
                var type = castList[key];
                switch (type) {
                    case 'bool':
                        value = Boolean(value);
                        break;

                    case 'num':
                        value = Number(value);
                        break;

                    case 'array':
                        value = value.split(',');
                        break;

                    default:

                }
            }

            options[key] = value;
        });

        return options;
    }


    // Convert fooBarBaz to foo-bar-baz
    //
    polyient.optionToData = function(name) {
        return name.replace(/([A-Z])/g, "-$1").toLowerCase();
    }


    // Convert foo-bar-baz to fooBarBaz
    //
    polyient.dataToOption = function(name) {
        return name.replace(/-([a-z])/g, function(x) { return x[1].toUpperCase(); });
    }



    window.polyient = polyient;
}(jQuery, window);




$(function() {
    polyient.init();
});



// Check if an element has a specific data attribute
//
jQuery.fn.hasDataAttr = function(name) {
    return $(this)[0].hasAttribute('data-' + name);
};



// Get data attribute. If element doesn't have the attribute, return default value
//
jQuery.fn.dataAttr = function(name, def) {
    return $(this)[0].getAttribute('data-' + name) || def;
};



// Instance search
//
//$.expr[':'] -> $.expr.pseudos
jQuery.expr[':'].search = function(a, i, m) {
    return $(a).html().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};

//Icons Attr Changes
$("i, #icon-color").attr('data-vi-primary', '#00BCDD', 'data-vi-accent', '#00DCAD', 'data-vi-prop', '#DDDEE1');


//Typography


(function($) {
    $.fn.flowtype = function(options) {

        // Establish default settings/variables
        // ====================================
        var settings = $.extend({
                maximum: 9999,
                minimum: 1,
                maxFont: 9999,
                minFont: 1,
                fontRatio: 35
            }, options),

            // Do the magic math
            // =================
            changes = function(el) {
                var $el = $(el),
                    elw = $el.width(),
                    width = elw > settings.maximum ? settings.maximum : elw < settings.minimum ? settings.minimum : elw,
                    fontBase = width / settings.fontRatio,
                    fontSize = fontBase > settings.maxFont ? settings.maxFont : fontBase < settings.minFont ? settings.minFont : fontBase;
                $el.css('font-size', fontSize + 'px');
            };

        // Make the magic visible
        // ======================
        return this.each(function() {
            // Context for resize callback
            var that = this;
            // Make changes upon resize
            $(window).resize(function() { changes(that); });
            // Set changes on load
            changes(this);
        });
    };
}(jQuery));
var ds = [".display-1", ".display-2", ".display-3", ".display-4", ".display-5"];
var Heading = ds.join(", ");

$('Heading').flowtype({
    minFont: 26,
    maxFont: 54,
    fontRatio: 1.25,
    minimum: 700,
    maximum: 700
});

$('h5').flowtype({
    minFont: 16,
    maxFont: 18,
    fontRatio: 1.25,
    minimum: 700,
    maximum: 700
});


$('h2.reserve').flowtype({
    minFont: 24,
    maxFont: 28,
    fontRatio: 1.25,
    minimum: 700,
    maximum: 700

});

$('#features-title').flowtype({
    minFont: 26,
    maxFont: 54,
    fontRatio: 2,
    minimum: 700,
    maximum: 700

});

$('#fixme').flowtype({
    minFont: 26,
    maxFont: 54,
    fontRatio: 2,
    minimum: 700,
    maximum: 700

});

//Animations

$.fn.extend({
    animateCss: function(animationName, callback) {
        var animationEnd = (function(el) {
            var animations = {
                animation: 'animationend',
                OAnimation: 'oAnimationEnd',
                MozAnimation: 'mozAnimationEnd',
                WebkitAnimation: 'webkitAnimationEnd',
            };

            for (var t in animations) {
                if (el.style[t] !== undefined) {
                    return animations[t];
                }
            }
        })(document.createElement('div'));

        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);

            if (typeof callback === 'function') callback();
        });

        return this;
    },
});