BX.Vue.event.$on('BXmakerAuthuserphoneEnterAjaxResponse',(data) => {
    var rand = data.request.rand;

    // переменная определяется в шаблоне компонента
    var obj = window['BXmakerAuthuserphoneEnter' +  rand];

    // доступ к корневому vue
    var instance = obj.instance;

    // обновить капчу омжно так
    // instance.refreshCaptcha();


    if(data.result.response && (data.request.method === 'authByPassword' || data.request.method === 'authByPhone'))
    {
        // если есть response, значит все хорошо и удалось
        // проверить подтвреждение и авторизоваться
        // instance.userName = "dfsf";

        if (data.result.response) {
            const url = localStorage.getItem('wholesaleUrl')
            if (!!url) {
                location.href = url;
            }
        }
    }

    if(data.result.response && data.request.method === 'register')
    {
        // если есть response, значит все хорошо и удалось
        // проверить подтвреждение и зарегистрироваться

        if (!data.request.expandData.confirmByPhone) {
            instance.userName = data.request.fio;
            instance.isAuthorized = false;
            instance.isShowConfirmEmail = true;
        }
    }

    if(data.result.response && data.request.method === 'register' && !data.request.expandData.confirmByPhone)
    {
        debugger;
        // если есть response, значит все хорошо и удалось
        // проверить подтвреждение и зарегистрироваться
        $('.authorization__form-signUp input[type="text"], .authorization__form-signUp input[type="password"]').val('');
        let emailRegText = "На указанный в форме e-mail было выслано письмо с информацией о подтверждении регистрации.";
        $('.authorization__form-signUp .auth-popup__title').after('<div class="auth-popup__description">' + emailRegText + '</div>');
    }

});