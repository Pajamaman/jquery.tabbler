// jquery.tabbler
// by David Kennedy
// http://daveden.wordpress.com/

(function($) {
	var methods = {
		init: function(options) {
			var settings = $.extend({
				panelId: null,
				play: false,
				playSpeed: 5000
			}, options);
			
			return this.each(function() {
				var $tabbler = $(this);
				
				var $tabList = $tabbler.children("ul").addClass("tabbler tabList");
				
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
				
				if (settings.panelId != null) {
					$tabbler.tabbler("open", {
						panelId: settings.panelId
					});
				}
				
				if (settings.play != false) {
					$tabbler.tabbler("play", {
						playSpeed: settings.playSpeed
					});
				}
			});
		},
		open: function(options) {
			var settings = $.extend({
				panelId: $(this).find(".tabbler.panel").first().attr("id")
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
		},
		play: function(options) {
			var settings = $.extend({
				playSpeed: 5000
			}, options);
			
			return this.each(function() {
				$tabbler = $(this);
				
				var interval = setInterval(function() {
					var panelId = $tabbler.find(".tabbler.panel:visible").next().attr("id");
					
					if (panelId == null) {
						panelId = $tabbler.find(".tabbler.panel").first().attr("id");
					}
					
					$tabbler.tabbler("open", {
						panelId: panelId
					});
				}, settings.playSpeed);
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