$(document).on('click', '.video-zayavka-form button[type="submit"]', function(e){
    e.preventDefault();
    const form = $(e.target).closest('form');
    console.log(form)
    const url = form.attr('action');
    const data = new FormData(form[0])
    if($('.video-zayavka-form .authorization__input[required]').val().length > 0) {
        $('.video-zayavka-form .authorization__input[required]').removeClass('field-input')
            $.ajax({
                method: "POST",
                url,
                data,
                processData: false,
                contentType: false,
                success: function() {
                    $('.video-zayavka-form').fadeOut();
                    form[0].reset();
                }
            });
    }
    else{
        $('.video-zayavka-form .authorization__input[required]').addClass('field-input')
    }
})

$('#politicCheck').on('input', function(){
    if(!$('#politicCheck').is(':checked')){
        $('.video-zayavka-form button[type="submit"]').prop('disabled', true)
    }else{
        $('.video-zayavka-form button[type="submit"]').prop('disabled', false)
    }
})

$(document).on('click', '.video-consul__close', function(){
    $('.video-consul-modal').fadeOut();

  }).on('click', '.video-zayavka', function(){
    $('.video-zayavka-form').css('display', 'flex').hide().fadeIn();
    $('.video-consul-modal').fadeOut();
    $('body').addClass('fixed-scroll')

    
    $.mask.definitions['h'] = "[0|1|3|4|5|6|7|9]"
    $('.video-zayavka-form .authorization__input[required]').mask("+7 (h99) 999-99-99");

    if(!$('#politicCheck').is(':checked')){ 
        $('.video-zayavka-form button[type="submit"]').prop('disabled', true)
    }

  }).on('click', '.video-zayavka-form__closeBtn', function(){
    $('.video-zayavka-form').fadeOut();
    $('body').removeClass('fixed-scroll')
})

$(document).ready(function(){
    if($.cookie('showOnlyOne') ){
        $('.video-consul-modal').hide();
    } else {
        $.cookie('showOnlyOne', 'showOnlyOne', { expires: 1 });
        $('.video-consul-modal').css('display', 'flex').hide().fadeIn();
    }
})