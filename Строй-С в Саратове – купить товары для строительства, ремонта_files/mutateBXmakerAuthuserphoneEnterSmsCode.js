BX.Vue.mutateComponent('BXmakerAuthuserphoneEnterSmsCode',
    {
        props: {

        },
        data: function () {
            return {
                //��������� �������� ���� - ��������?
                // ��� ���������� �������� ����� ����� ����� - ��� �������������
                lastActionCheck: false,
            };
        },
        mounted(){
            this.$refs.refInputCode.focus();
        },
        methods: {
            onInputCode(value) {
                this.$root.setSmsCode(value);
                this.$root.setSmsCodeError(false);

                if(this.$root.smsCodeLength === value.length && this.$root.isFullCaptcha)
                {
                    this.onClickCheck();
                }
            },
            onClickCheck() {
                this.lastActionCheck = true;
                this.$root.checkConfirm();
            },
            onClickChangePhone() {
                this.lastActionCheck = false;
                this.$root.resetMessage();
                this.$root.resetCaptcha();
                this.$root.hideConfirm();
                this.$root.setSmsCode('');
            },
            onClickStart(){
                this.lastActionCheck = false;
                this.$root.setSmsCode('');
                this.$root.setSmsCodeError(false);

                this.$root.startConfirmSmsCode();
            },

            onCompleteCaptcha(){
                if(!this.lastActionCheck)
                {
                    this.onClickStart();
                    return;
                }

                //��������� �������� ���������
                if(this.$root.smsCodeLength !== this.$root.smsCode.length)
                {
                    return;
                }

                this.onClickCheck();
            },
            onCompleteTimeout(){
                this.$root.setSmsCodeTimeout(0);
            }
        },
        template: `
            <div class="bxmaker-authuserphone-enter-smscode" >
                <BXmakerAuthuserphoneLink @onClick="onClickChangePhone" classes="authorization-registration__btn auth-popup-back-link">
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="36" height="36" rx="18" fill="#F7F7F9"/>
                        <path d="M11 18H25" stroke="#8C0D18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16 13L11 18" stroke="#8C0D18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16 23L11 18" stroke="#8C0D18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    {{$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_BACK_LINK}}
                </BXmakerAuthuserphoneLink>  
                <slot name="header">
                    <BXmakerAuthuserphoneHeader>
                        {{$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_SMS_CODE_TITLE}}
                    </BXmakerAuthuserphoneHeader>  
                </slot>
                
                <slot name="notice>">    
                    <div class="bxmaker-authuserphone-enter-smscode__notice">
                        <p>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="11.9998" cy="12.0001" r="9.00375" stroke="#F3A601" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M11 15.5017H13.3103" stroke="#F3A601" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12.1583 15.5015V11.2498H11.0078" stroke="#F3A601" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12.1019 8.24581C12.1019 8.38394 11.9899 8.49592 11.8518 8.49592C11.7136 8.49592 11.6017 8.38394 11.6017 8.24581C11.6017 8.10769 11.7136 7.99571 11.8518 7.99571" stroke="#F3A601" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M11.8517 7.99576C11.9898 7.99576 12.1018 8.10774 12.1018 8.24587" stroke="#F3A601" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            {{$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_SMS_CODE_NOTICE}} 
                        </p>
                         
                         <div class="bxmaker-authuserphone-enter-smscode__phone_cont">
                            <span class="bxmaker-authuserphone-enter-smscode__phone_text">{{$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_SMS_CODE_PHONE_TEXT}} </span>
                            <span class="bxmaker-authuserphone-enter-smscode__phone">{{$root.formattedPhone}}</span>
                        </div>                        
                                          
                    </div>
                </slot>
                <div class="bxmaker-authuserphone-enter-smscode__code_text">{{$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_BOT_CALL_NUMBER_CODE}}</div>
                {{$root.code}}
                <slot name="code">
                    <BXmakerAuthuserphoneInputCode 
                        :value="$root.smsCode" 
                        @onInput="onInputCode" 
                        @onEnter="onClickCheck" 
                        ref="refInputCode" 
                        :maxLength="$root.smsCodeLength"  
                        :loader="$root.smsCodeCheckLoader"
                        :validationMessage="$root.smsCodeError"
                    />
                </slot>
                
                  <slot name="message">
                    <BXmakerAuthuserphoneMessage :message="$root.message" :error="$root.error" /> 
                </slot>  
                               
                <slot name="captcha">
                    <BXmakerAuthuserphoneCaptcha 
                        :code="$root.captchaCode"
                        :src="$root.captchaSrc"
                        :length="$root.captchaLength"
                        :loader="$root.captchaLoader"
                        @onInput="$root.setCaptchaCode"
                        @onComplete="onCompleteCaptcha"
                        @onRefresh="$root.refreshCaptcha"
                   />
                </slot>             
                                
                <slot name="timeout"> 
                    <BXmakerAuthuserphoneTimeout 
                    :timeout="$root.smsCodeTimeout" 
                    v-if="$root.smsCodeTimeout" 
                    @onComplete="onCompleteTimeout" >  
                        <template v-slot:before>
                            {{$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_SMS_CODE_TIMEOUT_TITLE}}
                            {{$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_SMS_CODE_TIMEOUT_SUBTITLE}} 
                        </template>                 
                    </BXmakerAuthuserphoneTimeout>
                </slot>
                           
                <slot name="request">
                    <div class="bxmaker-authuserphone-enter-smscode__send"  v-if="!$root.smsCodeTimeout" >
                        <BXmakerAuthuserphoneLink @onClick="onClickStart" v-if="!$root.smsCodeStartLoader" classes="authorization-registration__btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5898 6L14.5898 4L12.5898 2" stroke="#8C0D18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M11.4102 18L9.41016 20L11.4102 22" stroke="#8C0D18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M17.6733 6.37109C19.1083 7.81709 19.9993 9.80209 19.9993 12.0001C19.9993 16.4181 16.4173 20.0001 11.9993 20.0001C11.2133 20.0001 10.4563 19.8821 9.73828 19.6711" stroke="#8C0D18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6.254 17.562C4.86 16.122 4 14.162 4 12C4 7.582 7.582 4 12 4C12.786 4 13.543 4.118 14.261 4.329" stroke="#8C0D18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        
                            {{$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_SMS_CODE_GET_NEW}}   
                         </BXmakerAuthuserphoneLink> 
                         <BXmakerAuthuserphoneLoader class="bxmaker-authuserphone-enter-smscode__send-loader" v-else />
                    </div>        
                </slot>        
                                
            </div>
        `,
    });