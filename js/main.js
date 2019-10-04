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

    //상품상세 이미지 변경
    var $productPictures = $('.product_pictures'),
        $bigImg = $productPictures.find('.big_img'),
        $thumbImgList =$productPictures.find('.thumb_img li');  

        /*
        리스트를 클릭하면 
        그 요소에 active 추가한다.
        클릭한 그 요소의 자식요소 img의 data-target속성의 값을 확인해서
        큰 이미지의 경로를 수정해야한다.
        */
        $thumbImgList.click(function(){      
            $(this).addClass('active').siblings().removeClass('active');
            var targetImgPath = $(this).find('img').attr('data-target');
            $bigImg.attr('src','./images/'+targetImgPath);
    });

    //상품 수량 가격 변경
    var $quantity = $('.quantity'),
        $unitprice = $quantity.attr('data-unitprice'),
        $qtyBtn = $quantity.find('span'),
        $qtyInput = $quantity.find('input'),
        $targetTotal = $('.total_price .price');

        /*
        $qtyBtn클릭했을때 그 요소가 class명 plus가 있다면
        또 그게 참이면(플러스를 클릭했으면) 
        $qtyInput value 기존값에서 1 증가
        거짓이면(마이너스를 클릭했으면)
        $qtyInput value 기존값에서 1차감
        */
        $qtyBtn.click(function(){
            var currentCount = $qtyInput.val();
            if($(this).hasClass('plus')){                    
                $qtyInput.val(++currentCount);
            }else{
                if(currentCount>1){
                    $qtyInput.val(--currentCount);
                }
            }
        //바뀐수량*단가 -> 변수total에 저장. 그리고 그걸 .price값으로 변경
        var total = (currentCount*$unitprice).toLocaleString('en');
        $targetTotal.text(total+"$");
    });//$qtyBtn.click

        //category filter
        $(function() {
            $( ".price_range" ).slider({
              range: true,
              min: 0,
              max: 100,
              values: [ 10, 500 ],
              slide: function( event, ui ) {
                $( "#from" ).val( "$" + ui.values[ 0 ] );
                $("#to").val("$" + ui.values[ 1 ] );
              }
            });
            $('#from').val($(".price_range").slider("values",0));
            $('#to').val($(".price_range").slider("values",1));
        });

}); //document ready function