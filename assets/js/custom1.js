$(document).ready(function(){
    $(".top").wrapAll('<div class="wrap">');
    $('.second-section').wrapAll('<div class="wrap">');

    $(".wrap").css('padding','40px 0px 40px 0px');
    $(".wrap").append('<div style="clear:both">');
    $('.wrap').css('border-bottom','solid 2px #868686');


    $('.primary-container').css('float','none');
    $('.ndc-sub .form-group').first().css('float','left');
    $('.ndc-sub:nth-child(2)').css('float','left');

});