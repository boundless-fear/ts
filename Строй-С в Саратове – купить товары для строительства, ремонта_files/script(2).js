$(function () {
   $(document).on("submit", 'form[name="CALLBACK"]', function (e) {
      e.preventDefault();
      let $form = $(this);
      if($('.popup__error-callback-phone').is(':visible')){
         return false;
      }else{
         $('#feedback__call__form-send').attr('disabled', 'disabled');
      }
      $.ajax({
         type: 'POST',
         url: $form.attr('action'),
         data: $form.serialize(),
         success: function (data) {
            $('#feedback__call__form-send').removeAttr('disabled');
            let html = "<div>" + data + "</div>";
            let callBackError = $(html).find('.popup-callback-error');
            if(callBackError.length){
               $form.before(callBackError);
            }else{
               $('.complited-popup__box-callback').css('display', 'flex');
               $('.popup__box-callback').css('display', 'none');
            }
         }
      });
   })
});