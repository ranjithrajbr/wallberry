/* SCRIPT.JS */
/* --------------------------------------------------------------------------------------- */
/* This is main JS file that contains custom rules used in this template */
/* --------------------------------------------------------------------------------------- */
/* Template Name: Coca */
/* Version: 1.1.0 Initial Release */
/* Build Date: 20.04.2018 */
/* Author: TrueThemes */
/* Website: */
/* Copyright: (C) */
/* --------------------------------------------------------------------------------------- */
/* ------------------------------------------- */
/* TABLE OF CONTENTS: */
/* ------------------------------------------- */
/*
  1. PAGE CALCULATIONS
  2. BACKGROUND
  3. FULLHEIGHT BLOCK
  4. BANNER SCROLL BUTTON
  5. VIDEO IFRAME
  6. VIDEO HEIGHT
  7. MAIN MENU
  8. HALF BG
  9. COMING SOON
  10. PORTFOLIO
  11. PORTFOLIO TIMELINE LIST
  12. PORTFOLIO TIMELINE IMAGES
  13. PORTFOLIO CATEGORY
  14. PORTFOLIO FILMSTRIP SLIDER
  15. FILTER MENU
  16. FILTER BOTTOM
  17. FILTER TOP
  18. FILTER CONTENT
  19. PROJECT PARALLAX
  20. PROJECT SPLITTED
  21. PROJECT BEFORE AFTER
  22. POPUP
  23. SWIPER SLIDER
  24. ACCORDION
  25. WOOCOMMERCE PRODUCT QUANTITY
  26. CHECK IS SCROLLER INTO VIEW
  27. ANIMATE BANNER
  28. PARALLAX FOR BANNER
  29. PRELOADER
  30. LINK CLICK
  31. LOAD MORE
  32. WINDOW LOAD
  33. WINDOW RESIZE
  34. WINDOW SCROLL
  35. PAGE CALCULATIONS INIT
*/
/* ------------------------------------------- */

;(function ($, window, document) {
  'use strict';

  var swipers = [],
    isotopeGridVar,
    isotopeMasonryVar,
    pageLoad = false;

  var lgBPoint = 1399,
    mdBPoint = 1199,
    smBPoint = 991,
    xsBPoint = 767,
    _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);

  /* ------------------------------------------- */
  /* PAGE CALCULATIONS */
  /* ------------------------------------------- */
  if (typeof pageCalculations !== 'function') {
    var winW,
      winH,
      winS,
      pageCalculations,
      documentHeight,
      $html,
      latestKnownScrollY,
      lastKnownScrollY,
      onEvent = window.addEventListener;

    pageCalculations = function (func) {
      if( winW != window.innerWidth ){
        winW = window.innerWidth;
        winH = window.innerHeight;
        winS = $(window).scrollTop();
        documentHeight = $(document).height(),
        $html = $('html');

        latestKnownScrollY = $(window).scrollTop(),
        lastKnownScrollY = latestKnownScrollY;
      }

      if (!func) return;
      onEvent('load', func, true); // window onload
      onEvent('resize', func, true); // window resize
      onEvent('orientationchange', func, false); // window orientationchange
    };

    pageCalculations(function () {
      pageCalculations();
    });
  }

  document.addEventListener('touchstart', function(){}, true);

  /* ------------------------------------------- */
  /* BACKGROUND */
  /* ------------------------------------------- */
  function wpcAddImgBg(imgSelector, parentSelector) {
    var $parent,
      $neighbor,
      $imgDataHidden,
      $imgDataSibling,
      $this;

    if (!imgSelector) {
      return false;
    }

    $(imgSelector).each(function () {
      $this = $(this);
      $imgDataHidden = $this.data('s-hidden');
      $imgDataSibling = $this.data('s-sibling');
      $parent = $this.closest(parentSelector);
      $parent = $parent.length ? $parent : $this.parent();

      if ($imgDataSibling) {
        $parent.addClass('s-back-sibling-switch');
        $neighbor = $this.next();
        $neighbor = $neighbor.length ? $neighbor : $this.next();
        $neighbor.css('background-image', 'url(' + this.src + ')').addClass('s-sibling-switch');
      } else {
        $parent.css('background-image', 'url(' + this.src + ')').addClass('s-back-switch');
      }

      if ($imgDataHidden) {
        $this.css('visibility', 'hidden');
      } else {
        $this.hide();
      }
    });
    return false;
  }

  wpcAddImgBg('.s-loader-switch');

  /* ------------------------------------------- */
  /* FULLHEIGHT BLOCK */
  /* ------------------------------------------- */
  function blockFullheight() {
    var $blockFullheightWrapp = $('.js-fullheight');

    $blockFullheightWrapp.each(function (i, el) {
      var $blockFullheightContent = $(el).find('.js-fullheight__content');
      var blockHeight = $blockFullheightContent.outerHeight(true);

      var maxWHeight = winH - $('.js-top-header').innerHeight() - $('.cs-header--simple').innerHeight() - $('#wpadminbar').innerHeight();
      if(maxWHeight < blockHeight) {
        $(el).css('min-height', blockHeight);
      } else {
        $(el).css('min-height', maxWHeight);
      }
    });
  }

  function blockOnlyFullHeight(wrapper) {
    var $wrapper = $(wrapper);
    var maxWHeight = winH - $('.js-top-header').innerHeight() - $('.cs-header--simple').innerHeight() - $('#wpadminbar').innerHeight();
    $wrapper.outerHeight(maxWHeight);
  }

  function blockFullHeight(wrapper) {
    var $wrapper = $(wrapper);
    var maxWHeight = winH - $('.js-top-header').innerHeight() - $('.cs-header--simple').innerHeight() - $('#wpadminbar').innerHeight() - $('.cs-footer').innerHeight();
    $wrapper.outerHeight(maxWHeight);
  }

  /* ------------------------------------------- */
  /* BANNER SCROLL BUTTON */
  /* ------------------------------------------- */
  $('.js-cs-scroll-down').on('click', function () {
    var $parentBanner = $(this).closest('.cs-banner');

    $('html, body').animate({
      scrollTop: $parentBanner.height() + $parentBanner.offset().top,
    }, 400);
  });


  $('.load-more').on("click", function () {
    var thisLink = $(this);

    thisLink.addClass('loading_img');
    var btn_loading = false;
    function customDelay() {
      $('.rooms').find('.cs-block__item').removeClass('classic_grid_hide');
      thisLink.closest('.rooms').find('.cs-block').isotope('layout');
      $('.t-center').addClass('classic_grid_hide');
    }

    setTimeout(customDelay, 1000);
    setTimeout(function(){
      $('.rooms').find('.cs-block__item').removeClass('testv');
    }, 1150);
  });

  /* ------------------------------------------- */
  /* VIDEO IFRAME */
  /* ------------------------------------------- */
  function videoIframe() {
    // youtube video ready
    var player = [],
      $iframeParent,
      $this;

    // each all iframe
    $('iframe').each(function(i){
      // get parent element
      $this = $(this);
      if ($this.closest('.js-iframe-video').length) {
        $iframeParent = $this.closest('.js-iframe-video');

        player[i] = new YT.Player(this, {
          // callbacks
          events: {
            'onReady': function (event) {
              // mute on/off
              if ($this.data('mute') == 'on') {
                event.target.mute();
              }
            },
            'onStateChange': function (event) {
              switch (event.data) {
                case 1:
                  // start play
                  $this.closest('.js-iframe-video').addClass('play');
                  break;
                case 2:
                  // pause
                  $this.closest('.js-iframe-video').removeClass('play');
                  break;
                case 3:
                  // buffering
                  break;
                case 0:
                  // end video
                  if ($this.data('loop') == 'on' && event.data === YT.PlayerState.ENDED) {
                    player[i].playVideo();
                  } else {
                    $this.closest('.js-iframe-video').removeClass('play');
                  }
                  break;
                default: '-1';
                  // not play
              }
            },
          },
        });

        $iframeParent.find('.js-video-play').on('click', function (event) {
          event.preventDefault();
          $iframeParent.addClass('play');
          player[i].playVideo();
        });

        $iframeParent.find('.js-video-close').on('click', function (event) {
          event.preventDefault();
          $(this).parent('.cs-video').removeClass('play');
          player[i].stopVideo();
        });
      }
    });
  }


  /* ------------------------------------------- */
  /* VIDEO HEIGHT */
  /* ------------------------------------------- */
  function upFullWidthVideo() {
    function isTouchDevice() {
      return 'ontouchstart' in window // works on most browsers
        || navigator.maxTouchPoints; // works on IE10/11 and Surface
    }

    // for video uploaded
    $('.js-iframe-video').each(function () {
      var $video = $(this).find('video, iframe'),
        w = $video.width(),
        h = $video.outerHeight(),
        videoRatio = (w / h).toFixed(2),
        minW = parseInt($(this).width()),
        minH = parseInt($(this).outerHeight()),
        widthRatio = minW / w,
        heightRatio = minH / h,
        newWidth,
        newHeight;

      $video.removeAttr('height').removeAttr('width');

      if (widthRatio > heightRatio) {
        newWidth = minW;
        newHeight = Math.ceil(newWidth / videoRatio);
      } else {
        newHeight = minH;
        newWidth = Math.ceil(newHeight * videoRatio);
      }
      if (minW < newWidth) {
        newWidth = minW;
      }

      $video.width(newWidth + 'px').height(newHeight + 'px');

      if (isTouchDevice() && winW >= '768') {
        // $video.hide();
        $(this).addClass('video-stop');
      } else {
        // $video.show();
        $(this).removeClass('video-stop');
      }
      if (newHeight > minH) {
        $video.css('transform','translateY(' + (-(newHeight - minH) / 2) + 'px)');
      } else {
        $video.css('transform','translateY(0)');
      }

      if (newWidth >= minW) {
        $video.css('left',-(newWidth - minW) / 2);
      } else {
        $video.css('left','0');
      }
    });
  }

  /* ------------------------------------------- */
  /* MAIN MENU */
  /* ------------------------------------------- */
  function openSimpleMenu() {
    $('.js-menu-btn').toggleClass('cs-nav-menu__icon--active');
    $('.js-menu-btn-txt').toggleClass('cs-nav-menu__label--toggle');
    $('.js-header').toggleClass('cs-header--open-menu');
    $('body, html').toggleClass('no-scroll');
    $('.js-header-nav').slideToggle(400);
  }

  /* MAIN MENU BUTTON */
  $('.js-menu-block').on('click', function (e) {
    e.preventDefault();
    menuHeight();
    openSimpleMenu();
  });

  /* STICKY MENU */
  var $stickyElement,
    stickyTopOffset,
    $stickyContainer;

  function stickyOffset() {
    if ($('.js-sticky-header').length) {
      if ($(window).scrollTop() > stickyTopOffset) {
        $stickyContainer.addClass('cs-header--scroll-menu');
      } else {
        $stickyContainer.removeClass('cs-header--scroll-menu');
      }
    }
  }

  function stickyMenu() {
    if ($('.js-sticky-header').length) {
      $stickyElement = $('.js-sticky-header');
      $stickyContainer = $('.js-sticky-container');

      stickyTopOffset = $stickyContainer.offset().top;
      if ($('#wpadminbar').length) {
        stickyTopOffset = stickyTopOffset - $('#wpadminbar').innerHeight();
      }
      stickyOffset();
      window.addEventListener('scroll', function () {
        stickyOffset();
      });
    }
  }

  /* MENU HEIGHT */
  function menuHeight() {
    var menuHeight = winH - $('.js-header-height').innerHeight() - $('#wpadminbar').innerHeight();
    if (!$('.js-header').hasClass('cs-header--scroll-menu')) {
      menuHeight = menuHeight - $('.js-top-header').innerHeight();
    }
    $('.js-filter-menu').css('max-height', menuHeight);
    $('.js-header-nav').css('max-height', menuHeight);
  }

  function menuClear() {
    if (winW > 1024) {
      $('.js-filter-menu').removeAttr('style');
    }
  }
  

  $(window).resize(function () {
    if($(window).width() > 1024){
      $('body, html').removeClass('no-scroll');
      $('.js-header').removeClass('cs-header--open-menu');
    };
});

$(window).on('resize', function (){
    if($(window).width() < 1025){
      if($('.js-header-nav').css('display') == 'block'){
        $('.js-header').addClass('cs-header--open-menu');
      }
    }
  });

  $(window).on('resize', function (){
    if($(window).width() < 1025){
      if($('.js-header-nav').css('display') == 'block'){
        $('body, html').addClass('no-scroll');
      }
    }
  });

  /* ------------------------------------------- */
  /* HALF BG */
  /* ------------------------------------------- */
  $('.cs-half-bg').append('<div class="cs-half-bg__wrapp"></div>');

  /* ------------------------------------------- */
  /* COMING SOON */
  /* ------------------------------------------- */
  function comingSoonTextValue() {
    if ($('.js-cs-timer').length) {
      var $comingSoonItems = $('.js-cs-timer-item');

      $comingSoonItems.each(function () {
        var $thisItems = $(this),
          $thisItemsName = $thisItems.find('.js-cs-timer-name'),
          text = $thisItemsName.data('desktop'),
          mobileText = $thisItemsName.data('mobile');

        if (winW <= xsBPoint) {
          $thisItemsName.text(mobileText);
        } else {
          $thisItemsName.text(text);
        }
      });
    }
  }

  function getTimeRemaining(endTime) {
    var time = Date.parse(endTime) - Date.parse(new Date());
    var seconds = Math.floor((time / 1000) % 60);
    var minutes = Math.floor((time / 1000 / 60) % 60);
    var hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    var days = Math.floor(time / (1000 * 60 * 60 * 24));
    return {
      total: time,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  var cocaTimerInterval;
  function updateClock($clockItem, endTime, updateDays) {
    var time = getTimeRemaining(endTime);
    if (updateDays) {
      time.days = time.days < 0 ? 0 : time.days;
      $clockItem.find('.js-cs-timer-day').text(time.days);
    }
    if (updateDays || time.minutes === 59) {
      time.hours = time.hours < 0 ? 0 : time.hours;
      $clockItem.find('.js-cs-timer-hour').text(('0' + time.hours).slice(-2));
    }
    if (updateDays || time.seconds === 59) {
      time.minutes = time.minutes < 0 ? 0 : time.minutes;
      $clockItem.find('.js-cs-timer-min').text(('0' + time.minutes).slice(-2));
    }
    time.seconds = time.seconds < 0 ? 0 : time.seconds;
    $clockItem.find('.js-cs-timer-sec').text(('0' + time.seconds).slice(-2));

    if (time.total <= 0) {
      clearInterval(cocaTimerInterval);
    }
  }

  if ($('.js-cs-timer').length) {
    var $comingTimer = $('.js-cs-timer');
    $comingTimer.each(function () {
      var $thisComingTimer = $(this),
        endTime = $thisComingTimer.attr('data-end'),
        $comingSoonItems = $thisComingTimer.find('.js-cs-timer-item');
      updateClock($comingSoonItems, endTime, true);
      cocaTimerInterval = setInterval(function () {
        updateClock($comingSoonItems, endTime);
      }, 1000);
    });
  }

  /* ------------------------------------------- */
  /* PORTFOLIO */
  /* ------------------------------------------- */
  function cocaGrid() {
    var block = '.js-cs-block--services, .js-cs-block--books, .js-cs-block--media, .js-cs-block--exhibition, .js-cs-block--team, .js-cs-block--grid, .js-cs-block--category';

    if($(block).length) {
      var $portfolioGrid = $(block),
        $portfolioItem = $portfolioGrid.find('.cs-block__item');

      isotopeGridVar = $portfolioGrid.isotope({
        itemSelector: '.cs-block__item',
        layoutMode: 'fitRows',
      });
    }
  }

  function cocaMasonry() {
    var block = '.js-cs-block--masonry';

    if ($(block).length) {
      var $portfolioMasonry = $(block),
        $portfolioItem = $portfolioMasonry.find('.cs-block__item');

      isotopeMasonryVar = $portfolioMasonry.isotope({
        itemSelector: '.cs-block__item',
        percentPosition: true,
        stamp: '.js-filter-content-block',
      });
    }
  }

  /* ------------------------------------------- */
  /* PORTFOLIO TIMELINE LIST */
  /* ------------------------------------------- */
  function cocaTimelineList() {
    var block = '.js-cs-block--timeline_list';

    if ($(block).length) {
      var $portfolioTimeline = $(block);

      $portfolioTimeline.isotope({
        getSortData: {
          first: '.js-sort-col-1',
          second: '.js-sort-col-2',
          third: '.js-sort-col-3',
          fourth: '.js-sort-col-4',
        },
      });
    }
  }

  $('.js-header-sort-col span').on('click', function (e) {
    $(this).parent('.js-header-sort-col').addClass('active').siblings().removeClass('active');
    var sortingValue = $(this).parent('.js-header-sort-col').attr('data-sort');

    $('.js-cs-block--timeline_list').isotope({
      sortBy: sortingValue,
    });

    e.preventDefault();
  });

  /* ------------------------------------------- */
  /* PORTFOLIO TIMELINE IMAGES */
  /* ------------------------------------------- */
  function timelineImageHeight() {
    setTimeout(function () {
      var timelineWrapper = $('.js-cs-block--timeline_images'),
        timelineContentWrapperHeight = $('.cs-block__item-wrapp--left').height();

      var maxWHeight = winH - $('.js-top-header').innerHeight() - $('.cs-header--simple').innerHeight() - $('#wpadminbar').innerHeight();
      if (timelineContentWrapperHeight < maxWHeight) {
        timelineWrapper.css('height', maxWHeight);
      } else {
        timelineWrapper.css('height', timelineContentWrapperHeight);
      }
    }, 20);
  }

  /* ------------------------------------------- */
  /* PORTFOLIO CATEGORY */
  /* ------------------------------------------- */
  if ($('.js-cs-category').length) {
    var $category = $('.js-cs-category');

    $($category).each(function () {
      var $block = $(this);
      if (!($($block).prev($category).length)) {
        $($block).find('.js-scroll-prev').addClass('hide');
      }
      if (!($($block).next($category).length)) {
        $($block).find('.js-scroll-next').addClass('hide');
      }
    });
  }

  $('.js-scroll-prev').on('click', function () {
    var prevCategory = $(this).closest('.js-cs-category').prev('.js-cs-category').offset().top;

    $('html, body').animate({
      scrollTop: prevCategory,
    }, 1000);
  });

  $('.js-scroll-next').on('click', function () {
    var nextCategory = $(this).closest('.js-cs-category').next('.js-cs-category').offset().top;

    $('html, body').animate({
      scrollTop: nextCategory,
    }, 1000);
  });

  /* ------------------------------------------- */
  /* PORTFOLIO FILMSTRIP SLIDER */
  /* ------------------------------------------- */
  function initSlick() {
    $('.js-slick-filmstrip').each(function (index) {
      var that = $(this);
      var sliderIndex = 'slick-unique-id-' + index;
      that.addClass(sliderIndex + ' initialized').attr('id', sliderIndex);
      var accessibilityVar = parseInt(that.attr('data-key'), 10);
      var arrowsVar = parseInt(that.attr('data-arrows'), 10);
      var autoPlayVar = parseInt(that.attr('data-autoplay'), 10);
      var autoPlaySpeedVar = parseInt(that.attr('data-autoplay-speed'), 10);
      var speedVar = parseInt(that.attr('data-speed'), 10);
      that.slick({
        dots: false,
        slidesToScroll: 1,
        variableWidth: true,
        infinite: false,
        centerMode: false,
        prevArrow: '<a href="#" class="slick-prev"></a>',
        nextArrow: '<a href="#" class="slick-next"></a>',
        accessibility: !!accessibilityVar,
        arrows: !!arrowsVar,
        autoplay: !!autoPlayVar,
        autoplaySpeed: autoPlaySpeedVar,
        speed: speedVar,
      });
      setTimeout(function () {
        that[index].slick.refresh();
      }, 0);
    });
  }

  /* PORTFOLIO FILMSTRIP HEIGHT */
  function filmstripSliderHeight() {
    if ($('.js-cs-block--filmstrip').not('no-footer-content')) {
      var filmstripWrapperHeight = $('.js-cs-block--filmstrip').height(),
        filmstripSlider = $('.js-slick-filmstrip'),
        filmstripDropdown = $('.js-cs-dropdown-menu'),
        filmstripFooterHeight = $('.js-cs-filmstrip-footer').innerHeight();

      filmstripSlider.height(filmstripWrapperHeight - filmstripFooterHeight);
      if (filmstripWrapperHeight - filmstripFooterHeight < 500) {
        filmstripDropdown.height(filmstripWrapperHeight - filmstripFooterHeight);
      }
    }
  }

  /* ------------------------------------------- */
  /* FILTER MENU */
  /* ------------------------------------------- */
  function openTopFilter() {
    $(this).find('i').toggleClass('fa-filter fa-times');
    $('.js-header').toggleClass('cs-header--open-filter-menu');
    $('body, html').toggleClass('no-scroll');
    $('.js-filter-menu').slideToggle(400);
  }

  $('.js-filter-menu-btn').on('click', function (e) {
    e.preventDefault();
    menuHeight();
    openTopFilter();
  });

  $('.js-filter-menu-item').on('click', function (e) {
    $(this).toggleClass('cs-filter-menu__list-item--active');
    e.preventDefault();
  });

  $('.js-filter-menu-filtering').on('click', function (e) {
    var filterValue = [];
    $('.js-filter-menu [data-filter].cs-filter-menu__list-item--active').each(function (i) {
      filterValue[i] = '.' + $(this).attr('data-filter');
    });
    var separator = ',';
    if ($(this).attr('data-filtering-type') == 'all_criteria') {
      separator = '';
    }
    $('.js-cs-block--services, .js-cs-block--books, .js-cs-block--media, .js-cs-block--exhibition, .js-cs-block--team, .js-cs-block--grid, .js-cs-block--masonry').isotope({
      filter: filterValue.join(separator),
    });
    setTimeout(function () {
      openTopFilter();
    }, 100);
    e.preventDefault();
  });

  $('.js-filter-menu-clear').on('click', function (e) {
    $('.js-filter-menu-item').removeClass('cs-filter-menu__list-item--active');
    e.preventDefault();
  });

  /* ------------------------------------------- */
  /* FILTER BOTTOM  */
  /* ------------------------------------------- */
  Element.prototype.hasClass = function(className) {
    return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
  };

  var dropdown = document.querySelectorAll('.js-cs-dropdown');
  var dropdownArray = Array.prototype.slice.call(dropdown, 0);

  dropdownArray.forEach(function (el) {
    var dropdownBtn = el.querySelector('.js-cs-dropdown-btn'),
      dropdownMenu = el.querySelector('.js-cs-dropdown-menu');
    dropdownBtn.onclick = function (event) {
      if (!dropdownMenu.hasClass('cs-filter-bottom__menu--show')) {
        $(this).addClass('cs-filter-bottom__btn--active');
        dropdownMenu.classList.add('cs-filter-bottom__menu--show');
        dropdownMenu.classList.remove('cs-filter-bottom__menu--hide');
        event.preventDefault();
      } else {
        $(this).removeClass('cs-filter-bottom__btn--active');
        dropdownMenu.classList.remove('cs-filter-bottom__menu--show');
        dropdownMenu.classList.add('cs-filter-bottom__menu--hide');
        event.preventDefault();
      }
    };
  });

  $('.js-filter-bottom-item').on('click', function (e) {
    var filterValue = '.' + $(this).attr('data-filter');
    $('.js-filter-bottom-item').removeClass('cs-filter-bottom__item--active');
    $(this).addClass('cs-filter-bottom__item--active');
    $('.js-slick-filmstrip').slick('slickUnfilter');
    $('.js-slick-filmstrip').slick('slickFilter', filterValue);
    $('.js-cs-dropdown-btn').removeClass('cs-filter-bottom__btn--active');
    $('.js-cs-dropdown-menu').removeClass('cs-filter-bottom__menu--show');
    $('.js-cs-dropdown-menu').addClass('cs-filter-bottom__menu--hide');
    e.preventDefault();
  });

  /* ------------------------------------------- */
  /* FILTER TOP */
  /* ------------------------------------------- */
  $('.js-filter-top-item').on('click', function (e) {
    var filterValue = $(this).attr('data-filter');
    if (filterValue !== '*') {
      filterValue = '.' + $(this).attr('data-filter');
    }
    $(this).addClass('cs-filter-top__item--active').siblings('.js-filter-top-item').removeClass('cs-filter-top__item--active');
    var findBlock = $(this).closest('.js-filter-top').next().find('.js-cs-block--services, .js-cs-block--books, .js-cs-block--media, .js-cs-block--exhibition, .js-cs-block--team, .js-cs-block--grid, .js-cs-block--masonry');
    $(findBlock).isotope({
      filter: filterValue,
    });
    e.preventDefault();
  });

  /* ------------------------------------------- */
  /* FILTER CONTENT */
  /* ------------------------------------------- */
  $('.js-filter-content-btn').on('click', function (e) {
    $(this).toggleClass('cs-filter-content__icon--active');
    $(this).closest('.js-filter-content-block').toggleClass('cs-block__item--hide');
    var isotopeBlock = $(this).closest('.js-cs-block--services, .js-cs-block--books, .js-cs-block--media, .js-cs-block--exhibition, .js-cs-block--team, .js-cs-block--grid, .js-cs-block--masonry');
    $(isotopeBlock).isotope('layout');
    e.preventDefault();
  });

  $('.js-filter-content-item').on('click', function (e) {
    var filterValue = $(this).attr('data-filter');
    if (filterValue !== '*') {
      filterValue = '.' + $(this).attr('data-filter');
    }
    $(this).addClass('cs-filter-content__item--active').siblings('.js-filter-content-item').removeClass('cs-filter-content__item--active');
    var findBlock = $(this).closest('.js-cs-block--services, .js-cs-block--books, .js-cs-block--media, .js-cs-block--exhibition, .js-cs-block--team, .js-cs-block--grid, .js-cs-block--masonry');
    $(findBlock).isotope({
      filter: filterValue,
    });
    e.preventDefault();
  });

  /* ------------------------------------------- */
  /* PROJECT PARALLAX */
  /* ------------------------------------------- */
  var Parallax = {
    selector: '.js-parallax-item-bg',
    covers: $([]),
    amount: 0,
    initialized: false,
    start: 0,
    stop: 0,
    initialize: function () {
      var that = this;

      $('.js-parallax-item').each(function (i, hero) {
        var $hero = $(hero),
          $cover = $hero.children('.js-parallax-item-bg'),
          $image = $cover.find('img');

        $hero.find('.js-parallax-item-bg').show();

        if (!$image.length) {
          $image = $cover.children('picture').children('img');
        }

        if ($image.length) {
          $hero.css('height', 'auto');
          var scaleY,
            scale,
            newWidth,
            imageWidth = $image.css('width', 'auto').outerWidth(),
            imageHeight = $image.outerHeight(),
            // heroHeight = $hero.outerHeight(),
            heroHeight = (winH > $hero.outerHeight()) ? winH : $hero.outerHeight() + 30,
            scaleX = winW / imageWidth;
          scaleY = winH / imageHeight;
          scale = Math.max(scaleX, scaleY);
          newWidth = parseInt(imageWidth * scale);

          $image.css({
            top: (heroHeight - imageHeight * scale) / 2,
            width: newWidth,
          });

          $hero.css({
            height: heroHeight,
          });
        }
      });

      // if this is a touch device initialize simple image
      if (_ismobile) {
        $('.js-parallax-block').addClass('cs-det-parallax--touch');
        return;
      }

      documentHeight = $(document).height();
      // documentHeight = $('.js-detail-parallax-item-bg').length * winH;

      // this.stop = documentHeight - winH;
      // this.stop = $('.project-detail-parallax').height();
      this.amount = $('.js-parallax-block').data('parallax-speed');
      this.initialized = true;

      // clean up
      $('.js-parallax-cover').empty();

      $('.js-parallax-item-bg').each(function (i, cover) {
        // grab all the variables we need
        var $cover = $(cover),
          opacity = $cover.css('opacity'),
          $target = $cover.children().not('span'),
          $image = $target.filter('img'),
          $slider = $target.not('img'),
          $clone = $cover.clone(),
          $cloneTarget = $clone.children().not('span'),
          $cloneImage = $cloneTarget.filter('img'),
          $cloneSlider = $cloneTarget.not('img'),
          imageWidth = $image.outerWidth(),
          imageHeight = $image.outerHeight(),
          $hero = $cover.parent(),
          heroOffset = $hero.offset(),
          adminBar = parseInt($html.css('marginTop')),
          amount = that.amount,
          // we may need to scale the image up or down
          // so we need to find the max scale of both X and Y axis
          scaleX,
          scaleY,
          scale,
          newWidth,
          distance,
          speeds = {
            static: 0,
            slow: 0.25,
            medium: 0.5,
            fast: 0.75,
            fixed: 1,
          };

        $hero.css('height', 'auto');
        var heroHeight = (winH > $hero.outerHeight()) ? winH : $hero.outerHeight() + 30;
            // heroHeight = winH,

        $cover.removeAttr('style');
        $clone.data('source', $cover).appendTo('.js-parallax-cover').show();

        $clone.css('height', heroHeight);
        $hero.css('height', heroHeight);

        // let's see if the user wants different speed for different whateva'
        if (typeof parallaxSpeeds !== 'undefined') {
          $.each(speeds, function (speed, value) {
            if (typeof parallaxSpeeds[speed] !== 'undefined') {
              if ($hero.is(parallaxSpeeds[speed])) {
                amount = value;
              }
            }
          });
        }

        scaleX = winW / imageWidth;
        scaleY = (heroHeight + (winH - heroHeight) * amount) / imageHeight;
        scale = Math.max(scaleX, scaleY);
        newWidth = parseInt(imageWidth * scale);
        distance = (winH - heroHeight) * amount;

        // set the new width, the image should have height: auto to scale properly
        $cloneImage.css({
          width: newWidth,
          top: (heroHeight - imageHeight * scale) / 2,
        });

        // if there's a slider we are working with we may have to set the height
        // $cloneSlider.css('height', heroHeight + distance);

        // align the clone to its surrogate
        // we use TweenMax cause it'll take care of the vendor prefixes
        TweenMax.to($clone, 0, {
          y: heroOffset.top - adminBar,
        });

        // prepare image / slider timeline
        var parallax = {
            start: heroOffset.top - winH,
            // end: heroOffset.top + heroHeight,
            end: heroOffset.top + winH,
            timeline: new TimelineMax({
              paused: true,
            }),
          },
          // the container timeline
          parallax2 = {
            start: 0,
            end: documentHeight,
            // end: winH,
            timeline: new TimelineMax({
              paused: true,
            }),
          };

        // move the image for a parallax effect
        parallax.timeline.fromTo($cloneTarget, 1, {
          y: '-=' + (winH + heroHeight) * amount / 2,
        }, {
          y: '+=' + (winH + heroHeight) * amount,
          ease: Linear.easeNone,
          force3D: true,
        });

        // move the container to match scrolling
        parallax2.timeline.fromTo($clone, 1, {
          y: heroOffset.top,
        }, {
          y: heroOffset.top - documentHeight,
          // y: heroOffset.top - winH,
          // y: heroOffset.top - $html.height(),
          ease: Linear.easeNone,
          force3D: true,
        });

        // set the parallax info as data attributes on the clone to be used on update
        $clone
          .data('parallax', parallax)
          .data('parallax2', parallax2);

        // update progress on the timelines to match current scroll position
        that.update();
      });
    },
    update: function () {
      if (_ismobile) {
        return;
      }

      $('.js-parallax-cover .js-parallax-item-bg').each(function (i, cover) {
        var $cover = $(cover),
          parallax = $cover.data('parallax'),
          parallax2 = $cover.data('parallax2'),
          progress = (latestKnownScrollY - parallax.start) / (parallax.end - parallax.start),
          progress2 = (latestKnownScrollY - parallax2.start) / (parallax2.end - parallax2.start);
        if (0 <= progress && 1 >= progress) {
          parallax.timeline.progress(progress);
        }
        if (0 <= progress2 && 1 >= progress2) {
          parallax2.timeline.progress(progress2);
        }
      });
    },
  };

  /* ------------------------------------------- */
  /* PROJECT SPLITTED */
  /* ------------------------------------------- */
  function asideFixed() {
    $('.js-fixed-aside').each(function (index, el) {
      if ($(this).outerWidth() < 0.8 * $(window).outerWidth()) {
        // add animation
        $(this).css('transition', 'transform 500ms');

        var parent = $(this).closest('.js-fixed-parent');

        var parentHeight = parent.outerHeight();
        var itemHeight = $(this).outerHeight();
        var headerHeight = $('.cs-header__wrapp--fixed').outerHeight() + $('#wpadminbar').outerHeight();

        var parentOffset = parent.offset().top;
        var scrollPosition = $(window).scrollTop();
        var positionAsideTop = scrollPosition - (parentOffset - headerHeight) + 30;
        var positionAsideBottom = positionAsideTop - (parentHeight - itemHeight);

        if (positionAsideTop > 0 && (positionAsideBottom < 0)) {
          $(this).css('transform', 'translateY(' + positionAsideTop + 'px)' );
        } else if (positionAsideBottom > 0)  {
          $(this).css('transform', 'translateY(' + (parentHeight - itemHeight) + 'px)' );
        } else {
          $(this).css('transform', 'translateY(0px)' );
        }
      }
    });
  }

  /* ------------------------------------------- */
  /* PROJECT BEFORE AFTER */
  /* ------------------------------------------- */
  function beforeAfter() {
    if($('.ba-slider').length) {
      $('.ba-slider').beforeAfter();
    }
  }

  /* ------------------------------------------- */
  /* POPUP */
  /* ------------------------------------------- */
  $('.popup-details').fancybox({
    arrows: true,
    loop: true,
  });

  /* SHARE POPUP */
  $('[data-share]').on('click',function () {
    var w = window,
        url = this.getAttribute('data-share'),
        title = '',
        w_pop = 600,
        h_pop = 600,
        scren_left = w.screenLeft ? w.screenLeft : screen.left,
        scren_top = w.screenTop ? w.screenTop : screen.top,
        width = w.innerWidth,
        height = w.innerHeight,
        left = ((width / 2) - (w_pop / 2)) + scren_left,
        top = ((height / 2) - (h_pop / 2)) + scren_top,
        newWindow = w.open(url, title, 'scrollbars=yes, width=' + w_pop + ', height=' + h_pop + ', top=' + top + ', left=' + left);
    if (w.focus) {
      newWindow.focus();
    }
    return false;
  });

  /* ------------------------------------------- */
  /* SWIPER SLIDER */
  /* ------------------------------------------- */
  function initSwiper() {
    var attrToSize = {
      'data-lg-slides': lgBPoint,
      'data-md-slides': mdBPoint,
      'data-sm-slides': smBPoint,
      'data-xs-slides': xsBPoint,
      'data-xx-slides': '599',
    };

    function parseSlidesAttrValue(value) {
      var parts = value.split(',');
      if (isNaN(parts[0])) {
        parts[0] = 'auto';
      } else {
        parts[0] = parseInt(parts[0], 10);
      }

      if (!parts[2]) {
        parts[2] = 'horizontal';
      }

      return {
        slidesPerView: parts[0],
        spaceBetween: parseInt(parts[1], 10),
        direction: parts[2],
      };
    }
    function createBreakpoints(container, attrsSizes) {
      var breakpointsObj = {};
      $.each(attrsSizes, function (key, value) {
        if (container.attr(key)) {
          breakpointsObj[value] = parseSlidesAttrValue(container.attr(key));
        }
      });
      return breakpointsObj;
    }
    $('.swiper-container').each(function (index) {
      var $that = $(this);
      var sliderIndex = 'swiper-unique-id-' + index;
      $that.addClass(sliderIndex + ' initialized').attr('id', sliderIndex);
      $that.find('.swiper-pagination').addClass('swiper-pagination-' + sliderIndex);

      var directionVar = $that.attr('data-direction');
      var speedVar = parseInt($that.attr('data-speed'), 10);
      var spaceBetweenVar = parseInt($that.attr('data-space-between'), 10);
      var slidesPerViewVar = parseInt($that.attr('data-slides-per-view'), 10);
      if (isNaN(slidesPerViewVar)) {
        slidesPerViewVar = 'auto';
      }
      var crossFadeVar = parseInt($that.attr('data-fade'), 10);
      if ((crossFadeVar)) {
        crossFadeVar = 'fade';
      } else {
        crossFadeVar = false;
      }
      var loopVar = $that.attr('data-loop');
      var autoPlayOnVar = parseInt($that.attr('data-autoplay-on'), 10);
      var autoPlayDelayVar = parseInt($that.attr('data-autoplay-delay'), 10);

      swipers[sliderIndex] = new Swiper('.' + sliderIndex, {
        initialSlide: 0,
        // General
        direction: directionVar || 'horizontal',
        speed: speedVar,
        loopedSlides: 6,
        // Slides grid
        spaceBetween: spaceBetweenVar,
        slidesPerView: slidesPerViewVar || 1,
        // Grab cursor
        grabCursor: true,
        // Touches
        simulateTouch: true,
        // Loop
        loop: loopVar || false,
        // click thumb
        slideToClickedSlide: true,
        // Breakpoints
        breakpoints: createBreakpoints($that, attrToSize),
        // Pagination
        pagination: {
          el: '.swiper-pagination-' + sliderIndex,
          type: 'bullets',
          clickable: true,
        },
        // effect
        effect: crossFadeVar,
        // Autoplay
        autoplay: {
          enabled: autoPlayOnVar,
          delay: autoPlayDelayVar,
          disableOnInteraction: false,
        },
        // Keyboard Control
        keyboard: {
          enabled: true,
          onlyInViewport: false,
        },
        // for details fullpage arrow
        on: {
          slideChangeTransitionStart: function() {
            arrowImg($that);
          },
          slideChangeTransitionEnd: function() {
            arrowImgClass($that);
          }
        }
      });
      swipers[sliderIndex].update();
    });

    $('.swiper-container').each(function (index) {
      var $that = $(this);
      var sliderIndex = 'swiper-unique-id-' + index;

      var controlTarget = $(this).attr('data-control');
      var idTarget = $('body').find(controlTarget).eq(0).attr('id');
      swipers[sliderIndex].controller.control = swipers[idTarget];

      if ($that.hasClass('js-thumb-slider')) {
        swipers[sliderIndex].params.centeredSlides = true;
      }

      swipers[sliderIndex].update();
    });
  }

  function arrowImgClass(parent) {
    if ($(parent).find('.cs-sliderfull__arrow').length) {
      $($(parent).find('.cs-sliderfull__arrow')).removeClass('running');
    }
  }

  function arrowImg(parent) {
    if ($(parent).find('.cs-sliderfull__arrow').length) {
      $($(parent).find('.cs-sliderfull__arrow')).addClass('running');
      var arrowNext = $(parent).find($('.js-swiper-next'));
      var arrowPrev = $(parent).find($('.js-swiper-prev'));

      var indexActive = parseInt($(parent).find('.swiper-slide-active').attr('data-swiper-slide-index'));

      var indexItem = [];
      var indexMax = 0;

      var imgPrev;
      var imgNext;

      $(parent).find('.swiper-slide').each(function(index, el) {
        indexItem[index] = $(this).attr('data-swiper-slide-index');
        if (indexItem[index] > indexMax) indexMax = indexItem[index];
      });

      if (indexActive == 0) {
        imgPrev = $(parent).find('.swiper-slide[data-swiper-slide-index="' + indexMax + '"]').eq(0).find('img').attr('src');
        imgNext = $(parent).find('.swiper-slide[data-swiper-slide-index="1"]').eq(0).find('img').attr('src');
      } else if (indexActive == indexMax) {
        imgPrev = $(parent).find('.swiper-slide[data-swiper-slide-index="' + (indexMax - 1) + '"]').eq(0).find('img').attr('src');
        imgNext = $(parent).find('.swiper-slide[data-swiper-slide-index="0"]').eq(0).find('img').attr('src');
      } else {
        imgPrev = $(parent).find('.swiper-slide[data-swiper-slide-index="' + (indexActive - 1) + '"]').eq(0).find('img').attr('src');
        imgNext = $(parent).find('.swiper-slide[data-swiper-slide-index="' + (indexActive + 1) + '"]').eq(0).find('img').attr('src');
      }

      $(arrowPrev).css('background-image', 'url(' + imgPrev + ')').addClass('s-sibling-switch');
      $(arrowNext).css('background-image', 'url(' + imgNext + ')').addClass('s-sibling-switch');
    }
  }

  /* SWIPER ARROWS */
  $('.swiper-button-prev').on('click', function() {
    swipers[$(this).parent().attr('id')].slidePrev();
  });

  $('.swiper-button-next').on('click', function() {
    swipers[$(this).parent().attr('id')].slideNext();
  });

  $('.swiper-outer-prev').on('click', function() {
    swipers[$(this).parent().attr('id')].slidePrev();
  });

  $('.swiper-outer-next').on('click', function() {
    swipers[$(this).parent().attr('id')].slideNext();
  });

  /* ------------------------------------------- */
  /* ACCORDION */
  /* ------------------------------------------- */
  $('.cs-accordion__heading').on('click', function(event) {
    $(this).parent().siblings().removeClass('open').find('.cs-accordion__content').slideUp('400');
    $(this).parent().toggleClass('open');
    $(this).next().slideToggle('400');
  });

  $('.js-accordion').on('click', function(event) {
    event.preventDefault();

    var target = $(this).attr('href');

    $(target).siblings().removeClass('open').find('.cs-accordion__content').slideUp('400');
    $(target).addClass('open');
    $(target).find('.cs-accordion__content').slideDown('400');

    $('html, body').animate({
      scrollTop: $(target).offset().top - $('#wpadminbar').outerHeight() - $('.cs-header__wrapp--fixed').outerHeight()
    }, 400);
  });

  /* ------------------------------------------- */
  /* WOOCOMMERCE PRODUCT QUANTITY */
  /* ------------------------------------------- */
  $('body').on('click', '.custom-product-quantity .q_inc, .custom-product-quantity .q_dec', function(e) {
    e.preventDefault();

    var input = $(this).parent('.custom-product-quantity').find('.qty');
    var qty = Number(input.val());

    (this.className === 'q_dec') ? qty-- : qty++;
    qty = (qty > 1) ? qty : 1;
    input.val(qty).change();
  });

  /* ------------------------------------------- */
  /* CHECK IS SCROLLER INTO VIEW */
  /* ------------------------------------------- */
  function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  }

  function isScrolledOnView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom));
  }

  /* ------------------------------------------- */
  /* ANIMATE BANNER */
  /* ------------------------------------------- */
  function animateIn() {
    var animatItem = $('.js-banner-animation'),
      arrowDownBtm = animatItem.siblings('.cs-banner__btm-arrow'),
      arrowDownTop = animatItem.siblings('.cs-banner__top-arrow'),
      timeline = new TimelineMax({
        paused: true,
      });

    if (pageLoad == true) {
      $(animatItem).each(function() {
        if (isScrolledIntoView(this) === true && !$(this).hasClass('js-banner-animation--animated')) {
          timeline.fromTo($(this), .45, {
            y: '-=40',
          }, {
            y: '+=40',
            opacity: 1,
            ease: Sine.easeOut,
          });

          if (arrowDownBtm.length) {
            timeline.fromTo(arrowDownBtm, .25, {
              y: -20,
            }, {
              y: 0,
              opacity: 1,
              ease: Quad.easeOut,
            });
          }

          if (arrowDownTop.length) {
            timeline.fromTo(arrowDownTop, .25, {
              y: 20,
            }, {
              y: 0,
              opacity: 1,
              ease: Quad.easeOut,
            });
          }

          $(this).addClass('js-banner-animation--animated');
          timeline.play();
        }
      });
    }
  }

  /* ------------------------------------------- */
  /* PARALLAX FOR BANNER */
  /* ------------------------------------------- */
  function parallaxBanner() {
    $('.js-parallax-banner-item').each(function(index, el) {
      var el = $(this),
          parent = el.closest('.js-parallax-banner-parent');
      if (isScrolledOnView(parent) === true) {
        var params_speed = el.attr('data-parallax-speed'),
            parent_height = parent.outerHeight(),
            el_height = Math.abs(params_speed) * parent_height + parent_height/1.5,
            doc_bottom = winS + winH,
            el_top = parent.offset().top,
            el_bottom = el_top + parent_height;

        var progress = (doc_bottom - el_top) / (winH + parent_height),
            transform = (progress - 1.1) * (el_height - parent_height);
        // step = el_height - parent_height,
        // transform = progress * step - (el_height - parent_height);

        el.addClass('parallaxing').css({
          height: el_height,
          transform: 'translateY(' + transform + 'px)'
        });
      }
    });
  }

  /* ------------------------------------------- */
  /* PRELOADER */
  /* ------------------------------------------- */
  var progress_bar_hide = localStorage.getItem("progress_bar_hide");

  if (progress_bar_hide == 'hide') {
    $('.js-loader').addClass('hide-bar');
  }

  var now = new Date().getTime();
  var page_load_time = now - performance.timing.navigationStart;
  var step = page_load_time / 100;
  var progress = 0;
  var loader = $('.js-loader').addClass('loading');
  var loader_logo = $('.js-loader-logo');
  var progress_bar = $('.js-loader-progress');

  document.addEventListener('DOMContentLoaded', function () {
    var interval = setInterval(function () {
      var stopInterval = false;
      if (progress < 90 && !loader.hasClass('loaded') && !progress_bar.hasClass('progressed')) {
          progress++
          try {
              progress_bar.css('transform', 'translateX(-' + (100 - progress) + '%)');
              progress_bar.css('transform', 'translateX(-' + (100 - progress) + '%)');
              loader_logo.css('margin-left', '' + (100 - progress) + '%');
          } catch (e) {
              stopInterval = true;
          }
      } else {
        clearInterval(interval);
      }
    }, step);
  });

  /* ------------------------------------------- */
  /* LINK CLICK */
  /* ------------------------------------------- */
  $('a').on('click', function(event) {
    // event.preventDefault();
    if (!linkIgnore($(this))) {
      $('.js-loader').removeClass('loaded loading');
      localStorage.setItem('progress_bar_hide', 'hide');
      var link_href = $(this).attr('href');
      location.href = link_href;
    }
  });

  function linkIgnore(link) {
    var ignored = ['.pdf', '.doc', '.eps', '.png', '.jpg', '.jpeg', '.zip', 'admin', 'wp-', 'wp-admin', 'feed', '#', '&add-to-cart=', '?add-to-cart=', '?remove_item', 'tel:', 'mailto:'];
    var ignoring = false;
    for (var i = ignored.length - 1; i >= 0; i--) {
      if (link.attr('href').indexOf(ignored[i]) > -1) {
        ignoring = true;
      }
    }

    return ignoring || ( link.attr('target') == '_blank' ) || ( link.attr('target') == ' _blank' );
  }

  function loaderHide() {
    var progress_bar_hide = localStorage.getItem("progress_bar_hide");
    $('.js-loader-progress').addClass('progressed').css('transform', 'translateX(0)');
    $('.js-loader-logo').css('margin-left', '0%');
    if (progress_bar_hide == 'hide') {
      $('body, html').addClass('loaded').find('.js-loader').addClass('loaded');
    } else {
      setTimeout(function () {
      $('body, html').addClass('loaded').find('.js-loader').addClass('loaded');
      }, 200);
    }
    localStorage.setItem('progress_bar_hide', '');
  }

  /* ------------------------------------------- */
  /* LOAD MORE */
  /* ------------------------------------------- */
  $('.js-cs-load-more-btn').on('click', function (e) {

    var $btn = $(this),
      $btnText = $btn.html();
    $btn.html( vc_posts_text.loading_text );

    var $wrapper = $btn.closest('[data-unique-key]'),
      uniqueKey = $wrapper.data('unique-key'),
      $container = $wrapper.find('.js-cs-load-more-block');

    var pageNum = parseInt($wrapper.attr('data-start-page'));
    var max = parseInt($wrapper.attr('data-max-page'));
    var nextLink = $wrapper.attr('data-next-link');

    if (pageNum <= max) {
      $.ajax({
        url: nextLink,
        type: 'POST',
        success: function (data) {
          var html = $(data).find('[data-unique-key="' + uniqueKey + '"]').find('.js-cs-load-more-block').children('.js-filter-simple-block');

          var $items = $(html);

          if (!$container.hasClass('cs-blog__outer')) {
            setTimeout(function () {
              $container.append($items);
              $container.isotope('appended', $items);
              wpcAddImgBg('.s-img-switch');
            }, 500);
          } else {
            $container.append($items);
            wpcAddImgBg('.s-img-switch');
          }
          $btn.html($btnText);

          $('.js-cs-load-more').attr('data-start-page', ++pageNum);
          nextLink = nextLink.replace(/\/$/, '');
          var newLink = createNewLink(nextLink);
          nextLink = newLink + (pageNum + 1);
          $('.js-cs-load-more').attr('data-next-link', nextLink);

          if (pageNum == max) {
            $btn.hide('fast');
          }
        }
      });
    }
    return false;
  });

  function createNewLink(link) {
    var numberLength = 0;
    var oldString = link;
    var newReverseStr = link.split("").reverse().join("");
    newReverseStr = newReverseStr.split("");
    for (var i = 0; i < newReverseStr.length; i++) {
        if (isNaN(newReverseStr[i])) {
            break;
        } else {
            numberLength++;
        }
    }
    oldString = oldString.slice(0, -numberLength);
 
    return oldString;
 }
 
  /* ------------------------------------------- */
  /* WINDOW LOAD */
  /* ------------------------------------------- */
  $(window).on('load', function () {
    pageLoad = true;
    setTimeout(function () {
      animateIn(true);
    }, 800);
    videoIframe();
    initSwiper();
    cocaGrid();
    cocaMasonry();
    cocaTimelineList();
    beforeAfter();
    initSlick();
    loaderHide();
    $('.cs-post').fitVids();
  });

  /* ------------------------------------------- */
  /* WINDOW RESIZE */
  /* ------------------------------------------- */
  $(window).on('resize', function () {
    upFullWidthVideo();
  });

  /* ------------------------------------------- */
  /* WINDOW SCROLL */
  /* ------------------------------------------- */
  $(window).on('scroll', function () {
    winS = $(window).scrollTop();
    latestKnownScrollY = $(window).scrollTop();
    lastKnownScrollY = latestKnownScrollY;
    Parallax.update();
    asideFixed();
    animateIn();
    parallaxBanner();
  });

  /* ------------------------------------------- */
  /* PAGE CALCULATION INIT */
  /* ------------------------------------------- */
  pageCalculations(function () {
    wpcAddImgBg('.s-img-switch');
    menuClear();
    blockFullheight();
    blockOnlyFullHeight('.js-only-fullheight');
    blockOnlyFullHeight('.js-cs-block--filmstrip');
    blockFullHeight('.js-fullheight-state');
    upFullWidthVideo();
    stickyMenu();
    comingSoonTextValue();
    filmstripSliderHeight();
    timelineImageHeight();
    Parallax.initialize();
    asideFixed();
    parallaxBanner();
  });

})(jQuery, window, document);
