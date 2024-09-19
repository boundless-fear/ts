BX.Vue.component('BXmakerAuthuserphoneButton',
{
    props: {
        isSignUp: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ' - '
        },
        loader: {
            type: Boolean,
            default: false,
        },
        white: {
            type: Boolean,
            default: false,
        }
    },
    data: function () {
        return {};
    },
    methods: {
        onClick(e) {
            this.$emit('onClick')
        }
    },
    template: `
            <button class="authorization__submit "
            type="button"  
            @click="onClick" 
            tabindex="0" 
            role="button"
            >
                    <BXmakerAuthuserphoneLoader v-if="loader" />           
                    <div class="bxmaker-authuserphone-button__title" v-else >{{title}}</div>                 
            </button>
    `,
});