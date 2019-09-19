$(function(){
    var $searchBtn = $('.shopping_nav .search_btn'),
        $searchForm = $('header form');

        $searchBtn.click(function(){
            $searchForm.toggleClass('active');
        });

        $('.main_slides ul').bxSlider({
            controls:false,
            mode:'vertical'
        });


}); //document ready function