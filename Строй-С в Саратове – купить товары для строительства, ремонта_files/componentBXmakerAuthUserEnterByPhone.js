BX.Vue.component('BXmakerAuthUserEnterByPhone', {
    name: 'BXmakerAuthUserEnterByPhone',
    data() {
        return {};
    },
    computed: {

    },
    methods: {
        onEnterPhone() {
            this.onClickConfirmation();
        },
        onCompleteCaptcha() {
            this.onClickConfirmation();
        },
        onClickConfirmation() {
            if (this.$root.isFullCaptcha) {
                this.$root.authByPhone();
            }
        },
        onClickAuthByPass() {
            this.$root.setIsAuthByPassword(true);
        },
       
        onChangePhone(data){
            this.$root.setPhone(data.formattedValue);
        },

    },
    updated() {
    },
    template: `
            <div class="authorization__form">
<!--                    v-if="$root.isEnabledPhoneMask"-->
                   <BXmakerAuthuserphoneInputPhone
                        :title="$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_AUTH_FORM_PHONE" 
                       :value="$root.phone" 
                        @onChange="onChangePhone" 
                        @onEnter="onEnterPhone" 
                        name="PHONE" 
                        :defaultCountry="$root.phoneMaskDefaultCountry"
                        :countryTopList="$root.phoneMaskCountryTopList"                          
                    /> 
                    <BXmakerAuthuserphoneInput v-else
                        :title="$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_AUTH_FORM_PHONE" 
                        :value="$root.phone" 
                        @onInput="$root.setPhone" 
                        @onEnter="onEnterPhone" 
                        name="PHONE"
                    />
                    <BXmakerAuthuserphoneMessage :message="$root.message" :error="$root.error" />                    
                                                
                     <BXmakerAuthuserphoneCaptcha 
                         :code="$root.captchaCode"
                         :src="$root.captchaSrc"
                         :length="$root.captchaLength"
                         :loader="$root.captchaLoader"
                         @onInput="$root.setCaptchaCode"
                         @onComplete="onCompleteCaptcha"
                         @onRefresh="$root.refreshCaptcha"
                     />  
                                         
                    <div class="authorization__bottom">
                        <BXmakerAuthuserphoneButton 
                            :title="$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_AUTH_FORM_BUTTON"  
                            :loader="$root.startLoader"
                            @onClick="onClickConfirmation" 
                        />
                   </div>   
            </div>
        `,
});