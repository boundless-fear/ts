BX.Vue.mutateComponent('BXmakerAuthuserphoneEnterForget', {
    name: 'BXmakerAuthuserphoneEnterForget',
    data() {
        return {

        };
    },
    computed: {

    },
    methods: {

    },

    template: `
            <div class="bxmaker-authuserphone-enter-forget authorization__box flexbox"  >
                <button class="authorization__closeBtn close-btn"></button>
                
                <div class="authorization__signIn active-panel tab-content active">
                    
                    <div class="authorization__formBox flexbox authorization__active">
                       <div class="authorization__formTop flexbox">
                                                          
                            <BXmakerAuthuserphoneEnterForgetForm 
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
                    </div>
                </div>
            </div>
        `,
});