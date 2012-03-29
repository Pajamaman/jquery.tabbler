// jquery.tabbler
// by David Kennedy
// http://daveden.wordpress.com/

(function($) {
	var methods = {
		init: function(options) {
			var settings = $.extend({
				setHeight: false,
				panelId: null,
				play: false,
				playSpeed: 5000,
				pauseHover: false
			}, options);
			
			return this.each(function() {
				var $tabbler = $(this).addClass("tabbler");
				
				var $tabList = $tabbler.children("ul").addClass("tabbler-tabList");
				
				var $tabs = $tabList.children("li").addClass("tabbler-tab");
				
				var $tabLinks = $tabs.children("a").addClass("tabbler-tabLink")
					.click(function(e) {
						e.preventDefault();
						
						$tabbler.tabbler("open", {
							panelId: $(this).attr("href").replace("#", "")
						});
					});
				
				var $panels = $tabbler.children("div").addClass("tabbler-panel")
					.wrapInner("<div class='tabbler-wrapper'>");
				
				if (settings.setHeight != false) {
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
					
					$(this).css("height", maxHeightEm + "em");
				}
				
				$tabs.has("a[href='#" + settings.panelId + "']").addClass("active");
				$panels.not("#" + settings.panelId).hide();
				
				if (settings.play != false) {
					var interval = setInterval(function() {
						$tabbler.tabbler("nextTab");
					}, settings.playSpeed);
					
					if (settings.pauseHover != false) {
						$tabbler.hover(function() {
							clearInterval(interval);
						},
						function() {
							interval = setInterval(function() {
								$tabbler.tabbler("nextTab");
							}, settings.playSpeed);
						});
					}
				}
			});
		},
		open: function(options) {
			var settings = $.extend({
				panelId: $(this).find(".tabbler-panel").first().attr("id")
			}, options);
			
			return this.each(function() {
				var $tab = $(this).find(".tabbler-tab").has("a[href='#" + settings.panelId + "']");
				
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
				var $tab = $(this).find(".tabbler-tab.active");
				
				var $panel = $(this).find(".tabbler-panel:visible");
				
				$panel.slideUp("fast").promise().done(function() {
					$tab.removeClass("active");
					
					if (typeof callback == "function") {
						callback.call();
					}
				});
			});
		},
		nextTab: function() {
			return this.each(function() {
				var panelId = $(this).find(".tabbler-panel:visible").next().attr("id");
				
				if (panelId == null) {
					panelId = $(this).find(".tabbler-panel").first().attr("id");
				}
				
				$(this).tabbler("open", {
					panelId: panelId
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