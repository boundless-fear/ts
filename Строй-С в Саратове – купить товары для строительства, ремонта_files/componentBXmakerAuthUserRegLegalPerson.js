BX.Vue.component('BXmakerAuthUserRegLegalPerson', {
    name: 'BXmakerAuthUserRegLegalPerson',
    data: function() {
        return {

        }
    },
    methods: {
        onChangeWholesalerUser(e) {
            console.log(e, 'e');
            this.$emit('change', e.target.checked);
            // const optInputs = document.querySelector('.opt__inputs');

            // if(this.isWholesalerUser){
            //     $('.authorization__submit-signUp').hide();
            //     $('.opt__inputs .authorization__submit-signUp').show();
            //     $('.whosales-bottom-block').show();
            //     $('.auth-popup__policy_phisical').hide();
            // }else{
            //     $('.authorization__submit-signUp').show();
            //     $('.whosales-bottom-block').hide();
            //     $('.auth-popup__policy_phisical').show();
            // }

        },
    },

    props: {
        isLegalPersonChecked: {
            type: Boolean,
            default: false
        },
    },
    template: `
        <div class="authorization__checkBox your-lic new-check">
                <input name="CHECK_OPT" id="checkOpt" type="checkbox"
                   class="checkBox__input authorization__input-checkbox"
                   :checked="isLegalPersonChecked"
                   @change="onChangeWholesalerUser"
                   value="1">
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path fill-rule="evenodd" clip-rule="evenodd" d="M12.933 0.345352C12.5104 -0.115117 11.8087 -0.115117 11.3861 0.345352L5.16652 7.11338L2.62286 4.31581C2.1843 3.86403 1.49855 3.86403 1.05999 4.33319C0.64535 4.80235 0.64535 5.54952 1.06796 6.02737L4.34521 9.5808L4.39306 9.64162C4.82364 10.1195 5.51737 10.1195 5.94795 9.64162L12.933 2.03084C13.3557 1.56169 13.3557 0.805821 12.933 0.345352Z" fill="white"></path>
               </svg>
            <label for="checkOpt" class="checkBox__label new-check_text">Юридическое лицо</label>
        </div>
    `,
});
