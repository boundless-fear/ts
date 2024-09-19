BX.Vue.component('BXmakerAuthUserEnterByEmail', {
    name: 'BXmakerAuthUserEnterByEmail',
    data() {
        return {};
    },
    computed: {
        inputText() {
            return this.$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_AUTH_BY_PASSWORD_EMAIL;
        },
    },
    methods: {
        onChangePhone(data) {
            this.$root.setPLE(data.formattedValue);
        },
        onEnterPLE() {
            this.$refs.password.focus();
        },
        onEnterPassword() {
            this.onClickConfirmation();
        },
        onCompleteCaptcha() {
            this.onClickConfirmation();
        },
        onClickConfirmation() {
            if (this.$root.isFullCaptcha) {
                this.$root.authByPassword();
            }
        },
    },
    template: `
        <div class="bxmaker-authuserphone-enter-auth-by-password-form authorization__form"  >
                <BXmakerAuthuserphoneInputPhone  v-if="!$root.isEnabledAuthByLogin && !$root.isEnabledAuthByEmail && $root.isEnabledPhoneMask"
                    :title="inputText" 
                    :value="$root.ple" 
                    @onChange="onChangePhone" 
                    @onEnter="onEnterPLE" 
                    name="PHONE_LOGIN_EMAIL" 
                    :defaultCountry="$root.phoneMaskDefaultCountry"
                    :countryTopList="$root.phoneMaskCountryTopList"                          
                />
                     
                <BXmakerAuthuserphoneInput v-else
                    :title="inputText" 
                    :value="$root.ple" 
                    @onInput="$root.setPLE" 
                    @onEnter="onEnterPLE" 
                    name="PHONE_LOGIN_EMAIL"
                />
                
 
                <BXmakerAuthuserphoneInputPassword 
                    :title="$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_AUTH_BY_PASSWORD_FORM_PASSWORD" 
                    :value="$root.password" 
                    @onInput="$root.setPassword" 
                    @onEnter="onEnterPassword" 
                    name="PASSWORD" 
                    ref="password"                         
                />
             <BXmakerAuthuserphoneMessage :message="$root.message" :error="$root.error" />
             
                
            <div class="authorization__optional flexbox">
                <div class="authorization__inputBox authorization__inputBox-checkbox authorization__checkbox flexbox new-check">
                    <input name="USER_REMEMBER" id="authCheck" type="checkbox" value="Y" class="authorization__input-checkbox">
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.933 0.345352C12.5104 -0.115117 11.8087 -0.115117 11.3861 0.345352L5.16652 7.11338L2.62286 4.31581C2.1843 3.86403 1.49855 3.86403 1.05999 4.33319C0.64535 4.80235 0.64535 5.54952 1.06796 6.02737L4.34521 9.5808L4.39306 9.64162C4.82364 10.1195 5.51737 10.1195 5.94795 9.64162L12.933 2.03084C13.3557 1.56169 13.3557 0.805821 12.933 0.345352Z" fill="white"></path>
                    </svg>
                    <label for="authCheck" class="authorization__checkbox-label new-check_text">Запомнить меня</label>
                </div>
                <BXmakerAuthuserphoneLink @onClick="$root.toForget" classes="authorization__recoverBtn Blink">
                   {{$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_AUTH_BY_PASSWORD_FORGET}}   
                </BXmakerAuthuserphoneLink> 
<!--                <button type="button" class="authorization__recoverBtn Blink" href="/ajax/auth.php?forgot_password=yes&amp;ajax=y">-->
<!--                    Забыли свой пароль?                                    </button>-->
            </div>
             
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
                        :title="$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_AUTH_BY_PASSWORD_FORM_BUTTON"  
                        :loader="$root.startLoader"
                        @onClick="onClickConfirmation" 
                    />
                </div>
        </div>
    `,
});