BX.Vue.component('BXmakerAuthUserPolicy', {
    name: 'BXmakerAuthUserPolicy',
    data: function() {
        return {
            activeTab: 'messenger',
        }
    },
    methods: {
        clearPassword(){
            $('.class-for-hidden-fields input').val('');
        },
    },
    template: `
        <div class="auth__policy_wrapper">
            <div class="auth-popup__policy">
               <input type="checkbox" id="form-policy-phone" class="auth-popup__policy_input" checked name="policy"> 
               <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.933 0.345352C12.5104 -0.115117 11.8087 -0.115117 11.3861 0.345352L5.16652 7.11338L2.62286 4.31581C2.1843 3.86403 1.49855 3.86403 1.05999 4.33319C0.64535 4.80235 0.64535 5.54952 1.06796 6.02737L4.34521 9.5808L4.39306 9.64162C4.82364 10.1195 5.51737 10.1195 5.94795 9.64162L12.933 2.03084C13.3557 1.56169 13.3557 0.805821 12.933 0.345352Z" fill="white"></path>
                </svg>
               <label for="form-policy-phone" class="auth-popup__policy_text" v-html="$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_POLICY_TEXT"></label>
            </div>
            <div class="auth-popup__registration-link">
               <span class="auth-popup__registration-link_text">{{$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_REGISTRATION_LINK_TEXT}}</span>
               <BXmakerAuthuserphoneLink @onClick="$root.toRegistration" @onClick="clearPassword" classes="authorization__recoverBtn Blink auth-popup__registration-link_link">
                   {{$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_REGISTRATION_LINK}}   
               </BXmakerAuthuserphoneLink> 
            </div>
        </div>
    `,
});
