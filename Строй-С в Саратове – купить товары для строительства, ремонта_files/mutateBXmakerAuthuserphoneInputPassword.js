BX.Vue.mutateComponent('BXmakerAuthuserphoneInputPassword',
{
    props: {
        title: {
            type: String,
            default: ''
        },
        value: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: 'name'
        },
        validationMessage: {
            type: [String, Boolean],
            default: false
        },
    },
    data: function () {
        return {
            inFocus: false,
            isHover: false,
            isVisible: false,
        };
    },
    computed: {
        classes() {
            let ar = [];
            if (this.inFocus || this.value.length > 0) {
                ar.push('bxmaker-authuserphone-input-password--focus');
            }
            if (this.isHover) {
                ar.push('bxmaker-authuserphone-input-password--hover');
            }

            if (this.validationMessage) {
                ar.push('bxmaker-authuserphone-input-password--invalid');
            }

            return ar;
        },
        type() {
            return (this.isVisible ? 'text' : 'password');
        }

    },
    methods: {
        onFocus() {
            this.inFocus = true;
            this.$emit('onFocus');
        },
        onBlur() {
            this.inFocus = false;
            this.$emit('onBlur');
        },
        onInput(e) {
            this.$emit('onInput', e.target.value)
        },
        onKeydown(e) {
            switch (e.keyCode) {
                case 13://enter
                {
                    this.$emit('onEnter', e.target.value)
                    return;
                }
            }
        },
        onMouseenter() {
            this.isHover = true;
        },
        onMouseleave() {
            this.isHover = false;
        },
        onClickVisible() {
            this.isVisible = !this.isVisible;
        },
        // ��������� ������ �� ����
        focus() {
            this.$refs.input.focus();
        }
    },
    template: `
        <div class="authorization__inputBox " :class="classes">
            <label :for="name" class="authorization__label">{{title}}</label>
            <div class="bxmaker-authuserphone-input__custom_field">
                <input :type="type" :name="name" 
                :id="name"
                @focus="onFocus" 
                @blur="onBlur"
                 @input="onInput" 
                 @mouseenter="onMouseenter" 
                 @mouseleave="onMouseleave" 
                 @keydown="onKeydown" 
                 :value="value"
                  autocomplete="off"                    
                  ref="input"
                  class="authorization__input"
                  >
                <span 
                    class="bxmaker-authuserphone-input-password__visible" 
                    :class="{'bxmaker-authuserphone-input-password__visible--active': isVisible}" 
                    @click.prevent.stop="onClickVisible"
                    role="button"
                     />  
            </div>
            <div class="bxmaker-authuserphone-input-password__validation" v-if="validationMessage">{{validationMessage}}</div>                
        </div>
    `,
});