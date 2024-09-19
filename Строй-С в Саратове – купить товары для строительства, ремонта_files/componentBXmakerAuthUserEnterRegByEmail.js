BX.Vue.component('BXmakerAuthUserEnterRegByEmail', {
    name: 'BXmakerAuthUserEnterRegByEmail',
    data() {
        return {
            confirmPassword: '',
        };
    },
    computed: {
        inputText() {
            return this.$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_AUTH_BY_PASSWORD_EMAIL;
        },

    },
    methods: {
        onEnterFIO() {
            this.$emit('clickConfirmation');
        },
        onEnterPhone() {
            this.$emit('clickConfirmation');
        },
        onEnterEmail() {
            this.$emit('clickConfirmation');
        },
        onChangePhone(data){
            console.log(data);
            this.$root.setPhone(data.formattedValue);
        },
        onEnterPassword() {
            this.$emit('clickConfirmation');
        },
        onInputConfirmPassword(password) {
            this.confirmPassword = password;
        },
        onChange(e) {
            this.$emit('change-confirmation', e.target.checked,);
        },

        onClickConfirmation() {
            this.$emit('clickConfirmation');
        }
    },
    props: {
        confirmByPhone: {
            type: Boolean,
            default: false
        }
    },
    template: `
        <div class="bxmaker-authuserphone-enter-auth-by-password-form authorization__form">
        
            <BXmakerAuthuserphoneInput 
                :title="$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_REG_FORM_FIO" 
                :value="$root.fio" 
                @onInput="$root.setFIO" 
                @onEnter="onEnterFIO"   
                name="FIO" 
                ref="fio"
            />
        
             <BXmakerAuthuserphoneInput
               :title="$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_REG_FORM_EMAIL"
               :value="$root.email"
               @onInput="$root.setEmail"
               @onEnter="onEnterEmail"
               name="EMAIL"
               ref="email"
             />
             
<!--              v-if="$root.isEnabledPhoneMask"-->
             <BXmakerAuthuserphoneInputPhone
                :title="$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_REG_FORM_PHONE"
                :value="$root.phone"
                @onChange="onChangePhone"
                @onEnter="onEnterPhone"
                name="PHONE"
                :defaultCountry="$root.phoneMaskDefaultCountry"
                :countryTopList="$root.phoneMaskCountryTopList"
             />
             
             <BXmakerAuthuserphoneInputPassword
                 :title="$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_REG_FORM_PASSWORD"
                 :value="$root.password"
                 @onInput="$root.setPassword"
                 @onEnter="onEnterPassword"
                 name="PASSWORD"
                 ref="password"
             />
                       
             <BXmakerAuthuserphoneInputPassword
                 :title="$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_REG_FORM_CONFIRM_PASSWORD"
                 :value="confirmPassword"
                 @onInput="onInputConfirmPassword"
                 @onEnter="onInputConfirmPassword"
                 name="CONFIRM_PASSWORD"
                 ref="confirmPassword"
             />
             
             <div class="authorization__checkBox tel-check">
                <input name="CHECK_TEL" id="checkOpt" type="checkbox"
                       class="authorization__input-checkbox"
                       :checked="confirmByPhone" 
                       @change="onChange"
                       value="1">
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.933 0.345352C12.5104 -0.115117 11.8087 -0.115117 11.3861 0.345352L5.16652 7.11338L2.62286 4.31581C2.1843 3.86403 1.49855 3.86403 1.05999 4.33319C0.64535 4.80235 0.64535 5.54952 1.06796 6.02737L4.34521 9.5808L4.39306 9.64162C4.82364 10.1195 5.51737 10.1195 5.94795 9.64162L12.933 2.03084C13.3557 1.56169 13.3557 0.805821 12.933 0.345352Z" fill="white"></path>
                </svg>
                <label for="checkTel" class="checkBox__label">Подтверждение регистрации по телефону</label>
             </div>
             
             <BXmakerAuthuserphoneMessage :message="$root.message" :error="$root.error" />
 
        </div>
    `,
});