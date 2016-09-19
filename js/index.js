$(document).ready(function() {

  window.onscroll = function up() {
      document.getElementById('up-button').style.display = (window.pageYOffset > '300' ? 'block' : 'none');
  }

  $('a[href^="#"]').click(function(){
    var target = $(this).attr('href');
    $('html, body').animate({scrollTop: $(target).offset().top}, 800);
    return false;
  });

$('.up').click(function(){
    $('html, body').animate({scrollTop: '0px'}, 800);
      return false;
     });

  $('#feed-slide').dbpasCarousel({
      itemsVisible: 1,
      autoSlide: true,
  });
});
