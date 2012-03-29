// jquery.tabbler
// by David Kennedy
// http://daveden.wordpress.com/

(function($) {
	var methods = {
		init: function(options) {
			var settings = $.extend({
				setHeight: false,
				panelId: null,
				effect: "vertical",
				play: false,
				playSpeed: 5000,
				pauseHover: false
			}, options);
			
			return this.each(function() {
				var $tabbler = $(this).addClass("tabbler")
					.css("overflow", "hidden");
				
				var $tabList = $tabbler.children("ul").addClass("tabbler-tabList");
				
				var $tabs = $tabList.children("li").addClass("tabbler-tab");
				
				var $tabLinks = $tabs.children("a").addClass("tabbler-tabLink")
					.click(function(e) {
						e.preventDefault();
						
						$tabbler.tabbler("open", {
							panelId: $(this).attr("href").replace("#", ""),
							effect: settings.effect
						});
					});
				
				var $panels = $tabbler.children("div").addClass("tabbler-panel")
					.css("position", "relative")
					.wrapInner("<div class='tabbler-wrapper'>");
				
				if (settings.setHeight == true) {
					var tabListHeightPx = $tabList.height();
					var maxPanelHeightPx = 0;
					
					$panels.each(function() {
						if ($(this).height() > maxPanelHeightPx) {
							maxPanelHeightPx = $(this).height();
						}
					});
					
					var maxHeightPx = tabListHeightPx + maxPanelHeightPx;
					var fontHeightPx = $(this).css("font-size").replace("px", "");
					var maxHeightEm = maxHeightPx / fontHeightPx;
					
					$(this).height(maxHeightEm + "em");
				}
				
				$tabs.has("a[href='#" + settings.panelId + "']").addClass("active");
				
				if (settings.effect == "vertical") {
					$panels.not("#" + settings.panelId).hide();
				} else if (settings.effect == "horizontal") {
					$panels.not("#" + settings.panelId).hide().css("left", -$(this).outerWidth());
				} else if (settings.effect == "slide") {
					$panels.not("#" + settings.panelId).hide().css("left", $(this).outerWidth());
				}
				
				if (settings.play == true) {
					var interval = setInterval(function() {
						$tabbler.tabbler("nextTab", {
							effect: settings.effect
						});
					}, settings.playSpeed);
					
					if (settings.pauseHover == true) {
						$tabbler.hover(function() {
							clearInterval(interval);
						},
						function() {
							interval = setInterval(function() {
								$tabbler.tabbler("nextTab", {
									effect: settings.effect
								});
							}, settings.playSpeed);
						});
					}
				}
			});
		},
		open: function(options) {
			var settings = $.extend({
				panelId: $(this).find(".tabbler-panel").first().attr("id"),
				effect: "vertical"
			}, options);
			
			return this.each(function() {
				var $tab = $(this).find(".tabbler-tab").has("a[href='#" + settings.panelId + "']");
				
				var $panel = $("#" + settings.panelId);
				
				if ($panel.is(":visible")) {
					$(this).tabbler("close", {
						effect: settings.effect
					});
				} else {
					$(this).tabbler("close", {
						effect: settings.effect
					}, function() {
						$tab.addClass("active");
						
						if (settings.effect == "vertical") {
							$panel.slideDown("fast");
						} else if (settings.effect == "horizontal" || settings.effect == "slide") {
							$panel.show();
							$panel.animate({
								left: 0
							});
						}
					});
				}
			});
		},
		close: function(options, callback) {
			var settings = $.extend({
				effect: "vertical"
			}, options);
			
			return this.each(function() {
				var $tab = $(this).find(".tabbler-tab.active");
				
				var $panel = $(this).find(".tabbler-panel:visible");
				
				if (settings.effect == "vertical") {
					$panel.slideUp("fast").promise().done(function() {
						$tab.removeClass("active");
						
						if (typeof callback == "function") {
							callback.call();
						}
					});
				} else if (settings.effect == "horizontal") {
					$panel.animate({
						left: -$(this).outerWidth()
					}).promise().done(function() {
						$(this).hide();
						$tab.removeClass("active");
						
						if (typeof callback == "function") {
							callback.call();
						}
					});
				} else if (settings.effect == "slide") {
					$panel.animate({
						left: -$(this).outerWidth()
					}).promise().done(function() {
						$(this).hide().css("left", $(this).outerWidth());
						$tab.removeClass("active");
						
						if (typeof callback == "function") {
							callback.call();
						}
					});
				}
			});
		},
		nextTab: function(options) {
			var settings = $.extend({
				effect: "vertical"
			}, options);
			
			return this.each(function() {
				var panelId = $(this).find(".tabbler-panel:visible").next().attr("id");
				
				if (panelId == null) {
					panelId = $(this).find(".tabbler-panel").first().attr("id");
				}
				
				$(this).tabbler("open", {
					panelId: panelId,
					effect: settings.effect
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