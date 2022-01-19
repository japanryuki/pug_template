$(function () {
    $(".js_mv_slider").slick({
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
    });
    $(".js_step_slider").slick({
        dots: true,
        arrows: false,
        autoplaySpeed: 3000,
    });
    $(".js_nav_link")
        .parent()
        .hover(function () {
            $(this).find("ul").fadeIn(300);
        })
        .mouseleave(function (e) {
            $(this).find("ul").fadeOut(300);
        });
    $(".js_dopener").on("click", function (e) {
        $(this).toggleClass("_close");
        $(".js_drawer").toggleClass("_active");
        $("header").toggleClass("_dopen");
        $("body").toggleClass("_fixed");
    });
    $(".js_drawer_link").on("click", function (e) {
        $(".js_dopener").removeClass("_close");
        $(".js_drawer").removeClass("_active");
        $("header").removeClass("_dopen");
        $("body").removeClass("_fixed");
    });
});
$(function () {
    $(window).on("scroll", function () {
        if ($(window).scrollTop() > 100) {
            $("header").addClass("header_min");
        } else {
            $("header").removeClass("header_min");
        }
        if ($("#reserve").length !== 0) {
            if (
                $(window).scrollTop() > 100 &&
                $(window).scrollTop() < $("#reserve").offset().top - $("#reserve").height()
            ) {
                $(".contact_btn").fadeIn(500);
            } else {
                $(".contact_btn").fadeOut(500);
            }
        }
    });
    if ($(window).scrollTop() > 100) {
        $("header").addClass("header_min");
        $(".contact_btn").fadeIn(500);
    } else {
        $("header").removeClass("header_min");
        $(".contact_btn").fadeOut(500);
    }
});

$(function () {
    $(".js-faq").on("click", function () {
        $(this).next().slideToggle(200);
        $(this).toggleClass("open");
    });
    $('a[href*="#"]').on("click", function () {
        var speed = 500;
        var href = $(this).attr("href");
        var target = "#" + href.split("#")[1];
        var paddingTop = parseInt($(target).css("padding-top").replace("px", ""));
        var position = $(target).offset().top - $("header").height() + paddingTop - 30;
        $("html, body").animate({ scrollTop: position }, speed, "swing");
    });
});

$(function () {
    $(".slick-slide").ripples({
        dropRadius: 80,
        perturbance: 0.006,
        resolution: 96,
        interactive: false,
    });

    $(".js_mv_slider").slick("slickPause");

    const mySetInterval = setInterval(() => {
        $(".slick-slide").ripples(
            "drop",
            Math.random() * $(".slick-slide").outerWidth(),
            Math.random() * $(".slick-slide").outerHeight(),
            80,
            0.02 + 0.1 * Math.random()
        );
    }, 500);

    setTimeout(() => {
        clearInterval(mySetInterval);
    }, 4000);
    setTimeout(() => {
        $(".slick-slide").ripples("destroy");
        $(".js_mv_slider").slick("slickPlay");
    }, 16000);
});

$(function () {
    // $(window).on("scroll", function (e) {
    //     $.each($(".js_bg_drop"), function (i, v) {
    //         var depth = $(v).data("depth");
    //         var currentScrollY = $(window).scrollTop();
    //         var targetScrollY = $(v).offset().top;
    //         $(v).css({
    //             transform:
    //                 "translateY(" +
    //                 (targetScrollY - currentScrollY) * (0 === depth ? 0.1 : 0.3) +
    //                 "px)",
    //         });
    //     });
    // });
});

let height = 0;
let currentScrollY = 0;
let targetScrollY = 0;
let updateScrollFrame = null;

function updateScrollY() {
    targetScrollY = window.pageYOffset;
}

function updateScrollYInterval() {
    currentScrollY += 0.05 * (targetScrollY - currentScrollY);

    $.each($(".js_bg_drop"), function (i, v) {
        var depth = $(v).data("depth");

        $(v).css({
            transform: "translateY(" + -currentScrollY * (0 === depth ? 0.1 : 0.3) + "px)",
        });
    });

    requestAnimationFrame(updateScrollYInterval);
}

$(function () {
    updateScrollY();
    window.addEventListener("scroll", updateScrollY);
    updateScrollYInterval();
});
