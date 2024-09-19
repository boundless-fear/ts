const render = (template, data) => {
    return template.replace(/{{(.*?)}}/g, (match) => {
        let matchWithoutBraces = match.split(/{{|}}/);
        let findDontEmptyMatch = matchWithoutBraces.filter(Boolean)[0];
        let cleanMatch = findDontEmptyMatch.trim();

        return data[cleanMatch]
    });
};

const searchHistory = (form, searchInput) => {
    if (localStorage.getItem("searchHistoryVersion") != "1.6") {
        localStorage.removeItem("searchHistory");
        localStorage.setItem("searchHistoryVersion", "1.6");
    }
    
    const storage = localStorage.getItem("searchHistory");
    const storageCopy = JSON.parse(storage);
    
    if (storageCopy?.length) {
        var count = 0;
        for (var i = storageCopy.length - 1; i >= 0; i--) {
            if(count >= 5){break}
            const historyItem = $(`
                <div class="nav-history-item">
                    <a href='/catalog/search?q=${storageCopy[i]}&how=r' class="nav__historyItem">${storageCopy[i]}</a>
                    <svg class="remove-history-item" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 18L18 6M6 6L18 18" stroke="#E2E3E4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </div>
            `);
                
            $(".nav-history-mainlist").append(historyItem);
            count++;
            
        };
        $(document).on('click', ".nav-history-header__clear", function() {
            localStorage.removeItem("searchHistory");
            $(".nav-history-mainlist").empty();
        });
        $(document).on('click', '.remove-history-item', function(){
            // Удаляем элемент из локального хранилища
            const textDelete = $(this).siblings('.nav__historyItem').text();
            const indexElement = storageCopy.indexOf(textDelete)
            storageCopy.splice(indexElement, 1);
            localStorage.setItem("searchHistory", JSON.stringify(storageCopy));
            // Удаляем элемент из верстки
            $(this).closest('.nav-history-item').remove();
        });
    }

    $(form).on("submit", function (e) {
        // event.stopPropagation();
        let value = $(this).serializeArray()[0].value;
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
    });
};
$(document).on('click', '.close-search-modal', function(){
    $('.nav__searchBody').empty();
})


function renderSearchItems(data){

    searchBody = $('.nav__searchBody');
    const loader = searchBody.siblings('.nav__searchLoader');

    if(searchBody.length > 0) searchBody.empty();
    loader.fadeOut();
    const items = data.ITEMS;
    const manufacturer = data.MANUFACTURER
    $('.nav__searchBody').css('display', 'grid');
    searchBody.append(`
    <div class="searchbody-search">
    <div class="nav__history">
        <div class="nav-history-header">
            <span class="nav__historyTitle">История поиска</span>
            <p class="nav-history-header__clear">Очистить</p>
        </div>
        <div class="nav-history-list nav-history-mainlist">
            
        </div>
    </div>
    <div class="nav__history popular-search">
        <div class="nav-history-header">
            <span class="nav__historyTitle">Часто ищут</span>
        </div>
        <div class="nav-history-list">
            <div class="nav-history-item">
                <a href="/catalog/search?q=дверь&amp;how=r" class="nav__historyItem">дверь</a>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 18L18 6M6 6L18 18" stroke="#E2E3E4" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </div>
            <div class="nav-history-item">
                <a href="/catalog/search?q=дверь&amp;how=r" class="nav__historyItem">дверь</a>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 18L18 6M6 6L18 18" stroke="#E2E3E4" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </div>
            <div class="nav-history-item">
                <a href="/catalog/search?q=дверь&amp;how=r" class="nav__historyItem">дверь</a>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 18L18 6M6 6L18 18" stroke="#E2E3E4" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </div>
            <div class="nav-history-item">
                <a href="/catalog/search?q=дверь&amp;how=r" class="nav__historyItem">дверь</a>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 18L18 6M6 6L18 18" stroke="#E2E3E4" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </div>
        </div>
    </div>
</div>
<div class="searchbody-popular">
    <p class="nav__historyTitle search-category-item">
        Популярные товары
        <svg class="close-search-modal" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 18L18 6M6 6L18 18" stroke="#9B9B9C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </p>

</div>
        `)
    const searchItem = $('.searchbody-popular')
    searchHistory("#main-search-from", ".nav__searchInput");
    items.forEach((element)=>{
        searchItem.append(
            `<a href="${ element["DETAIL_PAGE_URL"] }" class="nav__searchItem">
                <span class="nav__searchTitle">${ element["NAME"] }</span>
                <img loading="lazy" src="${ element["PREVIEW_PICTURE"] }" class="nav__searchImage">
            </a>`
        )
    });
    searchItem.append(`
        <a href="${ manufacturer["URL"] }" class="nav__searchItem nav__searchItemBrand">
            <span class="nav__searchTitle">Все товары от производителя ${ manufacturer["VALUE"] } </span>
        </a>
    `)
    var onclickGoSearchPage = "this.closest('form').submit()";

    if(data.length > 9) searchItem.append('<a href="#" onclick="' + onclickGoSearchPage +'" class="nav__searchItem nav__searchItem-pageLink">перейти на страницу результатов поиска</a>')
}

/**
 * Функции для Личного кабинета
 * START
 */
const renderPersonalAccountOrderCount = (data) => {
    const countText = data['count'] + ' покупок';
    const roundDiscount = Math.round(data['discount']);
    const discountText = roundDiscount + '%';

    $('#lk__count').html(countText);
    $('#lk__headerSaleValue').html(discountText);
};

const renderPersonalAccountOrderDetail = (dataArr) => {
    if($('#orderDetail__orderNum').text() !== dataArr['orderId']) {
        $('#goods__basketBody').empty();
        $('#orderDetail__date').html(dataArr['orderDate']);
        $('#goods__totalPrice').html(dataArr['orderPrice'] + '₽');
        $('#orderDetail__orderNum').html(dataArr['orderId']);
        $('#orderDetail__orderId').val(dataArr['orderIdNumber']);

        dataArr['items'].forEach((element) => {
            element['PRICE_WITH_QUANTITY'] = element['PRICE'] * element['QUANTITY'];
            if (element['IS_EXIST']) {
                element['BUTTONS'] = `
                    <button class="goods__basketItemControl"
                            data-product-name="${element["NAME"]}"
                            data-product-id="${element["PRODUCT_ID"]}"
                            id="e_basket">
                        В корзину
                    </button>
                    <button class="goods__basketItemControl goods__basketItemControl-compare"
                            data-product-name="${element["NAME"]}"
                            data-product-id="${element["PRODUCT_ID"]}"
                            id="e_compare">
                        Сравнить
                    </button>`
            } else {
                element['BUTTONS'] = `
                    <button class="goods__basketItemControl">
                        Снят с продаж
                    </button>
                    `
            }
            const tpl = render(personalAccountOrderDetailTpl, element);
            $('#goods__basketBody').append(tpl);
        });
    }
    loader({
        status: 'remove',
        parent: '#goods__basketBody',
        className: 'loader'
    });
};

const renderCompare = (data) => {
    let compareSlider = $('#compare__previewSlider');
    compareSlider.trigger('destroy.owl.carousel');
    compareSlider.find('.owl-stage-outer').children().unwrap();
    compareSlider.removeClass("owl-center owl-loaded owl-text-select-on");
    for (let [key, value] of Object.entries(data)){
        value["ITEMS"].forEach((element) => {
            const tpl = render(compareModalTpl, element);
            compareSlider.append(tpl);
        });
    }
    loader({
        status: 'remove',
        parent: '#compare__previewSlider',
        className: 'loader'
    });
    compareSlider.owlCarousel({
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
    });
    compareSlider.addClass('owl-carousel owl-theme')
}

const clearCompare = () => {
    compareWrap = $('#compare__wrap');
    compareWrap.html('<h3 class="compare__title pagetitle">Сравнение</h3><p class="compare__empty">В сравнении ничего' +
        ' нет </p>')
}

const renderCompareResult = (data) => {
    let index = 0;

    const compareWrap = $('#compare__wrap');
    compareWrap.append(compareWrapTpl);

    const compareWindows = $("#compare__windows");
    const compareTab = $('#compare__tabs');

    for (let [key, value] of Object.entries(data)) {
        const tpl = render(compareHeaderTpl, {'INDEX': index });
        compareWindows.append(tpl);

        const compareSlider = $("#compare__windowsBox-" + index);
        const compareStaticList = $("#compare__staticList-" + index);

        compareTab.append(`<button type="button" class="compare__tabsItem">${ key }</button>`);

        value["ITEMS"].forEach((element, i) => {
            element['INDEX'] = i;

            const tpl = render(compareItemTpl, element);
            compareSlider.append(tpl);
        });
        if(value['PROPS']){
            for (let [name, propsValue] of Object.entries(value["PROPS"])) {
                let ord = (!propsValue["UNIQ"])?"ordinary":"";

                compareStaticList.append(`<div class="compare__staticListRow flexbox" ${ ord }>${ name }</div>`);

                for (let [productId, value] of Object.entries(propsValue['VALUE'])) {
                    $('#compare__itemList-' + propsValue["SECTION_ID"] + '_' + productId).append(`
                        <div class="compare__itemListRow flexbox" ${ ord }>${ value }</div>
                    `)
                }
            };
        }
        compareSlider.owlCarousel({
            dots: false,
            autoHeight: false,
            thumbs: false,
            lazyLoad: true,
            nav: true,
            navText: ['<svg class="animate" xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.279 20.3312L21.3733 15.277C21.7459 14.9077 22.3484 14.9077 22.721 15.277C23.093 15.6462 23.093 16.2446 22.721 16.6139L18.3 20.9997L22.721 25.3861C23.093 25.7554 23.093 26.3538 22.721 26.723C22.3484 27.0923 21.7459 27.0923 21.3732 26.723L16.279 21.6682C15.907 21.2989 15.907 20.7005 16.279 20.3312Z" fill="#8C0D18"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21 1C9.95431 1 1 9.9543 0.999999 21C0.999996 32.0457 9.9543 41 21 41C32.0457 41 41 32.0457 41 21C41 9.95431 32.0457 1.00001 21 1Z" stroke="#8C0D18"/></svg>', '<svg class="animate" xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.279 20.3312L21.3733 15.277C21.7459 14.9077 22.3484 14.9077 22.721 15.277C23.093 15.6462 23.093 16.2446 22.721 16.6139L18.3 20.9997L22.721 25.3861C23.093 25.7554 23.093 26.3538 22.721 26.723C22.3484 27.0923 21.7459 27.0923 21.3732 26.723L16.279 21.6682C15.907 21.2989 15.907 20.7005 16.279 20.3312Z" fill="#8C0D18"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21 1C9.95431 1 1 9.9543 0.999999 21C0.999996 32.0457 9.9543 41 21 41C32.0457 41 41 32.0457 41 21C41 9.95431 32.0457 1.00001 21 1Z" stroke="#8C0D18"/></svg>'],
            items: 2,
        });

        compareSlider.addClass('owl-carousel owl-theme');
        index++
    }

    hashTabs('.compare__tabs', '.compare__windows');
    switcher('.compare__filterBtn', 'div[ordinary]')
};

/**
 *
 * @param params{
 *      status,
 *      parent,
 *      className
 * }
 */

const loader = (params) => {
    pfx = ' .';
    switch (params.status){
        case "add": $(params.parent).append('<div class="'+params.className+'"></div>'); break;
        case "remove": $(params.parent + pfx + params.className).remove(); break;
    }
};


const selectSection = (e) => {
    $('#lk__stocksFilter .active').removeClass('active');
    $(e).addClass('active');
    $('#ls__stocksBox').empty();
    getItemsList(e);
};

const renderBasketLine = (data) => {
    for(let [key, item] of Object.entries(data)){
        let parentClass = '#basket';
        if(key == 'favoriteCount') parentClass = '#favorite';

        if(item){
            if(!$(parentClass + ' .nav__basketCounter').length)
                $(parentClass).append('<div class="nav__basketCounter flexbox"></div>');
            $(parentClass + ' .nav__basketCounter').html(item);
        }else{
            $(parentClass + ' .nav__basketCounter').remove();
        }
    }
};

// $(document).on('click', '.remove-history-item', function(){
//     const historyText = $(this).siblings('.nav__historyItem').text()
//     const storage = localStorage.getItem("searchHistory");
//     const storageCopy = JSON.parse(storage);

//     storageCopy.splice(index, 1);
//     localStorage.setItem("searchHistoryVersion", "1.6", JSON.stringify(storageCopy));
// })