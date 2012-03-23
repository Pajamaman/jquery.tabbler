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
				
				target.addClass("tabbler target");
				$(this).addClass("tabbler tab");
				
				// Wrap content of target in div set to display inline-block to fix jumpy animation
				target.wrapInner("<div class='tabbler target inner'>");
				target.children(":first").css("display", "inline-block");
				
				// Get height of target
				targetFontPx = target.css("font-size").replace("px", "");
				
				// Convert height from pixels to em's to keep things nice and fluid
				targetHeightPx = target.height();
				targetHeightEm = targetHeightPx / targetFontPx;
				
				// Set height of target then hide it to fix jumpy animation
				target.css("height", targetHeightEm + "em");
				target.hide();
				
				$(this).click(function(e) {
					if (target.is(":visible")) {
						target.slideUp("fast", function() {
							$(e.srcElement).removeClass("active");
						});
					} else {
						target.siblings(".tabbler.target").slideUp("fast");
						target.siblings(".tabbler.target").promise().done(function() {
							$(e.srcElement).siblings(".tabbler.tab").removeClass("active");
							$(e.srcElement).addClass("active");
							target.slideDown("fast");
						});
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