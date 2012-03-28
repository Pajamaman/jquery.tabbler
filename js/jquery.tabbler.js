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
				
				$panels.addClass("tabbler panel")
					.wrapInner("<div class='tabbler panel inner'>")
					.hide();
				
				$tabs.click(function(e) {
					e.preventDefault();
					
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