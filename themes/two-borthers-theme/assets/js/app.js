(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _slider = require('./modules/slider');

var _slider2 = _interopRequireDefault(_slider);

var _modal = require('./modules/modal');

var _modal2 = _interopRequireDefault(_modal);

var _vacancyTab = require('./modules/vacancyTab');

var _vacancyTab2 = _interopRequireDefault(_vacancyTab);

var _footerDate = require('./modules/footerDate');

var _footerDate2 = _interopRequireDefault(_footerDate);

var _jqValidator = require('./modules/jqValidator');

var _jqValidator2 = _interopRequireDefault(_jqValidator);

var _contactForm = require('./modules/contactForm');

var _contactForm2 = _interopRequireDefault(_contactForm);

var _preloader = require('./modules/preloader');

var _preloader2 = _interopRequireDefault(_preloader);

var _navbar = require('./modules/navbar');

var _navbar2 = _interopRequireDefault(_navbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// You can write a call and import your functions in this file.
//
// This file will be compiled into app.js and will not be minified.
// Feel free with using ES6 here.

// import {NAME} from './modules/...';
(function ($) {
  // When DOM is ready
  $(function () {
    _preloader2.default.initPreloader();
    _slider2.default.officeGallery();
    _jqValidator2.default.checkForm();
    _modal2.default.applyYourCV();
    _vacancyTab2.default.careerTabs();
    _footerDate2.default.setDate();
    _contactForm2.default.toDo();
    _navbar2.default.responsiveNavbar();
  });
})(jQuery);
// import mapApi from './modules/map';

},{"./modules/contactForm":2,"./modules/footerDate":3,"./modules/jqValidator":4,"./modules/modal":5,"./modules/navbar":6,"./modules/preloader":7,"./modules/slider":8,"./modules/vacancyTab":9}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var contactForm = {
  toDo: function toDo() {
    var $form = $('#contact-form');
    var $succesEl = $form.find('[type="submit"]');
    var SUCCESS_CLASS = 'success';
    var ERROR_CLASS = 'form-error';
    var VALID_CLASS = 'form-valid';
    var $requiredFields = $('.required');
    function checkForValid() {
      $form.validate({
        rules: {
          name: {
            required: true,
            minlength: 2,
            maxlength: 150
          },
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: 'Please enter your name',
          email: 'Please check your email'
        },
        errorClass: 'error-msg',
        errorElement: 'span',
        submitHandler: function submitHandler() {
          setTimeout(function () {
            $succesEl.addClass(SUCCESS_CLASS);
            $form[0].reset();
            setTimeout(function () {
              $succesEl.removeClass(SUCCESS_CLASS);
            }, 3000);
          }, 3000);
        }
      });
    }
    function formGet() {
      $form.submit(function (event) {
        event.preventDefault();
        checkForValid();
        function checkForChanges() {
          $requiredFields.each(function () {
            if ($(this).hasClass('error-msg')) {
              $(this).parent().addClass(ERROR_CLASS);
            } else {
              $(this).parent().removeClass(ERROR_CLASS);
            }
          });
        }

        checkForChanges();
        var formData = new FormData();
        $.each($form.serializeArray(), function (k, v) {
          formData.set(v.name, v.value);
        });
        if ($requiredFields.valid()) {
          jQuery.ajax({
            url: '/api/contact_us.php',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            method: 'POST',
            type: 'POST',
            dataType: 'json'
          });
        }
      });
    }
    function init() {
      checkForValid();
      $requiredFields.each(function () {
        var _this = this;

        $(this).on('change keyup blur input paste focusout', function () {
          if ($(_this).hasClass('error-msg')) {
            $(_this).parent().addClass(ERROR_CLASS);
          } else {
            $(_this).parent().removeClass(ERROR_CLASS);
            $(_this).parent().addClass(VALID_CLASS);
          }
        });
      });
      formGet();
    }
    return {
      init: init()
    };
  }
};
exports.default = contactForm;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var footerDate = {
  setDate: function setDate() {
    var $currentYear = $('#currentYear');
    function setCurrentDate() {
      $currentYear.text(new Date().getFullYear());
    }
    function init() {
      if (!$currentYear.length) return;
      setCurrentDate();
    }
    return {
      init: init()
    };
  }
};

exports.default = footerDate;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var jqValidator = {
  checkForm: function checkForm() {
    var $form = $('#applyCV');
    var $file = $('#file');
    var $phone = $('.form-cv-upload input[name=phone]');
    var PHONE_MASK = '(999) 999 99 99';
    var $uploadLabel = $('.form-group.upload label');
    var $requiredFields = $('.required');
    var $succesEl = $form.find('[type="submit"]');
    var $succesTextEl = $succesEl.find('span');
    var ATTACHED_CLASS = 'attached';
    var ERROR_CLASS = 'form-error';
    var VALID_CLASS = 'form-valid';
    var SUCCESS_CLASS = 'success';
    var DEFAULT_SUBMIT_TEXT = $succesTextEl.text();
    var SUCCESS_SUBMIT_TEXT = 'Thank you for submitting';
    function formAction() {
      $('#applyCV').validate({
        rules: {
          name: {
            required: true,
            minlength: 1,
            maxlength: 150
          },
          email: {
            required: true,
            email: true
          },
          phone: {
            required: false
          },
          position: {
            minlength: 2
          },
          cv: {
            required: true
          }
        },
        messages: {
          name: 'Please enter your name',
          email: 'Please check your email',
          phone: 'Please enter correct phone number',
          position: 'Please enter position',
          cv: 'Please attach your CV'
        },
        errorClass: 'error-msg',
        errorElement: 'span',
        submitHandler: function submitHandler() {
          setTimeout(function () {
            if ($file.valid()) {
              $succesEl.addClass(SUCCESS_CLASS);
              $succesTextEl.text(SUCCESS_SUBMIT_TEXT);
              setTimeout(function () {
                $uploadLabel.text('+ Attach your CV file');
                $form[0].reset();
                $file.val(null);
                $file.parent().removeClass(ATTACHED_CLASS);
                $succesEl.removeClass(SUCCESS_CLASS);
                $succesTextEl.text(DEFAULT_SUBMIT_TEXT);
              }, 100);
            }
          }, 2000);
        }
      });
    }
    var formCheck = {
      cv_file: function cv_file() {
        if ($file.val().length === 0) {
          $file.parent().removeClass(ATTACHED_CLASS);
          $file.parent().addClass(ERROR_CLASS);
          $file.parent().find('.error-msg').fadeIn();
        } else {
          $file.parent().removeClass(ERROR_CLASS);
          $file.parent().addClass(VALID_CLASS);
          $file.parent().addClass(ATTACHED_CLASS);
          $file.parent().find('.error-msg').fadeOut();
        }
      }
    };
    function formGet() {
      $form.submit(function (event) {
        event.preventDefault();
        function checkForChanges() {
          $requiredFields.each(function () {
            if ($(this).hasClass('error-msg')) {
              $(this).parent().addClass(ERROR_CLASS);
            } else {
              $(this).parent().removeClass(ERROR_CLASS);
            }
          });
        }
        formCheck.cv_file();
        $file.valid();
        checkForChanges();
        var formData = new FormData();
        $.each($('[name=cv]')[0].files, function (i, file) {
          formData.append('cv', file);
        });
        $.each($form.serializeArray(), function (k, v) {
          formData.set(v.name, v.value);
        });
        if ($file.valid() && $requiredFields.valid()) {
          jQuery.ajax({
            url: '/api/send_cv.php',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            method: 'POST',
            type: 'POST',
            dataType: 'json'
          });
        }
      });
    }
    function init() {
      if (!$form.length) return;
      formAction();
      $phone.change(formCheck.cv_phone).mask(PHONE_MASK, {
        autoclear: true,
        placeholder: ''
      });
      $requiredFields.each(function () {
        var _this = this;

        $(this).on('change keyup blur input paste focusout', function () {
          if ($(_this).hasClass('error-msg')) {
            $(_this).parent().addClass(ERROR_CLASS);
          } else {
            $(_this).parent().removeClass(ERROR_CLASS);
            $(_this).parent().addClass(VALID_CLASS);
          }
        });
      });
      formGet();
    }
    return {
      init: init()
    };
  }
};
exports.default = jqValidator;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var modalWindow = {
  applyYourCV: function applyYourCV() {
    var $uploadInput = $('.form-group.upload input');
    var $uploadLabel = $('.form-group.upload label');
    var $clearBtn = $('.clear-btn');
    var $file = $('#file');
    var ATTACHED_CLASS = 'attached';
    var ERROR_CLASS = 'form-error';
    var VALID_CLASS = 'form-valid';
    function fileName() {
      $uploadInput.on('change', function () {
        var FILE_NAME = $uploadInput[0].files[0].name;
        $uploadLabel.text(FILE_NAME + ' selected');
        if ($file.val().length === 0) {
          $file.parent().removeClass(ATTACHED_CLASS);
          $file.parent().addClass(ERROR_CLASS);
          $file.parent().find('.error-msg').fadeIn();
        } else {
          $file.parent().removeClass(ERROR_CLASS);
          $file.parent().addClass(VALID_CLASS);
          $file.parent().addClass(ATTACHED_CLASS);
          $file.parent().find('.error-msg').fadeOut();
        }
      });
      $clearBtn.on('click', function () {
        $('#file').val(null);
        $uploadLabel.text('+ Attach your CV file');
        $file.parent().removeClass('attached');
        setTimeout(function () {
          if ($file.val().length === 0) {
            $file.valid();
            console.log($file.valid());
            $file.parent().removeClass(ATTACHED_CLASS);
            $file.parent().addClass(ERROR_CLASS);
          }
        }, 2000);
      });
    }
    function init() {
      fileName();
    }
    return {
      init: init()
    };
  }
};

exports.default = modalWindow;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var navbar = {
  responsiveNavbar: function responsiveNavbar() {
    var $window = $(window);
    var $header = $('.header');
    var $menuToggler = $('.menu-toggler');
    var $navbarHolder = $('.navbar-holder');
    var $closeBtn = $('.close-btn');
    var $logo = $('.logo');
    var DESKTOP_VIEW_WIDTH = 1023;
    var SCROLL_START_POINT = 0;
    var SCROLLED_CLASS = 'scrolled';
    var OPENED_CLASS = 'opened';
    function widthCheck(width) {
      return $(window).width() > width;
    }
    function addScrollClass(elem) {
      return elem.addClass(SCROLLED_CLASS);
    }
    function removeScrollClass(elem) {
      return elem.removeClass(SCROLLED_CLASS);
    }
    function onScrollDesktop() {
      $window.on('scroll', function () {
        var BOTTOM_POSITION = $(document).height() - $(window).height();
        var FROM_TOP = $(this).scrollTop();
        if (FROM_TOP > SCROLL_START_POINT && FROM_TOP !== BOTTOM_POSITION) {
          if (!widthCheck(DESKTOP_VIEW_WIDTH)) return;
          addScrollClass($menuToggler);
          addScrollClass($navbarHolder);
          addScrollClass($logo);
        } else {
          if (!widthCheck(DESKTOP_VIEW_WIDTH)) return;
          removeScrollClass($menuToggler);
          removeScrollClass($navbarHolder);
          removeScrollClass($logo);
        }
      });
    }
    function menuHandler() {
      $menuToggler.on('click', function () {
        if (widthCheck(DESKTOP_VIEW_WIDTH)) {
          removeScrollClass($menuToggler);
          removeScrollClass($navbarHolder);
        } else {
          removeScrollClass($navbarHolder);
          $navbarHolder.addClass(OPENED_CLASS);
        }
      });
      $closeBtn.on('click', function () {
        $navbarHolder.removeClass(OPENED_CLASS);
      });
    }
    function init() {
      if (!$header.length) return;
      onScrollDesktop();
      menuHandler();
    }
    return {
      init: init()
    };
  }
};

exports.default = navbar;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var preloader = {
  initPreloader: function initPreloader() {
    var $wrapper = $('#wrapper');
    var $preloader = $('.preloader');
    function pageLoading() {
      $wrapper.fadeIn();
      $preloader.fadeOut();
    }
    function init() {
      if (!$wrapper.length) return;
      setTimeout(pageLoading, 1000);
    }
    return {
      init: init()
    };
  }
};

exports.default = preloader;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var slider = {
  officeGallery: function officeGallery() {
    function sliderInit() {
      $('.slider-for').slick({
        centerMode: true,
        slidesToShow: 1,
        nextArrow: '<button type="button" class="slick-next"><<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18" height="30" viewBox="0 0 614 1024">\n        <path fill="#fff" d="M603.873 488.396l-491.97-478.129c-7.040-6.835-15.142-10.267-24.286-10.267-9.148 0-17.246 3.432-24.283 10.267l-52.777 51.305c-7.048\n         6.839-10.557 14.695-10.557 23.6s3.509 16.761 10.557 23.6l414.893 403.238-414.893 403.245c-7.048 6.839-10.557 14.709-10.557 23.59 0 8.902 3.509 16.772\n          10.557 23.611l52.78 51.287c7.037 6.846 15.135 10.257 24.283 10.257 9.144 0 17.242-3.418 24.283-10.257l491.944-478.132c7.033-6.835 10.553-14.709\n           10.553-23.6s-3.494-16.761-10.527-23.615z"></path>\n        </svg></button>',
        prevArrow: '<button type="button" class="slick-prev"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18" height="30" viewBox="0 0 614 1024">\n        <path fill="#fff" d="M603.873 488.396l-491.97-478.129c-7.040-6.835-15.142-10.267-24.286-10.267-9.148 0-17.246 3.432-24.283 10.267l-52.777 51.305c-7.048\n         6.839-10.557 14.695-10.557 23.6s3.509 16.761 10.557 23.6l414.893 403.238-414.893 403.245c-7.048 6.839-10.557 14.709-10.557 23.59 0 8.902 3.509 16.772\n          10.557 23.611l52.78 51.287c7.037 6.846 15.135 10.257 24.283 10.257 9.144 0 17.242-3.418 24.283-10.257l491.944-478.132c7.033-6.835 10.553-14.709\n           10.553-23.6s-3.494-16.761-10.527-23.615z"></path>\n        </svg></button>',
        variableWidth: true,
        responsive: [{
          breakpoint: 1440,
          settings: {
            centerPadding: '20px',
            slidesToShow: 1
          }
        }, {
          breakpoint: 981,
          settings: {
            arrows: true
          }
        }, {
          breakpoint: 768,
          settings: {
            centerPadding: '160px',
            slidesToShow: 3,
            arrows: false
          }
        }, {
          breakpoint: 320,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav',
            centerPadding: '0',
            centerMode: true
          }
        }]
      });
      $('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: false,
        centerMode: true,
        focusOnSelect: true,
        arrows: false,
        adaptiveHeight: true
      });
      $('.project-slider').slick({
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        infinite: false,
        variableWidth: true,
        swipeToSlide: true,
        nextArrow: '<button type="button" class="slick-next"><<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18" height="30" viewBox="0 0 614 1024">\n        <path fill="#fff" d="M603.873 488.396l-491.97-478.129c-7.040-6.835-15.142-10.267-24.286-10.267-9.148 0-17.246 3.432-24.283 10.267l-52.777 51.305c-7.048\n         6.839-10.557 14.695-10.557 23.6s3.509 16.761 10.557 23.6l414.893 403.238-414.893 403.245c-7.048 6.839-10.557 14.709-10.557 23.59 0 8.902 3.509 16.772\n          10.557 23.611l52.78 51.287c7.037 6.846 15.135 10.257 24.283 10.257 9.144 0 17.242-3.418 24.283-10.257l491.944-478.132c7.033-6.835 10.553-14.709\n           10.553-23.6s-3.494-16.761-10.527-23.615z"></path>\n        </svg></button>',
        prevArrow: '<button type="button" class="slick-prev"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18" height="30" viewBox="0 0 614 1024">\n        <path fill="#fff" d="M603.873 488.396l-491.97-478.129c-7.040-6.835-15.142-10.267-24.286-10.267-9.148 0-17.246 3.432-24.283 10.267l-52.777 51.305c-7.048\n         6.839-10.557 14.695-10.557 23.6s3.509 16.761 10.557 23.6l414.893 403.238-414.893 403.245c-7.048 6.839-10.557 14.709-10.557 23.59 0 8.902 3.509 16.772\n          10.557 23.611l52.78 51.287c7.037 6.846 15.135 10.257 24.283 10.257 9.144 0 17.242-3.418 24.283-10.257l491.944-478.132c7.033-6.835 10.553-14.709\n           10.553-23.6s-3.494-16.761-10.527-23.615z"></path>\n        </svg></button>'
      });
    }
    function init() {
      sliderInit();
    }
    return {
      init: init()
    };
  }
};

exports.default = slider;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tabs = {
  careerTabs: function careerTabs() {
    var $tab = $('.card-vacancy-action');
    var $tabContainer = $('.tab_container');
    var $tabContent = $('.tab_content');
    var $accordion = $('.tab_accordion');
    var TAB_ACTIVE_CLASS = 'active';
    var $page = $('html, body');
    function desktopTabs() {
      $tab.on('click', function (event) {
        if ($(this).hasClass('active')) {
          event.preventDefault();
        } else {
          event.preventDefault();
          var $relValue = $(this).attr('rel');
          var $content = $tabContainer.find('[id=' + $relValue + ']');
          $tab.removeClass(TAB_ACTIVE_CLASS);
          $tabContent.hide();
          $(this).addClass(TAB_ACTIVE_CLASS);
          $content.fadeIn();
          if (window.history.pushState) {
            var $hash = '#' + $relValue;
            window.history.pushState(null, null, $hash);
            event.preventDefault();
            $page.animate({ scrollTop: 0 }, 500);
            $page.on('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove', function () {
              $page.stop();
            });
          } else {
            var _$hash = '#' + $relValue;
            window.location.hash = _$hash;
            event.preventDefault();
            $page.animate({ scrollTop: 0 }, 500);
            $page.on('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove', function () {
              $page.stop();
            });
          }
        }
      });
    }
    function accordion() {
      $accordion.on('click', function () {
        $accordion.not($(this)).removeClass(TAB_ACTIVE_CLASS);
        $tabContent.fadeOut();
        var $relValue = $(this).attr('rel');
        var $content = $tabContainer.find('[id=' + $relValue + ']');
        $(this).toggleClass(TAB_ACTIVE_CLASS);
        $content.toggle();
        document.location.hash = $(this).attr('rel');
      });
      if (document.location.hash.length > 0) {
        $tabContent.hide();
        $tab.removeClass(TAB_ACTIVE_CLASS);
        var HASH = document.location.hash.split('#')[1];
        var $currentVacancy = $tabContainer.find('[id="' + HASH + '"]');
        var $currentTab = $('.tabs').find('[rel="' + HASH + '"]');
        var $currentAcc = $tabContainer.find('[rel="' + HASH + '"]');
        $currentTab.addClass(TAB_ACTIVE_CLASS);
        $currentAcc.addClass(TAB_ACTIVE_CLASS);
        $currentVacancy.fadeIn();
      }
    }
    function init() {
      if (!$tab.length) return;
      desktopTabs();
      accordion();
      // if (SCREEN_WIDTH > 768) $tabContainer.find('[id="tab1"]').fadeIn();
    }
    return {
      init: init()
    };
  }
};

exports.default = tabs;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0aGVtZXMvbmV3LWl0b215Y2hzdHVkaW8vc3JjL2pzL2FwcC5qcyIsInRoZW1lcy9uZXctaXRvbXljaHN0dWRpby9zcmMvanMvbW9kdWxlcy9jb250YWN0Rm9ybS5qcyIsInRoZW1lcy9uZXctaXRvbXljaHN0dWRpby9zcmMvanMvbW9kdWxlcy9mb290ZXJEYXRlLmpzIiwidGhlbWVzL25ldy1pdG9teWNoc3R1ZGlvL3NyYy9qcy9tb2R1bGVzL2pxVmFsaWRhdG9yLmpzIiwidGhlbWVzL25ldy1pdG9teWNoc3R1ZGlvL3NyYy9qcy9tb2R1bGVzL21vZGFsLmpzIiwidGhlbWVzL25ldy1pdG9teWNoc3R1ZGlvL3NyYy9qcy9tb2R1bGVzL25hdmJhci5qcyIsInRoZW1lcy9uZXctaXRvbXljaHN0dWRpby9zcmMvanMvbW9kdWxlcy9wcmVsb2FkZXIuanMiLCJ0aGVtZXMvbmV3LWl0b215Y2hzdHVkaW8vc3JjL2pzL21vZHVsZXMvc2xpZGVyLmpzIiwidGhlbWVzL25ldy1pdG9teWNoc3R1ZGlvL3NyYy9qcy9tb2R1bGVzL3ZhY2FuY3lUYWIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ01BOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQWRBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBV0EsQ0FBQyxVQUFDLENBQUQsRUFBTztBQUNOO0FBQ0EsSUFBRSxZQUFNO0FBQ04sd0JBQVUsYUFBVjtBQUNBLHFCQUFPLGFBQVA7QUFDQSwwQkFBWSxTQUFaO0FBQ0Esb0JBQVksV0FBWjtBQUNBLHlCQUFLLFVBQUw7QUFDQSx5QkFBVyxPQUFYO0FBQ0EsMEJBQVksSUFBWjtBQUNBLHFCQUFPLGdCQUFQO0FBQ0QsR0FURDtBQVVELENBWkQsRUFZRyxNQVpIO0FBVEE7Ozs7Ozs7O0FDUEEsSUFBTSxjQUFjO0FBQ2xC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QTVCLFFBQXBCO0FBQ0Esb0JBQVksUUFBWixDQUFxQixnQkFBckI7QUFDQSxvQkFBWSxRQUFaLENBQXFCLGdCQUFyQjtBQUNBLHdCQUFnQixNQUFoQjtBQUNEO0FBQ0Y7QUFDRCxhQUFTLElBQVQsR0FBZ0I7QUFDZCxVQUFJLENBQUMsS0FBSyxNQUFWLEVBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNEO0FBQ0QsV0FBTztBQUNMLFlBQU07QUFERCxLQUFQO0FBR0Q7QUF2RVUsQ0FBYjs7a0JBMEVlLEkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBZb3UgY2FuIHdyaXRlIGEgY2FsbCBhbmQgaW1wb3J0IHlvdXIgZnVuY3Rpb25zIGluIHRoaXMgZmlsZS5cbi8vXG4vLyBUaGlzIGZpbGUgd2lsbCBiZSBjb21waWxlZCBpbnRvIGFwcC5qcyBhbmQgd2lsbCBub3QgYmUgbWluaWZpZWQuXG4vLyBGZWVsIGZyZWUgd2l0aCB1c2luZyBFUzYgaGVyZS5cblxuLy8gaW1wb3J0IHtOQU1FfSBmcm9tICcuL21vZHVsZXMvLi4uJztcbmltcG9ydCBzbGlkZXIgZnJvbSAnLi9tb2R1bGVzL3NsaWRlcic7XG4vLyBpbXBvcnQgbWFwQXBpIGZyb20gJy4vbW9kdWxlcy9tYXAnO1xuaW1wb3J0IG1vZGFsV2luZG93IGZyb20gJy4vbW9kdWxlcy9tb2RhbCc7XG5pbXBvcnQgdGFicyBmcm9tICcuL21vZHVsZXMvdmFjYW5jeVRhYic7XG5pbXBvcnQgZm9vdGVyRGF0ZSBmcm9tICcuL21vZHVsZXMvZm9vdGVyRGF0ZSc7XG5pbXBvcnQganFWYWxpZGF0b3IgZnJvbSAnLi9tb2R1bGVzL2pxVmFsaWRhdG9yJztcbmltcG9ydCBjb250YWN0Rm9ybSBmcm9tICcuL21vZHVsZXMvY29udGFjdEZvcm0nO1xuaW1wb3J0IHByZWxvYWRlciBmcm9tICcuL21vZHVsZXMvcHJlbG9hZGVyJztcbmltcG9ydCBuYXZiYXIgZnJvbSAnLi9tb2R1bGVzL25hdmJhcic7XG5cbigoJCkgPT4ge1xuICAvLyBXaGVuIERPTSBpcyByZWFkeVxuICAkKCgpID0+IHtcbiAgICBwcmVsb2FkZXIuaW5pdFByZWxvYWRlcigpO1xuICAgIHNsaWRlci5vZmZpY2VHYWxsZXJ5KCk7XG4gICAganFWYWxpZGF0b3IuY2hlY2tGb3JtKCk7XG4gICAgbW9kYWxXaW5kb3cuYXBwbHlZb3VyQ1YoKTtcbiAgICB0YWJzLmNhcmVlclRhYnMoKTtcbiAgICBmb290ZXJEYXRlLnNldERhdGUoKTtcbiAgICBjb250YWN0Rm9ybS50b0RvKCk7XG4gICAgbmF2YmFyLnJlc3BvbnNpdmVOYXZiYXIoKTtcbiAgfSk7XG59KShqUXVlcnkpO1xuIiwiY29uc3QgY29udGFjdEZvcm0gPSB7XG4gIHRvRG8oKSB7XG4gICAgY29uc3QgJGZvcm0gPSAkKCcjY29udGFjdC1mb3JtJyk7XG4gICAgY29uc3QgJHN1Y2Nlc0VsID0gJGZvcm0uZmluZCgnW3R5cGU9XCJzdWJtaXRcIl0nKTtcbiAgICBjb25zdCBTVUNDRVNTX0NMQVNTID0gJ3N1Y2Nlc3MnO1xuICAgIGNvbnN0IEVSUk9SX0NMQVNTID0gJ2Zvcm0tZXJyb3InO1xuICAgIGNvbnN0IFZBTElEX0NMQVNTID0gJ2Zvcm0tdmFsaWQnO1xuICAgIGNvbnN0ICRyZXF1aXJlZEZpZWxkcyA9ICQoJy5yZXF1aXJlZCcpO1xuICAgIGZ1bmN0aW9uIGNoZWNrRm9yVmFsaWQoKSB7XG4gICAgICAkZm9ybS52YWxpZGF0ZSh7XG4gICAgICAgIHJ1bGVzOiB7XG4gICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgICBtaW5sZW5ndGg6IDIsXG4gICAgICAgICAgICBtYXhsZW5ndGg6IDE1MCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVtYWlsOiB7XG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICAgIGVtYWlsOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIG1lc3NhZ2VzOiB7XG4gICAgICAgICAgbmFtZTogJ1BsZWFzZSBlbnRlciB5b3VyIG5hbWUnLFxuICAgICAgICAgIGVtYWlsOiAnUGxlYXNlIGNoZWNrIHlvdXIgZW1haWwnLFxuICAgICAgICB9LFxuICAgICAgICBlcnJvckNsYXNzOiAnZXJyb3ItbXNnJyxcbiAgICAgICAgZXJyb3JFbGVtZW50OiAnc3BhbicsXG4gICAgICAgIHN1Ym1pdEhhbmRsZXI6ICgpID0+IHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICRzdWNjZXNFbC5hZGRDbGFzcyhTVUNDRVNTX0NMQVNTKTtcbiAgICAgICAgICAgICRmb3JtWzBdLnJlc2V0KCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgJHN1Y2Nlc0VsLnJlbW92ZUNsYXNzKFNVQ0NFU1NfQ0xBU1MpO1xuICAgICAgICAgICAgfSwgMzAwMCk7XG4gICAgICAgICAgfSwgMzAwMCk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZm9ybUdldCgpIHtcbiAgICAgICRmb3JtLnN1Ym1pdCgoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY2hlY2tGb3JWYWxpZCgpO1xuICAgICAgICBmdW5jdGlvbiBjaGVja0ZvckNoYW5nZXMoKSB7XG4gICAgICAgICAgJHJlcXVpcmVkRmllbGRzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2Vycm9yLW1zZycpKSB7XG4gICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoRVJST1JfQ0xBU1MpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmVDbGFzcyhFUlJPUl9DTEFTUyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBjaGVja0ZvckNoYW5nZXMoKTtcbiAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgJC5lYWNoKCRmb3JtLnNlcmlhbGl6ZUFycmF5KCksIChrLCB2KSA9PiB7XG4gICAgICAgICAgZm9ybURhdGEuc2V0KHYubmFtZSwgdi52YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoJHJlcXVpcmVkRmllbGRzLnZhbGlkKCkpIHtcbiAgICAgICAgICBqUXVlcnkuYWpheCh7XG4gICAgICAgICAgICB1cmw6ICcvYXBpL2NvbnRhY3RfdXMucGhwJyxcbiAgICAgICAgICAgIGRhdGE6IGZvcm1EYXRhLFxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IGZhbHNlLFxuICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgIGNoZWNrRm9yVmFsaWQoKTtcbiAgICAgICRyZXF1aXJlZEZpZWxkcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS5vbignY2hhbmdlIGtleXVwIGJsdXIgaW5wdXQgcGFzdGUgZm9jdXNvdXQnLCAoKSA9PiB7XG4gICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2Vycm9yLW1zZycpKSB7XG4gICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKEVSUk9SX0NMQVNTKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmVDbGFzcyhFUlJPUl9DTEFTUyk7XG4gICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKFZBTElEX0NMQVNTKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBmb3JtR2V0KCk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBpbml0OiBpbml0KCksXG4gICAgfTtcbiAgfSxcbn07XG5leHBvcnQgZGVmYXVsdCBjb250YWN0Rm9ybTtcbiIsImNvbnN0IGZvb3RlckRhdGUgPSB7XG4gIHNldERhdGUoKSB7XG4gICAgY29uc3QgJGN1cnJlbnRZZWFyID0gJCgnI2N1cnJlbnRZZWFyJyk7XG4gICAgZnVuY3Rpb24gc2V0Q3VycmVudERhdGUoKSB7XG4gICAgICAkY3VycmVudFllYXIudGV4dCgobmV3IERhdGUoKSkuZ2V0RnVsbFllYXIoKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICBpZiAoISRjdXJyZW50WWVhci5sZW5ndGgpIHJldHVybjtcbiAgICAgIHNldEN1cnJlbnREYXRlKCk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBpbml0OiBpbml0KCksXG4gICAgfTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZvb3RlckRhdGU7XG4iLCJjb25zdCBqcVZhbGlkYXRvciA9IHtcbiAgY2hlY2tGb3JtKCkge1xuICAgIGNvbnN0ICRmb3JtID0gJCgnI2FwcGx5Q1YnKTtcbiAgICBjb25zdCAkZmlsZSA9ICQoJyNmaWxlJyk7XG4gICAgY29uc3QgJHBob25lID0gJCgnLmZvcm0tY3YtdXBsb2FkIGlucHV0W25hbWU9cGhvbmVdJyk7XG4gICAgY29uc3QgUEhPTkVfTUFTSyA9ICcoOTk5KSA5OTkgOTkgOTknO1xuICAgIGNvbnN0ICR1cGxvYWRMYWJlbCA9ICQoJy5mb3JtLWdyb3VwLnVwbG9hZCBsYWJlbCcpO1xuICAgIGNvbnN0ICRyZXF1aXJlZEZpZWxkcyA9ICQoJy5yZXF1aXJlZCcpO1xuICAgIGNvbnN0ICRzdWNjZXNFbCA9ICRmb3JtLmZpbmQoJ1t0eXBlPVwic3VibWl0XCJdJyk7XG4gICAgY29uc3QgJHN1Y2Nlc1RleHRFbCA9ICRzdWNjZXNFbC5maW5kKCdzcGFuJyk7XG4gICAgY29uc3QgQVRUQUNIRURfQ0xBU1MgPSAnYXR0YWNoZWQnO1xuICAgIGNvbnN0IEVSUk9SX0NMQVNTID0gJ2Zvcm0tZXJyb3InO1xuICAgIGNvbnN0IFZBTElEX0NMQVNTID0gJ2Zvcm0tdmFsaWQnO1xuICAgIGNvbnN0IFNVQ0NFU1NfQ0xBU1MgPSAnc3VjY2Vzcyc7XG4gICAgY29uc3QgREVGQVVMVF9TVUJNSVRfVEVYVCA9ICRzdWNjZXNUZXh0RWwudGV4dCgpO1xuICAgIGNvbnN0IFNVQ0NFU1NfU1VCTUlUX1RFWFQgPSAnVGhhbmsgeW91IGZvciBzdWJtaXR0aW5nJztcbiAgICBmdW5jdGlvbiBmb3JtQWN0aW9uKCkge1xuICAgICAgJCgnI2FwcGx5Q1YnKS52YWxpZGF0ZSh7XG4gICAgICAgIHJ1bGVzOiB7XG4gICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgICBtaW5sZW5ndGg6IDEsXG4gICAgICAgICAgICBtYXhsZW5ndGg6IDE1MCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVtYWlsOiB7XG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICAgIGVtYWlsOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgcGhvbmU6IHtcbiAgICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgICAgICBtaW5sZW5ndGg6IDIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjdjoge1xuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgbWVzc2FnZXM6IHtcbiAgICAgICAgICBuYW1lOiAnUGxlYXNlIGVudGVyIHlvdXIgbmFtZScsXG4gICAgICAgICAgZW1haWw6ICdQbGVhc2UgY2hlY2sgeW91ciBlbWFpbCcsXG4gICAgICAgICAgcGhvbmU6ICdQbGVhc2UgZW50ZXIgY29ycmVjdCBwaG9uZSBudW1iZXInLFxuICAgICAgICAgIHBvc2l0aW9uOiAnUGxlYXNlIGVudGVyIHBvc2l0aW9uJyxcbiAgICAgICAgICBjdjogJ1BsZWFzZSBhdHRhY2ggeW91ciBDVicsXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yQ2xhc3M6ICdlcnJvci1tc2cnLFxuICAgICAgICBlcnJvckVsZW1lbnQ6ICdzcGFuJyxcbiAgICAgICAgc3VibWl0SGFuZGxlcjogKCkgPT4ge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCRmaWxlLnZhbGlkKCkpIHtcbiAgICAgICAgICAgICAgJHN1Y2Nlc0VsLmFkZENsYXNzKFNVQ0NFU1NfQ0xBU1MpO1xuICAgICAgICAgICAgICAkc3VjY2VzVGV4dEVsLnRleHQoU1VDQ0VTU19TVUJNSVRfVEVYVCk7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICR1cGxvYWRMYWJlbC50ZXh0KCcrIEF0dGFjaCB5b3VyIENWIGZpbGUnKTtcbiAgICAgICAgICAgICAgICAkZm9ybVswXS5yZXNldCgpO1xuICAgICAgICAgICAgICAgICRmaWxlLnZhbChudWxsKTtcbiAgICAgICAgICAgICAgICAkZmlsZS5wYXJlbnQoKS5yZW1vdmVDbGFzcyhBVFRBQ0hFRF9DTEFTUyk7XG4gICAgICAgICAgICAgICAgJHN1Y2Nlc0VsLnJlbW92ZUNsYXNzKFNVQ0NFU1NfQ0xBU1MpO1xuICAgICAgICAgICAgICAgICRzdWNjZXNUZXh0RWwudGV4dChERUZBVUxUX1NVQk1JVF9URVhUKTtcbiAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCBmb3JtQ2hlY2sgPSB7XG4gICAgICBjdl9maWxlOiAoKSA9PiB7XG4gICAgICAgIGlmICgkZmlsZS52YWwoKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAkZmlsZS5wYXJlbnQoKS5yZW1vdmVDbGFzcyhBVFRBQ0hFRF9DTEFTUyk7XG4gICAgICAgICAgJGZpbGUucGFyZW50KCkuYWRkQ2xhc3MoRVJST1JfQ0xBU1MpO1xuICAgICAgICAgICRmaWxlLnBhcmVudCgpLmZpbmQoJy5lcnJvci1tc2cnKS5mYWRlSW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkZmlsZS5wYXJlbnQoKS5yZW1vdmVDbGFzcyhFUlJPUl9DTEFTUyk7XG4gICAgICAgICAgJGZpbGUucGFyZW50KCkuYWRkQ2xhc3MoVkFMSURfQ0xBU1MpO1xuICAgICAgICAgICRmaWxlLnBhcmVudCgpLmFkZENsYXNzKEFUVEFDSEVEX0NMQVNTKTtcbiAgICAgICAgICAkZmlsZS5wYXJlbnQoKS5maW5kKCcuZXJyb3ItbXNnJykuZmFkZU91dCgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH07XG4gICAgZnVuY3Rpb24gZm9ybUdldCgpIHtcbiAgICAgICRmb3JtLnN1Ym1pdCgoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tGb3JDaGFuZ2VzKCkge1xuICAgICAgICAgICRyZXF1aXJlZEZpZWxkcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdlcnJvci1tc2cnKSkge1xuICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKEVSUk9SX0NMQVNTKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkucmVtb3ZlQ2xhc3MoRVJST1JfQ0xBU1MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZvcm1DaGVjay5jdl9maWxlKCk7XG4gICAgICAgICRmaWxlLnZhbGlkKCk7XG4gICAgICAgIGNoZWNrRm9yQ2hhbmdlcygpO1xuICAgICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICAkLmVhY2goJCgnW25hbWU9Y3ZdJylbMF0uZmlsZXMsIChpLCBmaWxlKSA9PiB7XG4gICAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdjdicsIGZpbGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgJC5lYWNoKCRmb3JtLnNlcmlhbGl6ZUFycmF5KCksIChrLCB2KSA9PiB7XG4gICAgICAgICAgZm9ybURhdGEuc2V0KHYubmFtZSwgdi52YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoJGZpbGUudmFsaWQoKSAmJiAkcmVxdWlyZWRGaWVsZHMudmFsaWQoKSkge1xuICAgICAgICAgIGpRdWVyeS5hamF4KHtcbiAgICAgICAgICAgIHVybDogJy9hcGkvc2VuZF9jdi5waHAnLFxuICAgICAgICAgICAgZGF0YTogZm9ybURhdGEsXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogZmFsc2UsXG4gICAgICAgICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgaWYgKCEkZm9ybS5sZW5ndGgpIHJldHVybjtcbiAgICAgIGZvcm1BY3Rpb24oKTtcbiAgICAgICRwaG9uZS5jaGFuZ2UoZm9ybUNoZWNrLmN2X3Bob25lKS5tYXNrKFBIT05FX01BU0ssIHtcbiAgICAgICAgYXV0b2NsZWFyOiB0cnVlLFxuICAgICAgICBwbGFjZWhvbGRlcjogJycsXG4gICAgICB9KTtcbiAgICAgICRyZXF1aXJlZEZpZWxkcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS5vbignY2hhbmdlIGtleXVwIGJsdXIgaW5wdXQgcGFzdGUgZm9jdXNvdXQnLCAoKSA9PiB7XG4gICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2Vycm9yLW1zZycpKSB7XG4gICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKEVSUk9SX0NMQVNTKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmVDbGFzcyhFUlJPUl9DTEFTUyk7XG4gICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKFZBTElEX0NMQVNTKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBmb3JtR2V0KCk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBpbml0OiBpbml0KCksXG4gICAgfTtcbiAgfSxcbn07XG5leHBvcnQgZGVmYXVsdCBqcVZhbGlkYXRvcjtcbiIsImNvbnN0IG1vZGFsV2luZG93ID0ge1xuICBhcHBseVlvdXJDVigpIHtcbiAgICBjb25zdCAkdXBsb2FkSW5wdXQgPSAkKCcuZm9ybS1ncm91cC51cGxvYWQgaW5wdXQnKTtcbiAgICBjb25zdCAkdXBsb2FkTGFiZWwgPSAkKCcuZm9ybS1ncm91cC51cGxvYWQgbGFiZWwnKTtcbiAgICBjb25zdCAkY2xlYXJCdG4gPSAkKCcuY2xlYXItYnRuJyk7XG4gICAgY29uc3QgJGZpbGUgPSAkKCcjZmlsZScpO1xuICAgIGNvbnN0IEFUVEFDSEVEX0NMQVNTID0gJ2F0dGFjaGVkJztcbiAgICBjb25zdCBFUlJPUl9DTEFTUyA9ICdmb3JtLWVycm9yJztcbiAgICBjb25zdCBWQUxJRF9DTEFTUyA9ICdmb3JtLXZhbGlkJztcbiAgICBmdW5jdGlvbiBmaWxlTmFtZSgpIHtcbiAgICAgICR1cGxvYWRJbnB1dC5vbignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBGSUxFX05BTUUgPSAkdXBsb2FkSW5wdXRbMF0uZmlsZXNbMF0ubmFtZTtcbiAgICAgICAgJHVwbG9hZExhYmVsLnRleHQoYCR7RklMRV9OQU1FfSBzZWxlY3RlZGApO1xuICAgICAgICBpZiAoJGZpbGUudmFsKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgJGZpbGUucGFyZW50KCkucmVtb3ZlQ2xhc3MoQVRUQUNIRURfQ0xBU1MpO1xuICAgICAgICAgICRmaWxlLnBhcmVudCgpLmFkZENsYXNzKEVSUk9SX0NMQVNTKTtcbiAgICAgICAgICAkZmlsZS5wYXJlbnQoKS5maW5kKCcuZXJyb3ItbXNnJykuZmFkZUluKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJGZpbGUucGFyZW50KCkucmVtb3ZlQ2xhc3MoRVJST1JfQ0xBU1MpO1xuICAgICAgICAgICRmaWxlLnBhcmVudCgpLmFkZENsYXNzKFZBTElEX0NMQVNTKTtcbiAgICAgICAgICAkZmlsZS5wYXJlbnQoKS5hZGRDbGFzcyhBVFRBQ0hFRF9DTEFTUyk7XG4gICAgICAgICAgJGZpbGUucGFyZW50KCkuZmluZCgnLmVycm9yLW1zZycpLmZhZGVPdXQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAkY2xlYXJCdG4ub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAkKCcjZmlsZScpLnZhbChudWxsKTtcbiAgICAgICAgJHVwbG9hZExhYmVsLnRleHQoJysgQXR0YWNoIHlvdXIgQ1YgZmlsZScpO1xuICAgICAgICAkZmlsZS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnYXR0YWNoZWQnKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgaWYgKCRmaWxlLnZhbCgpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgJGZpbGUudmFsaWQoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRmaWxlLnZhbGlkKCkpO1xuICAgICAgICAgICAgJGZpbGUucGFyZW50KCkucmVtb3ZlQ2xhc3MoQVRUQUNIRURfQ0xBU1MpO1xuICAgICAgICAgICAgJGZpbGUucGFyZW50KCkuYWRkQ2xhc3MoRVJST1JfQ0xBU1MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgMjAwMCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgIGZpbGVOYW1lKCk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBpbml0OiBpbml0KCksXG4gICAgfTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG1vZGFsV2luZG93O1xuIiwiY29uc3QgbmF2YmFyID0ge1xuICByZXNwb25zaXZlTmF2YmFyKCkge1xuICAgIGNvbnN0ICR3aW5kb3cgPSAkKHdpbmRvdyk7XG4gICAgY29uc3QgJGhlYWRlciA9ICQoJy5oZWFkZXInKTtcbiAgICBjb25zdCAkbWVudVRvZ2dsZXIgPSAkKCcubWVudS10b2dnbGVyJyk7XG4gICAgY29uc3QgJG5hdmJhckhvbGRlciA9ICQoJy5uYXZiYXItaG9sZGVyJyk7XG4gICAgY29uc3QgJGNsb3NlQnRuID0gJCgnLmNsb3NlLWJ0bicpO1xuICAgIGNvbnN0ICRsb2dvID0gJCgnLmxvZ28nKTtcbiAgICBjb25zdCBERVNLVE9QX1ZJRVdfV0lEVEggPSAxMDIzO1xuICAgIGNvbnN0IFNDUk9MTF9TVEFSVF9QT0lOVCA9IDA7XG4gICAgY29uc3QgU0NST0xMRURfQ0xBU1MgPSAnc2Nyb2xsZWQnO1xuICAgIGNvbnN0IE9QRU5FRF9DTEFTUyA9ICdvcGVuZWQnO1xuICAgIGZ1bmN0aW9uIHdpZHRoQ2hlY2sod2lkdGgpIHtcbiAgICAgIHJldHVybiAkKHdpbmRvdykud2lkdGgoKSA+IHdpZHRoO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhZGRTY3JvbGxDbGFzcyhlbGVtKSB7XG4gICAgICByZXR1cm4gZWxlbS5hZGRDbGFzcyhTQ1JPTExFRF9DTEFTUyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbW92ZVNjcm9sbENsYXNzKGVsZW0pIHtcbiAgICAgIHJldHVybiBlbGVtLnJlbW92ZUNsYXNzKFNDUk9MTEVEX0NMQVNTKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gb25TY3JvbGxEZXNrdG9wKCkge1xuICAgICAgJHdpbmRvdy5vbignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBCT1RUT01fUE9TSVRJT04gPSAkKGRvY3VtZW50KS5oZWlnaHQoKSAtICQod2luZG93KS5oZWlnaHQoKTtcbiAgICAgICAgY29uc3QgRlJPTV9UT1AgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xuICAgICAgICBpZiAoRlJPTV9UT1AgPiBTQ1JPTExfU1RBUlRfUE9JTlRcbiAgICAgICAgICAgICYmIEZST01fVE9QICE9PSBCT1RUT01fUE9TSVRJT04pIHtcbiAgICAgICAgICBpZiAoIXdpZHRoQ2hlY2soREVTS1RPUF9WSUVXX1dJRFRIKSkgcmV0dXJuO1xuICAgICAgICAgIGFkZFNjcm9sbENsYXNzKCRtZW51VG9nZ2xlcik7XG4gICAgICAgICAgYWRkU2Nyb2xsQ2xhc3MoJG5hdmJhckhvbGRlcik7XG4gICAgICAgICAgYWRkU2Nyb2xsQ2xhc3MoJGxvZ28pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICghd2lkdGhDaGVjayhERVNLVE9QX1ZJRVdfV0lEVEgpKSByZXR1cm47XG4gICAgICAgICAgcmVtb3ZlU2Nyb2xsQ2xhc3MoJG1lbnVUb2dnbGVyKTtcbiAgICAgICAgICByZW1vdmVTY3JvbGxDbGFzcygkbmF2YmFySG9sZGVyKTtcbiAgICAgICAgICByZW1vdmVTY3JvbGxDbGFzcygkbG9nbyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBtZW51SGFuZGxlcigpIHtcbiAgICAgICRtZW51VG9nZ2xlci5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGlmICh3aWR0aENoZWNrKERFU0tUT1BfVklFV19XSURUSCkpIHtcbiAgICAgICAgICByZW1vdmVTY3JvbGxDbGFzcygkbWVudVRvZ2dsZXIpO1xuICAgICAgICAgIHJlbW92ZVNjcm9sbENsYXNzKCRuYXZiYXJIb2xkZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlbW92ZVNjcm9sbENsYXNzKCRuYXZiYXJIb2xkZXIpO1xuICAgICAgICAgICRuYXZiYXJIb2xkZXIuYWRkQ2xhc3MoT1BFTkVEX0NMQVNTKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAkY2xvc2VCdG4ub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAkbmF2YmFySG9sZGVyLnJlbW92ZUNsYXNzKE9QRU5FRF9DTEFTUyk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgIGlmICghJGhlYWRlci5sZW5ndGgpIHJldHVybjtcbiAgICAgIG9uU2Nyb2xsRGVza3RvcCgpO1xuICAgICAgbWVudUhhbmRsZXIoKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGluaXQ6IGluaXQoKSxcbiAgICB9O1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgbmF2YmFyO1xuIiwiY29uc3QgcHJlbG9hZGVyID0ge1xuICBpbml0UHJlbG9hZGVyKCkge1xuICAgIGNvbnN0ICR3cmFwcGVyID0gJCgnI3dyYXBwZXInKTtcbiAgICBjb25zdCAkcHJlbG9hZGVyID0gJCgnLnByZWxvYWRlcicpO1xuICAgIGZ1bmN0aW9uIHBhZ2VMb2FkaW5nKCkge1xuICAgICAgJHdyYXBwZXIuZmFkZUluKCk7XG4gICAgICAkcHJlbG9hZGVyLmZhZGVPdXQoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgIGlmICghJHdyYXBwZXIubGVuZ3RoKSByZXR1cm47XG4gICAgICBzZXRUaW1lb3V0KHBhZ2VMb2FkaW5nLCAxMDAwKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGluaXQ6IGluaXQoKSxcbiAgICB9O1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgcHJlbG9hZGVyO1xuIiwiY29uc3Qgc2xpZGVyID0ge1xuICBvZmZpY2VHYWxsZXJ5KCkge1xuICAgIGZ1bmN0aW9uIHNsaWRlckluaXQoKSB7XG4gICAgICAkKCcuc2xpZGVyLWZvcicpLnNsaWNrKHtcbiAgICAgICAgY2VudGVyTW9kZTogdHJ1ZSxcbiAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICBuZXh0QXJyb3c6ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInNsaWNrLW5leHRcIj48PHN2ZyB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMThcIiBoZWlnaHQ9XCIzMFwiIHZpZXdCb3g9XCIwIDAgNjE0IDEwMjRcIj5cXG4gICAgICAgIDxwYXRoIGZpbGw9XCIjZmZmXCIgZD1cIk02MDMuODczIDQ4OC4zOTZsLTQ5MS45Ny00NzguMTI5Yy03LjA0MC02LjgzNS0xNS4xNDItMTAuMjY3LTI0LjI4Ni0xMC4yNjctOS4xNDggMC0xNy4yNDYgMy40MzItMjQuMjgzIDEwLjI2N2wtNTIuNzc3IDUxLjMwNWMtNy4wNDhcXG4gICAgICAgICA2LjgzOS0xMC41NTcgMTQuNjk1LTEwLjU1NyAyMy42czMuNTA5IDE2Ljc2MSAxMC41NTcgMjMuNmw0MTQuODkzIDQwMy4yMzgtNDE0Ljg5MyA0MDMuMjQ1Yy03LjA0OCA2LjgzOS0xMC41NTcgMTQuNzA5LTEwLjU1NyAyMy41OSAwIDguOTAyIDMuNTA5IDE2Ljc3MlxcbiAgICAgICAgICAxMC41NTcgMjMuNjExbDUyLjc4IDUxLjI4N2M3LjAzNyA2Ljg0NiAxNS4xMzUgMTAuMjU3IDI0LjI4MyAxMC4yNTcgOS4xNDQgMCAxNy4yNDItMy40MTggMjQuMjgzLTEwLjI1N2w0OTEuOTQ0LTQ3OC4xMzJjNy4wMzMtNi44MzUgMTAuNTUzLTE0LjcwOVxcbiAgICAgICAgICAgMTAuNTUzLTIzLjZzLTMuNDk0LTE2Ljc2MS0xMC41MjctMjMuNjE1elwiPjwvcGF0aD5cXG4gICAgICAgIDwvc3ZnPjwvYnV0dG9uPicsXG4gICAgICAgIHByZXZBcnJvdzogJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2xpY2stcHJldlwiPjxzdmcgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjE4XCIgaGVpZ2h0PVwiMzBcIiB2aWV3Qm94PVwiMCAwIDYxNCAxMDI0XCI+XFxuICAgICAgICA8cGF0aCBmaWxsPVwiI2ZmZlwiIGQ9XCJNNjAzLjg3MyA0ODguMzk2bC00OTEuOTctNDc4LjEyOWMtNy4wNDAtNi44MzUtMTUuMTQyLTEwLjI2Ny0yNC4yODYtMTAuMjY3LTkuMTQ4IDAtMTcuMjQ2IDMuNDMyLTI0LjI4MyAxMC4yNjdsLTUyLjc3NyA1MS4zMDVjLTcuMDQ4XFxuICAgICAgICAgNi44MzktMTAuNTU3IDE0LjY5NS0xMC41NTcgMjMuNnMzLjUwOSAxNi43NjEgMTAuNTU3IDIzLjZsNDE0Ljg5MyA0MDMuMjM4LTQxNC44OTMgNDAzLjI0NWMtNy4wNDggNi44MzktMTAuNTU3IDE0LjcwOS0xMC41NTcgMjMuNTkgMCA4LjkwMiAzLjUwOSAxNi43NzJcXG4gICAgICAgICAgMTAuNTU3IDIzLjYxMWw1Mi43OCA1MS4yODdjNy4wMzcgNi44NDYgMTUuMTM1IDEwLjI1NyAyNC4yODMgMTAuMjU3IDkuMTQ0IDAgMTcuMjQyLTMuNDE4IDI0LjI4My0xMC4yNTdsNDkxLjk0NC00NzguMTMyYzcuMDMzLTYuODM1IDEwLjU1My0xNC43MDlcXG4gICAgICAgICAgIDEwLjU1My0yMy42cy0zLjQ5NC0xNi43NjEtMTAuNTI3LTIzLjYxNXpcIj48L3BhdGg+XFxuICAgICAgICA8L3N2Zz48L2J1dHRvbj4nLFxuICAgICAgICB2YXJpYWJsZVdpZHRoOiB0cnVlLFxuICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgYnJlYWtwb2ludDogMTQ0MCxcbiAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgIGNlbnRlclBhZGRpbmc6ICcyMHB4JyxcbiAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDk4MSxcbiAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBicmVha3BvaW50OiA3NjgsXG4gICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICBjZW50ZXJQYWRkaW5nOiAnMTYwcHgnLFxuICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXG4gICAgICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgYnJlYWtwb2ludDogMzIwLFxuICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgICAgICAgZmFkZTogdHJ1ZSxcbiAgICAgICAgICAgICAgYXNOYXZGb3I6ICcuc2xpZGVyLW5hdicsXG4gICAgICAgICAgICAgIGNlbnRlclBhZGRpbmc6ICcwJyxcbiAgICAgICAgICAgICAgY2VudGVyTW9kZTogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pO1xuICAgICAgJCgnLnNsaWRlci1uYXYnKS5zbGljayh7XG4gICAgICAgIHNsaWRlc1RvU2hvdzogMyxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgIGFzTmF2Rm9yOiAnLnNsaWRlci1mb3InLFxuICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgY2VudGVyTW9kZTogdHJ1ZSxcbiAgICAgICAgZm9jdXNPblNlbGVjdDogdHJ1ZSxcbiAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgYWRhcHRpdmVIZWlnaHQ6IHRydWUsXG4gICAgICB9KTtcbiAgICAgICQoJy5wcm9qZWN0LXNsaWRlcicpLnNsaWNrKHtcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgIGluZmluaXRlOiBmYWxzZSxcbiAgICAgICAgdmFyaWFibGVXaWR0aDogdHJ1ZSxcbiAgICAgICAgc3dpcGVUb1NsaWRlOiB0cnVlLFxuICAgICAgICBuZXh0QXJyb3c6ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInNsaWNrLW5leHRcIj48PHN2ZyB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMThcIiBoZWlnaHQ9XCIzMFwiIHZpZXdCb3g9XCIwIDAgNjE0IDEwMjRcIj5cXG4gICAgICAgIDxwYXRoIGZpbGw9XCIjZmZmXCIgZD1cIk02MDMuODczIDQ4OC4zOTZsLTQ5MS45Ny00NzguMTI5Yy03LjA0MC02LjgzNS0xNS4xNDItMTAuMjY3LTI0LjI4Ni0xMC4yNjctOS4xNDggMC0xNy4yNDYgMy40MzItMjQuMjgzIDEwLjI2N2wtNTIuNzc3IDUxLjMwNWMtNy4wNDhcXG4gICAgICAgICA2LjgzOS0xMC41NTcgMTQuNjk1LTEwLjU1NyAyMy42czMuNTA5IDE2Ljc2MSAxMC41NTcgMjMuNmw0MTQuODkzIDQwMy4yMzgtNDE0Ljg5MyA0MDMuMjQ1Yy03LjA0OCA2LjgzOS0xMC41NTcgMTQuNzA5LTEwLjU1NyAyMy41OSAwIDguOTAyIDMuNTA5IDE2Ljc3MlxcbiAgICAgICAgICAxMC41NTcgMjMuNjExbDUyLjc4IDUxLjI4N2M3LjAzNyA2Ljg0NiAxNS4xMzUgMTAuMjU3IDI0LjI4MyAxMC4yNTcgOS4xNDQgMCAxNy4yNDItMy40MTggMjQuMjgzLTEwLjI1N2w0OTEuOTQ0LTQ3OC4xMzJjNy4wMzMtNi44MzUgMTAuNTUzLTE0LjcwOVxcbiAgICAgICAgICAgMTAuNTUzLTIzLjZzLTMuNDk0LTE2Ljc2MS0xMC41MjctMjMuNjE1elwiPjwvcGF0aD5cXG4gICAgICAgIDwvc3ZnPjwvYnV0dG9uPicsXG4gICAgICAgIHByZXZBcnJvdzogJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2xpY2stcHJldlwiPjxzdmcgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjE4XCIgaGVpZ2h0PVwiMzBcIiB2aWV3Qm94PVwiMCAwIDYxNCAxMDI0XCI+XFxuICAgICAgICA8cGF0aCBmaWxsPVwiI2ZmZlwiIGQ9XCJNNjAzLjg3MyA0ODguMzk2bC00OTEuOTctNDc4LjEyOWMtNy4wNDAtNi44MzUtMTUuMTQyLTEwLjI2Ny0yNC4yODYtMTAuMjY3LTkuMTQ4IDAtMTcuMjQ2IDMuNDMyLTI0LjI4MyAxMC4yNjdsLTUyLjc3NyA1MS4zMDVjLTcuMDQ4XFxuICAgICAgICAgNi44MzktMTAuNTU3IDE0LjY5NS0xMC41NTcgMjMuNnMzLjUwOSAxNi43NjEgMTAuNTU3IDIzLjZsNDE0Ljg5MyA0MDMuMjM4LTQxNC44OTMgNDAzLjI0NWMtNy4wNDggNi44MzktMTAuNTU3IDE0LjcwOS0xMC41NTcgMjMuNTkgMCA4LjkwMiAzLjUwOSAxNi43NzJcXG4gICAgICAgICAgMTAuNTU3IDIzLjYxMWw1Mi43OCA1MS4yODdjNy4wMzcgNi44NDYgMTUuMTM1IDEwLjI1NyAyNC4yODMgMTAuMjU3IDkuMTQ0IDAgMTcuMjQyLTMuNDE4IDI0LjI4My0xMC4yNTdsNDkxLjk0NC00NzguMTMyYzcuMDMzLTYuODM1IDEwLjU1My0xNC43MDlcXG4gICAgICAgICAgIDEwLjU1My0yMy42cy0zLjQ5NC0xNi43NjEtMTAuNTI3LTIzLjYxNXpcIj48L3BhdGg+XFxuICAgICAgICA8L3N2Zz48L2J1dHRvbj4nLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICBzbGlkZXJJbml0KCk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBpbml0OiBpbml0KCksXG4gICAgfTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNsaWRlcjtcbiIsImNvbnN0IHRhYnMgPSB7XG4gIGNhcmVlclRhYnMoKSB7XG4gICAgY29uc3QgJHRhYiA9ICQoJy5jYXJkLXZhY2FuY3ktYWN0aW9uJyk7XG4gICAgY29uc3QgJHRhYkNvbnRhaW5lciA9ICQoJy50YWJfY29udGFpbmVyJyk7XG4gICAgY29uc3QgJHRhYkNvbnRlbnQgPSAkKCcudGFiX2NvbnRlbnQnKTtcbiAgICBjb25zdCAkYWNjb3JkaW9uID0gJCgnLnRhYl9hY2NvcmRpb24nKTtcbiAgICBjb25zdCBUQUJfQUNUSVZFX0NMQVNTID0gJ2FjdGl2ZSc7XG4gICAgY29uc3QgJHBhZ2UgPSAkKCdodG1sLCBib2R5Jyk7XG4gICAgZnVuY3Rpb24gZGVza3RvcFRhYnMoKSB7XG4gICAgICAkdGFiLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgY29uc3QgJHJlbFZhbHVlID0gJCh0aGlzKS5hdHRyKCdyZWwnKTtcbiAgICAgICAgICBjb25zdCAkY29udGVudCA9ICR0YWJDb250YWluZXIuZmluZChgW2lkPSR7JHJlbFZhbHVlfV1gKTtcbiAgICAgICAgICAkdGFiLnJlbW92ZUNsYXNzKFRBQl9BQ1RJVkVfQ0xBU1MpO1xuICAgICAgICAgICR0YWJDb250ZW50LmhpZGUoKTtcbiAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFRBQl9BQ1RJVkVfQ0xBU1MpO1xuICAgICAgICAgICRjb250ZW50LmZhZGVJbigpO1xuICAgICAgICAgIGlmICh3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0ICRoYXNoID0gYCMkeyRyZWxWYWx1ZX1gO1xuICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKG51bGwsIG51bGwsICRoYXNoKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkcGFnZS5hbmltYXRlKHsgc2Nyb2xsVG9wOiAwIH0sIDUwMCk7XG4gICAgICAgICAgICAkcGFnZS5vbignc2Nyb2xsIG1vdXNlZG93biB3aGVlbCBET01Nb3VzZVNjcm9sbCBtb3VzZXdoZWVsIGtleXVwIHRvdWNobW92ZScsICgpID0+IHtcbiAgICAgICAgICAgICAgJHBhZ2Uuc3RvcCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0ICRoYXNoID0gYCMkeyRyZWxWYWx1ZX1gO1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSAkaGFzaDtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkcGFnZS5hbmltYXRlKHsgc2Nyb2xsVG9wOiAwIH0sIDUwMCk7XG4gICAgICAgICAgICAkcGFnZS5vbignc2Nyb2xsIG1vdXNlZG93biB3aGVlbCBET01Nb3VzZVNjcm9sbCBtb3VzZXdoZWVsIGtleXVwIHRvdWNobW92ZScsICgpID0+IHtcbiAgICAgICAgICAgICAgJHBhZ2Uuc3RvcCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYWNjb3JkaW9uKCkge1xuICAgICAgJGFjY29yZGlvbi5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICRhY2NvcmRpb24ubm90KCQodGhpcykpLnJlbW92ZUNsYXNzKFRBQl9BQ1RJVkVfQ0xBU1MpO1xuICAgICAgICAkdGFiQ29udGVudC5mYWRlT3V0KCk7XG4gICAgICAgIGNvbnN0ICRyZWxWYWx1ZSA9ICQodGhpcykuYXR0cigncmVsJyk7XG4gICAgICAgIGNvbnN0ICRjb250ZW50ID0gJHRhYkNvbnRhaW5lci5maW5kKGBbaWQ9JHskcmVsVmFsdWV9XWApO1xuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKFRBQl9BQ1RJVkVfQ0xBU1MpO1xuICAgICAgICAkY29udGVudC50b2dnbGUoKTtcbiAgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaGFzaCA9ICQodGhpcykuYXR0cigncmVsJyk7XG4gICAgICB9KTtcbiAgICAgIGlmIChkb2N1bWVudC5sb2NhdGlvbi5oYXNoLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJHRhYkNvbnRlbnQuaGlkZSgpO1xuICAgICAgICAkdGFiLnJlbW92ZUNsYXNzKFRBQl9BQ1RJVkVfQ0xBU1MpO1xuICAgICAgICBjb25zdCBIQVNIID0gZG9jdW1lbnQubG9jYXRpb24uaGFzaC5zcGxpdCgnIycpWzFdO1xuICAgICAgICBjb25zdCAkY3VycmVudFZhY2FuY3kgPSAkdGFiQ29udGFpbmVyLmZpbmQoYFtpZD1cIiR7SEFTSH1cIl1gKTtcbiAgICAgICAgY29uc3QgJGN1cnJlbnRUYWIgPSAkKCcudGFicycpLmZpbmQoYFtyZWw9XCIke0hBU0h9XCJdYCk7XG4gICAgICAgIGNvbnN0ICRjdXJyZW50QWNjID0gJHRhYkNvbnRhaW5lci5maW5kKGBbcmVsPVwiJHtIQVNIfVwiXWApO1xuICAgICAgICAkY3VycmVudFRhYi5hZGRDbGFzcyhUQUJfQUNUSVZFX0NMQVNTKTtcbiAgICAgICAgJGN1cnJlbnRBY2MuYWRkQ2xhc3MoVEFCX0FDVElWRV9DTEFTUyk7XG4gICAgICAgICRjdXJyZW50VmFjYW5jeS5mYWRlSW4oKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgIGlmICghJHRhYi5sZW5ndGgpIHJldHVybjtcbiAgICAgIGRlc2t0b3BUYWJzKCk7XG4gICAgICBhY2NvcmRpb24oKTtcbiAgICAgIC8vIGlmIChTQ1JFRU5fV0lEVEggPiA3NjgpICR0YWJDb250YWluZXIuZmluZCgnW2lkPVwidGFiMVwiXScpLmZhZGVJbigpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaW5pdDogaW5pdCgpLFxuICAgIH07XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCB0YWJzO1xuIl19
