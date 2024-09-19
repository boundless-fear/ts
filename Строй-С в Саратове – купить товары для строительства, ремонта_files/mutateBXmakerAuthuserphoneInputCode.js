BX.Vue.mutateComponent('BXmakerAuthuserphoneInputCode', {
    props: {
    },
    data: function () {
        return {
        };
    },
    computed: {

    },
    methods: {

    },
    template: `
        <div class="authorization__inputBox " :class="classes" >
            <div>
                <input type="otp" name="otp" @focus="onFocus" @blur="onBlur" 
                @input="onInput" 
                @keydown="onKeydown" 
                :value="value ? value : ''" 
                autocomplete="off" 
                ref="input" 
                class="authorization__input"
                :maxlength="maxLength">
                
                <BXmakerAuthuserphoneLoader v-if="loader" />
                
            </div>
            <div class="bxmaker-authuserphone-input-code__validation" v-if="validationMessage">{{validationMessage}}</div>                
        </div>
    `,
});