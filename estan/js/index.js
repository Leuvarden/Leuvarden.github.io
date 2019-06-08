let newsCount = isMobileDevice() ? 1 : 4;

var slider = $('#lightSlider1').lightSlider({
    item: newsCount,
    loop: true,
    controls: false,
    pager: false,
});

var sliderAllNews = $('#lightSlider2').lightSlider({
    item: newsCount,
    loop: true,
    controls: false,
    pager: false,
});

//golden hack for all my shitty code
setTimeout(() => {
    $('#tabContent2').removeClass('d-block').addClass('d-none');
}, 0)

$('#prevButton1').on('click', () => {
    slider.goToPrevSlide();
});
$('#nextButton1').on('click', () => {
    slider.goToNextSlide();
});

$('#prevButton2').on('click', () => {
    sliderAllNews.goToPrevSlide();
});
$('#nextButton2').on('click', () => {
    sliderAllNews.goToNextSlide();
});

$('#tabControl1').on('click', () => {
    $('#tabContent1').removeClass('d-none').addClass('d-block');
    $('#tabContent2').removeClass('d-block').addClass('d-none');

    $('#tabButtons1').removeClass('d-none').addClass('d-block');
    $('#tabButtons2').removeClass('d-block').addClass('d-none');

    $('#tabControl1').addClass('active');
    $('#tabControl2').removeClass('active');
})

$('#tabControl2').on('click', () => {
    $('#tabContent2').removeClass('d-none').addClass('d-block');
    $('#tabContent1').removeClass('d-block').addClass('d-none');

    $('#tabButtons2').removeClass('d-none').addClass('d-block');
    $('#tabButtons1').removeClass('d-block').addClass('d-none');

    $('#tabControl2').addClass('active');
    $('#tabControl1').removeClass('active');
})

if (isMobileDevice()) {
    $('#tabControl1').text('Новости');
}

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};