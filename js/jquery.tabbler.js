// jquery.tabbler
// by David Kennedy
// http://daveden.wordpress.com/

(function ($) {
    "use strict";

    var methods = {
        init: function (options) {
            var settings = $.extend({
                    event: "click",
                    effect: "toggle",
                    attribute: "href",
                    floating: false,
                    selected: null,
                    play: false,
                    playSpeed: 5000,
                    pauseHover: false
                }, options);

            return this.each(function () {
                var $tabbler = $(this).addClass("tabbler").css("position", "relative"),
                    $tabList = $tabbler.children("ul").addClass("tabbler-tabList"),
                    $tabs = $tabList.children("li").addClass("tabbler-tab"),
                    $tabLinks = $tabs.children("a").addClass("tabbler-tabLink"),
                    $panels = $tabbler.children("div").addClass("tabbler-panel").wrapInner("<div class='tabbler-wrapper'>"),
                    tabListHeightPx,
                    maxPanelHeightPx = 0,
                    maxHeightPx,
                    fontHeightPx,
                    maxHeightEm;

                if (settings.event === "click") {
                    $tabLinks.click(function (e) {
                        if (settings.attribute === "href") {
                            e.preventDefault();
                        }

                        $tabbler.tabbler(settings.effect, {
                            attribute: settings.attribute,
                            panelId: $(this).attr(settings.attribute).replace("#", "")
                        });
                    });
                } else if (settings.event === "mouseover") {
                    $tabLinks.click(function (e) {
                        if (settings.attribute === "href") {
                            e.preventDefault();
                        }
                    });

                    $tabLinks.mouseenter(function () {
                        $tabbler.tabbler(settings.effect, {
                            attribute: settings.attribute,
                            panelId: $(this).attr(settings.attribute).replace("#", "")
                        });
                    });

                    $tabbler.mouseleave(function () {
                        $tabbler.tabbler(settings.effect, {
                            attribute: settings.attribute,
                            panelId: $(this).find(".tabbler-panel.active").attr("id")
                        });
                    });
                }

                if (settings.selected) {
                    $(this).find(".tabbler-tab").has("a[" + settings.attribute + "='#" + settings.selected + "']").addClass("active");
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
                    tabListHeightPx = $tabList.height();

                    $panels.each(function () {
                        if ($(this).height() > maxPanelHeightPx) {
                            maxPanelHeightPx = $(this).height();
                        }
                    });

                    maxHeightPx = tabListHeightPx + maxPanelHeightPx;
                    fontHeightPx = $(this).css("font-size").replace("px", "");
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
                        attribute: settings.attribute,
                        playSpeed: settings.playSpeed,
                        pauseHover: settings.pauseHover
                    });
                }
            });
        },
        toggle: function (options) {
            var settings = $.extend({
                    attribute: "href",
                    panelId: null
                }, options);

            return this.each(function () {
                if (!settings.panelId) {
                    return false;
                }

                var $activeTab = $(this).find(".tabbler-tab.active"),
                    $activePanel = $(this).find(".tabbler-panel.active"),
                    $tab = $(this).find(".tabbler-tab").has("a[" + settings.attribute + "='#" + settings.panelId + "']").not(".active"),
                    $panel = $("#" + settings.panelId).not(".active");

                $activePanel.slideUp("fast").promise().done(function () {
                    $(this).removeClass("active");
                    $activeTab.removeClass("active");

                    $tab.addClass("active");
                    $panel.addClass("active").slideDown("fast");
                });
            });
        },
        slide: function (options) {
            var settings = $.extend({
                    attribute: "href",
                    panelId: null
                }, options);

            return this.each(function () {
                if (!settings.panelId) {
                    return false;
                }

                var $activeTab = $(this).find(".tabbler-tab.active"),
                    $activePanel = $(this).find(".tabbler-panel.active"),
                    $tab = $(this).find(".tabbler-tab").has("a[" + settings.attribute + "='#" + settings.panelId + "']").not(".active"),
                    $panel = $("#" + settings.panelId).not(".active"),
                    $tabList = $(this).find(".tabbler-tabList");

                $activeTab.removeClass("active");
                $activePanel.animate({
                    left: -$(this).width()
                }, function () {
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
        play: function (options) {
            var settings = $.extend({
                    effect: "toggle",
                    attribute: "href",
                    playSpeed: 5000,
                    pauseHover: false
                }, options);

            return this.each(function () {
                var $tabbler = $(this),
                    interval;

                function setTimer() {
                    return setInterval(function () {
                        $tabbler.tabbler("nextTab", {
                            effect: settings.effect,
                            attribute: settings.attribute
                        });
                    }, settings.playSpeed);
                }

                interval = setTimer();

                if (settings.pauseHover) {
                    $tabbler.hover(function () {
                        clearInterval(interval);
                    }, function () {
                        interval = setTimer();
                    });
                }
            });
        },
        nextTab: function (options) {
            var settings = $.extend({
                    effect: "toggle",
                    attribute: "href"
                }, options);

            return this.each(function () {
                var panelId = $(this).find(".tabbler-panel.active").next().attr("id");

                if (!panelId) {
                    panelId = $(this).find(".tabbler-panel").first().attr("id");
                }

                $(this).tabbler(settings.effect, {
                    attribute: settings.attribute,
                    panelId: panelId
                });
            });
        }
    };

    $.fn.tabbler = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error("Method " + method + " does not exist on jquery.tabbler");
        }
    };
}(jQuery));