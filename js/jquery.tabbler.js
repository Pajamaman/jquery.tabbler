// jquery.tabbler
// by David Kennedy
// http://daveden.wordpress.com/

(function($) {
	var methods = {
		init: function(options) {
			var settings = $.extend({
				setHeight: false,
				panelId: null,
				effect: "toggle",
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
						
						$tabbler.tabbler(settings.effect, {
							panelId: $(this).attr("href").replace("#", "")
						});
					});
				
				var $panels = $tabbler.children("div").addClass("tabbler-panel")
					.wrapInner("<div class='tabbler-wrapper'>")
					.css("position", "relative");
				
				if (settings.setHeight) {
					$tabbler.tabbler("setHeight");
				}
				
				if (settings.panelId) {
					$tabbler.tabbler("setActive", {
						panelId: settings.panelId
					});
				}
				
				if (settings.effect === "toggle") {
					$panels.not("#" + settings.panelId).hide();
				} else if (settings.effect === "slide") {
					$panels.not("#" + settings.panelId).offset({
						top: $tabList.height() + $tabList.offset().top,
						left: $tabList.width() + $tabList.offset().left
					});
				}
				
				if (settings.play) {
					$tabbler.tabbler("play", {
						effect: settings.effect,
						playSpeed: settings.playSpeed,
						pauseHover: settings.pauseHover
					});
				}
			});
		},
		setHeight: function() {
			return this.each(function() {
				var $tabList = $(this).find(".tabbler-tabList");
				var $panels = $(this).find(".tabbler-panel");
				
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
			});
		},
		setActive: function(options) {
			var settings = $.extend({
				panelId: $(this).find(".tabbler-panel").first().attr("id")
			}, options);
			
			return this.each(function() {
				$(this).find(".tabbler-tab").has("a[href='#" + settings.panelId + "']").addClass("active");
				$("#" + settings.panelId).addClass("active");
			});
		},
		toggle: function(options) {
			var settings = $.extend({
				panelId: $(this).find(".tabbler-panel.active").next().attr("id")
			}, options);
			
			return this.each(function() {
				if (!settings.panelId) {
					settings.panelId = $(this).find(".tabbler-panel").first().attr("id");
				}
				
				var $activeTab = $(this).find(".tabbler-tab.active");
				var $activePanel = $(this).find(".tabbler-panel.active");
				
				var $tab = $(this).find(".tabbler-tab").has("a[href='#" + settings.panelId + "']").not(".active");
				var $panel = $("#" + settings.panelId).not(".active");
				
				$activePanel.slideUp("fast").promise().done(function() {
					$(this).removeClass("active");
					$activeTab.removeClass("active");
					
					$tab.addClass("active");
					$panel.addClass("active").slideDown("fast");
				});
			});
		},
		slide: function(options) {
			var settings = $.extend({
				panelId: $(this).find(".tabbler-panel.active").next().attr("id")
			}, options);
			
			return this.each(function() {
				if (!settings.panelId) {
					settings.panelId = $(this).find(".tabbler-panel").first().attr("id");
				}
				
				var $activeTab = $(this).find(".tabbler-tab.active");
				var $activePanel = $(this).find(".tabbler-panel.active");
				
				var $tab = $(this).find(".tabbler-tab").has("a[href='#" + settings.panelId + "']").not(".active");
				var $panel = $("#" + settings.panelId).not(".active");
				
				$activeTab.removeClass("active");
				$activePanel.animate({
					left: -$(this).width()
				}, function() {
					$(this).removeClass("active");
				});
				
				var $tabList = $(this).find(".tabbler-tabList");
				
				$tab.addClass("active");
				$panel.addClass("active").offset({
					top: $tabList.height() + $tabList.offset().top,
					left: $tabList.width() + $tabList.offset().left
				}).animate({
					left: 0
				});
			});
		},
		play: function(options) {
			var settings = $.extend({
				effect: "toggle",
				playSpeed: 5000,
				pauseHover: false
			}, options);
			
			return this.each(function() {
				var $tabbler = $(this);
				
				var interval = setInterval(function() {
					$tabbler.tabbler(settings.effect);
				}, settings.playSpeed);
				
				if (settings.pauseHover) {
					$tabbler.hover(function() {
						clearInterval(interval);
					}, function() {
						interval = setInterval(function() {
							$tabbler.tabbler(settings.effect);
						}, settings.playSpeed);
					});
				}
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