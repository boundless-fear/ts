BX.Vue.component('BXmakerAuthuserphoneEnter', {
    name: 'BXmakerAuthuserphoneEnter',
    methods: {
        resetModal() {
            this.$root.isAuthorized = false;
            this.$root.isShowConfirmEmail = false;
            this.$root.actionTypeIsAuth = true;
            this.$root.data.isConfirmedEmail = false;
        },
        reload() {
            location.reload();
        },
    },
    template: `
        <div class="authorization authorization-signIn authorization__widnow" style="display:block" :id="'bxmaker-authuserphone-enter' + $root.rand" >
            <div class="authorization authorization-message authorization__widnow" style="display: block;" v-if="$root.isShowConfirmEmail" >
                <div class="authorization__box">
                    <button class="authorization__closeBtn authorization__closeBtn-recover close-btn" @click="resetModal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M21 1C9.95431 1 1 9.9543 0.999999 21C0.999996 32.0457 9.9543 41 21 41C32.0457 41 41 32.0457 41 21C41 9.95431 32.0457 1.00001 21 1Z">
                            </path>
                        </svg>
                    </button>
                    <h4 class="authorization__title"> Вы были успешно зарегистрированы.</h4> 
                    <p>На указанный в форме e-mail было выслано письмо с информацией о подтверждении регистрации.</p>
                </div>
            </div>
            
            <div class="bxmaker-authcomplite authorization__box flexbox" v-if="!$root.isShowConfirmEmail && $root.isAuthorized">
                <button class="authorization__closeBtn authorization__closeBtn-recover close-btn" @click="reload">
                    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M21 1C9.95431 1 1 9.9543 0.999999 21C0.999996 32.0457 9.9543 41 21 41C32.0457 41 41 32.0457 41 21C41 9.95431 32.0457 1.00001 21 1Z">
                        </path>
                    </svg>
                </button>
                <div class="authorization__signIn active-panel tab-content active auth-complite-box">
                    <svg width="164" height="164" viewBox="0 0 164 164" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M68.3333 88.8333C41.9635 88.8333 20.5 110.29 20.5 136.667C20.5 140.439 23.5545 143.5 27.3333 143.5C31.1122 143.5 34.1667 140.439 34.1667 136.667C34.1667 117.827 49.4938 102.5 68.3333 102.5C87.1728 102.5 102.5 117.827 102.5 136.667C102.5 140.439 105.554 143.5 109.333 143.5C113.112 143.5 116.167 140.439 116.167 136.667C116.167 110.29 94.7032 88.8333 68.3333 88.8333ZM54.667 47.8332C54.667 55.3703 60.7965 61.4998 68.3337 61.4998C75.8708 61.4998 82.0003 55.3703 82.0003 47.8332C82.0003 40.296 75.8708 34.1665 68.3337 34.1665C60.7965 34.1665 54.667 40.296 54.667 47.8332ZM41 47.8333C41 32.759 53.259 20.5 68.3333 20.5C83.4077 20.5 95.6667 32.759 95.6667 47.8333C95.6667 62.9077 83.4077 75.1667 68.3333 75.1667C53.259 75.1667 41 62.9077 41 47.8333ZM148.659 38.6493L130.824 59.1493C129.533 60.6321 127.674 61.4863 125.706 61.5H125.665C123.718 61.5 121.866 60.6731 120.574 59.2245L111.076 48.6123C108.561 45.797 108.801 41.4783 111.609 38.9636C114.431 36.4421 118.75 36.6813 121.258 39.4966L125.59 44.3415L138.341 29.684C140.822 26.8276 145.133 26.5338 147.983 29.0143C150.832 31.488 151.133 35.8066 148.659 38.6493Z" fill="#F3A601"/>
                    </svg>
                    Вы успешно авторизовались
                </div>
            </div>
            
            <div class="authorization authorization-message authorization__widnow" style="display: block;"  v-if="$root.data.isConfirmedEmail"  >
                <div class="authorization__box">
                    <button class="authorization__closeBtn authorization__closeBtn-recover close-btn" @click="resetModal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M21 1C9.95431 1 1 9.9543 0.999999 21C0.999996 32.0457 9.9543 41 21 41C32.0457 41 41 32.0457 41 21C41 9.95431 32.0457 1.00001 21 1Z">
                            </path>
                        </svg>
                    </button>
                    <h4 class="authorization__title"> Здравствуйте {{$root.userName}}! Вы зарегестрированы. </h4> 
                </div>
            </div>
            
            <BXmakerAuthUser v-show="$root.actionTypeIsAuth && !$root.isAuthorized && !$root.data.isConfirmedEmail"/>
             
            <BXmakerAuthuserphoneEnterReg v-show="$root.actionTypeIsReg && !$root.isAuthorized && this.$root.isEnabledRegister && !$root.data.isConfirmedEmail" />
            
            <BXmakerAuthuserphoneEnterForget v-show="$root.actionTypeIsForget && !$root.isAuthorized && !$root.data.isConfirmedEmail" />                        
           
        </div>
    `,
});