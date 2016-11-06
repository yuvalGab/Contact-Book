$(function (){
        
    $('.main-btns').eq(2).addClass('main-btn-active').css({backgroundColor: '#8df612'});
    
    var isError = false;
    
    var $error = $('#error');
    if ($error.text() != '') {
        $error.slideDown(1000);
        isError = true;
    }
    
    var $fieldResult = $('.field-result');
    if ($fieldResult.text() != '' && isError == false) {
        $fieldResult.slideDown(1000);
        $('#edit-btn').fadeIn(5000);
        $('#delete-btn').fadeIn(5000);
    }
    
    $('#delete-btn').on('click', function() {
        window.location.href = "/delete"; 
    });
    
    $('#edit-btn').on('click', function() {
        $('.edit').slideToggle(1500);
        for (var i = 0; i < 6; i++) {
            var data = $('.field-result').eq(i).text();
            $('.edit input').eq(i).val(data);
        }
    });
    
    
});

