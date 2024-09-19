function httpGet(theUrl) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: 'GET',
            url: theUrl,
            success: function (data, textStatus) {
                resolve(data);
            }
        });
    });
}

function getForm(url) {
    httpGet(url).then((data) => {
        const ajax = $('.ajax');
        ajax.append(data);
        ajax.show();
        $('.ajax > div').fadeIn(200);
    });
}

function httpPost(form) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: 'POST',
            url: form.action,
            data: $(form).serialize(),
            success: function (data, textStatus) {
                resolve(data);
            }
        });
    });
}

function buttonOpenForm() {
    $('.ajax').on('click', '.Blink', function () {
        $('.ajax').empty();
        getForm($(this).attr('href'));
    });
}

function sendForm() {
    $('.ajax').on('submit', 'form', function (e) {
        $('.ajax>div').addClass('loader');
        e.preventDefault();
        httpPost(this).then((data) => {
            $('.ajax').empty();
            $('.ajax').append(data);
            $('.ajax>div').fadeIn(200);
            $('.alert-danger').fadeIn(200)
        });
    });
}

function urlParse() {
    let res = Object();
    window.location.search.replace("?", "").split("&").forEach(str => {
        let t = str.split("=");
        res[t[0]] = t[1];
    });
    return res;
}

function emailConfirmationUrl() {
    let res = urlParse();
    if((res["confirm_registration"] && res["confirm_user_id"] && res["confirm_code"]) || (res["confirm_registration"] && res["confirm_user_id"]))
    {
        let url = '/ajax/auth.php?ajax=y&confirm_registration=' + res["confirm_registration"] + '&confirm_user_id=' + res["confirm_user_id"];
        if(res["confirm_code"])
        {
            url += '&confirm_code=' + res["confirm_code"];
        }
        getForm(url);
    }
}

function changePasswordUrl() {
    let res = urlParse();
    if(res["change_password"] && res["lang"] && res["USER_CHECKWORD"] && res["USER_LOGIN"])
    {
        let url = '/ajax/auth.php?ajax=y&change_password=' + res["change_password"] + '&lang=' + res["lang"] + '&USER_CHECKWORD=' + res["USER_CHECKWORD"] + '&USER_LOGIN=' + res["USER_LOGIN"];
        getForm(url);
    }
}

const searchHistoryMobile = (form, searchInput) => {

    if (localStorage.getItem('searchHistoryVersion') != "1.6") {
        localStorage.removeItem('searchHistory');
        localStorage.setItem('searchHistoryVersion', "1.6");
    }

    const storage = localStorage.getItem('searchHistory');
    const storageCopy = JSON.parse(storage);

    if (storageCopy?.length) {
        $(storageCopy.reverse()).each((i, el) => {
            $('.nav__history').append(`<a href='/catalog/search?q=${el}&how=r' class='nav__historyItem'>${el}</a>`);
        });
    }

    $(form).on('submit', function () {
        const value = $(this).serializeArray()[0].value;
        if (storage) {
            let blocker = false;
            storageCopy.length > 8 && storageCopy.shift();
            $(storageCopy).each((i, el) => {
                if (value === el) {
                    blocker = true;
                }
            })
            if (!blocker) {
                storageCopy.push(value);
            }
            localStorage.setItem('searchHistory', JSON.stringify(storageCopy));
        } else {
            localStorage.setItem('searchHistory', JSON.stringify([value]));
        }
    });

    $(searchInput).on('click', e => {
        if (!$(searchInput).val() && storageCopy?.length) {
            $('.nav__history').addClass('active');
        }
    });

    $(searchInput).on('input focusout', e => {
        setTimeout(() => {
            $('.nav__history').removeClass('active');
        }, 100);
    });
}


/** action - это принимает названия класса и метода через слеш ex. class/method */
const ajaxRequest = async (method, action, data, dataType = 'json') => {
    const url = '/ajax/';
    let ajaxBody = {
        url,
        method,
        dataType,
    };
    /**
     * Если мы передаем форму то засетить нужные параметры для ajax
    */
    if (data instanceof FormData) {
        data.append('action', action);
        ajaxBody.processData = false;
        ajaxBody.contentType = false;
    } else {
        data = { action, ...data }
    }
    ajaxBody.data = data;

    return await $.ajax(ajaxBody);
};

const getCookieValue = (name) => {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

const repeatOrder = () => {

    let data = {
        ORDER_ID: document.getElementById('orderDetail__orderId').value
    };
    ajaxRequest('GET', 'personalAccount/repeatOrder', data)
        .then((res) => {
            popupAdd('Товары добавлены в корзину', '');
        })
        .catch((err) => {
            popupAdd('Что-то пошло не так', '');
        });
}

const getDetail = (e) => {
    element = e.target || e;
    if(e.target.classList.contains("lk__historyItem-schet")){
        return 0;
    }
    $('.modal').show();
    if(!$('#goods__basketBody .loader').length) {
        loader({
            status: 'add',
            parent: '#goods__basketBody',
            className: 'loader'
        });
    }
    let data = {
        ORDER_ID: $(element).closest('.lk__historyRow').data('orderId')
    };
    ajaxRequest('GET', 'personalAccount/getOrderDetail', data)
        .then((res) => {
            renderPersonalAccountOrderDetail(res)
        })
        .catch((err) => {
            console.log(err);
        });
};


/**
 * START
 * Отправка писем по почте
 **/
const sendMail = (event) => {
    let data = event.data;
    const form = $(event.target).prev();
    const popup = $(event.target).closest('.popup__box');
    const inputs = form.find('.popup__input');
    const formData = new FormData(form[0]);

    validateForm(inputs)
        .then(() => {
            ajaxRequest('POST', 'mail/sendForm', formData)
                .then((res) => {
                    popup.fadeOut()
                    $(".supportPopup").css('display', 'none');
                     $('body').removeClass('fixed-scroll')
                    popupAdd(data.name, data.success);
                })
                .catch((err) => {
                    popupAdd(data.name, data.error);
                });
        })
        .catch((err) => {
            console.log(err);
        })
}

const updateCounters = () => {
    ajaxRequest('POST', 'counter/get')
        .then((res) => {
            for(let [key, value] of Object.entries(res)){
                let desktopParent = '';
                let mobileParent = '';
                let mobileMenuParent = '';

                if (key === 'basketCount') {
                    desktopParent = '#basket';
                    mobileParent = '.mobile-header__basket';
                } else if(key === 'menuCount') {
                    mobileParent = '.mobile-header__menu';
                } else if(key === 'favoriteCount') {
                    desktopParent = '#favorite'
                    mobileMenuParent = '.menu-boxed .nav__generalItem .is_favorite'
                } else if (key === 'compareCount') {
                    mobileMenuParent = '.menu-boxed .nav__generalItem .is_compare'
                }

                if (!!value) {
                    if (!!mobileParent) {
                        if (!!mobileParent && !$(mobileParent + ' .nav__basketCounter').length) {
                            $(mobileParent).append('<div class="nav__basketCounter flexbox"></div>');
                        }
                        $(mobileParent + ' .nav__basketCounter').html(value);
                    }

                    if(!!mobileMenuParent) {
                        if (!$(mobileMenuParent + ' .izbr-counter').length) {
                            $(mobileMenuParent).append('<div class="izbr-counter"></div>')
                        }
                        $(mobileMenuParent + ' .izbr-counter').html(value);
                    }

                    if (!!desktopParent) {
                        if (!$(desktopParent + ' .nav__basketCounter').length) {
                            $(desktopParent).append('<div class="nav__basketCounter flexbox"></div>');
                        }
                        $(desktopParent + ' .nav__basketCounter').html(value);
                    }
                }else{
                    if(!!mobileParent && $(mobileParent + ' .nav__basketCounter').length === 1) {
                        $(mobileParent + ' .nav__basketCounter').remove();
                    }
                    if(!!desktopParent && $(desktopParent + ' .nav__basketCounter').length === 1) {
                        $(desktopParent + ' .nav__basketCounter').remove();
                    }
                    if (!!mobileMenuParent && $(mobileMenuParent + '.izbr-counter').length === 1) {
                        $(mobileMenuParent + '.izbr-counter').remove();
                    }
                }
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

const sendBasket = (element) => {
    let data = {
        name: 'Отправка корзины',
        success: 'Корзина успешно отправлена!',
        error: 'Произошла ошибка при оправке!',
    };

    ajaxRequest('POST', 'mail/sendBasket')
        .then((res) => {
            popupAdd(data.name, data.success);
        })
        .catch((err) => {
            popupAdd(data.name, data.error);
        });
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
/** FINISH mail */
const add2Basket = (e) => {

    let element = e.target || e;

    // если это товар в корзине, то не добавляем тут, добавляем в экшене компонента
    if($('main.basket:not(.favorite)').length){
        return false;
    }

    let id = $(element).data('productId');
    id = String(id);
    let name = $(element).data('productName');
    name = name.replace('"', '');

    let quantity = $('#items__counterInput-' + id).val() || $('.detailContent__counterBar .input-count').val() || $(element).closest('.goods__basketRow').find('.goods__basketItem-counter');
    quantity = parseFloat(quantity);
    let price = $(element).data('productPrice');
    price = Number(price);
    let categoryList = $(element).data('categoryList');
    let brand = $(element).data('productBrand');
    let data = {
        PRODUCT_ID: id,
        QUANTITY:  parseFloat(quantity) || 1,
    };

    ajaxRequest('POST', 'basket/add', data)
        .then((res) => {
            // если у товара есть комплектующие, то показывем попап с комплектующими
            let completeData = {
                PRODUCT_ID: id
            }

            updateCounters()
            // updateBasketLine();
            setActiveStatusProducts()
            // updateMobileBasketAndMenuCount();
           
            if(!element.classList.contains('detailContent__button')){
                let elemAtribute = element.closest('.items__item')?.getAttribute('id');
                $(`#${elemAtribute}`).find('.complite-add-to-basket').closest('.buttons-block ').addClass('complite-add-to-basket-added');

            }

            let text = "Добавлено в корзину";
            popupAdd(name, text);
            if(e.classList.contains('doli-btn-go-basket')){
                window.location.href = '/personal/cart/#2';
            }
            // добавление товара в яндекс e-commerce
            dataLayer.push({
                "ecommerce": {
                    "currencyCode": "RUB",
                    "add": {
                        "products": [
                            {
                                "id": id,
                                "name": name,
                                "price": price,
                                "brand": brand,
                                "category": categoryList,
                                "quantity": parseInt(quantity) || 1
                            }
                        ]
                    }
                }
            });
            if($.cookie('showOnlyOneBasket')){
                $('.modal-basket').hide();
                return
            }
            if(!$.cookie('showOnlyOneBasket')){
                 ajaxRequest('POST', 'basket/getCompletesIds', completeData).then((completeIds) => {
                     if(Object.keys(completeIds).length !== 0) {
                         // показ модалки с комплектующими
                         let jsonCompletesIds = JSON.stringify(completeIds);
                         $.post(
                             "/ajax/completes-modal.php",
                             {
                                 PRODUCT_ID : id,
                                 COUNT : parseFloat(quantity) || 1,
                                 COMPLETES_IDS : jsonCompletesIds,
                                 PRICE : price
                             },
                             function( data ) {
                                 $('.modal-basket').css("display", "flex").hide().fadeIn();
                                 $('.modal-basket-inner').html(data)
                                 $('body').addClass('fixed-scroll')
                                 if ($(window).width() <= 768) {
                                     $(".basket__carousel").owlCarousel({
                                         nav: false,
                                         dots: false,
                                         lazyLoad: false,
                                         autoHeight: false,
                                         autoWidth: true,
                                         items: 2,
                                         margin: 30,
                                         thumbs: false,
                                         smartSpeed: 1000,
                                     });
                                     if ($('.basket__carousel .items-image-container')) {
                                        let sezSlider = $('.basket__carousel .items-image-container');
                                        sezSlider.owlCarousel({
                                            lazyLoad: false,
                                            dots: false,
                                            autoHeight: false,
                                            autoWidth: true,
                                            margin: 10,
                                            thumbs: false,
                                            smartSpeed: 300
                                        });

                                        if ($('.items-image-container')) {
                                            let sezSliderr = $('.items-image-container');
                                            sezSliderr.owlCarousel({
                                                lazyLoad: false,
                                                items: 1,
                                                pagination: true,
                                                dots: true,
                                                autoHeight: false,
                                                autoWidth: false,
                                                margin: 10,
                                                thumbs: false,
                                                smartSpeed: 300
                                            });
                                        };
                                        $(".items-image-container").on("touchstart mousedown", function(e) {
                                            e.stopPropagation();
                                        })
                                    }
                                 }
                                 else {
                                     $(".basket__carousel").owlCarousel({
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
                                    if ($('.items__imageBox').length) {
                                        $('.items__imageBox').HvrSlider();
                                    }
                                 }
                             }
                         );
                     }
                 })
            }
        })
        .catch((err) => {
            console.log(err);
            let isError = true;
            let text = "Что-то пошло не так";
            popupAdd(name, text, isError);
        });
}

const add2BasketForComplectuyush = (e, modal = false) => {
    // если добавляем из модалки, то там другой список комплектующих и их кол-во
    let arrayItems = [];
    if(modal){
        let items = document.querySelectorAll('.modal-basket .modal-basket-complect-item');
        items.forEach(item => {
            item.setAttribute('data-product-count', item.querySelector('.input-count').value)
            let id = item.getAttribute('data-product-id');
            let count = item.getAttribute('data-product-count');

            let itemObj = {
                id: id,
                count: count,
            }
            arrayItems.push(itemObj)
        })
    }else{
        let items = document.querySelectorAll('.complect-sliders .items__item');
        items.forEach(item => {
            let id = item.getAttribute('data-id')
            let itemObj = {
                id,
                count: 1,
            }
            arrayItems.push(itemObj)
        })
    }
    arrayItems = Object.assign({}, arrayItems);
    $.ajax({
        url: '/ajax/ajaxComplectuyush.php',
        method: 'post',
        data: arrayItems,
        success: function(data){
            document.querySelector('.popupAddedToCard').insertAdjacentHTML('afterbegin',  `
            <div class="popupAddedToCard__item popupAddedToCard__item_complectuyush"><h4 class="popupAddedToCard__title">${data}</h4></div>
            `)
            setTimeout(() => {
                $('.popupAddedToCard__item_complectuyush').remove()
            }, 3000)
            $('.items__counterInput_complect').val(0).attr('value', 0);
            for (let item of Object.entries(arrayItems)){
                let productId = item[1].id;
                let productQuantity = parseFloat(item[1].count);
                if(productQuantity> 0) {
                    let $priceAndColvo = $('.characteristics__item-description[data-product-id="' + productId + '"]').find('.complect-tovar__priceAndColvo');
                    let storage = parseFloat($priceAndColvo.find('.items__counterInput_complect').attr('data-storage'));
                    storage -= productQuantity;
                    $priceAndColvo.find('.items__counterInput_complect').attr('data-storage', storage);
                    $priceAndColvo.find('.complect-tovar-priceAndColvo__count').text(storage);
                }
            }
            updateBasketLine()
        },
        error: function(jqxhr, status, errorMsg) {
            debugger;
            console.log(errorMsg)
        }
    });
}



const toggleFavorite = (e) => {
    let element = e.target || e;
    let name = $(element).data('productName');
    let text =  $(element).hasClass('active-icon') ? "Убран из избранного" : "Добавлен в избранное";
    const isActive = $(element).hasClass('active-icon')

    $(element).toggleClass("active-icon");

    BX.ajax.runAction('asap:favorite.controllers.favorite.' + (isActive ? 'delete' : 'add'), {
        data: {
            productId: $(element).data('productId'),
        }
    }).then(() => {
        popupAdd(name, text);
        updateCounters()
        setActiveStatusProducts()
    })

}

const setActiveStatusProducts = () => {
    ajaxRequest('POST', 'activeStatus/getIds')
        .then((activeStatus) => {
            let favorite = activeStatus.favorite;
            let basket = activeStatus.basket;
            let compare = activeStatus.compare;
            /** Деактивируем если элемента нет в массиве*/
            $('.complite-add-to-basket-added').each(function () {
                const element = $(this).find('.items__add');
                const productId = element.attr('data-product-id')
                if (!basket.includes(productId)) {
                    element.removeClass('complite-add-to-basket-added');
                }
            })
            $('.items-over-functionals__holdOnBtn:not(#holdOn).active-icon').each(function () {
                const element = $(this);
                const productId = element.attr('data-product-id')
                if (!basket.includes(productId)) {
                    element.removeClass('complite-add-to-basket-added');
                }
            })
            $('.items-over-functionals__compare.active-icon').each(function () {
                const element = $(this);
                const productId = element.attr('data-product-id')
                if (!basket.includes(productId)) {
                    element.removeClass('complite-add-to-basket-added');
                }
            })
            /** end */

            basket.forEach((productId) => {
                if ($('.items__description .complite-add-to-basket-added') && productId);
                $('.items__add[data-product-id=' + productId + ']').closest('.buttons-block').addClass('complite-add-to-basket-added');
                $('.items-over-functionals__holdOnBtn[data-product-id=' + productId + ']:not(#holdOn)').removeClass('active-icon');
            })

            favorite.forEach((productId) => {
                $('.items-over-functionals__holdOnBtn[data-product-id=' + productId + ']:not(.favorite)').addClass('active-icon');
                $('.items__description .items__add[data-product-id=' + productId + ']').closest('.buttons-block').removeClass('complite-add-to-basket-added');
                $('.detailContent__button-holdOn[data-product-id=' + productId + ']').addClass('active-icon');
            })

            compare.forEach((productId) => {
                $('.items-over-functionals__compare[data-product-id=' + productId + ']').addClass('active-icon');
                $('.detailContent__button-compare[data-product-id=' + productId + ']').addClass('active-icon');
            })
        })
}

const checkFavoriteProduct = (id) => {
    ajaxRequest('POST', 'favorite/check', {id: id})
        .then((res) => {
            if(res){
                $('.detailContent__button-holdOn').addClass('active-icon');
            }
        })
}



/** Compare START */
const toggleCompare = (e) => {
    let element = e.target || e;
    let name = $(element).data('productName');
    let text = $(element).hasClass('active-icon') ? "Убран из сравнения" : "Добавлено в сравнение";
    let data = {
        ID: $(element).data('productId'),
        // SECTION_ID: $(element).data('categoryId'),
        CODES: $(element).data('displayProperties'),
        ACTION: $(element).hasClass('active-icon') ? 'remove' : 'add'

    }

    $(element).toggleClass('active-icon');
    ajaxRequest('POST', 'compare/toggle', data)
        .then((res) => {
            updateCompare();
            getCompareCount();
            updateCounters();
            popupAdd(name, text);
        })
        .catch((err) => {
            isError = true;
            text = "Данный товар уже есть в сравнениях!";
            popupAdd(name, text, isError);
        });
}
const getCompareCount = () => {
    ajaxRequest('GET', 'compare/getCount')
        .then((res) => {
            $('#compare__count').html(res + ' товаров');

            if(res <= 0) {
                $('#compare__count').parent().attr('data-empty', true);
            } else {
                $('#compare__count').parent().attr('data-empty', false);
            }
            comparePreviewBoard();
        })
        .catch((err) => {
            console.log(err);
        })
}
const delete5Compare = (e, productId = null) => {
    const element = e.target || e;
    const id = productId ?? $('.compare__previewItemAddFavorites').data('productId');
    const items = $('.owl-stage .owl-item.active');
    const tabs = $('.compare__tabsItem');
    const activeTab = $('.compare__tabsItem.tabItem-active');
    const itemsWrap = $('.compare__windowsItem');
    const activeItemsWrap = $(`.compare__windowsItem[data-index="${activeTab.data('index')}"]`);
    const active = 'tabItem-active';
    
    let data = {
        ID: id,
    }
    ajaxRequest('POST', 'compare/delete', data)
        .then(() => {
            getCompareCount();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            $(element).closest('.owl-item').remove();
            if(!activeItemsWrap.has('.owl-item.active').length) {
                function addActiveTab(i) {
                    $(itemsWrap).filter('[data-index = ' + i + ']').addClass('tabContent-active');
                    setTimeout(function () {
                        $('.tabContent-active').addClass('tabContent-visible')
                        const maxh = $('.tabContent-active').height();
                        $(itemsWrap).css({
                            "min-height": maxh
                        });
                    }, 100);
                }
                tab = tabs.not(`.${active}`).first();
                if (!tab.hasClass(active)) {
                    index = tab.data('index');
                    location.hash = index;
                    $(activeTab).remove();
                    $(tab).addClass(active);
                    $(itemsWrap).removeClass('tabContent-active tabContent-visible');
                    addActiveTab(index);
                }
            }
            if(!$('.owl-item').length) clearCompare();
        })
};
const clear5Compare = (e) => {
    let element = e.target || e;
    ajaxRequest('POST', 'compare/clear')
        .then(() => {
            getCompareCount();
            clearCompare();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            $(element).closest('.owl-item').remove();
        });
};
const getCompare = () => {
    if(getCookieValue("updateCompare") == "true"){
        if($('#compare__previewSlider')[0].childElementCount != 0) {
            $('#compare__previewSlider').empty();
        }
        loader({
            status: 'add',
            parent: '#compare__previewSlider',
            className: 'loader'
        });
        $.post(
            '/ajax/',
            {
                action: 'Compare/get',
            },
            function (res) {
                renderCompare(res);
            },
            'json'
        )
        document.cookie = "updateCompare=false"
    }
}
const getCompareResult = () => {
    ajaxRequest('GET', 'compare/get', data)
        .then((res) => {
            if(res - res != 0){
            if($('#compare__wrap')[0].childElementCount != 0) {
                $('#compare__wrap').empty();
            }
            renderCompareResult(res);
            }
        })
        .catch((err) => {
            console.log(err)
        });
};
function updateCompare() {
    document.cookie = "updateCompare=true"
}

const checkCompareProduct = (id) => {
    ajaxRequest('GET', 'compare/check', {id: id})
        .then((res) => {
            if(res){
               $('.detailContent__button-compare').addClass('active-icon');
            }
        });
};
/** Compare FINISH */

const toggleBasket = (e) => {
    let element = e.target || e;

    let id = $(element).data('productId');
    id = String(id);
    let name = $(element).data('productName');
    name = name.replace('"', '');

    let quantity = $('#items__counterInput-' + id).val() || $('.detailContent__counterBar .input-count').val() || $(element).closest('.goods__basketRow').find('.goods__basketItem-counter');
    let data = {
        ACTION: $(element).hasClass('active-icon') ? 'remove' : 'add',
        PRODUCT_ID: id,
        QUANTITY:  parseFloat(quantity) || 1,
    };

    let text = $(element).hasClass('active-icon') ? "Удалено из корзины" : "Добавлено в корзину";

    $(element).toggleClass('active-icon');
    ajaxRequest('POST', 'basket/toggle', data)
        .then((res) => {
            updateCounters()
            setActiveStatusProducts()

            popupAdd(name, text);

        })
        .catch((err) => {
            console.log(err);
            let isError = true;
            let text = "Что-то пошло не так";
            popupAdd(name, text, isError);
        });
}




/** Personal Account START */
const savePass = () => {
    const form = $('#lk__changePasswordForm')[0];
    let formData = new FormData(form);
    let title, text;

    ajaxRequest('POST', 'personalAccount/changePassword', formData)
        .then((resp) => {
            $('.modal').fadeOut();
            $('body').attr('style', '');
            $('body').removeClass('fixed-scroll')
            title = 'Пароль';
            text = resp;
            popupAdd(text, title);
            // window.location.href = "http://www.stroy-s.org/login";
        })
        .catch((err) => {
            $('.lk__password-error.error').empty();
            $('.lk__password-error.error').prepend(`<p style="color:red">${err.responseJSON}</p>`);
        })
        .catch((err) => {
            console.log(err);
        });
};
const saveUserInfo = () => {
    const form = $('#lk__individualForm');
    const inputs = $('.lk__input');
    validateForm(inputs);
    const formData = new FormData(form[0]);

    let title;
    let text;
    let hasError = false;

    ajaxRequest('POST', 'personalAccount/changePersonalData', formData)
        .then(() => {
            title = "Сохранение";
            text = "Успешно сохранено!";
            $('.lk__label-error.body14').empty().hide();
        })
        .catch((response) => {
            console.log(response);
            hasError = true;
            let errorText = "Ошибка сохранения!";
            if(response.responseJSON){
                // console.log(response.responseJSON.error);
                errorText = "";
                for( let key in response.responseJSON.error ){
                    let errorsText = response.responseJSON.error[key].replace('<br>', '')
                    $(`input[name="${key}"]`).siblings('label').show().text(errorsText)
                
                    errorText += response.responseJSON.error[key] + "<br>";
                }
            }
            title = "Ошибка сохранения";
            text = errorText;
        })
        .finally(() => {
            popupAdd(text, title, hasError);
        });
}
const toggleFilterBtn = (e) => {
    const element = e.target || e;
}

const getItemsList = (e) => {
    let element = e.target || e;
    if($('#ls__stocksBox')[0].childElementCount == 0) {
        loader({
            status: 'add',
            parent: '#lk__window-stocks',
            className: 'loader'
        });
        let data = {
            PAGE: $(element).data('pageNum') || 1,
            SECTION_ID: $(element).data('sectionId') || ''
        }
        ajaxRequest('GET', 'personalAccount/purchasedProducts', data)
            .then((res) => {
                renderPersonalAccountProductsItemsList(res);
            })
            .catch((err) => {
                console.log((err));
            });
    }
};
const getItemsCategoryList = () => {
    ajaxRequest('GET', 'personalAccount/purchasedProductsCategories')
        .then((res) => {
            renderPersonalAccountProductsCategoryList(res);
        })
        .catch((err) => {
            console.log(err);
        });
}
const getOrderCount = () => {
    $.post(
        '/ajax/orderCount.php',
        {},
        function (res) {
            renderPersonalAccountOrderCount(res);
        },
        'json'
    );
};
/** Personal Account FINISH */


const renderFullName = () => {
    userFullName = $('.lk__userTitle');
    let lastName = $('#settingLastName').val();
    let firstName = $('#settingName').val();

    userFullName.html(firstName + ' ' + lastName);
    if(userFullName.html() == ' '){
        userFullName.html('Безымян Безымяныч')
    }
}

function openModalByHash() {
    if (window.location.hash === '#wholesale-success') {
        document.querySelector('.popupAddedToCard').insertAdjacentHTML('afterbegin', `
            <div class="popupAddedToCard__item popupAddedToCard__item_complectuyush">
                <h4 class="popupAddedToCard__title">Заявка на регистрацию в качеcтве оптового покупателя отправлена.</h4>
                Наш специалист свяжется с вами в ближайшее время
            </div>
        `)
    }
    popupEvent()
}

function myFunction() {
    document.getElementById("mypriceCatalogDropdown").classList.toggle("showDroppCatalog");
}
window.onclick = function(event) {
    if (!event.target.matches('.catalogPriceBtnDropped')) {
      var priceCatalogDropdowns = document.getElementsByClassName("priceCatalogDropdown-content");
      var i;
      for (i = 0; i < priceCatalogDropdowns.length; i++) {
        var openpriceCatalogDropdown = priceCatalogDropdowns[i];
        if (openpriceCatalogDropdown.classList.contains('showDroppCatalog')) {
          openpriceCatalogDropdown.classList.remove('showDroppCatalog');
        }
      }
    }
}

// чипсы в фильтре
const chips = () =>{
    $('body').on('click', '.category__filtersInput-checkbox[type="checkbox"]', function(){
        const chipId = $(this).siblings('.category__filtersInputLabel').attr('for')
        const chipParamItem = $(this).siblings('.category__filtersInputLabel-checkbox').find('.bx-filter-param-text').attr('title')

        // если кликаем по выбранному чеку(снимаем чек), тогда удаляем чипсину
        if($(this).is(":checked")){
            $('.category-filter').prepend(`
                <div class="category-filter-item" data-chip="${chipId}">
                    ${chipParamItem}
                    <svg class="close-category-filter" width="16" height="16" viewBox="0 0 16 16" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 12L12 4M4 4L12 12" stroke="#333333" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </div>
            `)
        }else{
            $('.category-filter').find(`.category-filter-item[data-chip="${chipId}"]`).remove();
        }
        
        if($('.category-filter-item').length == 1 && $('.category-filter-item.clear-all').length <= 0){
            $('.category-filter').append(`
                <div class="category-filter-item clear-all" data-open="true">
                    Очистить все
                    <svg class="close-category-filter" width="16" height="16" viewBox="0 0 16 16" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 12L12 4M4 4L12 12" stroke="#333333" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </div>
        `)
        }if($('.category-filter-item').length == 0 ){
            $('.category-filter-item.clear-all').remove();
        }
        if($('.category-filter-item').length == 1 && $('.category-filter-item.clear-all').length > 0){
            $('.category-filter-item.clear-all').remove();
        }
    })
}
// скрытие модалки при submit
const getNewModal = (trigger, modal) => {
    $(trigger).submit(function(e) {
        e.preventDefault();
        $(modal).css("display", "flex").hide().fadeIn();
    })
}
// скрыть модалку
const removeNewModal = (trigger, modal) => {
    $(document).on('click', trigger, () => {
        $(modal).fadeOut();
    }) 
}
// задержка инпута
const debounce = (func, delay) => {
    let timer;
    return function() {
        clearTimeout(timer);
        timer = setTimeout(func, delay);
    }
}

//search ajax
var xhrSearch;
const search = (element) => {
    const MIN_TEXT_SIZE = 3;
    const searchBody = $('.nav__searchBody');
    const loader = searchBody.siblings('.nav__searchLoader');
    const searchText = $(element).val();
    let data = {
        q: searchText
    };

    loader.fadeIn();
    xhrSearch = $.ajax({
        url: "/ajax/searchAjax.php",
        method: "GET",
        data,
        dataType: "text",
    }).done(function(responce) {
        if($(window).width() <= 768){
            $('.nav__searchBody').css({'display' : 'grid'})
            $('.searchbody-popular .category-items-last__row .items__price-pack').each(function(){
                if(!$(this).text().trim().length) {
                    $(this).closest('.items-packbox').css('display', 'none')
                }
            })
            $('.searchbody-box').html(responce);
            loader.fadeOut();
        }else{
            $('.nav__searchBody').css({'display' : 'grid'})
            .html(responce);
            $('.searchbody-popular .category-items-last__row .items__price-pack').each(function(){
                if(!$(this).text().trim().length) {
                    $(this).closest('.items-packbox').css('display', 'none')
                }
            })
            loader.fadeOut();
        }
        if ($(window).width() > 768 && $('.items__imageBox').length) {
            $('.items__imageBox').HvrSlider();
        }else if($(window).width() <= 768 && $('.items-image-container')){
            let sezSlider = $('.items-image-container');
            sezSlider.owlCarousel({
                lazyLoad: true,
                items: 1,
                pagination: true,
                dots: true,
                autoHeight: false,
                autoWidth: false,
                margin: 10,
                thumbs: false,
                smartSpeed: 300
            });
        }
    })
    ;
}
$.fn.setCursorPosition = function(pos) {
    if ($(this).get(0).setSelectionRange) {
    $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
    var range = $(this).get(0).createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
    }
};
// $(document).on('click', 'input[name="PHONE"]', function(){
//     $(this).setCursorPosition(3);
// })

$('input[name="PHONE"]').mask("+7 999 999 99 99", {autoclear:false});

// очистка инпута "поиск по категории"
function clearInputSearchCategorys() {
	let clearInoutSearchCrestick = document.querySelector('.main-catalog__clearsearch');
    if(clearInoutSearchCrestick){
        clearInoutSearchCrestick.addEventListener('click', (e) => {
            e.currentTarget.parentElement.parentElement.querySelector('.main-catalog__searchInput').value = '';
        });
    }
};

function checkCookies(){
    let cookieDate = localStorage.getItem('cookieDate');
    let cookieNotification = document.getElementById('cookie_notification');
    let cookieBtn = cookieNotification.querySelector('.cookie_accept');

    // Если записи про кукисы нет или она просрочена на 1 год, то показываем информацию про кукисы
    if( !cookieDate || (+cookieDate + 31536000000) < Date.now() ){
        cookieNotification.classList.add('show');
    }

    // При клике на кнопку, в локальное хранилище записывается текущая дата в системе UNIX
    cookieBtn.addEventListener('click', function(){
        localStorage.setItem( 'cookieDate', Date.now() );
        cookieNotification.classList.remove('show');
    })
}
function myFunction() {
    document.getElementById("mypriceCatalogDropdown").classList.toggle("showDroppCatalog");
}
// ??
window.onclick = function(event) {
    if (!event.target.matches('.catalogPriceBtnDropped')) {
      var priceCatalogDropdowns = document.getElementsByClassName("priceCatalogDropdown-content");
      var i;
      for (i = 0; i < priceCatalogDropdowns.length; i++) {
        var openpriceCatalogDropdown = priceCatalogDropdowns[i];
        if (openpriceCatalogDropdown.classList.contains('showDroppCatalog')) {
          openpriceCatalogDropdown.classList.remove('showDroppCatalog');
        }
      }
    }
}
$.fn.setCursorPosition = function(pos) {
    if ($(this).get(0).setSelectionRange) {
    $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
    var range = $(this).get(0).createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
    }
};
$(document).on('click', '.authorization__checkBox.your-lic', function(){
    if($('#UF_WORK_KPP').length > 0){
        $('#UF_WORK_KPP').mask("999999999", {placeholder: "", autoclear:false});
    }
})
BX.addCustomEvent('onAjaxSuccess', () => {
		clearInputSearchCategorys();
       
});

$(document).ready(() => {
    sendForm();
    buttonOpenForm();
    emailConfirmationUrl();
    changePasswordUrl();
    setActiveStatusProducts();
    getCompareCount();
    updateCompare();
    checkCookies();
    updateCounters()
    chips();
    removeNewModal('.searchbody-header--back', '.nav__searchBody')
    openModalByHash();

    $('.detail-accordeon.open').find('.detail-accordeon__footer').slideToggle(300);
    $('.detail-accordeon.open').find('.arrow').toggleClass('transform-180')

    $(document).on('click', '.get-modal-delivery', (event) => {
        $('.price-delivery-modal').css("display", "flex").hide().fadeIn();
    }).on('click', '.price-delivery-modal__closeBtn', (event) => {
        $('.price-delivery-modal').fadeOut();
    }).on('click', '.allcategory-box__right', function(){
        $('.allcategory-box_block').stop().animate({scrollLeft: "+=100"}, 800);
        return false;
    }).on('click', '.allcategory-box__left', function(){
        $('.allcategory-box_block').stop().animate({scrollLeft: "-=100"}, 800);
        return false;
    }).on('click', '.items__delivery', (event) => {
        $('.price-delivery-modal').css("display", "flex").hide().fadeIn();
    }).on('click', '.detail-accordeon__header', function(){
        $(this).siblings('.detail-accordeon__footer').slideToggle(300);
        $(this).find('.arrow').toggleClass('transform-180')
        $(this).closest('.detail-accordeon').toggleClass('open')
        return false;
    }).on('click', '.close-modal-basket', function(){
        $('body').removeClass('fixed-scroll')
        $('.modal-basket').fadeOut();
        return false;
    }).on('click', '.modal-basket-btn.orange', function(e){
        e.preventDefault();
        $('body').removeClass('fixed-scroll')
        $('.modal-basket').fadeOut();
        return false;
        
    }).on('click', '.basket-complect .authorization__input-checkbox', function(){
        $(this).attr("checked", !$(this).attr("checked"));

        if($(this).is(":checked")){
            // если записи в куки нет, тогда добавляем запись и показываем модалку корзины
             $.cookie('showOnlyOneBasket', 'showOnlyOneBasket', { expires: 1 });
             
        }else{
            $.removeCookie('showOnlyOneBasket');
        }
    })
    .on('click', '.mobile-auth-header', function(){
        $('#auth-popup').css('display', 'none')
        $('body').removeClass('fixed-scroll')
        if($(window).width() <= 768){
            $('.not-authorized').removeClass('active')
        }
    })
    .on('click', '.doli', function(){
        $('.doli-modal').css("display", "flex").hide().fadeIn();
        $('body').addClass('fixed-scroll')
        if($(window).width() <= 768){
            $('.doli-modal-inner').addClass('active')
        }
    })
    .on('click', '.doli-modal__close', function(){
        $('.doli-modal').fadeOut();
        $('body').removeClass('fixed-scroll')
        if($(window).width() <= 768){
            $('.doli-modal-inner').removeClass('active')
        }
    })
    .on('click', '.basket .show-doli.detail-services__item--doli', function(){
        $('.service-modal-btn[data-tab="2"]').hide();
        $('.service-modal-tab[data-tab="2"]').hide();

        $('.service-modal-btn[data-tab="1"]').show();
        $('.service-modal-tab[data-tab="1"]').show();
    })
    .on('click', '.basket .show-doli.detail-services__item--tink', function(){
        $('.service-modal-btn[data-tab="1"]').hide();
        $('.service-modal-tab[data-tab="1"]').hide();

        $('.service-modal-btn[data-tab="2"]').show();
        $('.service-modal-tab[data-tab="2"]').show();
    })
    .on('click', '.podpiska-modal', function(e){
        if(e.target.classList.contains('podpiska-modal')){
            $(this).fadeOut();
            $('body').removeClass('fixed-scroll')
        }
    })


    $(document).on("submit", 'form[name="CALCULATE_DELIVERY"]', function (e) {
       e.preventDefault();
       let action = $(this).attr('action');
       $.ajax({
           method: "POST",
           url: action,
           data: $(this).serialize(),
           success: function (response) {
               $('.price-delivery-modal').fadeOut();
               $('.uspeh-zapros-modal').css("display", "flex").hide().fadeIn();
           }
       });
    });

    removeNewModal('.uspeh-zapros-modal .close-btn', '.uspeh-zapros-modal')
    $(document).on('click', '.nav__barUserAuthItem-login',function (e) {
        e.preventDefault();
        e.stopPropagation();

        const element = $(e.target);
        // Если модалка вызвана при нажатии на кнопку
        $('.wholesale__text').remove()
        if (element.hasClass('wholesale')) {
            // Добавляем текст
            $('#auth-popup .auth-popup__title').after('<div class="wholesale__text" style="width: 100%; margin-top: 10px;">Чтобы перейти в оптовый отдел нужно авторизоваться</div>')
            // То сохраняем в локалстородж url куда нужно редиректить после регистрации/авторизации.
            // Используется в BXmakerAuthuserphoneEnterAjaxResponse
            localStorage.setItem('wholesaleUrl', element.data('url'))
        }

        $('#auth-popup').fadeIn(200);
        $('body').addClass('fixed-scroll')
        if($('.mobile-header__profile').length > 0){
            $('body').addClass('fixed-scroll')
            $('.mobile-header__profile').find('.open-menu').addClass('active')
        }
        // const headerAuthModal = $('.authorization__widnow')[0];
        // $(headerAuthModal).fadeToggle(200);
    })
    .on('click', '.authorization__closeBtn', function(){
        $("#auth-popup").fadeOut(200);
        $('body').removeClass('fixed-scroll')
    })
    .on('click', '#auth-popup', function(e){
        // if($(this))
        e.stopPropagation();
        if(e.target.classList.contains('sign-container')){
            $("#auth-popup").fadeOut(200);
            $('body').removeClass('fixed-scroll')
        }
    })
    if($.cookie('doliBanner') != 'Y' && $(".find.dolyami").length > 0){
        var doliChecked =  false;
        $(window).scroll(function () {
            let target = $(".find.dolyami").offset().top;
            if(doliChecked == false){
                if ($(window).scrollTop() >= target) {
                    doliChecked = true
                    $.cookie('doliBanner', 'Y', { expires: 365 });
                    console.log('addedDoliCookie')
                }
            }   
        });
    }

    $('input[name="UF_WORK_KPP"]').mask("999999999", {placeholder: "", autoclear:false});

    $(document).on('click', 'input[name="UF_WORK_KPP"]', function(){
        var countN = ($(this).val().match(/([0-9])/g) || []).length;
        $(this).setCursorPosition(countN);
    })

    let element = $('.lk__tabItem.tabItem-active');

    $('.userSettings')
        .on('click', '#e_lk-order-detail', getDetail);

    $(document)
        .on('click', '#e_favorite', toggleFavorite)
        .on('click', '#e_compare', toggleCompare)
        .on('click', '#e_basket', add2Basket)
        .on('click', '#e_del-compare',  clear5Compare)
        .on('click', '#entSendMailBasket', sendBasket);


});

BX.addCustomEvent('onAjaxSuccess', () => {
    setActiveStatusProducts();
    clearInputSearchCategorys();
});

$(function (){
    $(document).on("change", ".modal-basket-product .input-count", function () {
       let parent = $(this).closest('.goods__basketRow');
       changeModalBasketCount(parent);
    });

    $(document).on("click", ".modal-basket-product .items__counterButton", function () {
        let parent = $(this).closest('.goods__basketRow');
        changeModalBasketCount(parent);
    })

    function changeModalBasketCount(parent) {
        let count = parent.find('.input-count').val();
        let basketId = parent.attr('data-id');
        let action = parent.attr('data-action');
        $.post(
            action,
            {
                ACTION : 'CHANGE_COUNT',
                ID : basketId,
                COUNT : count
            },
            function (res) {

            }
        )
    }

    $(document).on("click", ".modal-basket-product .goods__basketItemControl-remove", function () {
        let parent = $(this).closest('.goods__basketRow');
        let basketId = parent.attr('data-id');
        let action = parent.attr('data-action');
        $.post(
            action,
            {
                ACTION : 'DELETE',
                ID : basketId,
            },
            function (res) {
                $('body').removeClass('fixed-scroll')
                $('.modal-basket').fadeOut();
            }
        )
    })

    $(document).on("click", ".order__contactsTabsItem", function () {
       let index = $(this).attr('data-index');
       if(index == "2"){
           $('.tinkoff__icon.open-tink-modal').hide();
       }else{
           $('.tinkoff__icon.open-tink-modal').show();
       }
       $('.paysis-tab').removeClass('paysis-tab--active')
       $(`.paysis-tab[data-index="${index}"]`).addClass('paysis-tab--active')

    })
    .on('click', '.service-modal-btn', function(){
        const thisDataValue = $(this).attr('data-tab')

        $('.service-modal-btn').removeClass('service-modal-btn--active')
        $(this).addClass('service-modal-btn--active')

        $('.service-modal-tab').hide()
        $(`.service-modal-tab[data-tab="${thisDataValue}"]`).show()

    })
    .on('click', '.service-modal__close', function(){
        $('.tinkoff__container').removeClass('tinkoff--active')
        $('body').removeClass('fixed-scroll')
    })
    .on('click', '.detail-services__item--tink', function(){
        $('.tinkoff__container ').addClass('tinkoff--active')

        $('.service-modal-btn').removeClass('service-modal-btn--active')
        $('.service-modal-tab').hide()

        $('.service-modal-btn[data-tab="2"]').addClass('service-modal-btn--active')
        $('.service-modal-tab[data-tab="2"]').show()
        if($(this).closest('.detailContent__priceBar')){
            $('.tinkoff__container .service-modal-title').text('Воспользуйтесь рассрочкой')
            $('.tinkoff__container .service-modal-btns').hide()
        }else{
            $('.tinkoff__container .service-modal-title').text('Воспользуйтесь рассрочкой или оплатой долями')
            $('.tinkoff__container .service-modal-btns').show()
        }
    })
    .on('click', '.detail-services__item--doli', function(){
        $('.tinkoff__container ').addClass('tinkoff--active')

        $('.service-modal-btn').removeClass('service-modal-btn--active')
        $('.service-modal-tab').hide()

        $('.service-modal-btn[data-tab="1"]').addClass('service-modal-btn--active')
        $('.service-modal-tab[data-tab="1"]').show()
        if($(this).closest('.detailContent__priceBar')){
            $('.tinkoff__container .service-modal-title').text('Воспользуйтесь оплатой долями')
            $('.tinkoff__container .service-modal-btns').hide()
        }else{
            $('.tinkoff__container .service-modal-title').text('Воспользуйтесь рассрочкой или оплатой долями')
            $('.tinkoff__container .service-modal-btns').show()
        }

        let doliBtn = $('.doli-btn-go-basket')
        let elementBtn = $('.detailContent__priceBar .detailContent__button.detailContent__button-add')
        const productId = elementBtn.attr('data-product-id')
        const productName = elementBtn.attr('data-product-name')
        const id = elementBtn.attr('id')
        const productPrice = elementBtn.attr('data-product-price')
        const productCategoryList = elementBtn.attr('data-category-list')
        const productBrand = elementBtn.attr('data-product-brand')

        console.log(elementBtn)
        doliBtn.attr('data-product-id', productId)
        doliBtn.attr('data-product-name', productName)
        doliBtn.attr('id', id)
        doliBtn.attr('data-product-price', productPrice)
        doliBtn.attr('data-category-list', productCategoryList)
        doliBtn.attr('data-product-brand', productBrand)


    })
    .on('click', '.tinkoff__container', function(e){
        if(e.target.classList.contains('tinkoff__container')){
            $('.tinkoff__container').removeClass('tinkoff--active')
            $('body').removeClass('fixed-scroll')
        }
    })
    .on('click', '.show-doli', function(){
        let priceDoli = $('.goods__windowsItem.tabContent-active .goods__totalPrice').text().replace('₽','').trim().replace(/\u00A0/g, '').replace(' ', '')
        $('.doli-price-textbox__price').text( `${((Number(priceDoli) / 4).toFixed(2))} ₽`)
    })    

});

if($(window).width() <= 768){

    function closeResult() {
        $('.nav__searchBody').find('.nav__history').empty()
        $('.nav__searchBody').find('.searchbody-popular').empty()
    }

    $(document).on('click', '#search', function(){
        $('.nav__searchBody').css('display', 'grid');
        $('.mobile-header').addClass('hide-block')
        $('body').addClass('fixed-scroll')
        if($('.nav__searchBody:has(div)').length <= 0){
            $('.nav__searchBody').append(`
                <div class="searchbody-header">
                    <div class="searchbody-header--back">
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="36" height="36" rx="18" fill="#F7F7F9"/>
                            <path d="M11 18H25" stroke="#8C0D18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16 13L11 18" stroke="#8C0D18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16 23L11 18" stroke="#8C0D18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Назад
                    </div>
                    <svg class="searchbody-header--back" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 18L18 6M6 6L18 18" stroke="#9B9B9C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div class="searchbody-container">
                    <div class="searchbody-search">
                        <div class="searchbody-inputbox">
                            <p>Поиск</p>
                            <div class="searchbody-inputbox--inner">
                                <input type="search" id="inner-search-search" />
                                <button class="searchbody-searchbtn">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="11.059" cy="11.0588" r="7.06194" stroke="#BFC0C1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M20.0034 20.0034L16.0518 16.0518" stroke="#BFC0C1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="searchbody-box"></div>
                    </div>
                </div>
                <div class="searchboy-find">
                    <button class="button">Найти</button>
                </div>
            `)
            search('#inner-search-search');
            $('#inner-search-search').focus();
            
        }
    })
    .on('input', '#inner-search-search', debounce(function(e) {
        $('#search').val($('#inner-search-search').val())
        $('#search').attr('value', $('#inner-search-search').val())
       
        search('#inner-search-search');    
    }, 1000))
    .on('click', '.searchboy-find .button', function(){
        if (localStorage.getItem("searchHistoryVersion") != "1.6") {
            localStorage.removeItem("searchHistory");
            localStorage.setItem("searchHistoryVersion", "1.6");
        }
        
        const storage = localStorage.getItem("searchHistory");
        const storageCopy = JSON.parse(storage);
    
        let value = $('#main-search-from').serializeArray()[0].value;
        value = value.substring(0, 200);
        if(value.length <= 0){return}
        if (storage) {
            let blocker = false;
            storageCopy.length > 8 && storageCopy.shift();
            $(storageCopy).each((i, el) => {
                if (value === el) {
                    blocker = true;
                }
            });
            if (!blocker) {
                storageCopy.push(value);
            }
            localStorage.setItem("searchHistory", JSON.stringify(storageCopy));
        } else {
            localStorage.setItem("searchHistory", JSON.stringify([value]));
        }

        $('#main-search-from')[0].submit()
        $('body').removeClass('fixed-scroll')
    })
    .on('keypress', '#inner-search-search', function(e){
        var key = e.which;
        if(key == 13){
            if (localStorage.getItem("searchHistoryVersion") != "1.6") {
                localStorage.removeItem("searchHistory");
                localStorage.setItem("searchHistoryVersion", "1.6");
            }
            
            const storage = localStorage.getItem("searchHistory");
            const storageCopy = JSON.parse(storage);
        
            let value = $('#main-search-from').serializeArray()[0].value;
            value = value.substring(0, 200);
            if(value.length <= 0){return}
            if (storage) {
                let blocker = false;
                storageCopy.length > 8 && storageCopy.shift();
                $(storageCopy).each((i, el) => {
                    if (value === el) {
                        blocker = true;
                    }
                });
                if (!blocker) {
                    storageCopy.push(value);
                }
                localStorage.setItem("searchHistory", JSON.stringify(storageCopy));
            } else {
                localStorage.setItem("searchHistory", JSON.stringify([value]));
            }

            $('#main-search-from')[0].submit()
            $('body').removeClass('fixed-scroll')
        }
    })    
    .on('click', '.searchbody-header--back', function(){
        xhrSearch.abort();
        $('.mobile-header').removeClass('hide-block')
        $('.nav__searchLoader').css('display', 'none')
        $("#inner-search").val('')
        $("#inner-search").attr('value', '')
        $('#search').val('')
        $('#search').attr('value', '')
        $('.nav__searchBody').empty();
        $('body').removeClass('fixed-scroll')
    })

}else{
    function setInput(){
        const input =  $('#search');
        function closeResult(){
            input.siblings('.nav__searchBody').empty()
        }
        input.on('input', debounce(function(e) {
            input.val().length < 3
                ? closeResult()
                : search(input); 
        }, 1000))
        .on('click', function(e){
            const element = e.target
            $(this).closest('.nav__search').find('.nav__searchBody:has(div)').length > 0
            ? null
            : search($(this))
                
        });
    }
    setInput();
    $(document).on('click', '.close-search-modal', function(){
        xhrSearch.abort()
        $('.nav__searchLoader').css('display', 'none')
        $('#search').val('')
        $('#search').attr('value', '')
    })
}

// скрипты для месседжеров в оформлении заказов
$(function () {
   $(document).on('change', 'input[type=radio][name=messengers]', function () {
       let messengerValue = $(this).val();
       $('.order-messenger-link').hide();
       if(messengerValue === "viber"){
           $('.order-viber-link').css('display', 'inline-block');
       }else if (messengerValue === "telegram") {
           $('.order-telegram-link').css('display', 'inline-block');
       }
   })
    // для работы возврата удаленного товара    
   localStorage.removeItem('elementList');
});

$.mask.definitions['h'] = "[0|1|3|4|5|6|7|9]"
$('input[is="phone"]').mask("+7 (h99) 999-99-99");

$(function () {
   $(document).on('click', '.messenger-subscribe-button', function (e) {
       e.preventDefault();
       BX.ajax.runComponentAction("asap:messengers.links", "addUserSubscribe", {
           mode: "class",
           data: {

           },
       }).then(function (response) {
            $('.find.notification.find-messangers').hide();
            $('.podpiska-modal').css('display', 'flex');
       });
   })
});
$(document).on('click', '.goods__send.goods__copy-link', function(e){
    let elementUrl = $(this).siblings('#share-link').attr('data-url')
    $(this).siblings('#share-link').find('.share-link-item--telegram').attr('href', `https://t.me/share/url?url=${elementUrl}`)
    $(this).siblings('#share-link').find('.share-link-item--viber').attr('href', `viber://forward?text=${elementUrl}`)
    $(this).siblings('#share-link').find('.share-link-item--whatsapp').attr('href', `https://api.whatsapp.com/send?text=${elementUrl}`)
    
    $(this).siblings('#share-link').slideToggle();
   
})
.on('click', 'body', function(e){
    if(!e.target.closest('.goods__send.goods__copy-link')){
        $('#share-link').fadeOut()
    }
})
.on('click', '.share-link-copy-link', function(){
    var textToCopy = $(this).closest('#share-link').attr('data-url');
    var tempInput = $('<input>');
    $('body').append(tempInput);
    tempInput.val(textToCopy).select();
    document.execCommand('copy');
    tempInput.remove();
})
.on('click', '.tags-popular__button', function(){
    $('.tags-popular-container').toggleClass('active-popular')
    let parentHeight = Number($('.tags-popular-box').height()) + 78;
    let goodBoxHeight = Number($('.tags-popular-items').height())
    if($('.tags-popular-container').hasClass('active-popular')){
        $('.tags-popular__button svg').removeClass('rotate-0')
        $('.tags-popular__button svg').addClass('rotate-180')
        $('.tags-popular-container').animate({maxHeight: `${parentHeight}px`, height: `${parentHeight}px`}, 500)
    }else{
        $('.tags-popular-container').animate({maxHeight: `${goodBoxHeight}px`, height: `${goodBoxHeight}px`}, 500)
        $('.tags-popular__button svg').removeClass('rotate-180')
        $('.tags-popular__button svg').addClass('rotate-0')
    }
})
.on('click', '#detail-podzakaz .button', function(){
    $(this).closest('#detail-podzakaz').fadeOut();
})

const showPodzakazModal = (element) =>{
    if(element.closest('.items__barItem').attr('maxCount') == undefined){
        return
    }
    if( (Number(element.closest('.items__barItem').find('.input-count').val())
        > Number(element.closest('.items__barItem').attr('maxCount')))
    ){
        if(element.closest('.category-row').length == 0){
            if($('#detail-podzakaz').attr('selected')){
            }else{
                $('#detail-podzakaz').attr('selected', 'yes')
                $('#detail-podzakaz').css('display', 'flex').hide().fadeIn();
            }
        }
    }
}
function pereRaschetPriceInDetail() {
    $('.pricebar-footer-one-pack').html($('.custom-input-size').attr('min'))
    let measure = $('.detailContent__price.detailContent__price-current').attr('data-measure');
    if (!measure) {
        measure = 'шт.'
    }
    $('.detailContent__price.detailContent__price-current').html(`
        ${$('meta[itemprop="price"]').attr('content')}
        <span>₽/${measure}</span>
    `)
    if ($('.custom-input-colvo').length) {
        $('.pricebar-footer-itog').html((Number($('meta[itemprop="price"]').attr('content')) * Number($('.custom-input-colvo').attr('value'))).toFixed(2));
    } else {
        $('.pricebar-footer-itog').html((Number($('meta[itemprop="price"]').attr('content')) * Number($('.detailContent__priceBar .input-count').attr('value'))).toFixed(2));
    }
    let priceOneMetr = Number($('meta[itemprop="price"]').attr('content')) / Number($('.custom-input-size').attr('min'))
    priceOneMetr = priceOneMetr | 0;
    $('.detailContent-price-za-metr span').html(priceOneMetr)
    if ($('.doli').length) {
        $('.doli span').text(Math.round((Number($('.pricebar-footer-itog').text()) / 4) * 100) / 100)
        $('.doli-price-textbox__price').text(`${$('.doli span').text()} ₽`)
    }
}
$(document).ready(function () {
    pereRaschetPriceInDetail()
})
// при вводе метров
$(document).on('change', '.custom-input-size', function () {
    showPodzakazModal($(this));
    let customInput = $(this).closest('.custom-input');
    let customInputColvo =  $(this).closest('.custom-input').find('.custom-input-colvo');

    //  количество штук = введенное количество метров / шаг
    customInputColvo.val(Number($(this).val()) / Number($(this).attr('step')))
    customInputColvo.attr('value', Number($(this).val()) / Number($(this).attr('step')))

    $(this).val(Number(customInputColvo.val()) * Number($(this).attr('step')))
    $(this).attr('value', Number(customInputColvo.val()) * Number($(this).attr('step')))
    // если количество штук - целое число, тогда ок
    if (typeof Number(customInputColvo.val()) === 'number') {
        if (Number(customInputColvo.val()) % 1 === 0) {
            customInput.closest('.items__barItem').find('.input-count.hide-input').val(customInputColvo.val())
            customInput.closest('.items__barItem').find('.input-count.hide-input').attr('value', customInputColvo.val())
        } else {
            if (customInputColvo.attr('data-fractional') == 'y') {
                customInputColvo.val(Number(customInputColvo.val()).toFixed(2))
                customInputColvo.attr('value', Number(customInputColvo.val()).toFixed(2))

                customInput.closest('.items__barItem').find('.input-count.hide-input').attr('value', customInputColvo.val())

                $(this).val((Number(customInputColvo.val()) * Number($(this).attr('step'))).toFixed(2))
                $(this).attr('value', (Number(customInputColvo.val()) * Number($(this).attr('step'))).toFixed(2))
            } else {
                customInputColvo.val(Math.ceil(Number(customInputColvo.val())))
                customInputColvo.attr('value', Math.ceil(Number(customInputColvo.val())))

                customInput.closest('.items__barItem').find('.input-count.hide-input').attr('value', customInputColvo.val())

                $(this).val(Number(customInputColvo.val()) * Number($(this).attr('step')))
                $(this).attr('value', Number(customInputColvo.val()) * Number($(this).attr('step')))
            }

        }
    }
    if (Number(customInputColvo.val()) > 1) {
        customInput.siblings('.items__counterButton-minus').removeClass('disabled')
    } else {
        customInput.siblings('.items__counterButton-minus').addClass('disabled')
    }

    pereRaschetPriceInDetail()

})
// при вводе количества
.on('change', '.custom-input-colvo', function () {
    let customInput = $(this).closest('.custom-input');
    let customInputSize =  $(this).closest('.custom-input').find('.custom-input-size');

    customInputSize.val(Number($(this).val()) * Number(customInputSize.attr('step')))
    customInputSize.attr('value', Number($(this).val()) * Number(customInputSize.attr('step')))

    $(this).attr('value', Number($(this).val()))
    // если количество штук - целое число, тогда Ок
    if (typeof Number($(this).val()) === 'number') {
        showPodzakazModal($(this));
        if (Number($(this).val()) % 1 === 0) {
            $('.custom-input').closest('.items__barItem').find('.input-count.hide-input').val($(this).val())
            $('.custom-input').closest('.items__barItem').find('.input-count.hide-input').attr('value', $(this).val())
        } else {
            if ($(this).attr('data-fractional') == 'y') {
                $(this).val(Number($(this).val()))
                $(this).attr('value', Number($(this).val()))
            } else {
                $(this).val(Math.ceil(Number($(this).val())))
                $(this).attr('value', Math.ceil(Number($(this).val())))
            }


            customInput.closest('.items__barItem').find('.input-count.hide-input').attr('value', $(this).val())

            customInputSize.val((Number($(this).val()) * Number(customInputSize.attr('step'))).toFixed(2))
            customInputSize.attr('value', (Number($(this).val()) * Number(customInputSize.attr('step'))).toFixed(2))
        }
    }
    if (Number($(this).val()) > 1) {
        customInput.siblings('.items__counterButton-minus').removeClass('disabled')
    } else {
        customInput.siblings('.items__counterButton-minus').addClass('disabled')
    }
    pereRaschetPriceInDetail()
})
.on('click', '.custom-input ~ .items__counterButton-plus', function () {
    let customInput = $(this).siblings('.custom-input')
    let customInputColvo = customInput.find('.custom-input-colvo')
    let customInputSize = customInput.find('.custom-input-size')

    if (!$(this).hasClass("disabled")) {

        customInputColvo.val(Number(customInputColvo.attr('value')) + 1)
        customInputColvo.attr('value', Number(customInputColvo.attr('value')) + 1)
        showPodzakazModal($(this));


        customInputSize.val(Math.round((Number(customInputColvo.attr('value')) * Number(customInputSize.attr('step'))) * 1000) / 1000)
        customInputSize.attr('value', (Math.round((Number(customInputColvo.attr('value')) * Number(customInputSize.attr('step'))) * 1000) / 1000))


        customInput.closest('.items__barItem').find('.input-count.hide-input').attr('value', customInputColvo.attr('value'))

        if (Number(customInputColvo.val()) > 1) {
            $(this).siblings('.items__counterButton-minus').removeClass('disabled')
        } else {
            $(this).siblings('.items__counterButton-minus').addClass('disabled')
        }
        pereRaschetPriceInDetail()
        // $('.items__counterButton-minus').removeClass('disabled')
    }
})
.on('click', '.items__counterButton-minus:has(+ .custom-input)', function () {
    let customInput = $(this).siblings('.custom-input')
    let customInputColvo = customInput.find('.custom-input-colvo')
    let customInputSize = customInput.find('.custom-input-size')

    if (Number(customInputColvo.val()) == 1) {
        $(this).addClass('disabled')
        return
    }
    if (!$(this).hasClass("disabled")) {
        customInputColvo.val(Number(customInputColvo.attr('value')) - 1)
        customInputColvo.attr('value', Number(customInputColvo.attr('value')) - 1)


        customInputSize.val(Math.round((Number(customInputColvo.attr('value')) * Number(customInputSize.attr('step'))) * 1000) / 1000)
        customInputSize.attr('value', (Math.round((Number(customInputColvo.attr('value')) * Number(customInputSize.attr('step'))) * 1000) / 1000))


        customInput.closest('.items__barItem').find('.input-count.hide-input').attr('value', customInputColvo.attr('value'))

        if (Number(customInputColvo.val()) > 1) {
            $(this).removeClass('disabled')
        } else {
            $(this).addClass('disabled')
        }
        pereRaschetPriceInDetail()
        // $('.items__counterButton-minus').removeClass('disabled')
    }
    if (Number(customInputColvo.val()) == 1) {
        $(this).addClass('disabled')
        return
    }

})
$(document).on('change', '.input-count', function (e) {
    showPodzakazModal($(this));
    var inputVal = Number($(this).val());
    $(this).siblings('.items__counterButton').removeClass('disabled')
    if (inputVal === '' || inputVal <= 1 || inputVal == 0) {
        $(this).attr('value', '1');
        $(this).val('1');
        $(this).siblings('.items__counterButton-minus').addClass('disabled');
    }
    $(this).attr('value', e.target.value);
    $(this).val(e.target.value);

    var pricePlace = $(this).parent().siblings('.result');
    if ('.basket') {
        pricePlace = $(this).closest('.goods__basketRow');
    }
    if (pricePlace.length > 0) {
        var priceTotal = pricePlace.find('.resultPrice'),
            priceDefault = priceTotal.attr('data-priceDefault');
        priceCount = String($(this).val() * +(priceDefault));
        if (!+(priceCount) <= 0) {
            priceTotal.text(priceCount.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + ' ₽');
        } else {
            priceCount = priceTotal.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        }
    }
    pereRaschetPriceInDetail()

});

$(document).on("click", '.items__counterButton', function () {

    let customInput = $(this).siblings('.custom-input')
    let customInputColvo;
    let customInputSize;
    var count = Number($(this).siblings('.input-count').val())
    console.log(count)
    if (customInput.length > 0) {
        customInputColvo = customInput.find('.custom-input-colvo')
        customInputSize = customInput.find('.custom-input-size')
        customInputColvo.attr('data-custinputcount', customInput.val())
        customInputColvo.text(customInputColvo.attr('data-custinputcount'))
        customInputSize.text(customInputSize.attr('data-custinputsize'))
    }
    if (!$(this).hasClass("disabled")) {
        val = $(this).siblings("input").attr("value");

        $(this).removeClass("disabled");

        if ($(this).hasClass("items__counterButton-plus2")) {
            count = count + 0.1;
            if (customInput.length > 0) {
                let textSize = customInputSize.text()
                let attrSize = customInputSize.attr('data-custinputsize')
                customInputSize.text((Number(textSize) + Number(attrSize)).toFixed(2))
            }
            $(this).siblings('.input-count').attr("value", count);
            $(this).siblings('.input-count').val(count);
            showPodzakazModal($(this));
        } else if ($(this).hasClass("items__counterButton-minus2")) {
            count = count - 0.1;
            if (customInput.length > 0) {
                let textSize = customInputSize.text()
                let attrSize = customInputSize.attr('data-custinputsize')
                customInputSize.text((Number(textSize) - Number(attrSize)).toFixed(2))
            }

            if (count - 0.1 < 0.1) {
                $(this).addClass("disabled");
                count = 0.1;
            }
            $(this).siblings('.input-count').attr("value", count);
            $(this).siblings('.input-count').val(count);
        } else if ($(this).hasClass("items__counterButton-plus")) {
            count++;
            if (customInput.length > 0) {
                let textSize = customInputSize.text()
                let attrSize = customInputSize.attr('data-custinputsize')
                customInputSize.text((Number(textSize) + Number(attrSize)).toFixed(2))
            }
            $(this).siblings('.input-count').attr("value", count);
            $(this).siblings('.input-count').val(count);
            showPodzakazModal($(this));
            $(this).siblings('.items__counterButton-minus').removeClass('disabled')
        } else {
            count--;
            if (customInput.length > 0) {
                let textSize = customInputSize.text()
                let attrSize = customInputSize.attr('data-custinputsize')
                customInputSize.text((Number(textSize) - Number(attrSize)).toFixed(2))
            }
            if (count - 1 < 1) {
                $(this).addClass("disabled");
                count = 1;
            }
            $(this).siblings('.input-count').attr("value", count);
            $(this).siblings('.input-count').val(count);
        }
        if (customInput.length > 0) {
            customInputColvo.attr('data-custinputcount', customInput.val())
            customInputColvo.text(customInputColvo.attr('data-custinputcount'))
        }

        var pricePlace = $(this).parent().siblings(".result");
        if (".basket") {
            pricePlace = $(this).closest(".goods__basketRow");
        }
        if (pricePlace.length > 0) {
            var priceTotal = pricePlace.find(".resultPrice"),
                priceDefault = priceTotal.attr("data-priceDefault"),
                priceCount;

            let totalPrice = count * +priceDefault;
            totalPrice = totalPrice.toFixed(2);
            priceCount = String(totalPrice);
            priceTotal.text(
                priceCount.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ") + " ₽"
            );
        }
    }
    pereRaschetPriceInDetail();
});


// комплектующие под вопросом удаления
// if ($('.basket').length == 0) {
//     $('.items__counterButton-minus').addClass('disabled');
// }
$(document).on('click', '.items__counterButton_complect', function () {


    val = Number($(this).siblings('.items__counterInput_complect').attr('value')),
        count = val;

    if (!$(this).hasClass('disabled')) {
        $(this).removeClass('disabled');
        if ($(this).hasClass('items__counterButton-plus')) {
            $(this).closest('.items__barItem').find('.items__counterButton-minus').removeClass('disabled');
            count++
            $(this).siblings('.items__counterInput_complect').attr('value', count);
            $(this).siblings('.items__counterInput_complect').val(count);
            showPodzakazModal($(this));
        } else {
            if (count - 1 <= 0) {
                $(this).addClass('disabled');
                count == 0
            }
            count--
            $(this).siblings('.items__counterInput_complect').attr('value', count);
            $(this).siblings('.items__counterInput_complect').val(count);
        }
        ;
    }

    var pricePlace = $(this).parent().siblings('.result');
    if ('.basket') {
        pricePlace = $(this).closest('.goods__basketRow');
    }

    if (pricePlace.length > 0) {
        var priceTotal = pricePlace.find('.resultPrice'),
            priceDefault = priceTotal.attr('data-priceDefault'),
            priceCount;

        priceCount = String(count * +(priceDefault));
        priceTotal.text(priceCount.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + ' ₽');
    }
    pereRaschetPriceInDetail()
});
$(document).on('mouseenter', '.items__counterInput_complect', function () {
    $(this).focus();
})
$(document).on('input', '.items__counterInput_complect', function (e) {
    showPodzakazModal($(this));
    var inputVal = Number($(this).val());
    $(this).siblings('.items__counterButton_complect').removeClass('disabled')
    if (inputVal === '' || inputVal <= 1 || inputVal == 0) {
        $(this).attr('value', '');
        $(this).val('');
        $(this).siblings('.items__counterButton-minus').addClass('disabled');
    }
    $(this).attr('value', e.target.value);
    $(this).val(e.target.value);

    var pricePlace = $(this).parent().siblings('.result');
    if ('.basket') {
        pricePlace = $(this).closest('.goods__basketRow');
    }
    if (pricePlace.length > 0) {
        var priceTotal = pricePlace.find('.resultPrice'),
            priceDefault = priceTotal.attr('data-priceDefault');
        priceCount = String($(this).val() * +(priceDefault));
        if (!+(priceCount) <= 0) {
            priceTotal.text(priceCount.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + ' ₽');
        } else {
            priceCount = priceTotal.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        }
    }
    pereRaschetPriceInDetail()
})

$(document).on('click', '.goods__windowsItem.tabContent-active .category-row .items__item a, .categoryPage .items__item a', function(){
    const dataId = $(this).closest('.items__item').attr('data-id');
    localStorage.setItem('lastClickedItemId', dataId);
});

$(document).ready (() => {
if($('.goods__windowsItem').length > 0 || $('.categoryPage').length > 0) {
    const lastClickedItemId = localStorage.getItem('lastClickedItemId');
    if (lastClickedItemId) {
        const element = $(`.items__item[data-id='${lastClickedItemId}']`);
        localStorage.removeItem('lastClickedItemId');
        if (element.length) {
            $('html, body').animate({
                scrollTop: (element.offset().top - 200)
            }, 500);
        }
    }
}
})


// Очистка только записей о показанных модалках при перезагрузке страницы
Object.keys(localStorage).forEach(key => {
    if (key.startsWith('modalShown_')) {
        console.log(key.startsWith('modalShown_'))
        localStorage.removeItem(key);
    }
});

// Замена дефолтного прелоудера
BX.showWait = function () {
    var loader = '<div class="preloaderbtn"><svg class="preloader__image" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path></svg></div>';
    $('body').append(loader);
    $('.preloaderbtn').show();
};

BX.closeWait = function () {
    $('.preloaderbtn').remove();
};


