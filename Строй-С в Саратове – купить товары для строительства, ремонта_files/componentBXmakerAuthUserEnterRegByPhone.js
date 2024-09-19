BX.Vue.component('BXmakerAuthUserEnterRegByPhone', {
    name: 'BXmakerAuthUserEnterRegByPhone',
    data() {
        return {};
    },
    computed: {

    },
    methods: {
        onChangePhone(data){
            this.$root.setPhone(data.formattedValue);
        },
        onChangeFIO(data){
            this.$root.setFIO(data.formattedValue);
        },
        onEnterPhone() {
            this.$emit('clickConfirmation');
        },
        onEnterFIO() {
            this.$emit('clickConfirmation');
        },

    },
    updated() {
    },
    template: `
            <div class="authorization__form">
            
                    <BXmakerAuthuserphoneInput 
                        :title="$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_REG_FORM_FIO" 
                        :value="$root.fio" 
                        @onInput="$root.setFIO" 
                        @onEnter="onEnterFIO"   
                        name="FIO" 
                        ref="fio"
                    />
            
<!--                     v-if="$root.isEnabledPhoneMask"-->
                    <BXmakerAuthuserphoneInputPhone
                        :title="$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_REG_FORM_PHONE"
                        :value="$root.phone"
                        @onChange="onChangePhone"
                        @onEnter="onEnterPhone"
                        name="PHONE"
                        :defaultCountry="$root.phoneMaskDefaultCountry"
                        :countryTopList="$root.phoneMaskCountryTopList"
                    />

                    <BXmakerAuthuserphoneInput v-else
                        :title="$root.localize.BXMAKER_AUTHUSERPHONE_ENTER_REG_FORM_PHONE"
                        :value="$root.phone"
                        @onInput="$root.setPhone"
                        @onEnter="onEnterPhone"
                        name="PHONE"
                    /> 
                    
                    <BXmakerAuthuserphoneMessage :message="$root.message" :error="$root.error" />       
            </div>
        `,
});