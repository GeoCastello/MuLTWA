$(document).ready(function(){

    $('#toggle').on('click', function () {
        $('#form_content').toggleClass('toggleForm');
        $('#carousel').toggleClass("col-lg-12 col-lg-9 col-xs-12 col-xs-6");
        
    });

})