/*
 * FlowType.JS v1.1
 * Copyright 2013-2014, Simple Focus http://simplefocus.com/
 *
 * FlowType.JS by Simple Focus (http://simplefocus.com/)
 * is licensed under the MIT License. Read a copy of the
 * license in the LICENSE.txt file or at
 * http://choosealicense.com/licenses/mit
 *
 * Thanks to Giovanni Difeterici (http://www.gdifeterici.com/)
 */

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