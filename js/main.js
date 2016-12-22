$(function () {
    $('.mobile-gallery').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows:true
                }
            },
        ]
    });
    $('.check-gallery-mobile').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows:true
                }
            },
        ]
    });

    $('.juresdiction-for').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true
    });

    $('.reviews-slider').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
        ]
    });
    $('.expert-gallery').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    });


    function galleryNavigate() {
        var navLinks = $('.gallery-for li');

        navLinks.click(function (e) {
            e.preventDefault();

            navLinks.removeClass('gallery-active');
            $(this).addClass('gallery-active');

            $('.juresdiction-for').slick('slickGoTo', parseInt($(this).index()));
        });

        $('.juresdiction-for').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            navLinks.removeClass('gallery-active');
            $(navLinks[nextSlide]).addClass('gallery-active');
        });
    }

    galleryNavigate();

    ;
    (function ($) {
        $(function () {
            $('.modal-request-btn').bind('click', function (e) {
                e.preventDefault();
                $('#modal-request').bPopup({
                    modalClose: true
                });
            });
            $('.modal-call-btn').bind('click', function (e) {
                e.preventDefault();
                $('#modal-call').bPopup({
                    modalClose: true
                });
            });
        });
    })(jQuery);

    var clock = $('.clock').FlipClock(8300, {
        countdown: true,
        language: 'ru-ru'
    });

    //mobile menu
    $('.mobile-btn').click(function (e) {
        e.preventDefault();
        $('.header_right').slideToggle(300);
        $('.mobile-btn').toggleClass('color-menu');
    })
});
