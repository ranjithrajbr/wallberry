
( function( $ ) {

    'use strict';

    $(document).ready(function(){

        $('ul.tabs li').click(function(){
            var tab_id = $(this).attr('data-tab');

            $('ul.tabs li').removeClass('current');
            $('.tab-content').removeClass('current');
            $('.tab-content').fadeOut("fast");
            $(this).addClass('current');
            $("#"+tab_id).addClass("current");

            $('html, body').animate({scrollTop:0}, 400);

            setTimeout(function(){

                $("#"+tab_id).fadeIn("fast");
            }, 1000);
        })

    });


    $('.cs-post__content .woocommerce .showlogin ').on('click', function (){
        $('.cs-post__content .woocommerce .woocommerce-form-login').slideToggle();
    });

    $('.cs-post__content .woocommerce .showcoupon ').on('click', function (){
        $('.cs-post__content .woocommerce .woocommerce-form-coupon').slideToggle();
    });

    $(".wc_payment_method input[type=radio]").change(function(){

            $(this).parents('.wc_payment_methods').each(function(){
                $(this).find('.payment_box').slideUp();
            })

            $(this).parent('.wc_payment_method').find('.payment_box').slideDown();
    });

    // $('.woocommerce-account-fields .create-account .checkbox ').on('click', function (){
    //     $('.woocommerce-account-fields .create-account-two').slideDown();
    // });

    $(".woocommerce-account-fields .create-account .checkbox ").bind('change', function(){

        $(this).parents('.woocommerce-account-fields').find('.create-account-two').slideToggle();

    });

} )( jQuery );