// jquery.tabbler
// by David Kennedy
// http://daveden.wordpress.com/

(function($) {
	var methods = {
		init: function(options) {
			var settings = $.extend({
				"target": "null"
			}, options);
			
			return this.each(function() {
				var target = $("#" + settings.target);
				var siblings = target.siblings();
				
				// Get height of target
				targetFontPx = target.css("font-size").replace("px", "");
				targetHeightPx = target.height();
				targetHeightEm = targetHeightPx / targetFontPx;
				
				// Set height of target then hide it to fix jumpy animation
				target.css("height", targetHeightEm + "em");
				target.hide();
				
				$(this).click(function() {
					if (target.is(":visible")) {
						target.slideUp("fast");
					} else if (siblings.filter(":visible").length != 0) {
						siblings.filter(":visible").slideUp("fast", function() {
							target.slideDown("fast");
						});
					} else {
						target.slideDown("fast");
					}
				});
			});
		}
	};
	
	$.fn.tabbler = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method == 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jquery.tabbler');
		}
	};
})(jQuery);