BX.Vue.component('BXmakerAuthUser', {
    name: 'BXmakerAuthUser',
    data: function() {
        return {
            activeTab: 'messenger',
        }
    },
    methods: {
        handleTabChange(id) {
            this.activeTab = id;
        },
    },
    template: ` 
            <div class="bxmaker-authuserphone-enter-auth authorization__box flexbox">
                <button class="authorization__closeBtn close-btn"></button>
                <div class="mobile-auth-header">
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="36" height="36" rx="18" fill="#F7F7F9"/>
                        <path d="M11 18H25" stroke="#8C0D18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16 13L11 18" stroke="#8C0D18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16 23L11 18" stroke="#8C0D18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p>Назад</p>
                </div>
               <div class="authorization__signIn active-panel tab-content active">
                   <div class="authorization__formBox flexbox authorization__active">
                       <div class="authorization__formTop flexbox auth__form_wrapper"> 
                       
                               <div v-if="!$root.isShowConfirm">
                                    <div class="auth-popup__title">{{$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_TITLE}}</div>
                                    <div class="auth-popup__description">{{$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_DESCRIPTION}}</div>
                                   <BXmakerAuthUserTabs :activeTab="activeTab" @change="handleTabChange"/>
                                   <BXmakerAuthUserEnterByMessenger v-if="activeTab === 'messenger'" />
                                   <BXmakerAuthUserEnterByPhone v-else-if="activeTab === 'phone'" />
                                   <BXmakerAuthUserEnterByEmail v-else-if="activeTab === 'email'" />
                                   <BXmakerAuthUserPolicy />            
                               </div>
                         
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
