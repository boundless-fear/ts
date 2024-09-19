BX.Vue.mutateComponent('BXmakerAuthuserphoneConsent',
    {
        props: {
            button: {
                type: String,
                default: ' - '
            },
            text: {
                type: [String, Boolean],
                default: false
            },
            isReceived: {
                type: Boolean,
                default: false,
            }
        },
        data: function () {
            return {
                policy: '',
                isShowPopup: false,
            };
        },
        computed: {
            localize() {
                return BX.Vue.getFilteredPhrases('BXMAKER_AUTHUSERPHONE_CORE_CONSENT_');
            },
            label() {
                return this.localize.BXMAKER_AUTHUSERPHONE_CORE_CONSENT_LABEL.replace(/#/, this.policy)
            }
        },
        methods: {
            onAgree() {
                this.closePopup();
                this.$emit('onAgree')
            },
            onDisagree() {
                this.closePopup();
                this.$emit('onDisagree')
            },
            showPopup() {
                this.isShowPopup = true;
                document.body.classList.add("bxmaker-authuserphone-consent-popup-overflow-hidden");
                this.$emit('onPopup', true);
            },
            closePopup() {
                this.isShowPopup = false;
                document.body.classList.remove("bxmaker-authuserphone-consent-popup-overflow-hidden");
                this.$emit('onPopup', false);
            }
        },
        template: `
            <div class="flexbox authorization__policity">
                <input type="checkbox" value="Y" style="display: none" name="consentReceived" :checked="isReceived"  />
                {{label}} <span class="authorization__policityBtn policityBtn">политикой конфиденциальности </span>
                <div class="bxmaker-authuserphone-consent-popup" v-if="isShowPopup">                   
                        <div class="bxmaker-authuserphone-consent-popup__container">
                            <div class="bxmaker-authuserphone-consent-popup__title">{{localize.BXMAKER_AUTHUSERPHONE_CORE_CONSENT_POPUP_TITLE}}</div>
                            <div class="bxmaker-authuserphone-consent-popup__text" v-html="text"></div>
                            <div class="bxmaker-authuserphone-consent-popup__action">
                                <BXmakerAuthuserphoneButton :white="true"  @onClick="onDisagree" :title="localize.BXMAKER_AUTHUSERPHONE_CORE_CONSENT_POPUP_BUTTON_DISAGREE" class="bxmaker-authuserphone-consent-popup__disagree" />
                                <BXmakerAuthuserphoneButton  @onClick="onAgree" :title="localize.BXMAKER_AUTHUSERPHONE_CORE_CONSENT_POPUP_BUTTON_AGREE" />
                            </div>
                        </div>
                </div>                 
            </div>
        `,
    });