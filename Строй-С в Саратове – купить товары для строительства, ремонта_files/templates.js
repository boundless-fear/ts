const compareModalTpl = `
    <div class="compare__previewItemBox">
        <button class="compare__previewItemAddFavorites" data-product-id='{{ ID }}' data-product-name='{{ NAME }}' onclick="toggleFavorite(this)">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z" stroke="#9C9C9C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <a href="{{ DETAIL_PAGE_URL }}" class="compare__previewItem">
            <img loading="lazy" class="compare__previewItemImage" src="{{ PHOTO }}" alt="">
            <h5 class="compare__previewItemTitle">{{ NAME }}</h5>
            <span class=compare__previewItemArticle>{{ ARTICLE }}</span>
            <span class="compare__previewItemPrice">{{ PRICE }} ₽</span>
        </a>
        <button class="compare__previewItemRemoveBtn flexbox" id="e_del-compare" data-product-id="{{ ID }}">
            Убрать из сравнения
        </button>
    </div>
`;

const personalAccountOrderDetailTpl = `
    <div class="goods__basketRow flexbox">
        <a href="{{ DETAIL_PAGE_URL }}" class="goods__basketItem goods__basketItem-name goods__basketItem-nameBody flexbox">
            <div class="goods__imageBox">
                <img loading="lazy" class="goods__image" src="{{ PHOTO_URL }}" alt="{{ NAME }}"/>
            </div>
            <div class="goods__itemName">
                <span class="goods__basketItem-nameContent">
                    {{ NAME }}
                </span>
                <span class="goods__basketItem-article">
                    {{ ARTICLE }}
                </span>
            </div>
        </a>
        <div class="goods__basketItem goods__basketItem-unit goods__basketItem-black">
            Шт.
        </div>
        <div class="goods__basketItem"
             data-priceDefault="{{ PRICE }}">
            {{ PRICE }}
        </div>
        <div class="goods__basketItem goods__basketItem-counter">
            {{ QUANTITY }}
        </div>
        <div class="goods__basketItem goods__basketItem-total result basket-result">
            <span class="resultPrice priceInit"
                  data-priceDefault="{{ PRICE_WITH_QUANTITY }}">
                {{ PRICE_WITH_QUANTITY }}
          </span>
        </div>
        <div class="goods__basketItem goods__basketItem-control">
            {{ BUTTONS }}
        </div>
    </div>
`;

const personalAccountOrderListTpl = `
    <div class="lk__historyRow flexbox" data-order-id="{{ ID }}" >
        <div class="lk__historyItem lk__historyItem-date lk__historyItem-body"> {{ DATE_INSERT }} </div>
        <div class="lk__historyItem lk__historyItem-serial"> {{ ID }} </div>
        <div class="lk__historyItem lk__historyItem-amount lk__historyItem-body"> {{ PRICE }} руб </div>
        <div class="lk__historyItem lk__historyItem-status lk__historyItem-body"> {{ STATUS_NAME }} </div>
        <div class="lk__historyItem lk__historyItem-more">
            <button class="lk__historyMoreBtn" id="e_lk-order-detail">
                Подробнее
            </button>
        </div>
    </div>
`;

const mobilePersonalAccountOrderDetailTpl = `
    <div class="goods__basketRow flexbox">
        <a href="{{ DETAIL_PAGE_URL }}" class="goods__basketItem goods__basketItem-name goods__basketItem-nameBody flexbox">
            <div class="goods__imageBox">
                <img loading="lazy" class="goods__image" src="{{ PHOTO_URL }}" alt="{{ NAME }}"/>
            </div>
            <div class="goods__itemName">
                <span class="goods__basketItem-nameContent">
                    {{ NAME }}
                </span>
            </div>
        </a>
        <div class="goods__basketItem goods__basketItem-total result basket-result">
            <span class="resultPrice priceInit"
                  data-priceDefault="{{ PRICE_WITH_QUANTITY }}">
                {{ PRICE_WITH_QUANTITY }}
            </span>
        </div>
        <div class="goods__basketItem goods__basketItem-counter">
            {{ QUANTITY }} Шт.
        </div>
        
        <div class="goods__basketItem goods__basketItem-control">
            {{ BUTTONS }}
        </div>
    </div>
`;

const mobilePersonalAccountOrderListTpl = `
    <div class="lk__historyRow flexbox" data-order-id="{{ ID }}" id="e_lk-order-detail">
        <div class="lk__historyItem lk__historyItem-date lk__historyItem-body"> {{ DATE_INSERT }} </div>
        <div class="lk__historyItem lk__historyItem-serial"> {{ ID }} </div>
        <div class="lk__historyItem lk__historyItem-amount lk__historyItem-body"> {{ PRICE }} руб </div>
        <div class="lk__historyItem lk__historyItem-status lk__historyItem-body"> {{ STATUS_NAME }} </div>
        <div class="lk__historyItem lk__historyItem-more"></div>
    </div>
`;

const personalAccountProductsItemsListTpl = `
    <div class="items__item lk__stocksItem">
        <button class="items__holdOnBtn"
                id="e_favorite"
                data-product-id="{{ PRODUCT_ID }}">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z" stroke="#9C9C9C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
        </button>
        <a href="{{ DETAIL_PAGE_URL }}" class="items__imageBox">
           {{ SALE_TPL }}
            <img loading="lazy" class="items__image" src="{{ PHOTO_URL }}" alt="{{ NAME }}">
        </a>
        <div class="items__description">
            <a href="{{ DETAIL_PAGE_URL }}" class="items__itemTitle">
                {{ NAME }}
            </a>
            <div class="items__priceBar flexbox">
               {{ PRICE_TPL }}
            </div>
            <div class="items__bar flexbox">
                <div class="items__barItem items__counter flexbox">
                    <button class="items__counterButton items__counterButton-minus disabled">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 12H6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <input class="items__counterInput" id="items__counterInput-{{ PRODUCT_ID }}" type="number" value="1">
                    <button class="items__counterButton items__counterButton-plus">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 6V12M12 12V18M12 12H18M12 12L6 12" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                <button class="items__barItem items__compare" 
                        id="e_compare"
                        data-product-name="{{ NAME }}"
                        data-product-id="{{ PRODUCT_ID }}">
                    <input hidden="" type="checkbox" data-entity="compare-checkbox">
                    <span data-entity="compare-title">Сравнение</span>
                </button>
            </div>
          {{ BUY_BUTTON_TPL }}
        </div>
    </div>
`;


const compareWrapTpl = `
    <h3 class="compare__title pagetitle">Сравнение</h3>
    <div class="compare__tabs flexbox" id="compare__tabs"></div>
    <button class="compare__resetBtn flexbox" id="e_del-compare">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.543 22.0037H9.45722C8.28103 22.0037 7.30313 21.0981 7.21292 19.9254L6.24731 7.37256H19.7529L18.7873 19.9254C18.6971 21.0981 17.7192 22.0037 16.543 22.0037V22.0037Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21.0035 7.37277H4.99683" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.1865 3.99658H15.8138C16.4354 3.99658 16.9393 4.50047 16.9393 5.12205V7.37299H9.06104V5.12205C9.06104 4.50047 9.56492 3.99658 10.1865 3.99658Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14.9697 11.8745V17.5019" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11.0305 11.8745V17.5019" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Очистить список
    </button>
    <div class="compare__box flexbox" id="compare__box">
        <div class="compare__windows" id="compare__windows"></div>
    </div>
`;

const compareItemTpl = `
    <div class="compare__item">
        <div class="compare__itemHeader">
            <button class="compare__previewItemAddFavorites" data-product-id='{{ ID }}' data-product-name='{{ NAME }}' onclick="toggleFavorite(this)">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z" stroke="#9C9C9C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <a href="{{ DETAIL_PAGE_URL }}" class="compare__itemLink">
                <img loading="lazy" class="compare__itemImage" src="{{ PHOTO }}" alt="">
                <span class="compare__itemTitle">{{ NAME }}</span>
                <span class="compare__itemArticle">{{ ARTICLE }}</span>
            </a>
            <span class="compare__itemPrice">{{ PRICE }}</span>
            <button onclick="delete5Compare(this, {{ ID }})"
                    class="compare__removeBtn flexbox button-h">
                Убрать из сравнения
            </button>
        </div>
        <div class="compare__itemList" id="compare__itemList-{{ SECTION_ID }}_{{ ID }}"></div>
    </div>
`;

const compareHeaderTpl =  `
    <div class="compare__windowsItem" id="compare__windowsItem">
        <div class="compare__static" id="compare__static-{{ INDEX }}">
            <div class="compare__staticHeader">
                <button type="button" class="compare__filterBtn flexbox">
                    <span class="compare__filterSwitch"></span>
                    Показывать только отличающиеся
                </button>
            </div>
            <div class="compare__staticList" id="compare__staticList-{{ INDEX }}"></div>
        </div>
        <div class="compare__windowsBox" id="compare__windowsBox-{{ INDEX }}"></div>
    </div>
`;

const compareMobileHeaderTpl = `
    <div class="compare__windowsItem wrap" id="compare__windowsItem">
        <div class="" id="compare__static-{{ INDEX }}">
        <div class="compare__categoryList" id="compare__staticList-{{ INDEX }}"></div>
        </div>
        <div class="compare__windowsBox" id="compare__windowsBox-{{ INDEX }}"></div>
    </div>
`;

const compareMobileItemTpl = `
    <div class="compare__item">
        <div class="compare__itemHeader">
            <button class="compare__previewItemAddFavorites" data-product-id='{{ ID }}' data-product-name='{{ NAME }}' onclick="toggleFavorite(this)">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z" stroke="#9C9C9C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <a href="{{ DETAIL_PAGE_URL }}" class="compare__itemLink">
                <img loading="lazy" class="compare__itemImage" src="{{ PHOTO }}" alt="">
                <span class="compare__itemTitle">{{ NAME }}</span>
                <span class="compare__itemArticle">{{ ARTICLE }}</span>
            </a>
            <span class="compare__itemPrice">{{ PRICE }}</span>
            <button onclick="delete5Compare(this, {{ ID }})"
                    class="compare__removeBtn">
            </button>
        </div>
        <div class="compare__itemList" id="compare__itemList-{{ SECTION_ID }}_{{ ID }}"></div>
    </div>
`;

const compareMobileWrapTpl = `
    <nav class="breadcrums">
        <a class="breadcrums__item" href="/">Главная</a>
        <a href="#" class="breadcrums__item breadcrums__item-current">Сравнение</a>
    </nav>
    <h3 class="compare__title pagetitle">Сравнение</h3>
    <div class="compare__tabs flexbox" id="compare__tabs"></div>

    <button type='button' class="compare__filterBtn flexbox"><span class="compare__filterSwitch"></span>
        Показывать только
        отличающиеся</button>
</div>
<div class="compare__box flexbox" id="compare__box">
    <div class="compare__windows" id="compare__windows"></div>
</div>
`
