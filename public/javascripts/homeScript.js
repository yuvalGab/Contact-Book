$(function (){
    
    //css onload scripts
    $('.main-btns').eq(0).addClass('main-btn-active').css({backgroundColor: '#8df612'});
    $('#icon').animate({opacity: '0.9'}, 3000);
    
    
    //slider code
    var currentSlide = 0;
    $(".mark").eq(0).css({backgroundColor:'#f1f285'});
    
    $('#right-slide').on('click', function() {
        
        if (currentSlide < 2) {
            currentSlide++;
        }else {
            currentSlide = 0;   
        }
        
        sliderCss(currentSlide);
    
    });
    
    $('#left-slide').on('click', function() {
        
        if (currentSlide > 0) {
            currentSlide--;
        }else {
            currentSlide = 2;   
        }
        
        sliderCss(currentSlide);
    
    });
    
    $('.mark').on('click', function() {
        
        currentSlide =  $(this).index(); 
        
        sliderCss(currentSlide);
        
    });
    
    function sliderCss (currentSlide) {
        $('.slide').css({display:'none'});
        $('.slide').eq(currentSlide).css({display:'block'});
        
        $('.mark').css({backgroundColor:'white'});
        $('.mark').eq(currentSlide).css({backgroundColor:'#f1f285'});
        
        var $status = $('#status');
        if (currentSlide == 1) {
            $status.fadeIn(1200);
        } else {
            $status.fadeOut(1);
        }
    }
    
    
    //contacts list code
    $('.name').on('click', function() {
        $(this).next().slideToggle(1000); 
    });
    
    
    //delete all data
    $('#deleteAll').on('click', function ()  {
        var answer = confirm('all data will be lose...');
        if (answer) {
            window.location.href = "/deleteAll";
        }
    });
    
    
});


    
