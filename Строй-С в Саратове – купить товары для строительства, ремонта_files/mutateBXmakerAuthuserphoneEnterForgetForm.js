BX.Vue.mutateComponent('BXmakerAuthuserphoneEnterForgetForm', {
    name: 'BXmakerAuthuserphoneEnterForgetForm',
    data() {
        return {};
    },
    computed: {},
    methods: {
        onClickConfirm() {
            if (this.$root.isFullCaptcha) {
                this.$root.forget();
            }
        },
        onChangePhone(data){
            this.$root.setPhone(data.formattedValue);
        },
        onEnterPhone() {
            this.onClickConfirm();
        },
        onEnterEmail() {
            this.onClickConfirm();
        },
        onClickForgetActiveEmail() {
            $('.forget-pass__email_cont').show();
            $('.auth-popup__tab').removeClass('active')
            $('.tab-email').addClass('active')
            $('.forget-pass__phone_cont').hide();
        },
        onClickForgetActivePhone() {
            $('.forget-pass__email_cont').hide();
            $('.auth-popup__tab').removeClass('active')
            $('.tab-phone').addClass('active')
            $('.forget-pass__phone_cont').show();
        }
    },
    template: `
            <div class="bxmaker-authuserphone-enter-forget-form authorization__form"  >
                <BXmakerAuthuserphoneLink @onClick="$root.toAuth" classes="authorization-registration__btn auth-popup-back-link">
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="36" height="36" rx="18" fill="#F7F7F9"/>
                        <path d="M11 18H25" stroke="#8C0D18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16 13L11 18" stroke="#8C0D18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16 23L11 18" stroke="#8C0D18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    {{$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_BACK_LINK}}
                </BXmakerAuthuserphoneLink>
                 <BXmakerAuthuserphoneHeader class="bxmaker-authuserphone-enter-auth__title" >
                        {{$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_FORGET_TITLE}}
                 </BXmakerAuthuserphoneHeader>    
                <div class="bxmaker-authuserphone-enter-auth__description">
                    {{$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_FORGET_DESCRIPTION}}
                </div>
                 <slot name="message" />  
                        <BXmakerAuthuserphoneMessage :message="$root.message" :error="$root.error" />
                   </slot>     
                                      
                   
                    <div class="auth-popup__tabs" style="display: flex">
                        <div v-on:click="onClickForgetActivePhone" class="auth-popup__tab tab-phone active">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.23678 8.76274C6.45678 7.98274 5.86878 7.10941 5.47811 6.22341C5.39545 6.03608 5.44411 5.81674 5.58878 5.67208L6.13478 5.12674C6.58211 4.67941 6.58211 4.04674 6.19145 3.65608L5.40878 2.87341C4.88811 2.35274 4.04411 2.35274 3.52345 2.87341L3.08878 3.30808C2.59478 3.80208 2.38878 4.51474 2.52211 5.22141C2.85145 6.96341 3.86345 8.87074 5.49611 10.5034C7.12878 12.1361 9.03611 13.1481 10.7781 13.4774C11.4848 13.6107 12.1974 13.4047 12.6914 12.9107L13.1254 12.4767C13.6461 11.9561 13.6461 11.1121 13.1254 10.5914L12.3434 9.80941C11.9528 9.41874 11.3194 9.41874 10.9294 9.80941L10.3274 10.4121C10.1828 10.5567 9.96345 10.6054 9.77611 10.5227C8.89011 10.1314 8.01678 9.54274 7.23678 8.76274Z" stroke="#9B9B9C" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg> 
                            {{$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_FORGET_TAB_PHONE}}
                        </div>
                        
                        <div class="auth-popup__tab tab-email" v-on:click="onClickForgetActiveEmail">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2 4.53325V4.53325C2 4.93325 2.2 5.26659 2.53333 5.53325L6.53333 8.26659C7.46667 8.86659 8.6 8.86659 9.53333 8.26659L13.5333 5.59992C13.8 5.26659 14 4.93325 14 4.53325V4.53325C14 3.86659 13.4667 3.33325 12.8 3.33325H3.2C2.53333 3.33325 2 3.86659 2 4.53325Z" stroke="#9B9B9C" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M2 4.6665V11.3332C2 12.0665 2.6 12.6665 3.33333 12.6665H12.6667C13.4 12.6665 14 12.0665 14 11.3332V4.6665" stroke="#9B9B9C" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M2.39258 12.2746L6.45525 8.21191" stroke="#9B9B9C" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M9.57422 8.23999L13.6089 12.2747" stroke="#9B9B9C" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            {{$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_FORGET_TAB_EMAIL}}
                        </div>
                    </div>
                                      
                    <div class="forget-pass__phone_cont" >
                        <slot name="phone">       
                        
                         <BXmakerAuthuserphoneInputPhone  v-if="$root.isEnabledPhoneMask"
                                :title="$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_FORGET_FORM_PHONE" 
                                :value="$root.phone" 
                                @onChange="onChangePhone" 
                                @onEnter="onEnterPhone" 
                                name="PHONE" 
                                :defaultCountry="$root.phoneMaskDefaultCountry"
                                :countryTopList="$root.phoneMaskCountryTopList"                          
                            />
                                                    
                                    
                            <BXmakerAuthuserphoneInput v-else
                                :title="$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_FORGET_FORM_PHONE" 
                                :value="$root.phone" 
                                @onInput="$root.setPhone" 
                                 @onEnter="onEnterPhone"                          
                                name="PHONE" 
                            />
                            
                        </slot>     
                    </div>
                    
                    <div class="forget-pass__email_cont" style="display: none;" >                               
                        <slot name="email" v-if="$root.isEnabledRestoreByEmail">                                      
                            <BXmakerAuthuserphoneInput                             
                                :title="$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_FORGET_FORM_EMAIL" 
                                :value="$root.email" 
                                @onInput="$root.setEmail" 
                                 @onEnter="onEnterEmail"  
                                name="EMAIL" 
                            />
                        </slot>        
                    </div>
                    
                   <slot name="captcha">
                        <BXmakerAuthuserphoneCaptcha 
                            :code="$root.captchaCode"
                            :src="$root.captchaSrc"
                            :length="$root.captchaLength"
                            :loader="$root.captchaLoader"
                            @onInput="$root.setCaptchaCode"
                            @onComplete="onClickConfirm"
                            @onRefresh="$root.refreshCaptcha"
                           />  
                     </slot>   
                     
                    
                     <slot name="request">
                     <div class="authorization-registration">
                        <BXmakerAuthuserphoneButton 
                            :title="$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_FORGET_FORM_BUTTON"  
                            :loader="$root.forgetLoader"
                            @onClick="onClickConfirm" 
                        />
                    </slot>
                   
                    <div class="auth-popup__policy">
                        <input type="checkbox" id="form-policy-phone" class="auth-popup__policy_input" checked name="policy"> 
                        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.933 0.345352C12.5104 -0.115117 11.8087 -0.115117 11.3861 0.345352L5.16652 7.11338L2.62286 4.31581C2.1843 3.86403 1.49855 3.86403 1.05999 4.33319C0.64535 4.80235 0.64535 5.54952 1.06796 6.02737L4.34521 9.5808L4.39306 9.64162C4.82364 10.1195 5.51737 10.1195 5.94795 9.64162L12.933 2.03084C13.3557 1.56169 13.3557 0.805821 12.933 0.345352Z" fill="white"></path>
                        </svg>
                        <label for="form-policy-phone" class="auth-popup__policy_text" v-html="$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_POLICY_TEXT"></label>
                    </div>
            </div>
        `,
});