/* JS Document */
$(document).ready(function () {

    "use strict";
    // $("#term-box").scroll(function () {
    //     if ($("#term-box").scrollTop() + $("#term-box").height() > $(document).height() - 200) {
    //         $("#term-btn").show();
    //     }
    // });

    $(window).scroll(function () {

        if ($(window).scrollTop() > 70) {
            $('#nav-sticky').addClass('sticky-top fadeInDown');
            $('#res-btn').addClass('res-btn-left');
        }

        if ($(window).scrollTop() < 70) {
            $('#nav-sticky').removeClass('sticky-top fadeInDown');
            $('#res-btn').removeClass('res-btn-left');
        }
    });


    /*Scroll Top*/
    $('.scroll-to-top').hide();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-top').fadeIn();
        } else {
            $('.scroll-to-top').fadeOut();
        }
    });


    //Click event to scroll to top
    $('.scroll-to-top').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    $('#res-btn').click(function () {
        $('#sideNav').toggle();
        //$('#res-btn').toggleClass('res-btn-left');
        $('#nav-sticky').toggleClass('no-sidebar');
    });

    $('#res-close').click(function () {
        $('#sideNav').hide();
    });


    $(".custom-file-input").on("change", function () {
        var fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });



    //Search Container
    $("#search-btn").click(function () {
        $('#search-box-con').show();
    });
    $("#search-close-btn").click(function () {
        $('#search-box-con').hide();
    });


    // Sliders

    $('#home-banner-slider').owlCarousel({
        animateIn: 'fadeIn',
        items: 1,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true,
        loop: true,
        autoplay: true,
        dots: false,
        nav: true,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
    });




});