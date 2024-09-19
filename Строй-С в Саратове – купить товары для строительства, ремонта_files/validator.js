const isValid = (input, regEx) => {
    let value = $(input).val().trim();
    let isRequired = $(input).prop('required');
    // Если поле обязательное и оно пусто тогда возвращаем ложь
    if(isRequired && !value) return false;
    // Если поле не обязательное и оно пусто тогда возвращаем истину
    if(!isRequired && !value) return true;
    // Иначе вернуть результать поиска по регулярному выражению
    return !value.search(regEx);
}

const validateForm = async (elements) => {
    return await new Promise((resolve, reject) => {
        $(elements).each((index, element) => {
            if(!validateInput(element)) return reject('validate fail');
        });
        return resolve();
    });
}

/**
 *
 * @param e может принимать как элемент DOM так и событие
 * @returns {boolean}
 */
const validateInput = (e) => {
    let element = e.target || e;
    let regEx = {
        digits: /^\d{12}$/,
        nineDigits: /^\d{9}$/,
        rusMailbox: /^\d{6}$/,
        moreDigits: /^\d+$/,
        cyrillic: /^[А-Яа-я]$/,
        space: /\s/,
        word: /^[А-Яа-яA-Za-z\s]{3,}$/,
        text: /.+/,
        phone: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
        email: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    }
    let hasError = false;

    if(isValid(element, regEx[$(element).attr('is')])) {
        hideError($(element).attr('id'));
        return true
    } else {
        showError($(element).attr('id'));
        return false;
    }
};

const showError = (name) => {
    $('label.error[for="' + name + '"]').show();
}
const hideError = (name) => {
    $('label.error[for="' + name + '"]').hide();
}

$('.popup__input').on('change', (event)=>{
    validateInput(event);
});

$('.lk__input').on('change', (event)=>{
    validateInput(event);
});

