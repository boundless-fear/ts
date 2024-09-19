/* eslint-disable */
(function (exports,ui_vue3,main_core,_) {
    'use strict';

    _ = _ && _.hasOwnProperty('default') ? _['default'] : _;

    function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { babelHelpers.defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
    var SearchInput = {
      props: {
        params: {
          type: Object,
          "default": function _default() {
            return {};
          }
        }
      },
      watch: {
        query: function query(newQuery) {
          this.$emit('query-updated', newQuery);
        }
      },
      data: function data() {
        return {
          query: '',
          hasSentRequest: false,
          hasSearchRequestSent: false
        };
      },
      mounted: function mounted() {
        document.addEventListener('click', this.handleOutsideClick);
      },
      beforeDestroy: function beforeDestroy() {
        document.removeEventListener('click', this.handleOutsideClick);
      },
      methods: {
        handleFocus: function handleFocus() {
          var searchHeader = document.getElementById('search-header');
          if (searchHeader) {
            searchHeader.classList.add('active');
            $('body').addClass('fixed-scroll');
          }
          if (!this.hasSentRequest) {
            if (this.query === '') {
              this.sendRequest('preview');
            } else {
              this.sendRequest('autocomplete');
              this.sendRequest('search');
            }
            this.hasSentRequest = true;
          }
        },
        changeInput: _.debounce(function () {
          this.isSearching = true;
          this.$emit('query-updated', this.query);
          if (this.query.trim() === '') {
            this.sendRequest('preview');
            this.hasSearchRequestSent = false;
          } else {
            this.sendRequest('autocomplete');
            this.sendRequest('search');
            this.hasSearchRequestSent = true;
          }
        }, 200),
        sendRequest: function sendRequest(method) {
          var _this = this;
          axios.post(this.params.ajaxUrl, _objectSpread({
            method: method,
            query: this.query
          }, this.params), {
            timeout: 2500
          }).then(function (response) {
            _this.$emit('search-success', {
              method: method,
              response: response
            });
          })["catch"](function (error) {
            console.error("Error with ".concat(method, ":"), error);
          });
        },
        handleClose: function handleClose() {
          var searchHeader = document.getElementById('search-header');
          if (searchHeader) {
            searchHeader.classList.remove('active');
            console.log('redfsdf');
            $('body').removeClass('fixed-scroll');
          }
          this.hasSentRequest = false;
          this.hasSearchRequestSent = false;
          this.$emit('close-modal');
        },
        handleOutsideClick: function handleOutsideClick(event) {
          var searchHeader = document.getElementById('search-header');
          var deliveryModal = document.querySelector('.price-delivery-modal');
          if (searchHeader && !searchHeader.contains(event.target) && !deliveryModal.contains(event.target) && !event.target.classList.contains('autocomplete-item')) {
            this.handleClose();
          }
        }
      },
      template: "\n        <div class=\"search-input\">\n            <div class=\"search-modal-close\" @click=\"handleClose\">\n                <svg width=\"36\" height=\"36\" viewBox=\"0 0 36 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect width=\"36\" height=\"36\" rx=\"18\" fill=\"#F7F7F9\"/>\n                    <path d=\"M11 18H25\" stroke=\"#8C0D18\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                    <path d=\"M16 13L11 18\" stroke=\"#8C0D18\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                    <path d=\"M16 23L11 18\" stroke=\"#8C0D18\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                </svg>\n            </div>\n            <input   \n                ref=\"inputField\"\n                class=\"search-input__input\" \n                type=\"text\" \n                autocomplete=\"off\" \n                name=\"q\" \n                minlength=\"3\" \n                v-model=\"query\"\n                @focus=\"handleFocus\"\n                @input=\"changeInput\"\n                placeholder=\"\u0423\u043C\u043D\u044B\u0439 \u043F\u043E\u0438\u0441\u043A \u0441\u0440\u0435\u0434\u0438 200 000 \u043F\u043E\u0437\u0438\u0446\u0438\u0439\"\n            >\n            <button type=\"submit\" class=\"search-input__submit\">\n                \u041D\u0430\u0439\u0442\u0438\n            </button>\n            <button type=\"submit\" class=\"search-input__search\">\n                <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <circle cx=\"11.0586\" cy=\"11.0586\" r=\"7.06194\" stroke=\"#BFC0C1\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></circle>\n                    <path d=\"M20.0033 20.0033L16.0517 16.0516\" stroke=\"#BFC0C1\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n                </svg>\n            </button>\n        </div>\n    "
    };

    var SectionTitle = {
      props: {
        sectionName: {
          type: String,
          required: true
        }
      },
      data: function data() {
        return {};
      },
      methods: {},
      template: "\n        <p class=\"section-title\">\n            {{ sectionName }}\n        </p>\n    "
    };

    var HistorySection = {
      components: {
        SectionTitle: SectionTitle
      },
      props: {
        hasSearchRequestSent: {
          type: Boolean,
          "default": false
        } // Добавляем пропс
      },
      data: function data() {
        return {
          history: this.loadHistory()
        };
      },
      methods: {
        loadHistory: function loadHistory() {
          var history = JSON.parse(localStorage.getItem('searchHistory')) || [];
          return history.slice(0, 5);
        },
        addQuery: function addQuery(query) {
          var history = this.loadHistory();
          var updatedHistory = [query].concat(babelHelpers.toConsumableArray(history.filter(function (item) {
            return item !== query;
          }))).slice(0, 5);
          this.saveHistory(updatedHistory);
          this.history = updatedHistory;
          this.$emit('history-updated', this.history.length);
        },
        saveHistory: function saveHistory(history) {
          localStorage.setItem('searchHistory', JSON.stringify(history));
        },
        clearHistory: function clearHistory() {
          localStorage.removeItem('searchHistory');
          this.history = [];
          this.$emit('history-updated', this.history.length);
        },
        removeQuery: function removeQuery(index) {
          var updatedHistory = this.history.filter(function (_$$1, i) {
            return i !== index;
          });
          this.saveHistory(updatedHistory);
          this.history = updatedHistory;
          this.$emit('history-updated', this.history.length);
        }
      },
      template: "\n        <div class=\"history-section\" v-show=\"history.length > 0 && !hasSearchRequestSent\">\n            <div class=\"section-header\">\n                <SectionTitle sectionName=\"\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u043F\u043E\u0438\u0441\u043A\u0430\"/>\n                <div class=\"clear-history\" @click=\"clearHistory\">\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C</div>\n            </div>\n            <div class=\"history-list\">\n                <div v-for=\"(query, index) in history\" :key=\"index\" class=\"history-item\">\n                    <a :href=\"'/catalog/search?q=' + encodeURIComponent(query)\">{{ query }}</a>\n                    <button type=\"button\" @click.stop=\"removeQuery(index)\" class=\"remove-button\">\n                        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\">\n                            <path d=\"M6 18L18 6M6 6L18 18\" stroke=\"#E2E3E4\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                        </svg>\n                    </button>\n                </div>\n            </div>\n        </div>\n    "
    };

    var FrequentSection = {
      components: {
        SectionTitle: SectionTitle
      },
      props: {
        items: {
          type: Array,
          "default": function _default() {
            return [];
          }
        }
      },
      methods: {
        handleClick: function handleClick(item, event) {
          this.$emit('item-selected', item, false);
          window.location.href = event.currentTarget.href;
        }
      },
      template: "\n        <div class=\"frequent-section\">\n            <div class=\"section-header\">\n                <SectionTitle sectionName=\"\u0427\u0430\u0441\u0442\u043E \u0438\u0449\u0443\u0442\"/>\n            </div>\n            <div class=\"frequent-list\" v-if=\"items.length\">\n                <a v-for=\"(item, index) in items\" \n                   :key=\"index\" \n                   :href=\"'/catalog/search?q=' + item + '&how=r'\"\n                   @click.prevent=\"handleClick(item, $event)\"\n                >\n                    {{ item }}\n                </a>\n            </div>\n        </div>\n    "
    };

    function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
    function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { babelHelpers.defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
    var ProductSection = {
      components: {
        SectionTitle: SectionTitle
      },
      props: {
        products: {
          type: Array,
          "default": function _default() {
            return [];
          }
        }
      },
      computed: {
        formattedProducts: function formattedProducts() {
          return this.products.map(function (product) {
            return _objectSpread$1(_objectSpread$1({}, product), {}, {
              formattedPrice: product.PRICE.PRICE_FORMATED.replace('&nbsp;', ' '),
              formattedDiscountPrice: product.PRICE.DISCOUNT_PRICE_FORMATED.replace('&nbsp;', ' ')
            });
          });
        }
      },
      template: "\n<div class=\"product-section\">\n    <div class=\"section-header\">\n        <SectionTitle sectionName=\"\u041F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0435 \u0442\u043E\u0432\u0430\u0440\u044B\" />\n    </div>\n    <div class=\"product-list\" v-if=\"formattedProducts.length\">\n        <div class=\"product-container\" v-for=\"(product, index) in formattedProducts\" :key=\"product.ID\">\n            <div class=\"items__item product-item\" :id=\"product.ID\"\n                :data-id=\"product.ID\">\n                <div class=\"product-picbox\">\n                    <a :href=\"product.DETAIL_PAGE_URL\" class=\"items__imageBox\" :title=\"product.NAME\" data-entity=\"image-wrapper\"\n                        itemprop=\"url\" target=\"_self\">\n                        <img loading=\"lazy\" class=\"items__image\" :src=\"product.PREVIEW_PICTURE\" :alt=\"product.NAME\"\n                            itemprop=\"image\">\n                    </a>\n\n                    <!-- \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E \u043A \u0437\u0430\u043A\u0430\u0437\u0443 -->\n                    <div class=\"product-quantity\">\n                        <p class=\"dostup-count\">{{product.QUANTITY}} \u0448\u0442.</p>\n                    </div>\n                </div>\n                <div class=\"product-main\">\n                    <!-- \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0442\u043E\u0432\u0430\u0440\u0430 -->\n                    <a :href=\"product.DETAIL_PAGE_URL\" :title=\"product.NAME\" class=\"items__itemTitle\" itemprop=\"url\" target=\"_self\">\n                        <span itemprop=\"name\">{{product.NAME}}</span>\n                    </a>\n\n                    <!-- \u043A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440 \u0441\u043A\u0438\u0434\u043A\u0438 \u0438 \u0441\u0442\u0438\u043A\u0435\u0440\u043E\u0432 -->\n                    <div class=\"box stickers\">\n                        <p v-if=\"product.PRICE.DISCOUNT_PERCENT > 0\" class=\"items__sale flexbox\">-{{product.PRICE.DISCOUNT_PERCENT}}%</p>\n                        <div  v-if=\"product.IS_INSTALLMENT\" class=\"item-sticker-doli-item\">\n                            <svg width=\"68\" height=\"20\" viewBox=\"0 0 68 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                <rect width=\"68\" height=\"20\" rx=\"4\" fill=\"black\"/>\n                                <g clip-path=\"url(#clip0_12851_5780)\">\n                                <path d=\"M15.9392 6H14.6044V12.7689H15.9392V6Z\" fill=\"white\"/>\n                                <path d=\"M13.0711 6.37876H11.7363V13.1475H13.0711V6.37876Z\" fill=\"white\"/>\n                                <path d=\"M10.203 6.80162H8.86814V13.5716H10.203V6.80162Z\" fill=\"white\"/>\n                                <path d=\"M7.33482 7.22917H6L6.00001 14H7.33482L7.33482 7.22917Z\" fill=\"white\"/>\n                                <path d=\"M51.1915 9.60753L49.0423 7.21793H47.7858V12.7507H49.0977V9.22068L51.0598 11.3121H51.3023L53.2308 9.22068V12.7507H54.5426V7.21793H53.2862L51.1915 9.60753Z\" fill=\"white\"/>\n                                <path d=\"M60.7926 7.21793L57.541 10.814V7.21793H56.2292V12.7507H57.431L60.6826 9.1546V12.7507H61.9945V7.21793H60.7926Z\" fill=\"white\"/>\n                                <path d=\"M40.7198 9.24244C40.7198 10.1233 41.2015 10.8172 41.9409 11.1082L40.5544 12.7507H42.1601L43.4214 11.2565H44.7862V12.7507H46.0981V7.21793H42.7582C41.513 7.21793 40.7198 8.0698 40.7198 9.24244ZM44.787 8.43651V10.0726H43.0015C42.4057 10.0726 42.0862 9.74051 42.0862 9.25373C42.0862 8.76694 42.417 8.43489 43.0015 8.43489L44.787 8.43651Z\" fill=\"white\"/>\n                                <path d=\"M34.6236 8.32448C34.5433 10.2273 34.1419 11.4556 33.3559 11.4556H33.1592V12.7837L33.3687 12.795C34.9447 12.8829 35.8158 11.4999 35.9587 8.47922H38.0317V12.7507H39.3412V7.21793H34.6677L34.6236 8.32448Z\" fill=\"white\"/>\n                                <path d=\"M29.6853 7.14062C27.911 7.14062 26.6344 8.36888 26.6344 9.98398C26.6344 11.6547 28.0234 12.8394 29.6853 12.8394C31.4162 12.8394 32.761 11.5886 32.761 9.98398C32.761 8.37935 31.4162 7.14062 29.6853 7.14062ZM29.6853 11.5112C28.6825 11.5112 27.9993 10.8584 27.9993 9.98398C27.9993 9.08777 28.6833 8.45269 29.6853 8.45269C30.6872 8.45269 31.3938 9.11679 31.3938 9.98398C31.3938 10.8512 30.6776 11.5112 29.6853 11.5112Z\" fill=\"white\"/>\n                                <path d=\"M25.2431 7.22836H20.6131L20.5689 8.33492C20.5031 9.92906 20.0872 11.445 19.3012 11.4668L18.9375 11.4781V14.0012L20.2606 13.9986V12.7515H24.8569V13.9986H26.1913V11.4668H25.2431V7.22836ZM23.9313 11.4668H21.1317C21.6054 10.7479 21.8591 9.70743 21.9032 8.49046H23.9313V11.4668Z\" fill=\"white\"/>\n                                </g>\n                                <defs>\n                                <clipPath id=\"clip0_12851_5780\">\n                                <rect width=\"56\" height=\"8\" fill=\"white\" transform=\"translate(6 6)\"/>\n                                </clipPath>\n                                </defs>\n                            </svg>\n                        </div>\n                        <div v-if=\"product.IS_BESTSELLER\" class=\"item-sticker-hit-item\">\n                            \u0425\u0438\u0442 \u043F\u0440\u043E\u0434\u0430\u0436\n                        </div>\n                        <div v-if=\"product.IS_NEW_ITEM && !product.IS_BESTSELLER\" class=\"item-sticker-new-item\">\n                            \u041D\u043E\u0432\u0438\u043D\u043A\u0430\n                        </div>\n                        <!-- \u0441\u0442\u0438\u043A\u0435\u0440\u044B -->\n                    </div>\n\n                    <!-- \u0446\u0435\u043D\u0430 -->\n                    <!-- \u043F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u0446\u0435\u043D\u0443 \u0438 \u043D\u0430\u043B\u0438\u0447\u0438\u0435 \u0441\u043A\u0438\u0434\u043A\u0438 -->\n                    <div class=\"price-box\">\n                        <div class=\"items__priceBar flexbox\" data-entity=\"price-block\">\n                            <p v-if=\"product.PRICE.DISCOUNT_PRICE > 0\" class=\"items__price items__price-old\"\n                                :id=\"product.ID + '_price_old'\">\n                                {{product.formattedPrice}}\n                            </p>\n                            <p class=\"items__price items__price-current\"\n                                :id=\"product.ID + '_price'\">\n                                {{product.PRICE.DISCOUNT_PRICE > 0 ? product.formattedDiscountPrice : product.formattedPrice}}\n                                <meta itemprop=\"price\" :content=\"product.formattedPrice\">\n                            </p>\n                            <span style=\"display: none;\" itemprop=\"priceCurrency\">\u0440\u0443\u0431.</span>\n                        </div>\n                        <!--\n                        <div class=\"items-packbox flexbox\">\n                            <p class=\"items__price-pack\"></p>\n                            <p class=\"items__price-pack--old\"></p>\n                        </div>-->\n                    </div>\n\n                    <div class=\"product-item-functional\">\n                        <!-- \u0434\u0432\u043E\u0439\u043D\u043E\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u0446\u0435\u043D -->\n                        <div class=\"items__barItem items__counter flexbox no-format\" data-entity=\"quantity-block\">\n                            <button type=\"button\" class=\"items__counterButton items__counterButton-minus disabled\" id=\"\">\n                                <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"\n                                    xmlns=\"http://www.w3.org/2000/svg\">\n                                    <path d=\"M18 12H6\" stroke=\"black\" stroke-width=\"2\" stroke-linecap=\"round\"\n                                        stroke-linejoin=\"round\"></path>\n                                </svg>\n                            </button>\n                            <input class=\"items__counterInput input-count\" :id=\"'items__counterInput-' + product.ID\" type=\"number\"\n                                name=\"quantity\" value=\"1\" :data-storage=\"product.QUANTITY\">\n                            <button type=\"button\" class=\"items__counterButton items__counterButton-plus\" id=\"\">\n                                <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"\n                                    xmlns=\"http://www.w3.org/2000/svg\">\n                                    <path d=\"M12 6V12M12 12V18M12 12H18M12 12L6 12\" stroke=\"black\" stroke-width=\"2\"\n                                        stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n                                </svg>\n                            </button>\n                        </div>\n\n                        <div class=\"buttons-block \" data-entity=\"buttons-block\">\n                            <!-- \u043F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u0446\u0435\u043D\u0443 \u0438 \u043D\u0430\u043B\u0438\u0447\u0438\u0435 \u0441\u043A\u0438\u0434\u043A\u0438 -->\n                            <button type=\"button\" class=\"items__add\" :data-product-id=\"product.ID\"\n                                :data-product-name=\"product.NAME\"\n                                onclick=\"add2Basket(this);\" \n                                :data-product-price=\"product.PRICE.PRICE\"\n                                data-category-list=\"\" \n                                data-product-brand=\"\"\n                            >\n                                \u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0443\n                            </button>\n                            <a href=\"/personal/cart/\" class=\"complite-add-to-basket\">\n                                <span>\u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0435</span>\n                                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"25\" height=\"24\" viewBox=\"0 0 25 24\" fill=\"none\">\n                                    <path d=\"M5 11.1667L10.3333 16.5L19 8.5\" stroke=\"#8C0D18\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                </svg>\n                            </a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"product-breakline\"></div>\n        </div>\n    </div>\n</div>\n    "
    };

    var AutoCompleteSection = {
      components: {},
      props: {
        items: {
          type: Array,
          "default": function _default() {
            return [];
          }
        },
        brands: {
          type: Object,
          "default": function _default() {}
        }
      },
      methods: {
        handleClick: function handleClick(item) {
          this.$emit('item-selected', item.WORD, true);
        },
        handleClickBrand: function handleClickBrand(event, item) {
          var _this = this;
          event.preventDefault();
          this.$emit('item-selected', this.brands.VALUE, true);
          setTimeout(function () {
            window.location.href = _this.brands.URL;
          }, 300);
        }
      },
      template: "\n        <div class=\"autocomplete-section\">\n            <div class=\"autocomplete-list\" >\n               \n                <a \n                    v-if=\"brands.URL !== undefined\" \n                    :href=\"brands.URL\" \n                    @click=\"handleClickBrand($event, brands)\"\n                    class=\"autocomplete-item autocomplete-item-brand\"\n                >\n                    \u0411\u0440\u0435\u043D\u0434: {{brands.VALUE}}\n                </a>\n               \n                <div v-if=\"items.length\" v-for=\"(item, index) in items\" \n                    :key=\"index\" \n                    class=\"autocomplete-item\"\n                    @click=\"handleClick(item)\"\n                >\n                    {{ item.WORD }}\n                </div>\n            </div>\n        </div>\n    "
    };

    var CategorySection = {
      components: {
        SectionTitle: SectionTitle
      },
      props: {
        items: {
          type: Array,
          "default": function _default() {
            return [];
          }
        },
        query: {
          type: String,
          "default": ''
        }
      },
      methods: {
        handleClick: function handleClick(item, event) {
          this.$emit('item-selected', item.SECTION_NAME, false);
          window.location.href = event.currentTarget.href;
        }
      },
      template: "\n        <div class=\"category-section\">\n            <div class=\"section-header\">\n                <SectionTitle sectionName=\"\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438\"/>\n            </div>\n            <div class=\"category-list\" v-if=\"items.length\">\n                <a v-for=\"(item, index) in items\" \n                   :key=\"index\" \n                   :href=\"item.DETAIL_PAGE_URL + '?query=' + query\"\n                   @click.prevent=\"handleClick(item, $event)\"\n                >\n                    <p class=\"category-item__title\">{{item.SECTION_NAME}}</p>\n                    <span class=\"category-item__count\">{{item.COUNT}} \u0442\u043E\u0432\u0430\u0440\u043E\u0432</span>\n                </a>\n            </div>\n        </div>\n    "
    };

    var SearchModal = {
      components: {
        HistorySection: HistorySection,
        FrequentSection: FrequentSection,
        ProductSection: ProductSection,
        AutoCompleteSection: AutoCompleteSection,
        CategorySection: CategorySection
      },
      props: {
        preview: {
          type: Object,
          "default": function _default() {
            return {};
          }
        },
        autocomplete: {
          type: Array,
          "default": function _default() {
            return [];
          }
        },
        search: {
          type: Object,
          "default": function _default() {
            return {};
          }
        },
        isSearching: {
          type: Boolean,
          "default": false
        },
        query: {
          type: String,
          "default": ''
        },
        hasSearchRequestSent: {
          type: Boolean,
          "default": false
        },
        showNoResult: {
          type: Boolean,
          "default": false
        }
      },
      methods: {
        handleHistoryUpdated: function handleHistoryUpdated(length) {
          if (length === 0) {
            this.$refs.historySection = null;
          }
        },
        handleItemSelected: function handleItemSelected(word, shouldUpdateInput) {
          this.$emit('item-selected', word, shouldUpdateInput);
          if (shouldUpdateInput) {
            this.$emit('query-updated', word + " ");
          }
        }
      },
      mounted: function mounted() {
        if (this.$refs.historySection) {
          this.handleHistoryUpdated(this.$refs.historySection.history.length);
        }
      },
      template: "\n        <div class=\"search-modal\">\n            <div class=\"search-modal-inner\">\n                <div class=\"search-modal__noresult\" v-if=\"showNoResult\">\n                    <h2>\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0448\u043B\u043E\u0441\u044C</h2>\n                </div>\n                <div class=\"search-modal-col\">\n                    <div class=\"search-modal-section\">\n                        <HistorySection \n                            ref=\"historySection\" \n                            @history-updated=\"handleHistoryUpdated\" \n                            :hasSearchRequestSent=\"hasSearchRequestSent\" \n                        />\n                    </div>\n                    <div v-if=\"!isSearching && preview\" class=\"search-modal-section\">\n                        <FrequentSection :items=\"preview.frequent || []\" @item-selected=\"handleItemSelected\"/>\n                    </div>\n                    <div v-if=\"isSearching\">\n                        <div v-if=\"autocomplete && autocomplete.length\" class=\"search-modal-section\">\n                            <AutoCompleteSection :items=\"autocomplete || []\" :brands=\"search.manufacture || []\" @item-selected=\"handleItemSelected\"/>\n                        </div>\n                        <div class=\"search-modal-section\" v-if=\"search.sections && search.sections.length\">\n                            <CategorySection :items=\"search.sections || []\" :query=\"query\" @item-selected=\"handleItemSelected\"/>\n                        </div>\n                    </div>\n                </div>\n                <div v-if=\"!isSearching\" class=\"search-modal-col\">\n                    <ProductSection :products=\"preview.bestSellers || []\"/>\n                </div>\n                <div v-if=\"isSearching && search.products && search.products.length\" class=\"search-modal-col\">\n                    <ProductSection :products=\"search.products || []\"/>\n                </div>\n            </div>\n\n           \n        </div>\n    "
    };

    var TaskManger = {
      components: {
        SearchInput: SearchInput,
        SearchModal: SearchModal
      },
      props: {
        params: {
          type: Object,
          "default": function _default() {
            return {};
          }
        }
      },
      data: function data() {
        return {
          searchResult: {
            preview: null,
            autocomplete: null,
            search: null
          },
          isSearching: false,
          query: '',
          isModalVisible: false,
          showNoResult: false
        };
      },
      methods: {
        handleSearchSuccess: function handleSearchSuccess(_ref) {
          var method = _ref.method,
            response = _ref.response;
          if (method === 'search') {
            response.data.response.length === 0 ? this.showNoResult = true : this.showNoResult = false;
          }
          // else{
          //     this.showNoResult = false
          // }

          if (method === 'preview') {
            var _response$data$respon = response.data.response,
              frequent = _response$data$respon.frequent,
              bestSellers = _response$data$respon.bestSellers;
            this.searchResult.preview = {
              frequent: frequent,
              bestSellers: bestSellers
            };
            this.isSearching = false;
          } else if (method === 'autocomplete') {
            this.searchResult.autocomplete = response.data.response;
          } else if (method === 'search') {
            var _response$data$respon2 = response.data.response,
              products = _response$data$respon2.products,
              sections = _response$data$respon2.sections,
              manufacture = _response$data$respon2.manufacture;
            this.searchResult.search = {
              products: products,
              sections: sections,
              manufacture: manufacture
            };
            this.isSearching = true;
          }
          this.isModalVisible = true;
        },
        addQueryToHistory: function addQueryToHistory(query) {
          if (this.$refs.searchModal && this.$refs.searchModal.$refs.historySection) {
            this.$refs.searchModal.$refs.historySection.addQuery(query);
          }
        },
        handleFormSubmit: function handleFormSubmit(event) {
          event.preventDefault();
          var trimmedQuery = this.query.trim();
          if (trimmedQuery !== '') {
            console.log('trimmedQuery', trimmedQuery);
            this.addQueryToHistory(trimmedQuery);
            window.location.href = "/catalog/search?q=".concat(encodeURIComponent(trimmedQuery));
          }
        },
        handleItemSelected: function handleItemSelected(word) {
          var _this = this;
          var shouldUpdateInput = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
          if (shouldUpdateInput) {
            var queryWords = this.query.trim().split(' ');
            queryWords[queryWords.length - 1] = word;
            this.query = queryWords.join(' ') + ' ';
            this.$refs.searchInput.query = this.query;
            this.searchResult.autocomplete = null;
            this.$nextTick(function () {
              _this.$refs.searchInput.$refs.inputField.focus();
              _this.$refs.searchInput.sendRequest('search');
              _this.$refs.searchInput.hasSearchRequestSent = true;
            });
          }
          this.addQueryToHistory(word);
        },
        handleQueryUpdated: function handleQueryUpdated(newQuery) {
          this.query = newQuery;
        },
        handleCloseModal: function handleCloseModal() {
          this.isModalVisible = false;
        }
      },
      template: "\n        <form class=\"search-header\" action=\"/catalog/search\" method=\"get\" @submit=\"handleFormSubmit\">\n            <SearchInput \n                ref=\"searchInput\" \n                :params=\"params\" \n                @search-success=\"handleSearchSuccess\"\n                @query-updated=\"handleQueryUpdated\"\n                @close-modal=\"handleCloseModal\"\n            />\n            <SearchModal \n                ref=\"searchModal\"\n                v-if=\"isModalVisible\"\n                :preview=\"searchResult.preview\"\n                :autocomplete=\"searchResult.autocomplete\"\n                :search=\"searchResult.search\"\n                :isSearching=\"isSearching\"\n                @item-selected=\"handleItemSelected\"\n                :hasSearchRequestSent=\"$refs.searchInput ? $refs.searchInput.hasSearchRequestSent : false\"\n                :query=\"query\"\n                :showNoResult=\"showNoResult\"\n            />\n            <div v-if=\"isModalVisible\" class=\"search-modal-find\">\n                <button :disabled=\"showNoResult\">\u041D\u0430\u0439\u0442\u0438</button>\n            </div>\n        </form>\n    "
    };

    function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
    function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
    var _application = /*#__PURE__*/new WeakMap();
    var _data = /*#__PURE__*/new WeakMap();
    var SearchHeader = /*#__PURE__*/function () {
      function SearchHeader(rootNode, data) {
        babelHelpers.classCallCheck(this, SearchHeader);
        _classPrivateFieldInitSpec(this, _application, {
          writable: true,
          value: void 0
        });
        _classPrivateFieldInitSpec(this, _data, {
          writable: true,
          value: void 0
        });
        this.rootNode = document.querySelector(rootNode);
        babelHelpers.classPrivateFieldSet(this, _data, data);
      }
      babelHelpers.createClass(SearchHeader, [{
        key: "start",
        value: function start() {
          this.attachTemplate();
        }
      }, {
        key: "attachTemplate",
        value: function attachTemplate() {
          var context = this;
          babelHelpers.classPrivateFieldSet(this, _application, ui_vue3.BitrixVue.createApp({
            name: 'SearchHeader',
            components: {
              TaskManger: TaskManger
            },
            beforeCreate: function beforeCreate() {
              this.$bitrix.Application.set(context);
            },
            template: "<TaskManger :params=\"params\"/>",
            data: function data() {
              return {
                params: babelHelpers.classPrivateFieldGet(context, _data)
              };
            }
          }));
          babelHelpers.classPrivateFieldGet(this, _application).mount(this.rootNode);
        }
      }, {
        key: "detachTemplate",
        value: function detachTemplate() {
          if (babelHelpers.classPrivateFieldGet(this, _application)) {
            babelHelpers.classPrivateFieldGet(this, _application).unmount();
          }
          this.start();
        }
      }]);
      return SearchHeader;
    }();

    exports.SearchHeader = SearchHeader;

}((this.BX = this.BX || {}),BX.Vue3,BX,BX));
//# sourceMappingURL=searchHeader.bundle.js.map
