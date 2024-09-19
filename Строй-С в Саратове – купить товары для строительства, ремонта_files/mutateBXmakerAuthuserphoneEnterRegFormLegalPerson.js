BX.Vue.component('BXmakerAuthuserphoneEnterRegFormLegalPerson', {
    name: 'BXmakerAuthuserphoneEnterRegFormLegalPerson',
    data() {
        return {
            innError: '',
            consentLoader: false
        };
    },
    props: {
        companyName: {
            type: String,
            default: ''
        },
          inn: {
              type: String,
              default: ''
          },
          kpp: {
              type: String,
              default: ''
          },
          address: {
              type: String,
              default: ''
          },
    },
    methods: {
        closeLegalPersonForm(e) {
            this.$emit('change', e.target.checked);
        },
        changeInn(){
            let innValue = $('input[name="UF_WORK_INN"]').val();
            if(innValue){
                $('.inn-btn-check').removeClass('inn-btn-check__grey');
            }else{
                $('.inn-btn-check').addClass('inn-btn-check__grey');
            }
        },
        fillCompanyFields(event) {

            if($('.inn-btn-check').hasClass('inn-btn-check__grey')){
                return false;
            }

            this.innError = '';
            const innInput = document.querySelector('input[name="UF_WORK_INN"]')

            const inn = innInput.value;

            if (inn.length < 9) {
                this.innError = 'ИНН должен быть больше 9 цифр';
            } else if (!(/^\d+$/.test(inn))) {
                this.innError = 'ИНН должен содержать только цифры';
            } else if (inn.length >= 9) {
                const url = '/ajax/autofill.php'
                const data = {
                    action: 'checkInn',
                    data: {
                        inn,
                    }
                }
                BX.ajax({
                    url,
                    method: 'POST',
                    dataType: 'json',
                    timeout: 10,
                    async: true,
                    cache: false,
                    data,
                    onsuccess: (response) => {
                        this.$emit('change-company', response.companyName);
                        this.$emit('change-address', response.address);
                        this.$emit('change-kpp', response.kpp);
                    },
                    onfailure: (errors) => {
                        this.innError = 'ИНН не найден'
                        this.consentLoader = false;
                    }
                });
            }
        },
        setCompanyName(name) {
            this.$emit('change-company', name);
        },

        setInn(inn) {
            this.$emit('change-inn', inn);
        },

        setKpp(kpp) {
            this.$emit('change-kpp', kpp);
        },

        setAddress(address) {
            this.$emit('change-address', address);
        },

        onClickConfirmation() {
            this.$emit('clickConfirmation');
        }

    },
    template: `
    <div class="opt__inputs reg-form-legal-position">
            <button class="authorization__closeBtn close-btn"></button>

            <div class="opt__inputs-back-button auth-popup-back-link" @click="closeLegalPersonForm">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="36" height="36" rx="18" fill="#F7F7F9"/>
                    <path d="M11 18H25" stroke="#8C0D18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16 13L11 18" stroke="#8C0D18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16 23L11 18" stroke="#8C0D18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Назад
            </div>

            <div class="opt__inputs-title auth-popup__title">Регистрация юр. лица</div>
            <slot name="message" />
                <BXmakerAuthuserphoneMessage :message="$root.message" :error="$root.error" />
            </slot> 
            
           <BXmakerAuthuserphoneInput
               title="ИНН"
               :value="inn"
               :maxLength="12"
               @onInput="setInn"
               @onEnter="setInn"
               @onInput="changeInn"
               name="UF_WORK_INN"
           />
           <div class="message-inn">{{ innError }}</div>
           <button 
               type="button" 
               role="button" 
               @click="fillCompanyFields"
               class="inn-btn-check inn-btn-check__grey"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.707 4.70701L19.293 3.29301C18.902 2.90201 18.269 2.90201 17.879 3.29301L7.293 13.879C7.105 14.066 7 14.321 7 14.586V17H9.414C9.679 17 9.934 16.895 10.121 16.707L20.707 6.12101C21.098 5.73101 21.098 5.09801 20.707 4.70701V4.70701Z" stroke="#9B9B9C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M18.9098 7.91009L16.0898 5.09009" stroke="#9B9B9C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M21 11V19C21 20.105 20.105 21 19 21H5C3.895 21 3 20.105 3 19V5C3 3.895 3.895 3 5 3H13" stroke="#9B9B9C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
               Автоматически заполнить другие поля
           </button>

           <BXmakerAuthuserphoneInput
               title="Название организации"
               :value="companyName"
               :maxLength="255"
               @onInput="setCompanyName"
               @onEnter="setCompanyName"
               name="WORK_COMPANY"
               ref="inn"
           />
       
           <BXmakerAuthuserphoneInput
               title="Юридический адрес"
               :value="address"
               :maxLength="255"
               @onInput="setAddress"
               @onEnter="setAddress"
               name="WORK_STREET"
           />

           <BXmakerAuthuserphoneInput
               title="КПП"
               :value="kpp"
               :maxLength="255"
               @onInput="setKpp"
               @onEnter="setKpp"
               name="UF_WORK_KPP"
           />
       
       
           <slot name="request">
                <BXmakerAuthuserphoneButton
                    class="authorization__submit-signUp"
                    :title="$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_REG_FORM_BUTTON"
                    :loader="$root.startLoader"
                    @onClick="onClickConfirmation"
                />
            </slot>
       
           <BXmakerAuthUserRegPolicy />
    </div>
`,
});