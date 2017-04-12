$(document).ready(function() {

  //animation
  $('a[href^="#"]').click(function(){
    var target = $(this).attr('href');
    $('html, body').animate({scrollTop: $(target).offset().top}, 800);
    return false;
  });

    //sidebar initiat
    var elm = document.querySelector('#main-header');
    var ms = new MenuSpy(elm);

});
