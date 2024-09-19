BX.Vue.component('BXmakerAuthUserTabsReg', {
    name: 'BXmakerAuthUserTabsReg',
    data: function () {
        return {
            tabs: [
                {
                    id: 'messenger',
                    title: this.$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_TAB_MESSANGERS,
                    icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 4.5335V4.5335C2 4.9335 2.2 5.26683 2.53333 5.5335L6.53333 8.26683C7.46667 8.86683 8.6 8.86683 9.53333 8.26683L13.5333 5.60016C13.8 5.26683 14 4.9335 14 4.5335V4.5335C14 3.86683 13.4667 3.3335 12.8 3.3335H3.2C2.53333 3.3335 2 3.86683 2 4.5335Z" stroke="#9B9B9C" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2 4.66699V11.3337C2 12.067 2.6 12.667 3.33333 12.667H12.6667C13.4 12.667 14 12.067 14 11.3337V4.66699" stroke="#9B9B9C" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2.39258 12.2751L6.45525 8.2124" stroke="#9B9B9C" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9.57422 8.24023L13.6089 12.2749" stroke="#9B9B9C" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>`
                },
                {
                    id: 'phone',
                    title: this.$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_TAB_PHONE,
                    icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.23678 8.76274C6.45678 7.98274 5.86878 7.10941 5.47811 6.22341C5.39545 6.03608 5.44411 5.81674 5.58878 5.67208L6.13478 5.12674C6.58211 4.67941 6.58211 4.04674 6.19145 3.65608L5.40878 2.87341C4.88811 2.35274 4.04411 2.35274 3.52345 2.87341L3.08878 3.30808C2.59478 3.80208 2.38878 4.51474 2.52211 5.22141C2.85145 6.96341 3.86345 8.87074 5.49611 10.5034C7.12878 12.1361 9.03611 13.1481 10.7781 13.4774C11.4848 13.6107 12.1974 13.4047 12.6914 12.9107L13.1254 12.4767C13.6461 11.9561 13.6461 11.1121 13.1254 10.5914L12.3434 9.80941C11.9528 9.41874 11.3194 9.41874 10.9294 9.80941L10.3274 10.4121C10.1828 10.5567 9.96345 10.6054 9.77611 10.5227C8.89011 10.1314 8.01678 9.54274 7.23678 8.76274Z" stroke="#9B9B9C" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>`
                },
                {
                    id: 'email',
                    title: this.$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_TAB_EMAIL,
                    icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 4.53325V4.53325C2 4.93325 2.2 5.26659 2.53333 5.53325L6.53333 8.26659C7.46667 8.86659 8.6 8.86659 9.53333 8.26659L13.5333 5.59992C13.8 5.26659 14 4.93325 14 4.53325V4.53325C14 3.86659 13.4667 3.33325 12.8 3.33325H3.2C2.53333 3.33325 2 3.86659 2 4.53325Z" stroke="#9B9B9C" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2 4.6665V11.3332C2 12.0665 2.6 12.6665 3.33333 12.6665H12.6667C13.4 12.6665 14 12.0665 14 11.3332V4.6665" stroke="#9B9B9C" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2.39258 12.2746L6.45525 8.21191" stroke="#9B9B9C" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9.57422 8.23999L13.6089 12.2747" stroke="#9B9B9C" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>`
                },
            ]
        };
    },

    props: {
        activeTab: {
            type: String,
            default: 'messenger'
        },
    },
    methods: {
        toggleActiveTab(id) {
            this.$emit('change', id);
            switch(id) {
                case 'phone':
                    $('.auth-popup__description').text('Войдите с помощью телефона и кода подтверждения')
                    break;
                case 'messenger':
                    $('.auth-popup__description').text('Войдите с помощью Telegram или Viber')
                    break;
                case 'email':
                    $('.auth-popup__description').text('Войдите с помощью почты и пароля')
                    break;
              }
        },
    },
    mounted() {
    },
    template: `
        <div class="bxmaker-authuserphone-enter-auth-by-messangers flexbox">
            <div class="auth-popup__tabs" style="display: flex">
                   <BXmakerAuthuserphoneLink v-for="tab in tabs" :key="tab.id" @onClick="toggleActiveTab(tab.id)" :class="{ 'active_tab': activeTab === tab.id }" class="auth-popup__tab">
                       <div v-html="tab.icon" />
                       {{tab.title}}
                   </BXmakerAuthuserphoneLink>
            </div>
   
        </div>
    `,
});