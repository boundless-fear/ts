BX.Vue.mutateComponent('BXmakerAuthuserphoneEnterRegForm', {
    name: 'BXmakerAuthuserphoneEnterRegForm',
    data() {
        return {
            confirmPassword: '',
            confirmByPhone: true,
            companyName: '',
            inn: '',
            innError: '',
            kpp: '',
            address: '',
            activeTab: 'messenger',
            isLegalPersonOpen: false,
            isLegalPersonChecked: false,
        };
    },
    methods: {
        toAuthByPassword() {
            this.$root.isAuthByPassword = true;
            this.$root.toAuth();
        },

        onChange(confirmByPhone) {
            this.confirmByPhone = confirmByPhone
        },

        onClickConfirmation() {
            this.$root.resetExpandData();
            this.$root.setExpandData('confirmByPhone', this.confirmByPhone);
            this.$root.setExpandData('confirmPassword', this.confirmPassword);

            this.$root.setExpandData('isWholesalerUser', this.isLegalPersonChecked);
            this.$root.setExpandData('companyName', this.companyName);
            this.$root.setExpandData('inn', this.inn);
            this.$root.setExpandData('address', this.address);
            this.$root.setExpandData('kpp', this.kpp);

            if (this.$root.isFullCaptcha) {
                this.$root.register();
            }
        },

        handleTabChange(id) {
            this.activeTab = id;
        },
        onChangeLegalPerson(isLegalPersonChecked) {
            this.isLegalPersonChecked = isLegalPersonChecked;
        },
        openLegalPersonForm() {
            this.isLegalPersonOpen = true;
        },
        closeLegalPersonForm(isLegalPersonChecked) {
            this.isLegalPersonOpen = false;
        },
        setCompanyName(name) {
            this.companyName = name;
        },

        setInn(inn) {
            this.inn = inn;
        },

        setKpp(kpp) {
            this.kpp = kpp;
        },

        setAddress(address) {
            this.address = address;
        },

    },
    template: `
    <div class="bxmaker-authuserphone-enter-reg-form tab-content active">
        <div class="authorization__signUp"  >
            <div class="authorization__formBox authorization-login-tel flexbox authorization__active">
                <div class="authorization__formTop flexbox">
                    <div class="authorization__form authorization__form-signUp">
                    <div class="mobile-auth-header">
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="36" height="36" rx="18" fill="#F7F7F9"/>
                    <path d="M11 18H25" stroke="#8C0D18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16 13L11 18" stroke="#8C0D18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16 23L11 18" stroke="#8C0D18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p>Назад</p>
            </div>

                <div v-if="!isLegalPersonOpen">
                    <div class="auth-popup__title">Регистрация</div>
                    <BXmakerAuthUserTabsReg :activeTab='activeTab' @change="handleTabChange" />
                    <BXmakerAuthUserEnterRegByMessenger v-if="activeTab === 'messenger'" />
                    <BXmakerAuthUserEnterRegByPhone @clickConfirmation="onClickConfirmation" v-else-if="activeTab === 'phone'" />
                    <BXmakerAuthUserEnterRegByEmail :confirmByPhone="confirmByPhone" @onChange="onChange" @clickConfirmation="onClickConfirmation" v-else-if="activeTab === 'email'" />
                    <BXmakerAuthUserRegLegalPerson v-if="activeTab !== 'messenger'" :isLegalPersonChecked="isLegalPersonChecked" @change="onChangeLegalPerson" />
                </div>
                
                <BXmakerAuthuserphoneEnterRegFormLegalPerson
                     @clickConfirmation="onClickConfirmation"
                     @change="closeLegalPersonForm"
                     @change-company="setCompanyName"
                     @change-kpp="setKpp"
                     @change-address="setAddress"
                     @change-inn="setInn"
                     :companyName="companyName"
                     :address="address"
                     :kpp="kpp"
                     :inn="inn"
                     v-if="isLegalPersonOpen"
                />

                <BXmakerAuthuserphoneCaptcha
                    :code="$root.captchaCode"
                    :src="$root.captchaSrc"
                    :length="$root.captchaLength"
                    :loader="$root.captchaLoader"
                    @onInput="$root.setCaptchaCode"
                    @onComplete="onClickConfirmation"
                    @onRefresh="$root.refreshCaptcha"
                />
               
                </div>
            </div>
            
             <div class="whosales-reg-interaction-wrapper" v-if="!isLegalPersonOpen">
                    <div v-if="!isLegalPersonChecked && activeTab !== 'messenger'">
                        <BXmakerAuthuserphoneButton
                            class="authorization__submit-signUp"
                            :title="$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_REG_FORM_BUTTON"
                            :loader="$root.startLoader"
                            @onClick="onClickConfirmation"
                        />
                    </div>
    
                    <div class="whosales-bottom-block" v-if="isLegalPersonChecked && activeTab !== 'messenger'">
                        <button type="button" class="whosales-button authorization__submit" @click="openLegalPersonForm">
                            Продолжить как юридическое лицо
                        </button>
                        <div class="whosales-bottom-text">
                            Далее будет заполнение информации об организации
                        </div>
                    </div> 
                    
    
                <BXmakerAuthUserRegPolicy v-if="!isLegalPersonChecked" />
                <BXmakerAuthuserphoneLink style="text-align: center" @onClick="toAuthByPassword" class="nav__barLink nav__barUserAuthItem nav__barUserAuthItem-inset nav__barUserAuthItem-login Blink">
                        Авторизация
                </BXmakerAuthuserphoneLink>  
            </div>
            </div>
        </div>
    </div>
`,
});