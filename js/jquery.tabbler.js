// jquery.tabbler
// by David Kennedy
// http://daveden.wordpress.com/

(function($) {
    var methods = {
        init: function(options) {
            var settings = $.extend({
                event: "click",
                effect: "toggle",
                floating: false,
                selected: null,
                play: false,
                playSpeed: 5000,
                pauseHover: false
            }, options);
            
            return this.each(function() {
                var $tabbler = $(this).addClass("tabbler").css("position", "relative"),
                    $tabList = $tabbler.children("ul").addClass("tabbler-tabList"),
                    $tabs = $tabList.children("li").addClass("tabbler-tab"),
                    $tabLinks = $tabs.children("a").addClass("tabbler-tabLink"),
                    $panels = $tabbler.children("div").addClass("tabbler-panel").wrapInner("<div class='tabbler-wrapper'>");
                
                if (settings.event === "click") {
                    $tabLinks.click(function(e) {
                        e.preventDefault();
                        
                        $tabbler.tabbler(settings.effect, {
                            panelId: $(this).attr("href").replace("#", "")
                        });
                    });
                } else if (settings.event === "mouseover") {
                    $tabLinks.mouseenter(function() {
                        $tabbler.tabbler(settings.effect, {
                            panelId: $(this).attr("href").replace("#", "")
                        });
                    });
                    
                    $tabbler.mouseleave(function() {
                        $tabbler.tabbler(settings.effect, {
                            panelId: $(this).find(".tabbler-panel.active").attr("id")
                        });
                    });
                }
                
                if (settings.selected) {
                    $(this).find(".tabbler-tab").has("a[href='#" + settings.selected + "']").addClass("active");
                    $("#" + settings.selected).addClass("active");
                }
                
                if (settings.effect === "toggle") {
                    if (settings.floating) {
                        $tabbler.css("z-index", "100");
                        
                        $panels.css({
                            position: "absolute",
                            width: "100%"
                        });
                    }
                    
                    $panels.not("#" + settings.selected).hide();
                } else if (settings.effect === "slide") {
                    var tabListHeightPx = $tabList.height(),
                        maxPanelHeightPx = 0,
                        maxHeightPx,
                        fontHeightPx,
                        maxHeightEm;
                    
                    $panels.each(function() {
                        if ($(this).height() > maxPanelHeightPx) {
                            maxPanelHeightPx = $(this).height();
                        }
                    });
                    
                    maxHeightPx = tabListHeightPx + maxPanelHeightPx,
                    fontHeightPx = $(this).css("font-size").replace("px", ""),
                    maxHeightEm = maxHeightPx / fontHeightPx;
                    
                    $tabbler.css({
                        overflow: "hidden",
                        height: maxHeightEm + "em"
                    });
                    
                    $panels.css("position", "relative")
                        .not("#" + settings.selected)
                            .offset({
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
        toggle: function(options) {
            var settings = $.extend({
                panelId: null
            }, options);
            
            return this.each(function() {
                if (!settings.panelId) {
                    return false;
                }
                
                var $activeTab = $(this).find(".tabbler-tab.active"),
                    $activePanel = $(this).find(".tabbler-panel.active"),
                    $tab = $(this).find(".tabbler-tab").has("a[href='#" + settings.panelId + "']").not(".active");
                    $panel = $("#" + settings.panelId).not(".active");
                
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
                panelId: null
            }, options);
            
            return this.each(function() {
                if (!settings.panelId) {
                    return false;
                }
                
                var $activeTab = $(this).find(".tabbler-tab.active"),
                    $activePanel = $(this).find(".tabbler-panel.active"),
                    $tab = $(this).find(".tabbler-tab").has("a[href='#" + settings.panelId + "']").not(".active"),
                    $panel = $("#" + settings.panelId).not(".active"),
                    $tabList = $(this).find(".tabbler-tabList");
                
                $activeTab.removeClass("active");
                $activePanel.animate({
                    left: -$(this).width()
                }, function() {
                    $(this).removeClass("active");
                });
                
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
                var $tabbler = $(this),
                    interval = setTimer();
                
                if (settings.pauseHover) {
                    $tabbler.hover(function() {
                        clearInterval(interval);
                    }, function() {
                        interval = setTimer();
                    });
                }
                
                function setTimer()
                {
                    return setInterval(function() {
                        $tabbler.tabbler("nextTab", {
                            effect: settings.effect
                        });
                    }, settings.playSpeed);
                }
            });
        },
        nextTab: function(options) {
            var settings = $.extend({
                effect: "toggle"
            }, options);
            
            return this.each(function() {
                var panelId = $(this).find(".tabbler-panel.active").next().attr("id");
                
                if (!panelId) {
                    panelId = $(this).find(".tabbler-panel").first().attr("id");
                }
                
                $(this).tabbler(settings.effect, {
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