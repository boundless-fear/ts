BX.Vue.mutateComponent('BXmakerAuthuserphoneInputPhone',
    {
        props: {
            title: {
                type: String,
                default: ''
            },
            value: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: 'name'
            },
            type: {
                type: String,
                default: 'text'
            },
            validationMessage: {
                type: [String, Boolean],
                default: false
            },
            maxLength: {
                type: [Number, Boolean],
                default: false
            },
            defaultCountry: {
                type: [String],
                default: 'RU'
            },
            // countryTopList: {
            //     type: [Array],
            //     default: () => []
            // },

        },
        data: function () {
            return {
                inputValue: '',
                inFocus: false,
                // isHover: false,
                isInit: false,
                placeholder: '+7 (999) 999-99-99',
                isSet: false,
                currentMaxLength: 16
            };
        },
        beforeDestroy() {
            BX.removeCustomEvent('onAjaxSuccess', this.onAjaxSuccess);
        },
        mounted() {
            this._phoneNumber = new BX.PhoneNumber.Input({
                node: this.$refs.input,
                flagNode: this.$refs.flag,
                flagSize: 16,
                defaultCountry: this.defaultCountry,
                // countryTopList: this.countryTopList,

                onChange: (event) => {
                    if (event.formattedValue.startsWith("+7")) {
                        this.currentMaxLength = event.formattedValue.charAt(2).match(/[12560]/) ? 12 : event.formattedValue.charAt(2).match(/[7]/) ? 10 : 16;
                    } else {
                        event.formattedValue = '+7';
                    }
                    if (event.formattedValue === '+') {
                        event.formattedValue = '';
                    } else if (event.formattedValue === '+7' && this.inputValue.length === 2) {
                        event.formattedValue = '';
                    }

                    this.inputValue = event.formattedValue;
                    // this.value = event.target.value.slice(0);

                    this.$emit('onChange', event)
                },

                onInitialize: (e) => {
                    this.isInit = true;
                }
            });

            BX.addCustomEvent('onAjaxSuccess', BX.proxy(this.onAjaxSuccess, this));
        },
        computed: {
            classes() {
                let ar = [];

                ar.push('bxmaker-authuserphone-input-phone--flag');

                if (this.inFocus || this.inputValue.length > 0) {
                    // ar.push('bxmaker-authuserphone-input-phone--focus');
                }
                // if (this.isHover) {
                    // ar.push('bxmaker-authuserphone-input-phone--hover');
                // }

                if (this.validationMessage) {
                    ar.push('bxmaker-authuserphone-input-phone--invalid');
                }

                return ar;
            },

        },
        methods: {
            onFocus() {
                this.inFocus = true;
                this.$emit('onFocus');
            },
            onBlur() {
                this.inFocus = false;
                this.$emit('onBlur');
            },
            onKeydown(e) {
                switch (e.keyCode) {
                    // case 8:
                    //     if (this.value === '+7') {
                    //         e.preventDefault();
                    //     }
                    //     break;
                    case 13:
                    {
                        // this._phoneNumber.setValue(e.target.value);
                        this.$emit('onEnter', e.target.value)
                        return;
                    }
                    default: {
                    }
                }
            },
            // onMouseenter() {
            //     this.isHover = true;
            // },
            // onMouseleave() {
            //     this.isHover = false;
            // },
            focus() {
                this.$refs.input.focus();
            },
            checkPhoneCountryPopupPosition() {
                setTimeout(() => {
                    let phoneCountryPopup = BX('phoneNumberInputSelectCountry');
                    if (phoneCountryPopup) {
                        BX.style(phoneCountryPopup, 'z-index', '4000');
                    }
                    let phoneCountryPopupBg = BX('popup-window-overlay-phoneNumberInputSelectCountry');
                    if (phoneCountryPopupBg) {
                        BX.style(phoneCountryPopupBg, 'z-index', '3995');
                    }
                }, 5);
            },
            onAjaxSuccess(data, request) {
                if (!request || !request.url || !request.url.match(/action=main\.phonenumber\.getCountries$/)) {
                    return true;
                }
                this.checkPhoneCountryPopupPosition();
            },

        },
        updated() {
        },
        watch: {
            isInit() {
                this._phoneNumber.formatter.replaceCountry(this.defaultCountry);
            },
            // isHover(val) {
                // this._phoneNumber.setValue(this.value)
                // if (val && this.isInit) {
                    // this.placeholder = '+7 (999) 999-99-99';
                // } else {
                    // this.placeholder = '';
                // }
            // },
            inFocus(val) {
                if (val && !this.isSet && this.isInit) {
                    this.isSet = true;
                    this._phoneNumber.setValue(this._phoneNumber.formatter.getFormattedNumber());
                }
            },
        },

        template: `
            <div class="authorization__inputBox " :class="classes" >
            <label :for="name" class="authorization__label">{{title}}</label>
                <div class="bxmaker-authuserphone-input-phone__field authorization__input">
                    
<!--                    <div  class="bxmaker-authuserphone-input-phone__flag" >-->
<!--                        <span ref="flag"></span>-->

<!--                    </div>  -->
                    
                    <div  class="bxmaker-authuserphone-input-phone__input" >
                         <input :type="type" :name="name" :id="name"
                             @focus="onFocus" 
                             @mouseenter="onMouseenter" 
                             @mouseleave="onMouseleave" 
                             @keydown="onKeydown" 
                             :value="inputValue"
                             autocomplete="off"
                             :maxlength="currentMaxLength"
                             ref="input"
                             key="phone"
                             :placeholder="placeholder"
                         >
                    </div>  
                       
                </div>
                <div class="bxmaker-authuserphone-input-phone__validation" v-if="validationMessage">{{validationMessage}}</div>                
            </div>
        `,
    });