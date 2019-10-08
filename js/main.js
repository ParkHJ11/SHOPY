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
              create: function( event, ui ) {
                var slideVal = $('.price_filter .price_range span');
                var slideFirstVal = slideVal.filter(':first-of-type');
                var slideLastVal = slideVal.filter(':last-of-type');
                slideVal.html('<i></i>');

                slideFirstVal.find('i').text($(".price_range").slider("values",0)+'$');
                slideLastVal.find('i').text($(".price_range").slider("values",1)+'$');

              },
              slide: function( event, ui ) { //값이 바뀔때 마다 할일
                var slideVal = $('.price_filter .price_range span');
                var slideFirstVal = slideVal.filter(':first-of-type');
                var slideLastVal = slideVal.filter(':last-of-type');
                slideVal.html('<i></i>');

                $( "#from" ).val( "$" + ui.values[ 0 ] );
                $("#to").val("$" + ui.values[ 1 ] );
                slideFirstVal.find('i').text(ui.values[0]+'$');
                slideLastVal.find('i').text(ui.values[1]+'$');
              }
            });
            $('#from').val($(".price_range").slider("values",0));
            $('#to').val($(".price_range").slider("values",1));

            $('#from').change(function(){
                var userValue = $(this).val();
                $(".price_range").slider("value", 0, userValue);  
                
                var slideVal = $('.price_filter .price_range span');
                var slideFirstVal = slideVal.filter(':first-of-type');
            
                slideFirstVal.html('<i></i>');
                slideFirstVal.find('i').text(userValue +'$');
            });
            $('#to').change(function(){
                var userValue = $(this).val();
                var slideVal = $('.price_filter .price_range span');
                var slideLastVal = slideVal.filter(':last-of-type');

                $(".price_range").slider("value", 1, userValue);
                slideLastVal.html('<i></i>');
                slideLastVal.find('i').text(userValue +'$');
            });             
        });

        /* 제이쿼리 필터구현
        var sizeFilter = $('.size_filter input');
        var targetList = $('.new_arrivals_list li');

        sizeFilter.click(function(){
            var targetValue = [];
            //input:checked
            sizeFilter.filter(':checked').each(function(){
                targetValue.push('.'+$(this).val());
            });//each

            //기존배열의 요소들 사이사이에 ', '를 넣어서 하나로 합쳐서 반환
            var targetClass=targetValue.join(', '); 
            targetList.hide();  //기존의 상품목록(li)들은 가려주고
            $(targetClass).show(); //선택한상품만 보여지게
                  
        });//sizeFilter.click
        */

        /* 플러그인 필터구현 */
        // init Isotope
        var $filters = $('.combi_filters input');
        var filters = {};
        var $grid = $('.new_arrivals_list').isotope({
            itemSelector:'.new_arrivals_list > li'
        });

        $filters.click(function(){
            var $button = $(this);

            //get group key
            var $buttonGroup = $button.parent('div');
            var filterGroup = $buttonGroup.attr('data-filter-group');

            //set filter for group
            filters[filterGroup] = $button.val();

            //combine filters
            var filterValue = concatValues(filters);

            //set filter for Isotope
            $grid.isotope({filter: filterValue});

            //all을 클릭했을때 나머지는 uncheck
            if($button.val() == '*'){  //클릭한버튼의 value값이 *일때
                
                $button.parent('div').find('input').prop('checked',false);  //$filters요소들의 check를 전부 풀고
                $button.prop('checked',true); //클릭한요소만 check되도록 
            } else{
                $button.parent('div').find('input').eq(0).prop('checked',false);
            }

        });//filter click

        // flatten object by concatting values
        function concatValues( obj ) { //obj로 배열이 넘어온다.
            var value = '';
            for ( var prop in obj ) {  
            value += obj[ prop ];
            }
            
            console.log(value);
            return value;
        }
        
        //페이지 열자마자 모든 상품리스트가 보여지게
        $grid.isotope({ filter: '*' })

}); //document ready function