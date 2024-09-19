BX.Vue.component('BXmakerAuthUserEnterRegByMessenger', {
    name: 'BXmakerAuthUserEnterRegByMessenger',
    props: {
        telegramLink: String,
        viberLink: String
    },
    methods: {
        authMessendgers(code, ajaxUrl){
            setInterval(function () {
                $.post( ajaxUrl,
                    {
                        CODE: code
                    },
                    function( data ) {
                        if(data > 0) {
                            window.location.reload(true);
                        }
                    }
                );
            }, 500)
        }
    },
    mounted() {
        // Вызываем метод при монтировании компонента
    },
    template: `
            <div class="authorization__form messangers-authorizations" :authcode="$root.data.authcode">
                <div class="notify-btns">
                    <a :href="$root.data.telegramLink" class="notify__button telegram" target="_blank" @click="authMessendgers($root.data.authcode, $root.data.ajaxAuthUrl)" >
                        Перейти в Telegram
                    </a>
                    <a :href="$root.data.viberLink" class="notify__button viber" target="_blank" @click="authMessendgers($root.data.authcode, $root.data.ajaxAuthUrl)" >
                        Перейти в Viber
                    </a>
                </div>
            </div>
        `,
});
