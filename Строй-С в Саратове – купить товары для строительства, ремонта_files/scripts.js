/* preloader */
function contentFadeInOnReady() {
    $('.bodyLoading').fadeOut(150);
    setTimeout(function () {
        $('.bodyLoading').remove();
    }, 151);
};

/* плавный якорь */
function anchor() {
    $('.anchorLink').on('click', function () {
        var el = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(el).offset().top
        }, 1000);
        return false;
    });
}

function stopScroll(item) {
    var documentWidth = parseInt(document.documentElement.clientWidth);
    var windowsWidth = parseInt(window.innerWidth);
    var scrollbarWidth = windowsWidth - documentWidth;
    $(item).attr("style", 'overflow: hidden; padding-right: ' + scrollbarWidth + 'px');
}

function freeScroll(item) {
    $(item).attr("style", '');
}

function popupAdd(productName, title, error) {
    errClass = (error) ? 'popupAddedToCard__error' : ''
    $('.popupAddedToCard').append("<div class='popupAddedToCard__item " + errClass + "'><h4" +
        " class='popupAddedToCard__title'>" + title + "</h4>" + productName + "</div>");
    popupEvent()

}
const filterSearch = (input, filter) => {
    var input = $(input);
    var filter = $(filter),
        text = filter.find('.bx-filter-param-text');
    input.on('input', function () {
        let val = $(this).val();
        text.closest(filter).hide(0);
        text.closest(filter).eq(5).show(0)

        if (val.length < 1) {
            text.closest(filter).hide();
        }
    });
}

function popupEvent() {
    var el = $('.popupAddedToCard__item');
    var cur = el.last();
    setTimeout(() => {
        closePopup(cur);
    }, 3000);

    $('.popupAddedToCard').on('click', '.popupAddedToCard__item', function () {
        closePopup($(this));
    });
}

function closePopup(item) {
    item.addClass('fadeOut').slideUp(500, function () {
        item.remove();
    });
}

function miniBasketCounter() {
    $('.nav__basketCounter').removeClass('nav__basketCounter-empty');
}

function subMenu(trigger, submenu) {
    $(trigger).on("click", function () {
        if ($(this).hasClass("loaded")) {
            if ($(this).hasClass("isOpen")) {
                $(this).removeClass("isOpen");
                $(submenu).removeClass("isOpen");
            } else {
                $(this).addClass("isOpen");
                $(submenu).addClass("isOpen");
            }
        } else {
            $.ajax({
                url: "/ajax/navigation.php",
                type: "GET",
                success: function (data) {
                    if (data.length > 0 && data != "") {
                        $(".nav__subMenu").html(data);
                        $(trigger).addClass("isOpen loaded");
                        $(submenu).addClass("isOpen");

                        $(".nav__subMenuLink").each(function () {
                            if (!$(this).siblings(".nav__subMenuLevel").length > 0) {
                                $(this).addClass("empty");
                            }
                        });
                        $(".nav__subMenuLevel-second").css({
                            height: $(submenu).height(),
                        });
                        $(".nav__subMenuItem-general").on("mouseenter", function () {
                            $(".nav__subMenuItem-general")
                                .removeClass("active")
                                .children(".nav__subMenuLevel")
                                .hide();
                            $(this).addClass("active").children(".nav__subMenuLevel").show();
                        });
                        $(document).on("mousedown", function (e) {
                            if (
                                !$(submenu).is(e.target) &&
                                $(submenu).has(e.target).length === 0 &&
                                !$(trigger).is(e.target) &&
                                $(trigger).has(e.target).length === 0
                            ) {
                                $(submenu).removeClass("isOpen");
                                $(trigger).removeClass("isOpen");
                                $(".nav__subMenuLevel-second").hide();
                            }
                        });
                    }
                },
                error: function (error) {
                    console.log(error);
                },
            });
        }
    });
}

const newMenuCategories = () => {
    const parent = document.querySelector('.nav__subMenu');
    const rightClose = document.querySelector('.new-nav__close');

    // фикс ошибки отображения страницы товара
    if (parent) {
        parent.addEventListener('mouseover', (e) => {
            document.body.classList.add('hideScrollBody');
            let element = e.target;
            if (element.classList.contains('new-nav__categories')) {
                $('.new-nav__categories').removeClass('active-categories')

                let elementDataIndex = element.getAttribute('data-index')
                element.classList.add('active-categories')
                let podCategoriya = parent.querySelector(`.new-nav__right--categoriya[data-index="${elementDataIndex}"]`)
                $('.new-nav__right--categoriya').removeClass('active')
                $(`.new-nav__categories[data-index="${elementDataIndex}"]`).addClass('active-categories')
                if (podCategoriya) {
                    podCategoriya.classList.toggle('active')
                }
            }

            if (element.closest('.new-nav__close')) {
                parent.classList.remove('isOpen')
                parent.previousElementSibling.classList.remove('isOpen')
                $("body").removeClass('no-scrolled');
                document.body.classList.remove('hideScrollBody');
            }
        })
    }
}

function slideTimer() {
    var owl = $(".header__carousel"),
        counter;

    function timerReset(c) {
        var timerParent = $(timer).parent("svg");
        $(timerParent).addClass("animate");
        counter = c;
        setTimeout(function () {
            $(timerParent).removeClass("animate");
            timer.attr("stroke-dashoffset", counter);
        }, 600);
    }

    owl.owlCarousel({
        lazyLoad: true,
        dotData: true,
        dotsContainer: '.dotsCont',
        loop: true,
        nav: true,
        navText: [
            '<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.279 20.3312L21.3733 15.277C21.7459 14.9077 22.3484 14.9077 22.721 15.277C23.093 15.6462 23.093 16.2446 22.721 16.6139L18.3 20.9997L22.721 25.3861C23.093 25.7554 23.093 26.3538 22.721 26.723C22.3484 27.0923 21.7459 27.0923 21.3732 26.723L16.279 21.6682C15.907 21.2989 15.907 20.7005 16.279 20.3312Z" fill="#8C0D18"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21 1C9.95431 1 1 9.9543 0.999999 21C0.999996 32.0457 9.9543 41 21 41C32.0457 41 41 32.0457 41 21C41 9.95431 32.0457 1.00001 21 1Z" stroke="#8C0D18"/></svg>',
            '<svg class="timer" xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 43 43" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.279 20.3312L21.3733 15.277C21.7459 14.9077 22.3484 14.9077 22.721 15.277C23.093 15.6462 23.093 16.2446 22.721 16.6139L18.3 20.9997L22.721 25.3861C23.093 25.7554 23.093 26.3538 22.721 26.723C22.3484 27.0923 21.7459 27.0923 21.3732 26.723L16.279 21.6682C15.907 21.2989 15.907 20.7005 16.279 20.3312Z" fill="#8C0D18"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21 1C9.95431 1 1 9.9543 0.999999 21C0.999996 32.0457 9.9543 41 21 41C32.0457 41 41 32.0457 41 21C41 9.95431 32.0457 1.00001 21 1Z" stroke="#8C0D18"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21 1C9.95431 1 1 9.9543 0.999999 21C0.999996 32.0457 9.9543 41 21 41C32.0457 41 41 32.0457 41 21C41 9.95431 32.0457 1.00001 21 1Z" stroke="#8C0D18"/></svg>',
        ],
        items: 1,
        smartSpeed: 1000,
        responsive: {
            0: {
                nav: false,
                dotData: false,
            },
            769: {
                nav: true,
                dotData: false,
            }
        }
    })
        .on("changed.owl.carousel", function () {
            timerReset(123);
        });

    var timer = $(".timer").find("path").eq(2),
        counter = 124,
        blocker = 0;

    /*  AUTOPLAY STOP ON HOVER  */
    $(".header__carousel").on("mouseenter", function () {
        blocker = 1;
    });
    $(".header__carousel").on("mouseleave", function () {
        blocker = 0;
    });

    /*  TIMER FUNCTION */
    function slideCounter() {
        counter++;
        timer.attr("stroke-dashoffset", counter);
        if (counter >= 246) {
            counter = 124;
            owl.trigger("next.owl.carousel");
        }
    }

    /* TIMER */
    window.setInterval(function () {
        if (blocker == 0) {
            slideCounter();
        }
    }, 100);
}

function owls() {
    $(".history__carousel").owlCarousel({
        lazyLoad: true,
        nav: true,
        navContainer: ".history .owl-nav",
        navText: [
            '<svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.20163 0.26136L6.7363 0.790752C6.91207 0.974294 7 1.18851 7 1.43315C7 1.68272 6.91207 1.89451 6.7363 2.0687L3.27186 5.5L6.73621 8.9313C6.91198 9.10549 6.99991 9.31728 6.99991 9.56677C6.99991 9.81149 6.91198 10.0257 6.73621 10.2092L6.20154 10.7317C6.02105 10.9106 5.80477 11 5.55288 11C5.29626 11 5.08243 10.9105 4.91138 10.7317L0.270877 6.13546C0.0902925 5.96596 0 5.75425 0 5.5C0 5.25051 0.0902925 5.03638 0.270877 4.85761L4.91138 0.26136C5.08724 0.0871782 5.30107 0 5.55288 0C5.80004 0 6.01624 0.0871782 6.20163 0.26136Z" fill="white"/></svg>',
            '<svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.20163 0.26136L6.7363 0.790752C6.91207 0.974294 7 1.18851 7 1.43315C7 1.68272 6.91207 1.89451 6.7363 2.0687L3.27186 5.5L6.73621 8.9313C6.91198 9.10549 6.99991 9.31728 6.99991 9.56677C6.99991 9.81149 6.91198 10.0257 6.73621 10.2092L6.20154 10.7317C6.02105 10.9106 5.80477 11 5.55288 11C5.29626 11 5.08243 10.9105 4.91138 10.7317L0.270877 6.13546C0.0902925 5.96596 0 5.75425 0 5.5C0 5.25051 0.0902925 5.03638 0.270877 4.85761L4.91138 0.26136C5.08724 0.0871782 5.30107 0 5.55288 0C5.80004 0 6.01624 0.0871782 6.20163 0.26136Z" fill="white"/></svg>',
        ],
        dots: false,
        items: 3,
        smartSpeed: 1000,
    });
    $(".items__carousel").owlCarousel({
        nav: true,
        navText: [
            '<svg class="animate" xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.279 20.3312L21.3733 15.277C21.7459 14.9077 22.3484 14.9077 22.721 15.277C23.093 15.6462 23.093 16.2446 22.721 16.6139L18.3 20.9997L22.721 25.3861C23.093 25.7554 23.093 26.3538 22.721 26.723C22.3484 27.0923 21.7459 27.0923 21.3732 26.723L16.279 21.6682C15.907 21.2989 15.907 20.7005 16.279 20.3312Z" fill="#8C0D18"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21 1C9.95431 1 1 9.9543 0.999999 21C0.999996 32.0457 9.9543 41 21 41C32.0457 41 41 32.0457 41 21C41 9.95431 32.0457 1.00001 21 1Z" stroke="#8C0D18"/></svg>',
            '<svg class="animate" xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.279 20.3312L21.3733 15.277C21.7459 14.9077 22.3484 14.9077 22.721 15.277C23.093 15.6462 23.093 16.2446 22.721 16.6139L18.3 20.9997L22.721 25.3861C23.093 25.7554 23.093 26.3538 22.721 26.723C22.3484 27.0923 21.7459 27.0923 21.3732 26.723L16.279 21.6682C15.907 21.2989 15.907 20.7005 16.279 20.3312Z" fill="#8C0D18"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21 1C9.95431 1 1 9.9543 0.999999 21C0.999996 32.0457 9.9543 41 21 41C32.0457 41 41 32.0457 41 21C41 9.95431 32.0457 1.00001 21 1Z" stroke="#8C0D18"/></svg>',
        ],
        dots: false,
        lazyLoad: true,
        autoHeight: false,
        items: 4,
        margin: 30,
        thumbs: false,
        smartSpeed: 1000,
    });
    $(".items__carousel .owl-item").css({
        transition: "1s all",
    });

    $(".detailContent__carousel").owlCarousel({
        lazyLoad: true,
        nav: false,
        // navText: [
        //   '<svg class="animate" xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.279 20.3312L21.3733 15.277C21.7459 14.9077 22.3484 14.9077 22.721 15.277C23.093 15.6462 23.093 16.2446 22.721 16.6139L18.3 20.9997L22.721 25.3861C23.093 25.7554 23.093 26.3538 22.721 26.723C22.3484 27.0923 21.7459 27.0923 21.3732 26.723L16.279 21.6682C15.907 21.2989 15.907 20.7005 16.279 20.3312Z" fill="#8C0D18"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21 1C9.95431 1 1 9.9543 0.999999 21C0.999996 32.0457 9.9543 41 21 41C32.0457 41 41 32.0457 41 21C41 9.95431 32.0457 1.00001 21 1Z" stroke="#8C0D18"/></svg>',
        //   '<svg class="animate" xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.279 20.3312L21.3733 15.277C21.7459 14.9077 22.3484 14.9077 22.721 15.277C23.093 15.6462 23.093 16.2446 22.721 16.6139L18.3 20.9997L22.721 25.3861C23.093 25.7554 23.093 26.3538 22.721 26.723C22.3484 27.0923 21.7459 27.0923 21.3732 26.723L16.279 21.6682C15.907 21.2989 15.907 20.7005 16.279 20.3312Z" fill="#8C0D18"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21 1C9.95431 1 1 9.9543 0.999999 21C0.999996 32.0457 9.9543 41 21 41C32.0457 41 41 32.0457 41 21C41 9.95431 32.0457 1.00001 21 1Z" stroke="#8C0D18"/></svg>',
        // ],
        dots: false,
        center: true,
        mouseDrag: true,
        autoHeight: false,
        video: true,
        items: 1,
        margin: 30,
        thumbs: true,
        thumbImage: true,
        thumbsPrerendered: true,
        thumbContainerClass: "owl-thumbs",
        thumbItemClass: "owl-thumb-item",
        smartSpeed: 1000,
    });

    // новый слайдер детальная страница
    // Инициализация превью слайдера
    const sliderThumbs = new Swiper(".slider__thumbs .swiper-container", {
        // ищем слайдер превью по селектору
        // задаем параметры
        direction: "vertical", // вертикальная прокрутка
        slidesPerView: 3, // показывать по 3 превью
        spaceBetween: 20, // расстояние между слайдами
        navigation: false,
        freeMode: true, // при перетаскивании превью ведет себя как при скролле
        breakpoints: {
            // условия для разных размеров окна браузера
            0: {
                // при 0px и выше
                direction: "horizontal" // горизонтальная прокрутка
            },
            768: {
                // при 768px и выше
                direction: "vertical" // вертикальная прокрутка
            }
        }
    });
    // Инициализация слайдера изображений
    const sliderImages = new Swiper(".slider__images .swiper-container", {
        // ищем слайдер превью по селектору
        // задаем параметры
        direction: "vertical", // вертикальная прокрутка
        slidesPerView: 1, // показывать по 1 изображению
        spaceBetween: 32, // расстояние между слайдами
        // mousewheel: true, // можно прокручивать изображения колёсиком мыши
        navigation: false,
        grabCursor: true, // менять иконку курсора
        thumbs: {
            // указываем на превью слайдер
            swiper: sliderThumbs // указываем имя превью слайдера
        },
        breakpoints: {
            // условия для разных размеров окна браузера
            0: {
                // при 0px и выше
                direction: "horizontal" // горизонтальная прокрутка
            },
            768: {
                // при 768px и выше
                direction: "vertical" // вертикальная прокрутка
            }
        }
    });

    $('.basket-tovar__carousel').owlCarousel({
        nav: true,
        navText: [
            '<svg class="animate" xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.279 20.3312L21.3733 15.277C21.7459 14.9077 22.3484 14.9077 22.721 15.277C23.093 15.6462 23.093 16.2446 22.721 16.6139L18.3 20.9997L22.721 25.3861C23.093 25.7554 23.093 26.3538 22.721 26.723C22.3484 27.0923 21.7459 27.0923 21.3732 26.723L16.279 21.6682C15.907 21.2989 15.907 20.7005 16.279 20.3312Z" fill="#8C0D18"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21 1C9.95431 1 1 9.9543 0.999999 21C0.999996 32.0457 9.9543 41 21 41C32.0457 41 41 32.0457 41 21C41 9.95431 32.0457 1.00001 21 1Z" stroke="#8C0D18"/></svg>',
            '<svg class="animate" xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.279 20.3312L21.3733 15.277C21.7459 14.9077 22.3484 14.9077 22.721 15.277C23.093 15.6462 23.093 16.2446 22.721 16.6139L18.3 20.9997L22.721 25.3861C23.093 25.7554 23.093 26.3538 22.721 26.723C22.3484 27.0923 21.7459 27.0923 21.3732 26.723L16.279 21.6682C15.907 21.2989 15.907 20.7005 16.279 20.3312Z" fill="#8C0D18"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21 1C9.95431 1 1 9.9543 0.999999 21C0.999996 32.0457 9.9543 41 21 41C32.0457 41 41 32.0457 41 21C41 9.95431 32.0457 1.00001 21 1Z" stroke="#8C0D18"/></svg>',
        ],
        dots: false,
        lazyLoad: true,
        autoHeight: false,
        items: 4,
        margin: 30,
        thumbs: false,
        smartSpeed: 1000,
    })
    $('.complect-carousel').owlCarousel({
        lazyLoad: true,
        nav: true,
        navText: [
            '<svg class="animate" xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.279 20.3312L21.3733 15.277C21.7459 14.9077 22.3484 14.9077 22.721 15.277C23.093 15.6462 23.093 16.2446 22.721 16.6139L18.3 20.9997L22.721 25.3861C23.093 25.7554 23.093 26.3538 22.721 26.723C22.3484 27.0923 21.7459 27.0923 21.3732 26.723L16.279 21.6682C15.907 21.2989 15.907 20.7005 16.279 20.3312Z" fill="#8C0D18"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21 1C9.95431 1 1 9.9543 0.999999 21C0.999996 32.0457 9.9543 41 21 41C32.0457 41 41 32.0457 41 21C41 9.95431 32.0457 1.00001 21 1Z" stroke="#8C0D18"/></svg>',
            '<svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M25.721 21.6688L20.6267 26.723C20.2541 27.0923 19.6516 27.0923 19.279 26.723C18.907 26.3538 18.907 25.7554 19.279 25.3861L23.7 21.0003L19.279 16.6139C18.907 16.2446 18.907 15.6462 19.279 15.277C19.6516 14.9077 20.2541 14.9077 20.6268 15.277L25.721 20.3318C26.093 20.7011 26.093 21.2995 25.721 21.6688Z" fill="#8C0D18"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21 41C32.0457 41 41 32.0457 41 21C41 9.95432 32.0457 1.00001 21 1.00001C9.95431 1 0.999997 9.9543 0.999993 21C0.999989 32.0457 9.95429 41 21 41Z" stroke="#8C0D18"/></svg>',
        ],
        dots: false,
        autoHeight: false,
        autoWidth: true,
        items: 6,
        margin: 16,
        thumbs: false,
        smartSpeed: 1000
    });
    $(".complect-tovar__slider").owlCarousel({
        lazyLoad: true,
        nav: true,
        navText: [
            '<svg class="animate" xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.279 20.3312L21.3733 15.277C21.7459 14.9077 22.3484 14.9077 22.721 15.277C23.093 15.6462 23.093 16.2446 22.721 16.6139L18.3 20.9997L22.721 25.3861C23.093 25.7554 23.093 26.3538 22.721 26.723C22.3484 27.0923 21.7459 27.0923 21.3732 26.723L16.279 21.6682C15.907 21.2989 15.907 20.7005 16.279 20.3312Z" fill="#8C0D18"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21 1C9.95431 1 1 9.9543 0.999999 21C0.999996 32.0457 9.9543 41 21 41C32.0457 41 41 32.0457 41 21C41 9.95431 32.0457 1.00001 21 1Z" stroke="#8C0D18"/></svg>',
            '<svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M25.721 21.6688L20.6267 26.723C20.2541 27.0923 19.6516 27.0923 19.279 26.723C18.907 26.3538 18.907 25.7554 19.279 25.3861L23.7 21.0003L19.279 16.6139C18.907 16.2446 18.907 15.6462 19.279 15.277C19.6516 14.9077 20.2541 14.9077 20.6268 15.277L25.721 20.3318C26.093 20.7011 26.093 21.2995 25.721 21.6688Z" fill="#8C0D18"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21 41C32.0457 41 41 32.0457 41 21C41 9.95432 32.0457 1.00001 21 1.00001C9.95431 1 0.999997 9.9543 0.999993 21C0.999989 32.0457 9.95429 41 21 41Z" stroke="#8C0D18"/></svg>',
        ],
        dots: false,
        center: true,
        mouseDrag: false,
        autoHeight: false,
        thumbs: false,
        items: 1,
        margin: 30,
        smartSpeed: 1000,
    });
    let chItems = document.querySelectorAll('.characteristics__item');
    if (chItems) {
        chItems.forEach(item => {
            let chButton = item.querySelector('.characteristics__title');
            let chContent = item.querySelector('.characteristics__description');

            chContent.style.height = chContent.scrollHeight + 'px';
            chButton.innerHTML = `
          Скрыть комплектующие
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.55732 0.239127L9.76921 4.60564C10.0769 4.92502 10.0769 5.44149 9.76921 5.76087C9.46148 6.07971 8.96281 6.07971 8.65509 5.76087L5.00026 1.97143L1.34491 5.76087C1.03719 6.07971 0.538518 6.07971 0.230794 5.76087C-0.0769312 5.44149 -0.0769312 4.92502 0.230794 4.60564L4.4432 0.239127C4.75093 -0.0797085 5.2496 -0.0797085 5.55732 0.239127Z" fill="#8C0D18"/>
          </svg>
          `;
            chButton.classList.toggle('active');
            chContent.classList.toggle('open');

            chButton.addEventListener('click', () => {
                if (chContent.classList.contains('open')) {
                    chContent.style.height = '';
                    chButton.innerHTML = `
          Дополнительные комплектующие
						<svg class="complect-tovar__arrow" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M4.44268 5.76087L0.230794 1.39436C-0.076931 1.07498 -0.076931 0.558508 0.230794 0.239126C0.538519 -0.0797088 1.03719 -0.0797088 1.34491 0.239126L4.99974 4.02857L8.65509 0.239126C8.96281 -0.0797088 9.46148 -0.0797088 9.76921 0.239126C10.0769 0.558508 10.0769 1.07498 9.76921 1.39436L5.5568 5.76087C5.24907 6.07971 4.7504 6.07971 4.44268 5.76087Z" fill="#8C0D18"/>
						</svg>
          `;
                } else {
                    chContent.style.height = chContent.scrollHeight + 'px';
                    chButton.innerHTML = `
          Скрыть комплектующие
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.55732 0.239127L9.76921 4.60564C10.0769 4.92502 10.0769 5.44149 9.76921 5.76087C9.46148 6.07971 8.96281 6.07971 8.65509 5.76087L5.00026 1.97143L1.34491 5.76087C1.03719 6.07971 0.538518 6.07971 0.230794 5.76087C-0.0769312 5.44149 -0.0769312 4.92502 0.230794 4.60564L4.4432 0.239127C4.75093 -0.0797085 5.2496 -0.0797085 5.55732 0.239127Z" fill="#8C0D18"/>
          </svg>
          `;
                }
                chButton.classList.toggle('active');
                chContent.classList.toggle('open');
            });
        });
    }


    /* var compareSlider = $('.compare__previewSlider').owlCarousel({
           lazyLoad: true,
           nav: true,
           navText: ['<svg class="animate" xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.279 20.3312L21.3733 15.277C21.7459 14.9077 22.3484 14.9077 22.721 15.277C23.093 15.6462 23.093 16.2446 22.721 16.6139L18.3 20.9997L22.721 25.3861C23.093 25.7554 23.093 26.3538 22.721 26.723C22.3484 27.0923 21.7459 27.0923 21.3732 26.723L16.279 21.6682C15.907 21.2989 15.907 20.7005 16.279 20.3312Z" fill="#8C0D18"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21 1C9.95431 1 1 9.9543 0.999999 21C0.999996 32.0457 9.9543 41 21 41C32.0457 41 41 32.0457 41 21C41 9.95431 32.0457 1.00001 21 1Z" stroke="#8C0D18"/></svg>', '<svg class="animate" xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.279 20.3312L21.3733 15.277C21.7459 14.9077 22.3484 14.9077 22.721 15.277C23.093 15.6462 23.093 16.2446 22.721 16.6139L18.3 20.9997L22.721 25.3861C23.093 25.7554 23.093 26.3538 22.721 26.723C22.3484 27.0923 21.7459 27.0923 21.3732 26.723L16.279 21.6682C15.907 21.2989 15.907 20.7005 16.279 20.3312Z" fill="#8C0D18"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21 1C9.95431 1 1 9.9543 0.999999 21C0.999996 32.0457 9.9543 41 21 41C32.0457 41 41 32.0457 41 21C41 9.95431 32.0457 1.00001 21 1Z" stroke="#8C0D18"/></svg>'],
           dots: false,
           mouseDrag: false,
           autoHeight: false,
           items: 4,
           margin: 30,
           thumbs: false,
           smartSpeed: 1000,
           navContainer: ('.compare__previewSlider')
       });*/

    function sliderReIndex() {
        $(".compare__previewSlider .owl-item").each(function (i, el) {
            $(this).attr("data-index", i);
            compareSlider.trigger("refresh.owl.carousel");
        });
    }

    sliderReIndex();
    $(".compare__previewSlider .compare__previewItemImage").on(
        "click",
        function (e) {
            e.preventDefault();
            let clone = $(this).closest(".owl-item").clone(),
                item = clone.find(".compare__previewItem");

            item.addClass("compare__previewItemLoader");
            compareSlider.trigger("add.owl.carousel", [clone, 0]);
            sliderReIndex();
        }
    );
    $(".compare__previewSlider").on(
        "click",
        ".compare__previewItemRemoveBtn",
        function () {
            let index = $(this).closest(".owl-item").attr("data-index");
            compareSlider.trigger("remove.owl.carousel", index);
            sliderReIndex();
        }
    );
    $(".compare__previewSlider .owl-item").css({
        transition: "1s all",
    });
}

function switcher(button, item) {
    $(button).on("click", function () {
        $(this).toggleClass("active");
        $(item).slideToggle();
    });
}

// sript.js



function moreContent(button, content, wrap) {
    $(document).on('click', button, function () {
        var height = $(wrap).height();
        if (!$(this).hasClass('isOpen')) {
            $(this).addClass('isOpen').find('.textContent__moreText').text('Скрыть')
            $(content).addClass('isOpen').css({
                "max-height": height
            });
        } else {
            $(content).removeClass('isOpen').css({
                "max-height": "8rem"
            });
            $(this).removeClass('isOpen').find('.textContent__moreText').text('Читать полностью')
        }
    });
}

/* INPUT TYPE FILE */
function attachFile(inputClass) {
    var items = document.querySelectorAll(inputClass);
    items.forEach(function (item) {
        item.addEventListener("click", function () {
            var input = this;
            var label = input.previousElementSibling,
                labelVal = label.innerHTML;
            input.addEventListener("change", function (e) {
                var fileName = "";
                if (this.files && this.files.length > 1) {
                    var arr = [];
                    for (var i = 0; i < this.files.length; i++) {
                        arr.push(this.files[i].name);
                    }
                    var filesString = arr.join(", ");
                    fileName = (this.getAttribute("data-multiple-caption") || "").replace(
                        "{count}",
                        filesString
                    );
                } else fileName = e.target.value.split("\\").pop();
                if (fileName) label.innerHTML = fileName;
                else label.innerHTML = labelVal;
            });
        });
    });
}

function hashTabs(buttons, windows) {
    var button = $(buttons).children("button"),
        window = $(windows).children(),
        active = "tabItem-active",
        length = $(button).length,
        index,
        hash = location.hash;

    for (var i = 0; i < length; i++) {
        $(button[i]).attr("data-index", i + 1);
        $(window[i]).attr("data-index", i + 1);
    }

    if (hash > "") {
        var hashID = hash.replace("#", "");
        $(button)
            .filter("[data-index = " + hashID + "]")
            .addClass(active);
        addActiveTab(hashID);
    } else {
        $(button).eq(0).addClass(active);
        addActiveTab(1);
    }

    function addActiveTab(i) {
        $(window)
            .filter("[data-index = " + i + "]")
            .addClass("tabContent-active");
        setTimeout(function () {
            $(".tabContent-active").addClass("tabContent-visible");

        }, 100);
    }

    $(button).on("click", function () {
        if (!$(this).hasClass(active)) {
            index = $(this).attr("data-index");
            location.hash = index;
            $(button).removeClass(active);
            $(this).addClass(active);
            $(window).removeClass("tabContent-active tabContent-visible");
            addActiveTab(index);
        }
    });
}

function tabs(buttons, windows) {
    var button = $(buttons).children("button"),
        window = $(windows).children(),
        active = "tabItem-active",
        length = $(button).length,
        index;

    for (var i = 0; i < length; i++) {
        $(button[i]).attr("data-index", i + 1);
        $(window[i]).attr("data-index", i + 1);
    }

    $(button).eq(0).addClass(active);
    addActiveTab(1);

    function addActiveTab(i) {
        $(window)
            .filter("[data-index = " + i + "]")
            .addClass("tabContent-active");
        setTimeout(function () {
            var maxh = $(windows).find(".tabContent-active").height();
            $(windows).css({
                "min-height": maxh,
            });
            $(window)
                .filter("[data-index = " + i + "]")
                .find("input")
                .attr("disabled", false);
            $(".tabContent-active").addClass("tabContent-visible");
        }, 1);
    }

    $(button).on("click", function () {
        if (!$(this).hasClass(active)) {
            index = $(this).attr("data-index");
            $(button).removeClass(active);
            $(this).addClass(active);
            $(window).removeClass("tabContent-active tabContent-visible");
            $(window)
                .filter("[data-index != " + index + "]")
                .find("input")
                .attr("disabled", true);
            addActiveTab(index);
        }
    });
}

function feedBackFormFade() {
    var active = "feedback__addBtn-active",
        form = ".feedback__form",
        formH = $(form).height();

    $(".feedback__addBtn").on("click", function () {
        if ($(this).hasClass(active)) {
            $(this).removeClass(active);
            $(form).removeClass("feedback__form-up").css({
                "max-height": "0",
            });
            $(".feedback__input").blur();
        } else {
            $(this).addClass(active);
            $(form).addClass("feedback__form-up").css({
                "max-height": "400px",
            });
            $(".feedback__input").eq(0).focus();
        }
    });
}

function authPops() {
    /* closing */
    // $(".ajax").on("click", ".authorization__closeBtn", function () {
    //     $(this).closest(".authorization__widnow").fadeOut(200, function () {
    //     });
    // });
    // $("#auth-popup").on("click", ".authorization__closeBtn", function () {
    //     $(this).closest(".authorization__widnow").fadeOut(200, function () {
    //     });
    //     if ($('.mobile-header__profile')) {
    //         $('body').removeClass('fixed-scroll')
    //         $('.mobile-header__profile').find('.open-menu').removeClass('active')
    //     }
    // });
    // $(document).on("mousedown", function (e) {
    //     if (
    //         !$(".authorization__widnow").is(e.target) &&
    //         $(".authorization__widnow").has(e.target).length === 0
    //     ) {
    //         $(".authorization__widnow").fadeOut(200, function () {
    //             $(".ajax").empty();
    //         });
    //     }
    // });
}

function confirmSign(key, callback) {
    if (window.location.hash === key) {
        $(".authorization-message").fadeIn();
        if (callback) {
            callback();
        }
        window.location.hash = "";
        return false;
    }
}

function recoverChoose() {
    $(".authorization__recoverChoiseBtn").on("click", function () {
        var name = $(this).attr("data-for");
        $(".authorization__submit-recover").attr("form", name);
    });
}

function movingActive(parent, line) {
    var item = $(parent).children("button");

    function activeChange() {
        var offsetBody = $(parent).offset().left,
            widthItem = $(item).filter(".tabItem-active").width(),
            offsetItem = $(item).filter(".tabItem-active").offset().left - offsetBody;
        if (offsetItem < 0) {
            offsetItem = 0;
        } else {
            $(line).css({
                width: widthItem,
                left: offsetItem,
            });
        }
    }

    $(item).on("click", function () {
        if (!$(this).hasClass(".tabItem-active")) {
            $(this).addClass("tabItem-active");
            activeChange();
        }
    });
    setTimeout(function () {
        activeChange();
        $(line).css({
            display: "block",
        });
    }, 300);
}

function hideContent(button, content) {
    var content = $(content);
    $(button).on("click", function () {
        var height = content.height(),
            parent = content.parent();
        if (!$(this).hasClass("isOpen")) {
            $(this).addClass("isOpen");
            parent
                .addClass("isOpen")
                .css({
                    height: height,
                })
                .find("input")
                .attr("disabled", false);
        } else {
            parent
                .removeClass("isOpen")
                .css({
                    height: 0,
                })
                .find("input")
                .attr("disabled", true);
            $(this).removeClass("isOpen");
        }
    });
}

function toggleListInfo(button, content) {
    var content = $(content);
    $(document).on("click", $(button), function () {
        if ($(this).hasClass("isOpen")) {
            $(this).removeClass("isOpen");
            $(this).siblings(content).slideUp();
        } else {
            $(this).siblings(content).slideDown();
            $(this).addClass("isOpen");
        }
    });
}

function hideUnCheckedContent(checkbox, content) {
    var content = $(content);
    if ($(checkbox).prop("checked")) {
        var height = content.height(),
            parent = content.parent();
        if ($(checkbox).prop("checked")) {
            $(checkbox).prop("checked", true);
            $(checkbox).addClass("isOpen");
            parent
                .addClass("isOpen")
                .css({
                    height: height,
                })
                .find("input")
                .attr("disabled", false);
        } else {
            parent
                .removeClass("isOpen")
                .css({
                    height: 0,
                })
                .find("input")
                .attr("disabled", true);
            $(checkbox).prop("checked", false);
            $(checkbox).removeClass("isOpen");
        }
    }
    $(checkbox).on("click", function () {
        var height = content.height(),
            parent = content.parent();
        if ($(this).prop("checked")) {
            $(this).prop("checked", true);
            $(this).addClass("isOpen");
            parent
                .addClass("isOpen")
                .css({
                    height: height,
                })
                .find("input")
                .attr("disabled", false);
        } else {
            parent
                .removeClass("isOpen")
                .css({
                    height: 0,
                })
                .find("input")
                .attr("disabled", true);
            $(this).prop("checked", false);
            $(this).removeClass("isOpen");
        }
    });
}

function datepicker(input) {
    $(input).on("focus", function () {
        $(this).siblings(".datepicker").fadeIn();
    });
    $(".datepicker__close").on("click", function () {
        $(".datepicker").fadeOut(200);
    });

    $(document).on("mousedown", function (e) {
        if (
            !$(input).parent().is(e.target) &&
            $(input).parent().has(e.target).length === 0
        ) {
            $(".datepicker").fadeOut(200);
        }
    });
}

function modalOpen(trigger, modal) {
    $(trigger).on("click", function () {
        stopScroll("body");
        $(modal).fadeIn().css({
            display: "flex",
        });
    });
}

function popOpen(trigger, modal) {
    $("body").on("click", trigger, function () {
        $(modal).fadeIn().css({
            display: "flex",
        });
        $('body').addClass('fixed-scroll')
    });
    // $(document).on("mousedown", function (e) {
    //     if (!$(modal).is(e.target) && $(modal).has(e.target).length === 0) {
    //         $(modal).fadeOut();
    //         if($(modal).hasClass('feedback-call')){
    //             $('body').removeClass('fixed-scroll')
    //         }
    //     }
    // });
}

function modalClose(btn, modal) {
    $(btn).on("click", function () {
        $(this).closest(modal).fadeOut();
        $("body").attr("style", "");
        $('body').removeClass('fixed-scroll')
    });
}

function escClosing() {
    $(document).keydown(function (e) {
        if (e.keyCode === 27) {
            $(".modal").fadeOut();
            $(".popup").fadeOut();
            $("body").attr("style", "");

            $(".authorization__widnow").fadeOut(200, function () {
                $(".ajax").empty();
            });

            return false;
        }
    });
}

function orderDetail() {
    $(".lk__historyMoreBtn").on("click", function () {
        var serial = $(this).attr("data-serial");
        stopScroll(".orderDetail");
        $(".orderDetail").fadeIn(400);
    });
}

function basketPrint(button, printble) {
    $(button).on("click", function () {
        window.print();
    });
}

function selectInput(parent) {
    var parent = $(parent),
        activeClass = "isOpen",
        currentClass = "current",
        btn = parent.find("button"),
        item = parent.find("div"),
        itemH,
        itemL,
        parentH,
        input = parent.find("input");

    item.eq(0).addClass(currentClass);
    input.val(item.eq(0).text().replace(/\s+/g, ""));

    function closeSelect() {
        parent
            .removeClass(activeClass)
            .height(itemH)
            .find(btn)
            .removeClass(activeClass);
        parent.scrollTop(0);
    }

    btn.on("click", function () {
        (itemL = item.length + 1), (itemH = item.height()), (parentH = itemL * itemH);
        if (parentH > 420) {
            parentH = 420;
        }
        if ($(this).hasClass(activeClass)) {
            closeSelect();
        } else {
            $(this)
                .addClass(activeClass)
                .closest(parent)
                .addClass(activeClass)
                .height(parentH);
        }
    });
    item.on("click", function () {
        // удалить дефолтное при выборе айтама
        if ($(".order__pointOption-default")) {
            $(".order__pointOption-default").remove();
        }

        item.removeClass(currentClass);
        $(this).addClass(currentClass);
        if ($(this).hasClass("order__pointOption")) {
            var val = $(this).attr("data-id");
            input.val(val);
        } else {
            val = $(this).text().replace(/\s+/g, "");
            input.val(val);
        }
        closeSelect();
    });
    $(document).on("mousedown", function (e) {
        if (!parent.is(e.target) && parent.parent().has(e.target).length === 0) {
            closeSelect();
        }
    });
}

// ORDER
function moreOptions(check, valid, show) {
    var check = $(check);
    check.on("click", function () {
        var showH = $(show).children().height();
        if ($(this).hasClass(valid)) {
            $(show).addClass("isOpen").css({
                height: showH,
            });
        } else {
            $(show).removeClass("isOpen").css({
                height: 0,
            });
        }
    });
}

function yandexMapSelf(id) {
    var selector = $("#" + id),
        point = $(".order__pointOption");

    function init() {
        var myMap = new ymaps.Map(id, {
            center: [51.585457, 45.946078],
            zoom: 10,
            controls: ["zoomControl"],
            multiTouch: false,
        }),
            // Создаем коллекцию.
            myCollection = new ymaps.GeoObjectCollection(),
            // Создаем массив с данными.
            myPoints;

        point.each(function (index, el) {
            myPoints = [
                {
                    coords: [$(this).attr("data-gps-n"), $(this).attr("data-gps-s")],
                    text: $(this).text().trim(),
                    schedule: $(this).attr("data-schedule"),
                    phone: $(this).attr("data-phone"),
                    id: $(this).attr("data-id"),
                },
            ];

            // Основной скрипт для генерации данные
            for (var i = 0, l = myPoints.length; i < l; i++) {
                var point = myPoints[i],
                    // Создание теймплейта для балуна и его функции
                    BalloonTemplate = ymaps.templateLayoutFactory.createClass(
                        '<div class="balloonTamplate" data-index=' +
                        point.id +
                        ">" +
                        '<button class="balloonClose"></button>' +
                        '<h4 class="balloonTitle">' +
                        point.text +
                        "</h4>" +
                        '<span class="balloonDescription">' +
                        point.schedule +
                        "</span>" +
                        '<a href="tel:' +
                        point.phone +
                        '" class="balloonDescription">' +
                        point.phone +
                        "</a>" +
                        '<button class="balloonChoiseBtn" type="button">Заберу отсюда</button>' +
                        "</div>",
                        {
                            build: function () {
                                this.constructor.superclass.build.call(this);

                                this._$element = $(".balloonTamplate", this.getParentElement());

                                $(".balloonClose").click(function () {
                                    myMap.balloon.close();
                                    $(".yandexPlaceMark").removeClass("active");
                                });
                            },
                            getShape: function () {
                                if (!this._isElement(this._$element)) {
                                    return BalloonTemplate.superclass.getShape.call(this);
                                }
                                var position = this._$element.position();
                                return new ymaps.shape.Rectangle(
                                    new ymaps.geometry.pixel.Rectangle([
                                        [position.left, position.top],
                                        [
                                            position.left + this._$element[0].offsetWidth,
                                            position.top + this._$element[0].offsetHeight,
                                        ],
                                    ])
                                );
                            },
                            _isElement: function (element) {
                                return element && element[0];
                            },
                        }
                    );

                // Темплейт для плейсмарка
                var markLayout = ymaps.templateLayoutFactory.createClass(
                    [
                        " <svg data-index=" +
                        point.id +
                        ' class="yandexPlaceMark" xmlns="http://www.w3.org/2000/svg" width="34" height="44" viewBox="0 0 34 45" fill="none">',
                        '<path d="M15.2529 44.0921C2.38797 25.5789 0 23.6789 0 16.875C0 7.55516 7.61113 0 17 0C26.3889 0 34 7.55516 34 16.875C34 23.6789 31.612 25.5789 18.7471 44.0921C17.9029 45.3027 16.0971 45.3026 15.2529 44.0921ZM17 23.9062C20.912 23.9062 24.0833 20.7583 24.0833 16.875C24.0833 12.9917 20.912 9.84375 17 9.84375C13.088 9.84375 9.91667 12.9917 9.91667 16.875C9.91667 20.7583 13.088 23.9062 17 23.9062Z" fill="#8C0D18"/>                ',
                        '<path fill-rule="evenodd" clip-rule="evenodd" d="M10.4976 34.712C12.1749 37.0836 14.152 39.8794 16.4835 43.2345C16.7308 43.5885 17.2691 43.5885 17.5164 43.2345C19.8479 39.8794 21.8251 37.0836 23.5024 34.712C26.4882 30.4899 28.5235 27.612 29.915 25.3153C30.9826 23.5532 31.614 22.2211 31.9885 20.9658C32.3595 19.7222 32.5 18.4815 32.5 16.875C32.5 8.39401 25.5709 1.5 17 1.5C8.4291 1.5 1.5 8.39401 1.5 16.875C1.5 18.4815 1.64053 19.7222 2.01153 20.9658C2.38604 22.2211 3.01742 23.5532 4.08501 25.3153C5.47652 27.612 7.51179 30.4899 10.4976 34.712ZM18.7471 44.0921C21.0416 40.7903 23.0028 38.0169 24.6766 35.6499C32.3879 24.7452 34 22.4654 34 16.875C34 7.55516 26.3889 0 17 0C7.61113 0 0 7.55516 0 16.875C0 22.4654 1.61214 24.7452 9.32341 35.6499C10.9972 38.0169 12.9584 40.7903 15.2529 44.0921C16.0971 45.3026 17.9029 45.3027 18.7471 44.0921ZM25.5833 16.875C25.5833 21.5971 21.73 25.4062 17 25.4062C12.27 25.4062 8.41667 21.5971 8.41667 16.875C8.41667 12.1529 12.27 8.34375 17 8.34375C21.73 8.34375 25.5833 12.1529 25.5833 16.875ZM24.0833 16.875C24.0833 20.7583 20.912 23.9062 17 23.9062C13.088 23.9062 9.91667 20.7583 9.91667 16.875C9.91667 12.9917 13.088 9.84375 17 9.84375C20.912 9.84375 24.0833 12.9917 24.0833 16.875Z" fill="white"/>                ',
                        "</svg>",
                    ].join("")
                );

                // Создание плейсмарков, передача айди и теймплейта
                var pm = new ymaps.Placemark(
                    point.coords,
                    {},
                    {
                        balloonLayout: BalloonTemplate,
                        iconLayout: markLayout,
                        dataId: point.id,
                        hideIconOnBalloonOpen: false,
                        iconShape: {
                            type: "Rectangle",
                            coordinates: [
                                [-25, -50],
                                [25, 0],
                            ],
                        },
                    }
                );
                myCollection.add(pm);
            }

            // Добавляем коллекцию меток на карту.
            myMap.geoObjects.add(myCollection);

            pm.events.add("click", function (e) {
                setTimeout(() => {
                    var dataIndex = $("#mapSelf")
                        .find(".balloonTamplate")
                        .attr("data-index");
                    $(".yandexPlaceMark").removeClass("active");
                    $(".yandexPlaceMark")
                        .filter("[data-index=" + dataIndex + "]")
                        .addClass("active");
                }, 100);
            });

            // по клику списка активировать соответствующий балун и центрирование карты по нему
            var pt = $(".order__pointOption");
            pt.on("click", function () {
                var id = $(this).attr("data-id"),
                    index = pm.options._options.dataId;
                if (index == id) {
                    var posX = Number(pm.geometry._coordinates[0]);
                    var posY = Number(pm.geometry._coordinates[1]);

                    myMap.setCenter([posX, posY], 16, {
                        checkZoomRange: true,
                        duration: 300,
                    });
                    setTimeout(function () {
                        pm.balloon.open(id);
                    }, 650);
                    setTimeout(() => {
                        $(".yandexPlaceMark").removeClass("active");
                        $(".yandexPlaceMark")
                            .filter("[data-index=" + id + "]")
                            .addClass("active");
                    }, 100);
                }
            });
        });
        ctrlZoomMap(myMap, selector);
    }

    ymaps.ready(init);

    // ВЫБОР АДРЕСА МАГАЗИНА ИЗ СПИСКА

    selector.on("click", ".balloonChoiseBtn", function () {
        var id = $(this).closest(".balloonTamplate").attr("data-index");
        // Удаление дефолтного значения если оно есть
        if ($(".order__pointOption-default")) {
            $(".order__pointOption-default").remove();
        }
        if ($(".order__pointOption.current").attr("data-id") !== id) {
            point.removeClass("current");
            point.filter('[data-id="' + id + '"]').addClass("current");
        }
        $('.order__pointInput').attr('value', id)
        $(this).closest('.balloonTamplate').hide();
    });
}

const clearAddRessDelivery = () => {
    $('#gis2geoStreet').val('')
    $('#gis2geoStreet').attr('value', '')

    $('#geoStreet').val('')
    $('#geoStreet').attr('value', '')

    $('#geoHouse').val('')
    $('#geoHouse').attr('value', '')

    $('input[name="COORD_X"]').val('')
    $('input[name="COORD_X"]').attr('value', '')

    $('input[name="COORD_Y"]').val('')
    $('input[name="COORD_Y"]').attr('value', '')

    $('input[name="distance"]').val('')
    $('input[name="distance"]').attr('value', '')
}

function yandexMapDelivery(id) {
    const keyAPI = 'b56c615c-a111-41a9-879d-a4c4af71a173'
    const reqUrl = `https://routing.api.2gis.com/get_dist_matrix?key=${keyAPI}&version=2.0`;
    // создание карты
    if ($('#deliveryMap').length > 0) {
        var map
        DG.then(function () {
            map = DG.map('deliveryMap', {
                center: [51.530750, 46.012553],
                zoom: 10,
                key: keyAPI,
            });
            // массив точек на карте
            var markersArr = [];
            // получаем адрес, координаты выбранной точки при клике по карте
            const getPlaceData = (address) => {
                fetch(`https://catalog.api.2gis.com/3.0/items/geocode?lat=${address.lat}&lon=${address.lng}&fields=items.point&key=${keyAPI}`,
                    {
                        method: "GET",
                    })
                    .then((res) => res.json())
                    .then((parsed) => {
                        if (parsed['result']) {
                            const coordinates = parsed['result']['items'][0]['point'];
                            const namePlace = parsed['result']['items'][0]['address_name'];
                            if (namePlace == undefined) {
                                return
                            }

                            // меняем инпут города
                            if ($('input[name="geoCity"]').val().split(',')[0] != parsed['result']['items'][0]['full_name'].split(',')[0]) {
                                const newPost = {
                                    nameCity: parsed['result']['items'][0]['full_name'].split(',')[0],
                                    nameRegion: parsed['result']['items'][parsed['result']['items'].length - 1]['full_name'].split(',')[0]
                                }
                                $('input[name="geoCity"]').attr('oblast', parsed['result']['items'][parsed['result']['items'].length - 1]['full_name'].split(',')[0])
                                let newPostParams = new FormData();
                                newPostParams.set('nameCity', newPost.nameCity);
                                newPostParams.set('nameRegion', newPost.nameRegion);
                                fetch(`/ajax/order-check-map-city.php`, {
                                    method: "POST",
                                    body: newPostParams,
                                })
                                    .then((res) => res.json())
                                    .then((parsed) => {

                                        // если нашлось - тогда
                                        if (parsed.id && parsed.name) {

                                            $('input[name="geoCity"]').val(parsed.name)
                                            $('input[name="geoCity"]').attr('value', parsed.name)


                                            $('input[name="location-id"]').val(parsed.id)
                                            $('input[name="location-id"]').attr('value', parsed.id)

                                            const cityId = $('input[name="location-id"]').val()
                                            console.log(cityId)
                                            $('input[name="deliveryRadio"]').each(function (index) {
                                                calculateTypeDelivery($(this).val(), cityId)
                                            })
                                        } else {
                                            $('input[name="geoCity"]').attr('goodCity', '')
                                            $('input[name="geoCity"]').val(parsed['result']['items'][0]['full_name'].split(',')[0])
                                            $('input[name="geoCity"]').attr('value', parsed['result']['items'][0]['full_name'].split(',')[0])
                                        }

                                    })
                                    .catch(function () {
                                        $('input[name="geoCity"]').val(parsed['result']['items'][0]['full_name'].split(',')[0])
                                        $('input[name="geoCity"]').attr('value', parsed['result']['items'][0]['full_name'].split(',')[0])
                                    });
                            } else {
                                $('input[name="geoCity"]').val(parsed['result']['items'][0]['full_name'].split(',')[0])
                                $('input[name="geoCity"]').attr('value', parsed['result']['items'][0]['full_name'].split(',')[0])
                            }

                            $('input[name="geoCity"]').attr('geo', `[${coordinates.lat}, ${coordinates.lon}]`)
                            // задаем область для центровки карты
                            let northArray = [Number(coordinates['lon']) + 0.001500, Number(coordinates['lat'] + 0.001500)]
                            let southWestArray = [Number(coordinates['lon']) - 0.001500, Number(coordinates['lat'] - 0.001500)]
                            // map.panTo([Number(coordinates['lat']), Number(coordinates['lon'])]);
                            map.fitBounds([
                                [Number(coordinates['lat'] + 0.001500), Number(coordinates['lon'])],
                                [Number(coordinates['lat'] - 0.001500), Number(coordinates['lon'])]
                            ])

                            markersArr = [];

                            // добавляем новую метку
                            const marker1 = DG.popup()
                                .setLatLng([Number(coordinates['lat']), Number(coordinates['lon'])])
                                .setContent(`
                        <p>${namePlace}</p>
                        <button class="button get-dostavka" type="button">Доставить сюда</button>
                    `)
                                .openOn(map)


                            $('.get-dostavka').on('click', (e) => {
                                e.preventDefault()
                                const placeAddress = e.target.previousElementSibling.innerHTML
                                $('#gis2geoStreet').val(placeAddress)
                                $('#gis2geoStreet').attr('value', placeAddress)
                                const addressArray = placeAddress.split(',')
                                $('#geoStreet').attr('value', addressArray[addressArray.length - 2].trim())
                                $('#geoStreet').val(addressArray[addressArray.length - 2].trim())
                                $('#geoHouse').attr('value', addressArray[addressArray.length - 1].trim())
                                $('#geoHouse').val(addressArray[addressArray.length - 1].trim())
                                // записываем координаты пользователя
                                $('input[name="COORD_X"]').attr('value', coordinates['lon'])
                                $('input[name="COORD_Y"]').attr('value', coordinates['lat'])
                                // получаем координаты склада
                                const storeLat = $('input[name="store-y"]').attr('value')
                                const storeLon = $('input[name="store-x"]').attr('value')
                                // точки маршрута
                                const points = [
                                    {
                                        lat: Number(storeLat),
                                        lon: Number(storeLon),
                                    },
                                    {
                                        lat: Number(coordinates['lat']),
                                        lon: Number(coordinates['lon']),
                                    },
                                ];
                                // считаем расстояние
                                $('.get-dostavka').remove();
                                fetch('https://routing.api.2gis.com/get_dist_matrix?key=b56c615c-a111-41a9-879d-a4c4af71a173&version=2.0', {
                                    method: 'POST',
                                    body: JSON.stringify({
                                        points,
                                        sources: [0],
                                        targets: [1],
                                        mode: 'truck',
                                        start_time: new Date().toISOString(),
                                    }),
                                })
                                    .then((res) => res.json())
                                    .then((parsed) => {
                                        if (parsed.routes[0].distance) {
                                            const distance = parsed.routes[0].distance / 1000;
                                            $('input[name="distance"]').val(distance);
                                            $('.popup-content .button').remove()

                                            const cityId = $('input[name="location-id"]').val()
                                            console.log(cityId)
                                            $('input[name="deliveryRadio"]').each(function (index) {
                                                calculateTypeDelivery($(this).val(), cityId)
                                            })
                                        }
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    });
                            });
                            markersArr.push(marker1)
                        }
                    })
            }
            map.on('click', (e) => {
                getPlaceData(e.latlng)
            });

            // из полученного списка городов центрируем карту
            $(document).on('click', '.order-city-input-search .order-search-box__item', function () {
                clearAddRessDelivery()
                const placeAddress = $(this).text()

                $('input[name="geoCity"]').attr('value', placeAddress)
                $('input[name="geoCity"]').val(placeAddress)

                $('input[name="location-id"]').attr('value', $(this).attr('data-id'))
                $('input[name="location-id"]').val($(this).attr('data-id'))

                const cityId = $('input[name="location-id"]').val()
                console.log(cityId)

                $('input[name="deliveryRadio"]').each(function (index) {
                    calculateTypeDelivery($(this).val(), cityId)
                })

                // получение координат города
                fetch(`https://catalog.api.2gis.com/3.0/items/geocode?q=${placeAddress}&fields=items.point,items.adm_div&key=${keyAPI}`,
                    {
                        method: "GET",
                    })
                    .then((res) => res.json())
                    .then((parsed) => {
                        if (parsed['result']) {
                            const coordinates = parsed['result']['items'][0]['point'];
                            $('input[name="geoCity"]').attr('geo', `[${coordinates.lat}, ${coordinates.lon}]`)
                            $('input[name="geoCity"]').attr('oblast', parsed['result']['items'][0].adm_div[1].name)
                            // задаем область для центровки карты
                            let northArray = [Number(coordinates['lon']) + 0.001500, Number(coordinates['lat'] + 0.001500)]
                            let southWestArray = [Number(coordinates['lon']) - 0.001500, Number(coordinates['lat'] - 0.001500)]
                            map.fitBounds([
                                [Number(coordinates['lat'] + 0.001500), Number(coordinates['lon'])],
                                [Number(coordinates['lat'] - 0.001500), Number(coordinates['lon'])]
                            ])
                            map.setZoom(10)
                            markersArr = [];

                        }
                    })
            })

           
            

            // получение списка улиц от 2гис
            $(document).on('focus input', '#gis2geoStreet', delay(function (e) {
                $('.order-search-box-street').stop(true, true);
                // ключ к API
                const keyAPI = 'b56c615c-a111-41a9-879d-a4c4af71a173'
                // название города
                let cityAddress = $('input[name="geoCity"]').val()
                const oblast = $('input[name="geoCity"]').attr('oblast')
                // значение инпута улицы
                let streetSearch = $(this).val();

                let cityLocationId = $('input[name="location-id"]').val();
                if (streetSearch.length > 1 && cityLocationId) {
                    // получение координат города
                    fetch(`https://catalog.api.2gis.com/3.0/items/geocode?q=${oblast}&fields=items.point&radius=1000&key=${keyAPI}`,
                        {
                            method: "GET",
                        })
                        .then((res) => res.json())
                        .then((parsed) => {
                            if (parsed['result']) {
                                const coordinates = parsed['result']['items'][0]['point'];
                                $('input[name="geoCity"]').attr('geo', `[${coordinates.lat}, ${coordinates.lon}]`)
                                let city = $('input[name="geoCity"]').val()
                                // получение списка улиц
                                const searchURL = `https://catalog.api.2gis.com/3.0/suggests?q=${oblast}, ${streetSearch}&fields=items.address,items.point&key=${keyAPI}`
                                fetch(searchURL,
                                    {
                                        method: "GET",
                                    })
                                    .then((res) => res.json())
                                    .then((parsed) => {
                                        let parsedResult = parsed['result'].items
                                        $('.order-search-box-street').empty()
                                        $('.order-search-box-street').show()
                                        parsedResult.forEach(function (element, index) {
                                            if (element.address != undefined) {
                                                if (element.building_name != undefined && element.full_name != undefined) {
                                                    $('.order-search-box-street').append(
                                                        `
                                            <p class="order-search-box__item_street" fullname="${element.full_name}" lat="${element.point.lat}" lon="${element.point.lon}" house="${element.address.components[0].number}" street="${element.address.components[0].street}" data-id="${index}">${element.building_name}, ${element.address.components[0].street},${element.address.components[0].number}</p>
                                            `
                                                    )
                                                    return
                                                }
                                                else if (element.purpose_name != undefined && element.full_name != undefined) {
                                                    $('.order-search-box-street').append(
                                                        `
                                                <p class="order-search-box__item_street" fullname="${element.full_name}" lat="${element.point.lat}" lon="${element.point.lon}" house="${element.address.components[0].number}" street="${element.address.components[0].street}" data-id="${index}">${element.purpose_name}, ${element.full_name}</p>
                                                `
                                                    )
                                                }
                                                return
                                            } else if (element.type == 'adm_div') {
                                                if (element.subtype_specification) {
                                                    $('.order-search-box-street').append(
                                                        `
                                            <p class="order-search-box__item_street" lat="${element.point.lat}" lon="${element.point.lon}" fullname="${element.full_name}" house="-" street="-" data-id="${index}">${element.subtype_specification} ${element.full_name}</p>
                                            `
                                                    )

                                                } else {
                                                    $('.order-search-box-street').append(
                                                        `
                                            <p class="order-search-box__item_street" lat="${element.point.lat}" lon="${element.point.lon}" fullname="${element.full_name}" house="-" street="-" data-id="${index}">${element.full_name}</p>
                                            `
                                                    )
                                                }

                                            }
                                        })

                                    })
                            }
                        })
                }
            },
            1000));

            $(document).on('click', function (e) {
                if (!$(e.target).closest('.order__windowsInput').length) {
                    $('.order-search-box-street').hide();
                }
            }),

           

            // при изменении адреса вызываем calculateTypeDelivery для всех радио
            // из полученного списка улиц центрируем карту
            $(document).on('click', '.order-search-box__item_street', function () {
                clearAddRessDelivery()
                // название адреса из выпадашки
                const placeAddress = $(this).text()

                $('#gis2geoStreet').val(placeAddress)
                $('#gis2geoStreet').attr('value', placeAddress)
                $('#geoStreet').attr('value', $(this).attr('street').trim())
                $('#geoStreet').val($(this).attr('street').trim())
                $('#geoHouse').attr('value', $(this).attr('house').trim())
                $('#geoHouse').val($(this).attr('house').trim())

                const lon = $(this).attr('lon')
                const lat = $(this).attr('lat')
                const fullName = $(this).attr('fullname')

                $('input[name="geoCity"]').val(`${fullName.split(',')[0]}, ${$('input[name="geoCity"]').attr('oblast')}`)
                $('input[name="geoCity"]').attr(`${fullName.split(',')[0]}, ${$('input[name="geoCity"]').attr('oblast')}`)

                // задаем область для центровки карты
                let northArray = [Number(lon) + 0.001500, Number(lat) + 0.001500]
                let southWestArray = [Number(lon) - 0.001500, Number(lat) - 0.001500]
                map.fitBounds([
                    [Number(lat) + 0.001500, Number(lon)],
                    [Number(lat) - 0.001500, Number(lon)]
                ])

                markersArr = [];

                // добавляем новую метку
                const marker1 = DG.popup()
                    .setLatLng([Number(lat), Number(lon)])
                    .setContent(`
                <p>${placeAddress}</p>
            `)
                    .openOn(map)

                markersArr.push(marker1)

                const address = placeAddress
                $('#gis2geoStreet').val(address)
                $('#gis2geoStreet').attr('value', address)
                const addressArray = address.split(',')

                $('#geoStreet').attr('value', addressArray[addressArray.length - 2].trim())
                $('#geoStreet').val(addressArray[addressArray.length - 2].trim())
                $('#geoHouse').attr('value', addressArray[addressArray.length - 1].trim())
                $('#geoHouse').val(addressArray[addressArray.length - 1].trim())
                // записываем координаты пользователя
                $('input[name="COORD_X"]').attr('value', lon)
                $('input[name="COORD_Y"]').attr('value', lat)
                // получаем координаты склада
                const storeLat = $('input[name="store-y"]').attr('value')
                const storeLon = $('input[name="store-x"]').attr('value')
                // точки маршрута
                const points = [
                    {
                        lat: Number(storeLat),
                        lon: Number(storeLon),
                    },
                    {
                        lat: Number(lat),
                        lon: Number(lon),
                    },
                ];
                // считаем расстояние
                fetch('https://routing.api.2gis.com/get_dist_matrix?key=b56c615c-a111-41a9-879d-a4c4af71a173&version=2.0', {
                    method: 'POST',
                    body: JSON.stringify({
                        points,
                        sources: [0],
                        targets: [1],
                        mode: 'truck',
                        start_time: new Date().toISOString(),
                    }),
                })
                    .then((res) => res.json())
                    .then((parsed) => {
                        if (parsed.routes[0].distance) {
                            const distance = parsed.routes[0].distance / 1000;
                            $('input[name="distance"]').val(distance);

                            const cityId = $('input[name="location-id"]').val()

                            $('input[name="deliveryRadio"]').each(function (index) {
                                calculateTypeDelivery($(this).val(), cityId)
                            })
                        }
                    })
                    .catch((err) => console.error('error', err));

                markersArr.push(marker1)
                $('.order-search-box-street').hide()
            })
            // возвращать карту 2gis после сдэка
            $(document).on('change', 'select[name="type-delivery"]', function () {
                if ($('select[name="type-delivery"]').val() == 2) {
                    $('.order__map.order__map-delivery').removeClass('preview')
                    $('.order__windowsInputItem.flexbox.order__windowsInputItem-pvz-map').hide()
                }
            })

        });
    }
}


function ctrlZoomMap(map, selector) {
    var ctrlKey = false,
        blocker = false;
    map.behaviors.disable("scrollZoom");
    map.events.add(["wheel", "mousedown"], function (e) {
        if (e.get("type") == "wheel") {
            if (!ctrlKey && !blocker) {
                blocker = true;
                $(selector).append(
                    '<div class="order__mapMessage">' +
                    "<div>Чтобы изменить масштаб, прокручивайте карту, <br> удерживая клавишу Ctrl" +
                    "</div></div>"
                );
                setTimeout(() => {
                    blocker = false;
                }, 4000);
            }
        }
    });

    $(document).keydown(function (e) {
        if (e.which === 17 && !ctrlKey) {
            // Ctrl нажат: включаем масштабирование мышью
            ctrlKey = true;
            map.behaviors.enable("scrollZoom");
            $(".order__mapMessage").remove(); // закрываем сообщения если ctrl зажат
        }
    });
    $(document).keyup(function (e) {
        // Ctrl не нажат: выключаем масштабирование мышью
        if (e.which === 17) {
            ctrlKey = false;
            map.behaviors.disable("scrollZoom");
        }
    });
}

function comparePreviewBoard() {
    var btn = $(".compare__previewBtn"),
        box = $(".compare__preview"),
        close = $(".compare__previewCloseBtn");
    setTimeout(() => {
        if (btn.attr("data-empty") !== "true") {
            btn.show();
        } else {
            btn.hide();
            $(".items__compare").on("click", function () {
                btn.show();
            });
        }
    });

    btn.on("click", function () {
        box.addClass("isOpen");
        stopScroll("body");
    });
    close.on("click", function () {
        box.removeClass("isOpen");
        freeScroll("body");
        if (btn.attr("data-empty") == "true") {
            btn.hide();
        }
    });
    $(document).on("mousedown", function (e) {
        if (
            !$(box).is(e.target) &&
            $(box).has(e.target).length === 0 &&
            !$(btn).is(e.target) &&
            $(btn).has(e.target).length === 0
        ) {
            $(box).removeClass("isOpen");
            freeScroll("body");
        }
    });
}

function hideDeliveryTitle() {
    if ($(".tabItem-active").data("index") == 1)
        $("#order__delivery-title").hide();
}

const redirectFavorite = (e) => {
    location.href = "/personal/cart/#2";
    location.reload();
};


function autocomleteForDeliveryAddress() {
    if ($.fias) {
        var $city = $("#geoCity"),
            $street = $("#geoStreet"),
            $house = $("#geoHouse");

        var $tooltip = $(".tooltip");

        $.fias.setDefault({
            parentInput: ".order__windowsItem-delivery",
            verify: true,
            select: function (obj) {
                setLabel($(this), obj.type);
                $tooltip.hide();
                changeDelivery();
            },
            check: function (obj) {
                var $input = $(this);

                if (obj) {
                    setLabel($input, obj.type);
                    $tooltip.hide();
                } else {
                    showError($input, "Введено неверно");
                }
            },
            checkBefore: function () {
                var $input = $(this);

                if (!$.trim($input.val())) {
                    $tooltip.hide();
                    return false;
                }
            },
            sendBefore: function () {
                console.log("Отправка...");
            },
            change: function (obj) {
                changeDelivery();
                if (obj && obj.parents) {
                    $.fias.setValues(obj.parents, ".order__windowsItem-delivery");
                }
            },
        });

        $city.fias("type", $.fias.type.city);
        $street.fias("type", $.fias.type.street);
        $house.fias("type", $.fias.type.building);

        $city.fias("withParents", true);
        $street.fias("withParents", true);

        // Отключаем проверку введённых данных для строений
        $house.fias("verify", false);

        function setLabel($input, text) {
            text = text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
            $input.parent().find("label").text(text);
        }

        function showError($input, message) {
            $tooltip.find("span").text(message);

            var inputOffset = $input.offset(),
                inputWidth = $input.outerWidth(),
                inputHeight = $input.outerHeight();

            var tooltipHeight = $tooltip.outerHeight();

            $tooltip.css({
                left: inputOffset.left + inputWidth + 10 + "px",
                top: inputOffset.top + (inputHeight - tooltipHeight) / 2 - 1 + "px",
            });

            $tooltip.show();
        }
    }
}
function accrodeonsFiltres() {
    document.getElementsByTagName('body')[0].addEventListener('click', (e) => {

        if (e.target.classList.contains('category__filtersInput-checkbox')) {
            return
        }
        if (e.target.closest('.new-category__filtersItem') && !e.target.closest('.new-bx-filter-block')) {
            // дроп целиком
            let item = e.target.closest('.new-category__filtersItem');
            // заголовоко при нажатии на который открывается аккордеон
            let chButton = item.querySelector('.new-category__filtersItemTitle');
            // сам аккордеон
            let chContent = item.querySelector('.new-bx-filter-block');

            if (chContent.classList.contains('open')) {
                chContent.style.height = '';
                chButton.querySelector('.category__filtersItemArrow').style.transform = "rotate(0deg)";
            } else {
                // chContent.style.height = chContent.scrollHeight + 'px';
                chContent.style.height = 'fit-content';
                chButton.querySelector('.category__filtersItemArrow').style.transform = "rotate(180deg)";
            }
            chButton.classList.toggle('active');
            chContent.classList.toggle('open');
        }
        if (e.target.closest('.bx-active.open') && (e.target.closest('.new-category__filtersItemTitle') || e.target.classList.contains('.new-category__filtersItemTitle'))) {
            // дроп целиком
            let item = e.target.closest('.new-category__filtersItem');
            // заголовоко при нажатии на который открывается аккордеон
            let chButton = item.querySelector('.new-category__filtersItemTitle');
            // сам аккордеон
            let chContent = item.querySelector('.new-bx-filter-block');

            if (chContent.classList.contains('open')) {
                chContent.style.height = '';
                chButton.querySelector('.category__filtersItemArrow').style.transform = "rotate(0deg)";
            } else {
                // chContent.style.height = chContent.scrollHeight + 'px';
                chContent.style.height = 'fit-content';
                chButton.querySelector('.category__filtersItemArrow').style.transform = "rotate(180deg)";
            }
            chButton.classList.toggle('active');
            chContent.classList.toggle('open');
        }
    })
}

$(document).ready(function () {


    // comparePreviewBoard();
    // comparePreview();
    accrodeonsFiltres();
    autocomleteForDeliveryAddress();
    contentFadeInOnReady();
    sezonTovarSliders();
    clearInputSearchCategoryss();
    subMenu(".nav__subMenuTrigger", ".nav__subMenu");

    anchor();
    slideTimer();
    owls();
    modalOpen(".policityBtn", ".modal-policity");
    popOpen(".find__button", ".notFound");
    popOpen(".discontinued-box__btn", ".analogPopup");
    popOpen(".support__button", ".supportPopup");
    popOpen(".searchResult__emptyBtn", ".notFound");
    popOpen('.feedback-call__trigger', '.feedback-call')
    popOpen('.podpiska-modal__triger', '.podpiska-modal')
    modalClose(".modal__closeBtn", ".modal");
    modalClose(".popup__closeBtn", ".popup");
    escClosing();
    miniBasketCounter();
    authPops();
    feedBackFormFade();
    hashTabs(".compare__tabs", ".compare__windows");
    tabs(".authorization__recoverChoise", ".authorization__recoverBox");
    hashTabs(".goods__tabs", ".goods__windows");
    recoverChoose();
    newMenuCategories();
    attachFile(".addFile__input");
    moreContent(".textContent__moreBtn", ".textContent__content", ".textContent__wrap");

    if ($(".lk").length > 0) {
        hashTabs(".lk__tabs", ".lk__box");
        movingActive(".lk__tabs", ".lk__activeLine");
        popOpen(".lk__button-password", ".lk__changePasswordForm");
        datepicker(".lk__input-date");
        orderDetail();
    }

    $(document).on("click", ".alert-closeBtn", function () {
        $(this).closest(".alert-danger").fadeOut();
    })
        .on('click', function (e) {
            if ($('.nav__searchBody').length > 0 && $('.nav__searchBody').css("display") == 'grid') {
                if (e.target.nodeName == 'path' || e.target.closest('.nav__toolBoxCol') || e.target.closest('.nav__searchBody') || e.target.classList.contains('nav__searchBody') ||
                    e.target.classList.contains('remove-history-item') || e.target.classList.contains('price-delivery-modal') ||
                    e.target.classList.contains('nav__searchInput')) {
                } else {
                    $('.nav__searchBody').empty();
                }
            }
        })

    // меняем title при клике на Назад в браузере
    localStorage.setItem('titleStr', '');
    $(document).on('click', 'a', (e) => {
        let currentTitle = $('title').text();
        let titleStr = "";
        titleStr = localStorage.getItem('titleStr');
        titleStr += '/' + currentTitle;
        localStorage.setItem('titleStr', titleStr);
    });
    if ($(".basket").length > 0) {
        basketPrint(".goods__send-print", ".printble");
    }
    if ($(".categories").length > 0) {
        toggleListInfo(".categories__moreBtn", ".categories__more");
    }
    if ($(".category").length > 0) {
        hideContent(
            ".category__filtersMore",
            ".category__filtersItemCheckBox-more"
        );
    }
    if ($(".detail").length > 0) {
        tabs(".detailContent__tabBox", ".detailContent__tabContentBox");
        popOpen(".detailContent__askIcon ", ".cheaper");
    }
    if ($(".orderPage").length > 0) {
        // hashTabs(".order__tabs", ".order__windows");
        tabs(".order__contactsTabs", ".order__contactsWindows");
        // tabs('.order__contactsTabs-delivery', '.order__contactsWindows-delivery'); обядинили в 1 таб с доаставкой
        // movingActive(".order__tabs", ".lk__activeLine");
        selectInput(".order__windowsInputSelect-date");
        selectInput(".order__windowsInputSelect-time");
        selectInput(".order__pointSelectList");
        moreOptions(".order__windowsOptionsRadio", "radioMore", ".order__level");
        hideContent(".order__signInBtn-self", ".order__signInBox-self");
        hideContent(".order__signInBtn-delivery", ".order__signInBox-delivery");
        yandexMapSelf("mapSelf");
        yandexMapDelivery("deliveryMap");
        changeDelivery();
        hideDeliveryTitle();
    }
    switcher(".compare__filterBtn", "div[ordinary]");
    $(".nav__holdOn").on("click", redirectFavorite);
    // anyAnchor();

    $(document).on("click", ".alert-closeBtn", function () {
        $(this).closest(".alert-danger").fadeOut();
    });

    // меняем title при клике на Назад в браузере
    localStorage.setItem('titleStr', '');
    $(document).on('click', 'a', (e) => {
        let currentTitle = $('title').text();
        let titleStr = "";
        titleStr = localStorage.getItem('titleStr');
        titleStr += '/' + currentTitle;
        localStorage.setItem('titleStr', titleStr);
    });
    addEventListener("popstate", function (e) {
        let titleStr = localStorage.getItem('titleStr');
        let arTile = titleStr.split('/');
        //arTile.splice(0, 1);
        let title = arTile[arTile.length - 1];
        arTile.splice(arTile.length - 1, 1);
        titleStr = arTile.join('/');
        localStorage.setItem('titleStr', titleStr);
        if (title) {
            $('title').text(title);
        }
    }, false);

    filterSearch(
        ".category__filtersInput",
        ".category__filtersInputBox-checkbox"
    );
});

$(document).ready(function () {
    const tinkoff = $('.open-tink-modal');
    if (tinkoff) {
        const tinkoffContainer = document.querySelector('.tinkoff__container')
        $('body').on('click', '.open-tink-modal', function (e) {
            tinkoffContainer.classList.add('tinkoff--active');
            $('body').addClass('fixed-scroll')
        })
    }

    const tinkoffModal = document.querySelector('.tinkoff__close');
    if (tinkoffModal) {
        tinkoffModal.addEventListener('click', (e) => {
            if (e.currentTarget.classList.contains('tinkoff__close')) {
                e.currentTarget.parentElement.parentElement.parentElement.classList.remove('tinkoff--active')
                $('body').removeClass('fixed-scroll')
            }
        })
    }
});

function clearInputSearchCategoryss() {
    let clearInoutSearchCrestick = document.querySelector('.main-catalog__clearsearch');
    if (clearInoutSearchCrestick) {
        clearInoutSearchCrestick.addEventListener('click', (e) => {
            e.currentTarget.parentElement.parentElement.querySelector('.main-catalog__searchInput').value = '';
            const url = new URL(document.location);
            const searchParams = url.searchParams;
            searchParams.delete("query");
            let urlString = url.toString();
            history.pushState(null, '', urlString);
        });
    }
}

const dopolnitelnoeComplect = () => {
    let chItems = document.querySelectorAll('.characteristics__item');
    if (chItems) {
        chItems.forEach(item => {
            let chButton = item.querySelector('.characteristics__title');
            let chContent = item.querySelector('.characteristics__description');
            chContent.style.height = chContent.scrollHeight + 'px';
            chButton.innerHTML = `
          Скрыть комплектующие
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.55732 0.239127L9.76921 4.60564C10.0769 4.92502 10.0769 5.44149 9.76921 5.76087C9.46148 6.07971 8.96281 6.07971 8.65509 5.76087L5.00026 1.97143L1.34491 5.76087C1.03719 6.07971 0.538518 6.07971 0.230794 5.76087C-0.0769312 5.44149 -0.0769312 4.92502 0.230794 4.60564L4.4432 0.239127C4.75093 -0.0797085 5.2496 -0.0797085 5.55732 0.239127Z" fill="#8C0D18"/>
          </svg>
          `;
            chButton.classList.toggle('active');
            chContent.classList.toggle('open');

            $('.characteristics__item .characteristics__title').on('click', () => {
                if (chContent.classList.contains('open')) {
                    chContent.style.height = '';
                    chButton.innerHTML = `
          Дополнительные комплектующие
						<svg class="complect-tovar__arrow" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M4.44268 5.76087L0.230794 1.39436C-0.076931 1.07498 -0.076931 0.558508 0.230794 0.239126C0.538519 -0.0797088 1.03719 -0.0797088 1.34491 0.239126L4.99974 4.02857L8.65509 0.239126C8.96281 -0.0797088 9.46148 -0.0797088 9.76921 0.239126C10.0769 0.558508 10.0769 1.07498 9.76921 1.39436L5.5568 5.76087C5.24907 6.07971 4.7504 6.07971 4.44268 5.76087Z" fill="#8C0D18"/>
						</svg>
          `;
                } else {
                    chContent.style.height = chContent.scrollHeight + 'px';
                    chButton.innerHTML = `
          Скрыть комплектующие
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.55732 0.239127L9.76921 4.60564C10.0769 4.92502 10.0769 5.44149 9.76921 5.76087C9.46148 6.07971 8.96281 6.07971 8.65509 5.76087L5.00026 1.97143L1.34491 5.76087C1.03719 6.07971 0.538518 6.07971 0.230794 5.76087C-0.0769312 5.44149 -0.0769312 4.92502 0.230794 4.60564L4.4432 0.239127C4.75093 -0.0797085 5.2496 -0.0797085 5.55732 0.239127Z" fill="#8C0D18"/>
          </svg>
          `;
                }
                chButton.classList.toggle('active');
                chContent.classList.toggle('open');
            });
        });
    }
}
const sezonTovarSliders = () => {
    if ($('.sezon-tab-content__item.js-sezon-tab-content.active .sezon-tovar__carousel')) {
        let sezSlider = $('.sezon-tab-content__item.js-sezon-tab-content.active .sezon-tovar__carousel');
        sezSlider.owlCarousel({
            nav: true,
            navText: [
                '<svg class="animate" xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.279 20.3312L21.3733 15.277C21.7459 14.9077 22.3484 14.9077 22.721 15.277C23.093 15.6462 23.093 16.2446 22.721 16.6139L18.3 20.9997L22.721 25.3861C23.093 25.7554 23.093 26.3538 22.721 26.723C22.3484 27.0923 21.7459 27.0923 21.3732 26.723L16.279 21.6682C15.907 21.2989 15.907 20.7005 16.279 20.3312Z" fill="#8C0D18"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21 1C9.95431 1 1 9.9543 0.999999 21C0.999996 32.0457 9.9543 41 21 41C32.0457 41 41 32.0457 41 21C41 9.95431 32.0457 1.00001 21 1Z" stroke="#8C0D18"/></svg>',
                '<svg class="animate" xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.279 20.3312L21.3733 15.277C21.7459 14.9077 22.3484 14.9077 22.721 15.277C23.093 15.6462 23.093 16.2446 22.721 16.6139L18.3 20.9997L22.721 25.3861C23.093 25.7554 23.093 26.3538 22.721 26.723C22.3484 27.0923 21.7459 27.0923 21.3732 26.723L16.279 21.6682C15.907 21.2989 15.907 20.7005 16.279 20.3312Z" fill="#8C0D18"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21 1C9.95431 1 1 9.9543 0.999999 21C0.999996 32.0457 9.9543 41 21 41C32.0457 41 41 32.0457 41 21C41 9.95431 32.0457 1.00001 21 1Z" stroke="#8C0D18"/></svg>',
            ],
            dots: false,
            lazyLoad: true,
            autoHeight: false,
            items: 4,
            margin: 30,
            thumbs: false,
            smartSpeed: 1000,
        });
    }
    if ($('.js-tab-trigger')) {
        $('.sezon-tovar__razdel span').text($('.js-tab-trigger.active').text())
        $('.sezon-tovar__razdel a').attr('href', $('.js-tab-trigger.active').attr('data-link'))
        $('.js-tab-trigger').click(function () {
            var id = $(this).attr('data-tab'),
                content = $('.js-sezon-tab-content[data-tab="' + id + '"]');

            $('.js-tab-trigger.active').removeClass('active');
            $(this).addClass('active');
            $('.sezon-tovar__razdel span').text($(this).text())
            $('.sezon-tovar__razdel a').attr('href', $(this).attr('data-link'))

            $(".sezon-tovar__carousel").trigger('destroy.owl.carousel');
            $('.js-sezon-tab-content.active').removeClass('active');
            content.addClass('active');

            let sezSlider = $('.sezon-tab-content__item.js-sezon-tab-content.active .sezon-tovar__carousel');
            sezSlider.owlCarousel({
                nav: true,
                navText: [
                    '<svg class="animate" xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.279 20.3312L21.3733 15.277C21.7459 14.9077 22.3484 14.9077 22.721 15.277C23.093 15.6462 23.093 16.2446 22.721 16.6139L18.3 20.9997L22.721 25.3861C23.093 25.7554 23.093 26.3538 22.721 26.723C22.3484 27.0923 21.7459 27.0923 21.3732 26.723L16.279 21.6682C15.907 21.2989 15.907 20.7005 16.279 20.3312Z" fill="#8C0D18"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21 1C9.95431 1 1 9.9543 0.999999 21C0.999996 32.0457 9.9543 41 21 41C32.0457 41 41 32.0457 41 21C41 9.95431 32.0457 1.00001 21 1Z" stroke="#8C0D18"/></svg>',
                    '<svg class="animate" xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.279 20.3312L21.3733 15.277C21.7459 14.9077 22.3484 14.9077 22.721 15.277C23.093 15.6462 23.093 16.2446 22.721 16.6139L18.3 20.9997L22.721 25.3861C23.093 25.7554 23.093 26.3538 22.721 26.723C22.3484 27.0923 21.7459 27.0923 21.3732 26.723L16.279 21.6682C15.907 21.2989 15.907 20.7005 16.279 20.3312Z" fill="#8C0D18"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21 1C9.95431 1 1 9.9543 0.999999 21C0.999996 32.0457 9.9543 41 21 41C32.0457 41 41 32.0457 41 21C41 9.95431 32.0457 1.00001 21 1Z" stroke="#8C0D18"/></svg>',
                ],
                dots: false,
                lazyLoad: true,
                autoHeight: false,
                items: 4,
                margin: 30,
                thumbs: false,
                smartSpeed: 1000,
            });
        });
    }
}

(function ($) {
    $.fn.HvrSlider = function () {
        return this.each(function () {
            var el = $(this);
            if (!el.attr('data-slider')) {
                el.attr('data-slider', 'true')
                if (el.find('img').length > 1) {
                    var hvr = $('<div>', {
                        class: 'hvr',
                        append: [
                            $('<div>', {
                                class: 'hvr__images',
                                append: $('<div>', {
                                    class: 'hvr__sectors',
                                }),
                            }),
                            $('<div>', {
                                class: 'hvr__dots',
                            }),
                        ],
                        insertAfter: el,
                        prepend: el,
                    });
                    var hvrImages = $('.hvr__images', hvr);
                    var hvrImage = $('img', hvr);
                    var hvrSectors = $('.hvr__sectors', hvr);
                    var hvrDots = $('.hvr__dots', hvr);
                    el.prependTo(hvrImages);
                    hvrImage.each(function () {
                        hvrSectors.prepend('<div class="hvr__sector"></div>');
                        hvrDots.append('<div class="hvr__dot"></div>');
                    });
                    $('.hvr__dot:first', hvrDots).addClass('hvr__dot--active');
                    var setActiveEl = function (el) {
                        hvrImage.hide().eq(el.index()).show();
                        $('.hvr__dot', hvrDots).removeClass('hvr__dot--active').eq(el.index()).addClass('hvr__dot--active');
                    };
                    $('.hvr__sector', hvrSectors).hover(function () {
                        setActiveEl($(this));
                    });
                    $('body').on('touchmove', hvrSectors, function (e) {
                        var position = e.originalEvent.changedTouches[0];
                        var target = document.elementFromPoint(position.clientX, position.clientY);
                        if ($(target).is('.hvr__sector')) {
                            setActiveEl($(target));
                        }
                    });
                }
            }
        });
    };
})(jQuery);

const mobileHeaderFunctional = () => {
    $('body').on('click', '.open-menu', function () {
        if ($(this).hasClass('active')) {
            $('body').toggleClass('fixed-scroll')
            $(this).toggleClass('active')
            $(this).parent().find('.mobile-item').toggleClass('mobile-item--active')
            $('#auth-popup').hide()
            return
        }

        if ($('.mobile-item').hasClass('mobile-item--active')) {
            $('body').removeClass('fixed-scroll')
            $('.mobile-item').removeClass('mobile-item--active')
            $('.open-menu').removeClass('active')
        }

        $('body').toggleClass('fixed-scroll')
        $(this).toggleClass('active')
        $(this).parent().find('.mobile-item').toggleClass('mobile-item--active')

        if ($(this).hasClass('nav__basket')) {
            const headerAuthModal = $('.authorization__widnow')[0];
            $(headerAuthModal).fadeIn();
            $('#auth-popup').fadeIn();
        }
    })
        .on('click', '.mobile-basket__goback', function () {
            $(this).closest('.mobile-item').removeClass('mobile-item--active')
            $(this).closest('.mobile-header__basket').find('.open-menu').removeClass('active')
            $('body').removeClass('fixed-scroll')
        })
}

const mobileCatalogCategory = () => {
    $('body').on('click', '.nav__generalItem', function () {
        const parentAttr = $(this).attr('data-index')

        $(this).closest('.nav__generalList').hide();
        $('.catalog-category__item').hide();

        $('.catalog-category').fadeIn()
        $(`.catalog-category__item[data-index="${parentAttr}"]`).show();
    })

        .on('click', '.catalog-category__goback', function () {
            $('.catalog-category').hide();
            $('.nav__generalList').fadeIn();
        })

        .on("click", ".authorization__closeBtn", function () {
            $(this).closest(".authorization__widnow").fadeOut(200, function () {
            });
            if ($('.mobile-header__profile')) {
                $('body').removeClass('fixed-scroll')
                $('.mobile-header__profile').find('.open-menu').removeClass('active')
            }
        });

    $(document).on("mousedown", function (e) {
        if (
            !$(".authorization__widnow").is(e.target) &&
            $(".authorization__widnow").has(e.target).length === 0
        ) {
            $(".authorization__widnow").fadeOut(200, function () {
                $(".ajax").empty();
            });
        }
    });

}

dopolnitelnoeComplect();
mobileHeaderFunctional();
mobileCatalogCategory();
BX.addCustomEvent('onAjaxSuccess', () => {
    // moreContent(
    //     ".textContent__moreBtn",
    //     ".textContent__content",
    //     ".textContent__wrap"
    // );
    pereRaschetPriceInDetail()
    clearInputSearchCategoryss();
    dopolnitelnoeComplect();
    sezonTovarSliders();
    if ($('.items__imageBox').length) {
        setTimeout(() => {
            $('.items__imageBox').HvrSlider();
        }, 500)
    }
})
if ($('.items__imageBox').length) {
    $('.items__imageBox').HvrSlider();
}

function delay(callback, ms) {
    var timer = 0;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(context, args);
        }, ms || 0);
    };
}


$(function () {

    $(document).on("focusout", '#geoStreet', function () {
        $('.order-search-box-street').fadeOut();
    });

    $(document).on("click", ".order-search-box__item_street", function () {
        let street = $(this).text().trim();
        $('#geoStreet').val(street);
    });
    $(document).on('click', '.sezon-tab-header__item', function (e) {
        const element = $(e.target)
        const sectionId = element.data('sectionId');
        const url = 'include/seasons-slider.php'
        const data = {
            sessid: BX.bitrix_sessid(),
            via_ajax: 'Y',
            id: sectionId,
        };

        $.ajax({
            type: 'POST',
            url,
            data,
        }).then(function (res) {
            $('.sezon-tovar').html(res);

            $('.sezon-tab-content__item .items__carousel').owlCarousel({
                nav: true,
                navText: [
                    '<svg class="animate" xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.279 20.3312L21.3733 15.277C21.7459 14.9077 22.3484 14.9077 22.721 15.277C23.093 15.6462 23.093 16.2446 22.721 16.6139L18.3 20.9997L22.721 25.3861C23.093 25.7554 23.093 26.3538 22.721 26.723C22.3484 27.0923 21.7459 27.0923 21.3732 26.723L16.279 21.6682C15.907 21.2989 15.907 20.7005 16.279 20.3312Z" fill="#8C0D18"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21 1C9.95431 1 1 9.9543 0.999999 21C0.999996 32.0457 9.9543 41 21 41C32.0457 41 41 32.0457 41 21C41 9.95431 32.0457 1.00001 21 1Z" stroke="#8C0D18"/></svg>',
                    '<svg class="animate" xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.279 20.3312L21.3733 15.277C21.7459 14.9077 22.3484 14.9077 22.721 15.277C23.093 15.6462 23.093 16.2446 22.721 16.6139L18.3 20.9997L22.721 25.3861C23.093 25.7554 23.093 26.3538 22.721 26.723C22.3484 27.0923 21.7459 27.0923 21.3732 26.723L16.279 21.6682C15.907 21.2989 15.907 20.7005 16.279 20.3312Z" fill="#8C0D18"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21 1C9.95431 1 1 9.9543 0.999999 21C0.999996 32.0457 9.9543 41 21 41C32.0457 41 41 32.0457 41 21C41 9.95431 32.0457 1.00001 21 1Z" stroke="#8C0D18"/></svg>',
                ],
                dots: false,
                lazyLoad: true,
                autoHeight: false,
                items: 4,
                margin: 30,
                thumbs: false,
                smartSpeed: 1000,
            });
            $('.sezon-tab-content__item .items__carousel .owl-item').css({
                'transition': '.4s all'
            });
            $('.items__imageBox').HvrSlider()
        })
    })

});
var heightHeadersBlocks = $('.nav.flexbox .nav__bar').height() + $('.nav.flexbox .nav__categories').height()
$(window).scroll(function() {
    if($(this).scrollTop() > 200) {
        $('.nav.flexbox .nav__bar').slideUp()
        $('.nav.flexbox .nav__categories').slideUp()
        $('.go-top').addClass("go-top--show");
    } else if(($(this).scrollTop() + heightHeadersBlocks) < 200) {
        $('.nav.flexbox .nav__bar').slideDown()
        $('.nav.flexbox .nav__categories').slideDown()
        $('.go-top').removeClass("go-top--show");
    }
});
$(document).on('click', '.go-top', function(){
    window.scrollTo({top: 0, behavior: 'smooth'});
})
