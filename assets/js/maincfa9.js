( function () {

var htmlDiv = document.getElementById("rs-plugin-settings-inline-css"); var htmlDivCss="";
if(htmlDiv) {
    htmlDiv.innerHTML = htmlDiv.innerHTML + htmlDivCss;
}else{
    var htmlDiv = document.createElement("div");
    htmlDiv.innerHTML = "<style>" + htmlDivCss + "</style>";
    document.getElementsByTagName("head")[0].appendChild(htmlDiv.childNodes[0]);
}

setREVStartSize({c: '#rev_slider_2_1', responsiveLevels: [1240,1024,778,480], gridwidth: [1240,1024,778,480], gridheight: [868,768,960,720], sliderLayout: 'fullscreen', fullScreenAutoWidth:'off', fullScreenAlignForce:'off', fullScreenOffsetContainer:'', fullScreenOffset:''});

var revapi2,
    tpj;
document.addEventListener("DOMContentLoaded", function() {
    tpj = jQuery;	if(tpj("#rev_slider_2_1").revolution == undefined){
        revslider_showDoubleJqueryError("#rev_slider_2_1");
    }else{
        revapi2 = tpj("#rev_slider_2_1").show().revolution({
            sliderType:"standard",
            jsFileLocation:"//w2.themedemo.co/coca/wp-content/plugins/revslider/public/assets/js/",
            sliderLayout:"fullscreen",
            dottedOverlay:"none",
            delay:9000,
            navigation: {
                keyboardNavigation:"off",
                keyboard_direction: "horizontal",
                mouseScrollNavigation:"off",
                mouseScrollReverse:"default",
                onHoverStop:"off",
                touch:{
                    touchenabled:"on",
                    touchOnDesktop:"off",
                    swipe_threshold: 75,
                    swipe_min_touches: 1,
                    swipe_direction: "horizontal",
                    drag_block_vertical: false
                }
            },
            responsiveLevels:[1240,1024,778,480],
            visibilityLevels:[1240,1024,778,480],
            gridwidth:[1240,1024,778,480],
            gridheight:[868,768,960,720],
            lazyType:"none",
            shadow:0,
            spinner:"spinner2",
            stopLoop:"off",
            stopAfterLoops:-1,
            stopAtSlide:-1,
            shuffle:"off",
            autoHeight:"off",
            fullScreenAutoWidth:"off",
            fullScreenAlignForce:"off",
            fullScreenOffsetContainer: "",
            fullScreenOffset: "",
            disableProgressBar:"on",
            hideThumbsOnMobile:"off",
            hideSliderAtLimit:0,
            hideCaptionAtLimit:0,
            hideAllCaptionAtLilmit:0,
            debugMode:false,
            fallbacks: {
                simplifyAll:"off",
                nextSlideOnWindowFocus:"off",
                disableFocusListener:false,
            }
        });
        var fullRev = revapi2,
            totalSlides,
            activeSlide,
            leftArrow,
            rightArrow,
            numberText;

        var setText = function(activeSlide, totalSlides){
            var url_thumb,
                totalSlides = totalSlides,
                activeIndexLeft, activeIndexRight;

            if(activeSlide <= 1) {
                leftArrow.find('.left').text(totalSlides);
                leftArrow.find('.right').text(totalSlides);
            }
            else {
                leftArrow.find('.left').text(activeSlide-1);
                leftArrow.find('.right').text(totalSlides);
            }
            if(activeSlide == totalSlides) {
                rightArrow.find('.left').text(1);
                rightArrow.find('.right').text(totalSlides);
            }
            else {
                rightArrow.find('.left').text(activeSlide+1);
                rightArrow.find('.right').text(totalSlides);
            }
        }

        fullRev.bind('revolution.slide.onloaded', function(e, data) {
            totalSlides = fullRev.revmaxslide();
            leftArrow = jQuery('.left-arrow');
            rightArrow = jQuery('.right-arrow');
            leftArrow.append('<div class="number"><div class="left"></div><div class="middle"></div><div class="right"></div></div><div class="arrow"></div>');
            rightArrow.append('<div class="arrow"></div><div class="number"><div class="left"></div><div class="middle"></div><div class="right"></div></div>');
            setText(activeSlide, totalSlides);
        });

        fullRev.bind('revolution.slide.onchange', function(e, data) {
            activeSlide = fullRev.revcurrentslide();
            setText(activeSlide, totalSlides);
        });	}

});	/*ready*/


var htmlDivCss = ' #rev_slider_2_1_wrapper .tp-loader.spinner2{ background-color: #FFFFFF !important; } ';
var htmlDiv = document.getElementById('rs-plugin-settings-inline-css');
if(htmlDiv) {
    htmlDiv.innerHTML = htmlDiv.innerHTML + htmlDivCss;
}
else{
    var htmlDiv = document.createElement('div');
    htmlDiv.innerHTML = '<style>' + htmlDivCss + '</style>';
    document.getElementsByTagName('head')[0].appendChild(htmlDiv.childNodes[0]);
}







function revslider_showDoubleJqueryError(sliderID) {
    var errorMessage = "Revolution Slider Error: You have some jquery.js library include that comes after the revolution files js include.";
    errorMessage += "<br> This includes make eliminates the revolution slider libraries, and make it not work.";
    errorMessage += "<br><br> To fix it you can:<br>&nbsp;&nbsp;&nbsp; 1. In the Slider Settings -> Troubleshooting set option:  <strong><b>Put JS Includes To Body</b></strong> option to true.";
    errorMessage += "<br>&nbsp;&nbsp;&nbsp; 2. Find the double jquery.js include and remove it.";
    errorMessage = "<span style='font-size:16px;color:#BC0C06;'>" + errorMessage + "</span>";
    jQuery(sliderID).show().html(errorMessage);
}

} )();
