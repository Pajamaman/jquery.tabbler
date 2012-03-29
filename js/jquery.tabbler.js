// jquery.tabbler
// by David Kennedy
// http://daveden.wordpress.com/

(function($) {
	var methods = {
		init: function(options) {
			var settings = $.extend({
				open: null
			}, options);
			
			return this.each(function() {
				var $tabbler = $(this);
				
				var $tabList = $tabbler.children("ul").first().addClass("tabbler tabList");
				
				var $tabs = $tabList.children("li").addClass("tabbler tab");
				
				$tabs.children("a").addClass("tabbler tabLink")
					.click(function(e) {
						e.preventDefault();
						
						$tabbler.tabbler("open", {
							panelId: $(this).attr("href").replace("#", "")
						});
					});
				
				var $panels = $tabbler.children("div").addClass("tabbler panel")
					.wrapInner("<div class='tabbler wrapper'>")
					.hide();
				
				if (settings.open != null) {
					$tabbler.tabbler("open", {
						panelId: settings.open
					});
				}
			});
		},
		open: function(options) {
			var settings = $.extend({
				panelId: null
			}, options);
			
			return this.each(function() {
				var $tab = $(this).find(".tabbler.tab").has("a[href='#" + settings.panelId + "']");
				
				var $panel = $("#" + settings.panelId);
				
				if ($panel.is(":visible")) {
					$(this).tabbler("close");
				} else {
					$(this).tabbler("close", function() {
						$tab.addClass("active");
						$panel.slideDown("fast");
					});
				}
			});
		},
		close: function(callback) {
			return this.each(function() {
				var $tab = $(this).find(".tabbler.tab.active");
				
				var $panel = $(this).find(".tabbler.panel:visible");
				
				$panel.slideUp("fast").promise().done(function() {
					$tab.removeClass("active");
					
					callback.call();
				});
			});
		}
	};
	
	$.fn.tabbler = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method == "object" || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error("Method " + method + " does not exist on jquery.tabbler");
		}
	};
})(jQuery);