// jquery.tabbler
// by David Kennedy
// http://daveden.wordpress.com/

(function($) {
	var methods = {
		init: function() {
			
			return this.each(function() {
				var $tabList = $(this).children("ul");
				
				$tabList.addClass("tabbler tablist");
				
				var $tabs = $tabList.children("li");
				
				$tabs.addClass("tabbler tab");
				
				var $panels = $tabs.children("a").map(function() {
					var panelId = $(this).attr("href");
					
					return $(panelId).get();
				});
				
				$panels.addClass("tabbler panel");
				
				$panels.each(function() {
					// Wrap content of panel in a div to fix jumpy background 
					$(this).wrapInner("<div class='tabbler panel inner'>");
					
					// Set height of panel in em's to keep things nice and fluid
					var panelHeightPx = $(this).height();
					var panelFontPx = $(this).css("font-size").replace("px", "");
					var panelHeightEm = panelHeightPx / panelFontPx;
					$(this).css("height", panelHeightEm + "em");
					
					// Hide panel after setting height to fix jumpy animation
					$(this).hide();
				});
				
				$tabs.click(function() {
					var $tab = $(this);
					var panelId = $(this).children("a").attr("href");
					var $panel = $(panelId);
					
					if ($panel.is(":visible")) {
						$panel.slideUp("fast", function() {
							$tab.removeClass("active");
						});
					} else {
						$panel.siblings(".tabbler.panel").slideUp("fast");
						$panel.siblings(".tabbler.panel").promise().done(function() {
							$tab.siblings(".tabbler.tab").removeClass("active");
							$tab.addClass("active");
							$panel.slideDown("fast");
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