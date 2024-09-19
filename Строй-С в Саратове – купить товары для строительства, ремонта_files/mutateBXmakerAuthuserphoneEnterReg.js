BX.Vue.mutateComponent('BXmakerAuthuserphoneEnterReg', {
    name: 'BXmakerAuthuserphoneEnterReg',
    data() {
        return {};
    },
    computed: {},
    methods: {
        toAuthByPassword() {
            this.$root.isAuthByPassword = true;
            this.$root.toAuth();
        },
    },

    template: `
            <div class="bxmaker-authuserphone-enter-reg  authorization__box flexbox">
                <button class="authorization__closeBtn close-btn"></button>
                                                           
                 <BXmakerAuthuserphoneEnterRegForm 
                    v-show="!$root.isShowConfirm" 
                 />   
                                        
                 <BXmakerAuthuserphoneEnterSmsCode  
                     v-show="$root.isNeedShowConfirmSmsCode"                                    
                 /> 
                    
                 <BXmakerAuthuserphoneEnterUserCall  
                     v-show="$root.isNeedShowConfirmUserCall"   
                 /> 
                    
                 <BXmakerAuthuserphoneEnterBotCall 
                      v-show="$root.isNeedShowConfirmBotCall"                 
                 />  
                 
                 <BXmakerAuthuserphoneEnterBotSpeech 
                      v-show="$root.isNeedShowConfirmBotSpeech"                 
                 />  
                 
                 <BXmakerAuthuserphoneEnterSimPush 
                      v-show="$root.isNeedShowConfirmSimPush"                 
                 />  
                            
            </div>
        `,
});
