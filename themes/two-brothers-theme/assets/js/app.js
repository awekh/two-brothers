(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

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

(function ($) {
  // When DOM is ready
  $(function () {
    _preloader2.default.initPreloader();
    _jqValidator2.default.checkForm();
    _modal2.default.applyYourCV();
    _vacancyTab2.default.careerTabs();
    _footerDate2.default.setDate();
    _contactForm2.default.toDo();
    _navbar2.default.responsiveNavbar();
  });
})(jQuery); // You can write a call and import your functions in this file.
//
// This file will be compiled into app.js and will not be minified.
// Feel free with using ES6 here.

// import {NAME} from './modules/...';
// import mapApi from './modules/map';

},{"./modules/contactForm":2,"./modules/footerDate":3,"./modules/jqValidator":4,"./modules/modal":5,"./modules/navbar":6,"./modules/preloader":7,"./modules/vacancyTab":8}],2:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0aGVtZXMvdHdvLWJyb3RoZXJzLXRoZW1lL3NyYy9qcy9hcHAuanMiLCJ0aGVtZXMvdHdvLWJyb3RoZXJzLXRoZW1lL3NyYy9qcy9tb2R1bGVzL2NvbnRhY3RGb3JtLmpzIiwidGhlbWVzL3R3by1icm90aGVycy10aGVtZS9zcmMvanMvbW9kdWxlcy9mb290ZXJEYXRlLmpzIiwidGhlbWVzL3R3by1icm90aGVycy10aGVtZS9zcmMvanMvbW9kdWxlcy9qcVZhbGlkYXRvci5qcyIsInRoZW1lcy90d28tYnJvdGhlcnMtdGhlbWUvc3JjL2pzL21vZHVsZXMvbW9kYWwuanMiLCJ0aGVtZXMvdHdvLWJyb3RoZXJzLXRoZW1lL3NyYy9qcy9tb2R1bGVzL25hdmJhci5qcyIsInRoZW1lcy90d28tYnJvdGhlcnMtdGhlbWUvc3JjL2pzL21vZHVsZXMvcHJlbG9hZGVyLmpzIiwidGhlbWVzL3R3by1icm90aGVycy10aGVtZS9zcmMvanMvbW9kdWxlcy92YWNhbmN5VGFiLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNPQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsQ0FBQyxVQUFDLENBQUQsRUFBTztBQUNOO0FBQ0EsSUFBRSxZQUFNO0FBQ04sd0JBQVUsYUFBVjtBQUNBLDBCQUFZLFNBQVo7QUFDQSxvQkFBWSxXQUFaO0FBQ0EseUJBQUssVUFBTDtBQUNBLHlCQUFXLE9BQVg7QUFDQSwwQkFBWSxJQUFaO0FBQ0EscUJBQU8sZ0JBQVA7QUFDRCxHQVJEO0FBU0QsQ0FYRCxFQVdHLE1BWEgsRSxDQWZBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDTkEsSUFBTSxjQUFjO0FBQ2xCLE1BRGtCLGtCQUNYO0FBQ0wsUUFBTSxRQUFRLEVBQUUsZUFBRixDQUFkO0FBQ0EsUUFBTSxZQUFZLE1BQU0sSUFB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QUdEO0FBdkVVLENBQWI7O2tCQTBFZSxJIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gWW91IGNhbiB3cml0ZSBhIGNhbGwgYW5kIGltcG9ydCB5b3VyIGZ1bmN0aW9ucyBpbiB0aGlzIGZpbGUuXG4vL1xuLy8gVGhpcyBmaWxlIHdpbGwgYmUgY29tcGlsZWQgaW50byBhcHAuanMgYW5kIHdpbGwgbm90IGJlIG1pbmlmaWVkLlxuLy8gRmVlbCBmcmVlIHdpdGggdXNpbmcgRVM2IGhlcmUuXG5cbi8vIGltcG9ydCB7TkFNRX0gZnJvbSAnLi9tb2R1bGVzLy4uLic7XG4vLyBpbXBvcnQgbWFwQXBpIGZyb20gJy4vbW9kdWxlcy9tYXAnO1xuaW1wb3J0IG1vZGFsV2luZG93IGZyb20gJy4vbW9kdWxlcy9tb2RhbCc7XG5pbXBvcnQgdGFicyBmcm9tICcuL21vZHVsZXMvdmFjYW5jeVRhYic7XG5pbXBvcnQgZm9vdGVyRGF0ZSBmcm9tICcuL21vZHVsZXMvZm9vdGVyRGF0ZSc7XG5pbXBvcnQganFWYWxpZGF0b3IgZnJvbSAnLi9tb2R1bGVzL2pxVmFsaWRhdG9yJztcbmltcG9ydCBjb250YWN0Rm9ybSBmcm9tICcuL21vZHVsZXMvY29udGFjdEZvcm0nO1xuaW1wb3J0IHByZWxvYWRlciBmcm9tICcuL21vZHVsZXMvcHJlbG9hZGVyJztcbmltcG9ydCBuYXZiYXIgZnJvbSAnLi9tb2R1bGVzL25hdmJhcic7XG5cbigoJCkgPT4ge1xuICAvLyBXaGVuIERPTSBpcyByZWFkeVxuICAkKCgpID0+IHtcbiAgICBwcmVsb2FkZXIuaW5pdFByZWxvYWRlcigpO1xuICAgIGpxVmFsaWRhdG9yLmNoZWNrRm9ybSgpO1xuICAgIG1vZGFsV2luZG93LmFwcGx5WW91ckNWKCk7XG4gICAgdGFicy5jYXJlZXJUYWJzKCk7XG4gICAgZm9vdGVyRGF0ZS5zZXREYXRlKCk7XG4gICAgY29udGFjdEZvcm0udG9EbygpO1xuICAgIG5hdmJhci5yZXNwb25zaXZlTmF2YmFyKCk7XG4gIH0pO1xufSkoalF1ZXJ5KTtcbiIsImNvbnN0IGNvbnRhY3RGb3JtID0ge1xuICB0b0RvKCkge1xuICAgIGNvbnN0ICRmb3JtID0gJCgnI2NvbnRhY3QtZm9ybScpO1xuICAgIGNvbnN0ICRzdWNjZXNFbCA9ICRmb3JtLmZpbmQoJ1t0eXBlPVwic3VibWl0XCJdJyk7XG4gICAgY29uc3QgU1VDQ0VTU19DTEFTUyA9ICdzdWNjZXNzJztcbiAgICBjb25zdCBFUlJPUl9DTEFTUyA9ICdmb3JtLWVycm9yJztcbiAgICBjb25zdCBWQUxJRF9DTEFTUyA9ICdmb3JtLXZhbGlkJztcbiAgICBjb25zdCAkcmVxdWlyZWRGaWVsZHMgPSAkKCcucmVxdWlyZWQnKTtcbiAgICBmdW5jdGlvbiBjaGVja0ZvclZhbGlkKCkge1xuICAgICAgJGZvcm0udmFsaWRhdGUoe1xuICAgICAgICBydWxlczoge1xuICAgICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgICAgbWlubGVuZ3RoOiAyLFxuICAgICAgICAgICAgbWF4bGVuZ3RoOiAxNTAsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBlbWFpbDoge1xuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgICBlbWFpbDogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBtZXNzYWdlczoge1xuICAgICAgICAgIG5hbWU6ICdQbGVhc2UgZW50ZXIgeW91ciBuYW1lJyxcbiAgICAgICAgICBlbWFpbDogJ1BsZWFzZSBjaGVjayB5b3VyIGVtYWlsJyxcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3JDbGFzczogJ2Vycm9yLW1zZycsXG4gICAgICAgIGVycm9yRWxlbWVudDogJ3NwYW4nLFxuICAgICAgICBzdWJtaXRIYW5kbGVyOiAoKSA9PiB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAkc3VjY2VzRWwuYWRkQ2xhc3MoU1VDQ0VTU19DTEFTUyk7XG4gICAgICAgICAgICAkZm9ybVswXS5yZXNldCgpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICRzdWNjZXNFbC5yZW1vdmVDbGFzcyhTVUNDRVNTX0NMQVNTKTtcbiAgICAgICAgICAgIH0sIDMwMDApO1xuICAgICAgICAgIH0sIDMwMDApO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGZvcm1HZXQoKSB7XG4gICAgICAkZm9ybS5zdWJtaXQoKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNoZWNrRm9yVmFsaWQoKTtcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tGb3JDaGFuZ2VzKCkge1xuICAgICAgICAgICRyZXF1aXJlZEZpZWxkcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdlcnJvci1tc2cnKSkge1xuICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKEVSUk9SX0NMQVNTKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkucmVtb3ZlQ2xhc3MoRVJST1JfQ0xBU1MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY2hlY2tGb3JDaGFuZ2VzKCk7XG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgICQuZWFjaCgkZm9ybS5zZXJpYWxpemVBcnJheSgpLCAoaywgdikgPT4ge1xuICAgICAgICAgIGZvcm1EYXRhLnNldCh2Lm5hbWUsIHYudmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCRyZXF1aXJlZEZpZWxkcy52YWxpZCgpKSB7XG4gICAgICAgICAgalF1ZXJ5LmFqYXgoe1xuICAgICAgICAgICAgdXJsOiAnL2FwaS9jb250YWN0X3VzLnBocCcsXG4gICAgICAgICAgICBkYXRhOiBmb3JtRGF0YSxcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICAgICAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICBjaGVja0ZvclZhbGlkKCk7XG4gICAgICAkcmVxdWlyZWRGaWVsZHMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykub24oJ2NoYW5nZSBrZXl1cCBibHVyIGlucHV0IHBhc3RlIGZvY3Vzb3V0JywgKCkgPT4ge1xuICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdlcnJvci1tc2cnKSkge1xuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5hZGRDbGFzcyhFUlJPUl9DTEFTUyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQodGhpcykucGFyZW50KCkucmVtb3ZlQ2xhc3MoRVJST1JfQ0xBU1MpO1xuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5hZGRDbGFzcyhWQUxJRF9DTEFTUyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgZm9ybUdldCgpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaW5pdDogaW5pdCgpLFxuICAgIH07XG4gIH0sXG59O1xuZXhwb3J0IGRlZmF1bHQgY29udGFjdEZvcm07XG4iLCJjb25zdCBmb290ZXJEYXRlID0ge1xuICBzZXREYXRlKCkge1xuICAgIGNvbnN0ICRjdXJyZW50WWVhciA9ICQoJyNjdXJyZW50WWVhcicpO1xuICAgIGZ1bmN0aW9uIHNldEN1cnJlbnREYXRlKCkge1xuICAgICAgJGN1cnJlbnRZZWFyLnRleHQoKG5ldyBEYXRlKCkpLmdldEZ1bGxZZWFyKCkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgaWYgKCEkY3VycmVudFllYXIubGVuZ3RoKSByZXR1cm47XG4gICAgICBzZXRDdXJyZW50RGF0ZSgpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaW5pdDogaW5pdCgpLFxuICAgIH07XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmb290ZXJEYXRlO1xuIiwiY29uc3QganFWYWxpZGF0b3IgPSB7XG4gIGNoZWNrRm9ybSgpIHtcbiAgICBjb25zdCAkZm9ybSA9ICQoJyNhcHBseUNWJyk7XG4gICAgY29uc3QgJGZpbGUgPSAkKCcjZmlsZScpO1xuICAgIGNvbnN0ICRwaG9uZSA9ICQoJy5mb3JtLWN2LXVwbG9hZCBpbnB1dFtuYW1lPXBob25lXScpO1xuICAgIGNvbnN0IFBIT05FX01BU0sgPSAnKDk5OSkgOTk5IDk5IDk5JztcbiAgICBjb25zdCAkdXBsb2FkTGFiZWwgPSAkKCcuZm9ybS1ncm91cC51cGxvYWQgbGFiZWwnKTtcbiAgICBjb25zdCAkcmVxdWlyZWRGaWVsZHMgPSAkKCcucmVxdWlyZWQnKTtcbiAgICBjb25zdCAkc3VjY2VzRWwgPSAkZm9ybS5maW5kKCdbdHlwZT1cInN1Ym1pdFwiXScpO1xuICAgIGNvbnN0ICRzdWNjZXNUZXh0RWwgPSAkc3VjY2VzRWwuZmluZCgnc3BhbicpO1xuICAgIGNvbnN0IEFUVEFDSEVEX0NMQVNTID0gJ2F0dGFjaGVkJztcbiAgICBjb25zdCBFUlJPUl9DTEFTUyA9ICdmb3JtLWVycm9yJztcbiAgICBjb25zdCBWQUxJRF9DTEFTUyA9ICdmb3JtLXZhbGlkJztcbiAgICBjb25zdCBTVUNDRVNTX0NMQVNTID0gJ3N1Y2Nlc3MnO1xuICAgIGNvbnN0IERFRkFVTFRfU1VCTUlUX1RFWFQgPSAkc3VjY2VzVGV4dEVsLnRleHQoKTtcbiAgICBjb25zdCBTVUNDRVNTX1NVQk1JVF9URVhUID0gJ1RoYW5rIHlvdSBmb3Igc3VibWl0dGluZyc7XG4gICAgZnVuY3Rpb24gZm9ybUFjdGlvbigpIHtcbiAgICAgICQoJyNhcHBseUNWJykudmFsaWRhdGUoe1xuICAgICAgICBydWxlczoge1xuICAgICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgICAgbWlubGVuZ3RoOiAxLFxuICAgICAgICAgICAgbWF4bGVuZ3RoOiAxNTAsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBlbWFpbDoge1xuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgICBlbWFpbDogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHBob25lOiB7XG4gICAgICAgICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBwb3NpdGlvbjoge1xuICAgICAgICAgICAgbWlubGVuZ3RoOiAyLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY3Y6IHtcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIG1lc3NhZ2VzOiB7XG4gICAgICAgICAgbmFtZTogJ1BsZWFzZSBlbnRlciB5b3VyIG5hbWUnLFxuICAgICAgICAgIGVtYWlsOiAnUGxlYXNlIGNoZWNrIHlvdXIgZW1haWwnLFxuICAgICAgICAgIHBob25lOiAnUGxlYXNlIGVudGVyIGNvcnJlY3QgcGhvbmUgbnVtYmVyJyxcbiAgICAgICAgICBwb3NpdGlvbjogJ1BsZWFzZSBlbnRlciBwb3NpdGlvbicsXG4gICAgICAgICAgY3Y6ICdQbGVhc2UgYXR0YWNoIHlvdXIgQ1YnLFxuICAgICAgICB9LFxuICAgICAgICBlcnJvckNsYXNzOiAnZXJyb3ItbXNnJyxcbiAgICAgICAgZXJyb3JFbGVtZW50OiAnc3BhbicsXG4gICAgICAgIHN1Ym1pdEhhbmRsZXI6ICgpID0+IHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICgkZmlsZS52YWxpZCgpKSB7XG4gICAgICAgICAgICAgICRzdWNjZXNFbC5hZGRDbGFzcyhTVUNDRVNTX0NMQVNTKTtcbiAgICAgICAgICAgICAgJHN1Y2Nlc1RleHRFbC50ZXh0KFNVQ0NFU1NfU1VCTUlUX1RFWFQpO1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAkdXBsb2FkTGFiZWwudGV4dCgnKyBBdHRhY2ggeW91ciBDViBmaWxlJyk7XG4gICAgICAgICAgICAgICAgJGZvcm1bMF0ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAkZmlsZS52YWwobnVsbCk7XG4gICAgICAgICAgICAgICAgJGZpbGUucGFyZW50KCkucmVtb3ZlQ2xhc3MoQVRUQUNIRURfQ0xBU1MpO1xuICAgICAgICAgICAgICAgICRzdWNjZXNFbC5yZW1vdmVDbGFzcyhTVUNDRVNTX0NMQVNTKTtcbiAgICAgICAgICAgICAgICAkc3VjY2VzVGV4dEVsLnRleHQoREVGQVVMVF9TVUJNSVRfVEVYVCk7XG4gICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gICAgY29uc3QgZm9ybUNoZWNrID0ge1xuICAgICAgY3ZfZmlsZTogKCkgPT4ge1xuICAgICAgICBpZiAoJGZpbGUudmFsKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgJGZpbGUucGFyZW50KCkucmVtb3ZlQ2xhc3MoQVRUQUNIRURfQ0xBU1MpO1xuICAgICAgICAgICRmaWxlLnBhcmVudCgpLmFkZENsYXNzKEVSUk9SX0NMQVNTKTtcbiAgICAgICAgICAkZmlsZS5wYXJlbnQoKS5maW5kKCcuZXJyb3ItbXNnJykuZmFkZUluKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJGZpbGUucGFyZW50KCkucmVtb3ZlQ2xhc3MoRVJST1JfQ0xBU1MpO1xuICAgICAgICAgICRmaWxlLnBhcmVudCgpLmFkZENsYXNzKFZBTElEX0NMQVNTKTtcbiAgICAgICAgICAkZmlsZS5wYXJlbnQoKS5hZGRDbGFzcyhBVFRBQ0hFRF9DTEFTUyk7XG4gICAgICAgICAgJGZpbGUucGFyZW50KCkuZmluZCgnLmVycm9yLW1zZycpLmZhZGVPdXQoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9O1xuICAgIGZ1bmN0aW9uIGZvcm1HZXQoKSB7XG4gICAgICAkZm9ybS5zdWJtaXQoKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrRm9yQ2hhbmdlcygpIHtcbiAgICAgICAgICAkcmVxdWlyZWRGaWVsZHMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnZXJyb3ItbXNnJykpIHtcbiAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5hZGRDbGFzcyhFUlJPUl9DTEFTUyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnJlbW92ZUNsYXNzKEVSUk9SX0NMQVNTKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmb3JtQ2hlY2suY3ZfZmlsZSgpO1xuICAgICAgICAkZmlsZS52YWxpZCgpO1xuICAgICAgICBjaGVja0ZvckNoYW5nZXMoKTtcbiAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgJC5lYWNoKCQoJ1tuYW1lPWN2XScpWzBdLmZpbGVzLCAoaSwgZmlsZSkgPT4ge1xuICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnY3YnLCBmaWxlKTtcbiAgICAgICAgfSk7XG4gICAgICAgICQuZWFjaCgkZm9ybS5zZXJpYWxpemVBcnJheSgpLCAoaywgdikgPT4ge1xuICAgICAgICAgIGZvcm1EYXRhLnNldCh2Lm5hbWUsIHYudmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCRmaWxlLnZhbGlkKCkgJiYgJHJlcXVpcmVkRmllbGRzLnZhbGlkKCkpIHtcbiAgICAgICAgICBqUXVlcnkuYWpheCh7XG4gICAgICAgICAgICB1cmw6ICcvYXBpL3NlbmRfY3YucGhwJyxcbiAgICAgICAgICAgIGRhdGE6IGZvcm1EYXRhLFxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IGZhbHNlLFxuICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgIGlmICghJGZvcm0ubGVuZ3RoKSByZXR1cm47XG4gICAgICBmb3JtQWN0aW9uKCk7XG4gICAgICAkcGhvbmUuY2hhbmdlKGZvcm1DaGVjay5jdl9waG9uZSkubWFzayhQSE9ORV9NQVNLLCB7XG4gICAgICAgIGF1dG9jbGVhcjogdHJ1ZSxcbiAgICAgICAgcGxhY2Vob2xkZXI6ICcnLFxuICAgICAgfSk7XG4gICAgICAkcmVxdWlyZWRGaWVsZHMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykub24oJ2NoYW5nZSBrZXl1cCBibHVyIGlucHV0IHBhc3RlIGZvY3Vzb3V0JywgKCkgPT4ge1xuICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdlcnJvci1tc2cnKSkge1xuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5hZGRDbGFzcyhFUlJPUl9DTEFTUyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQodGhpcykucGFyZW50KCkucmVtb3ZlQ2xhc3MoRVJST1JfQ0xBU1MpO1xuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5hZGRDbGFzcyhWQUxJRF9DTEFTUyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgZm9ybUdldCgpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaW5pdDogaW5pdCgpLFxuICAgIH07XG4gIH0sXG59O1xuZXhwb3J0IGRlZmF1bHQganFWYWxpZGF0b3I7XG4iLCJjb25zdCBtb2RhbFdpbmRvdyA9IHtcbiAgYXBwbHlZb3VyQ1YoKSB7XG4gICAgY29uc3QgJHVwbG9hZElucHV0ID0gJCgnLmZvcm0tZ3JvdXAudXBsb2FkIGlucHV0Jyk7XG4gICAgY29uc3QgJHVwbG9hZExhYmVsID0gJCgnLmZvcm0tZ3JvdXAudXBsb2FkIGxhYmVsJyk7XG4gICAgY29uc3QgJGNsZWFyQnRuID0gJCgnLmNsZWFyLWJ0bicpO1xuICAgIGNvbnN0ICRmaWxlID0gJCgnI2ZpbGUnKTtcbiAgICBjb25zdCBBVFRBQ0hFRF9DTEFTUyA9ICdhdHRhY2hlZCc7XG4gICAgY29uc3QgRVJST1JfQ0xBU1MgPSAnZm9ybS1lcnJvcic7XG4gICAgY29uc3QgVkFMSURfQ0xBU1MgPSAnZm9ybS12YWxpZCc7XG4gICAgZnVuY3Rpb24gZmlsZU5hbWUoKSB7XG4gICAgICAkdXBsb2FkSW5wdXQub24oJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgY29uc3QgRklMRV9OQU1FID0gJHVwbG9hZElucHV0WzBdLmZpbGVzWzBdLm5hbWU7XG4gICAgICAgICR1cGxvYWRMYWJlbC50ZXh0KGAke0ZJTEVfTkFNRX0gc2VsZWN0ZWRgKTtcbiAgICAgICAgaWYgKCRmaWxlLnZhbCgpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICRmaWxlLnBhcmVudCgpLnJlbW92ZUNsYXNzKEFUVEFDSEVEX0NMQVNTKTtcbiAgICAgICAgICAkZmlsZS5wYXJlbnQoKS5hZGRDbGFzcyhFUlJPUl9DTEFTUyk7XG4gICAgICAgICAgJGZpbGUucGFyZW50KCkuZmluZCgnLmVycm9yLW1zZycpLmZhZGVJbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRmaWxlLnBhcmVudCgpLnJlbW92ZUNsYXNzKEVSUk9SX0NMQVNTKTtcbiAgICAgICAgICAkZmlsZS5wYXJlbnQoKS5hZGRDbGFzcyhWQUxJRF9DTEFTUyk7XG4gICAgICAgICAgJGZpbGUucGFyZW50KCkuYWRkQ2xhc3MoQVRUQUNIRURfQ0xBU1MpO1xuICAgICAgICAgICRmaWxlLnBhcmVudCgpLmZpbmQoJy5lcnJvci1tc2cnKS5mYWRlT3V0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgJGNsZWFyQnRuLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgJCgnI2ZpbGUnKS52YWwobnVsbCk7XG4gICAgICAgICR1cGxvYWRMYWJlbC50ZXh0KCcrIEF0dGFjaCB5b3VyIENWIGZpbGUnKTtcbiAgICAgICAgJGZpbGUucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2F0dGFjaGVkJyk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGlmICgkZmlsZS52YWwoKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICRmaWxlLnZhbGlkKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygkZmlsZS52YWxpZCgpKTtcbiAgICAgICAgICAgICRmaWxlLnBhcmVudCgpLnJlbW92ZUNsYXNzKEFUVEFDSEVEX0NMQVNTKTtcbiAgICAgICAgICAgICRmaWxlLnBhcmVudCgpLmFkZENsYXNzKEVSUk9SX0NMQVNTKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDIwMDApO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICBmaWxlTmFtZSgpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaW5pdDogaW5pdCgpLFxuICAgIH07XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBtb2RhbFdpbmRvdztcbiIsImNvbnN0IG5hdmJhciA9IHtcbiAgcmVzcG9uc2l2ZU5hdmJhcigpIHtcbiAgICBjb25zdCAkd2luZG93ID0gJCh3aW5kb3cpO1xuICAgIGNvbnN0ICRoZWFkZXIgPSAkKCcuaGVhZGVyJyk7XG4gICAgY29uc3QgJG1lbnVUb2dnbGVyID0gJCgnLm1lbnUtdG9nZ2xlcicpO1xuICAgIGNvbnN0ICRuYXZiYXJIb2xkZXIgPSAkKCcubmF2YmFyLWhvbGRlcicpO1xuICAgIGNvbnN0ICRjbG9zZUJ0biA9ICQoJy5jbG9zZS1idG4nKTtcbiAgICBjb25zdCAkbG9nbyA9ICQoJy5sb2dvJyk7XG4gICAgY29uc3QgREVTS1RPUF9WSUVXX1dJRFRIID0gMTAyMztcbiAgICBjb25zdCBTQ1JPTExfU1RBUlRfUE9JTlQgPSAwO1xuICAgIGNvbnN0IFNDUk9MTEVEX0NMQVNTID0gJ3Njcm9sbGVkJztcbiAgICBjb25zdCBPUEVORURfQ0xBU1MgPSAnb3BlbmVkJztcbiAgICBmdW5jdGlvbiB3aWR0aENoZWNrKHdpZHRoKSB7XG4gICAgICByZXR1cm4gJCh3aW5kb3cpLndpZHRoKCkgPiB3aWR0aDtcbiAgICB9XG4gICAgZnVuY3Rpb24gYWRkU2Nyb2xsQ2xhc3MoZWxlbSkge1xuICAgICAgcmV0dXJuIGVsZW0uYWRkQ2xhc3MoU0NST0xMRURfQ0xBU1MpO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZW1vdmVTY3JvbGxDbGFzcyhlbGVtKSB7XG4gICAgICByZXR1cm4gZWxlbS5yZW1vdmVDbGFzcyhTQ1JPTExFRF9DTEFTUyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uU2Nyb2xsRGVza3RvcCgpIHtcbiAgICAgICR3aW5kb3cub24oJ3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgQk9UVE9NX1BPU0lUSU9OID0gJChkb2N1bWVudCkuaGVpZ2h0KCkgLSAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgICAgIGNvbnN0IEZST01fVE9QID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcbiAgICAgICAgaWYgKEZST01fVE9QID4gU0NST0xMX1NUQVJUX1BPSU5UXG4gICAgICAgICAgICAmJiBGUk9NX1RPUCAhPT0gQk9UVE9NX1BPU0lUSU9OKSB7XG4gICAgICAgICAgaWYgKCF3aWR0aENoZWNrKERFU0tUT1BfVklFV19XSURUSCkpIHJldHVybjtcbiAgICAgICAgICBhZGRTY3JvbGxDbGFzcygkbWVudVRvZ2dsZXIpO1xuICAgICAgICAgIGFkZFNjcm9sbENsYXNzKCRuYXZiYXJIb2xkZXIpO1xuICAgICAgICAgIGFkZFNjcm9sbENsYXNzKCRsb2dvKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIXdpZHRoQ2hlY2soREVTS1RPUF9WSUVXX1dJRFRIKSkgcmV0dXJuO1xuICAgICAgICAgIHJlbW92ZVNjcm9sbENsYXNzKCRtZW51VG9nZ2xlcik7XG4gICAgICAgICAgcmVtb3ZlU2Nyb2xsQ2xhc3MoJG5hdmJhckhvbGRlcik7XG4gICAgICAgICAgcmVtb3ZlU2Nyb2xsQ2xhc3MoJGxvZ28pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbWVudUhhbmRsZXIoKSB7XG4gICAgICAkbWVudVRvZ2dsZXIub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBpZiAod2lkdGhDaGVjayhERVNLVE9QX1ZJRVdfV0lEVEgpKSB7XG4gICAgICAgICAgcmVtb3ZlU2Nyb2xsQ2xhc3MoJG1lbnVUb2dnbGVyKTtcbiAgICAgICAgICByZW1vdmVTY3JvbGxDbGFzcygkbmF2YmFySG9sZGVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZW1vdmVTY3JvbGxDbGFzcygkbmF2YmFySG9sZGVyKTtcbiAgICAgICAgICAkbmF2YmFySG9sZGVyLmFkZENsYXNzKE9QRU5FRF9DTEFTUyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgJGNsb3NlQnRuLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgJG5hdmJhckhvbGRlci5yZW1vdmVDbGFzcyhPUEVORURfQ0xBU1MpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICBpZiAoISRoZWFkZXIubGVuZ3RoKSByZXR1cm47XG4gICAgICBvblNjcm9sbERlc2t0b3AoKTtcbiAgICAgIG1lbnVIYW5kbGVyKCk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBpbml0OiBpbml0KCksXG4gICAgfTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5hdmJhcjtcbiIsImNvbnN0IHByZWxvYWRlciA9IHtcbiAgaW5pdFByZWxvYWRlcigpIHtcbiAgICBjb25zdCAkd3JhcHBlciA9ICQoJyN3cmFwcGVyJyk7XG4gICAgY29uc3QgJHByZWxvYWRlciA9ICQoJy5wcmVsb2FkZXInKTtcbiAgICBmdW5jdGlvbiBwYWdlTG9hZGluZygpIHtcbiAgICAgICR3cmFwcGVyLmZhZGVJbigpO1xuICAgICAgJHByZWxvYWRlci5mYWRlT3V0KCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICBpZiAoISR3cmFwcGVyLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgc2V0VGltZW91dChwYWdlTG9hZGluZywgMTAwMCk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBpbml0OiBpbml0KCksXG4gICAgfTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHByZWxvYWRlcjtcbiIsImNvbnN0IHRhYnMgPSB7XG4gIGNhcmVlclRhYnMoKSB7XG4gICAgY29uc3QgJHRhYiA9ICQoJy5jYXJkLXZhY2FuY3ktYWN0aW9uJyk7XG4gICAgY29uc3QgJHRhYkNvbnRhaW5lciA9ICQoJy50YWJfY29udGFpbmVyJyk7XG4gICAgY29uc3QgJHRhYkNvbnRlbnQgPSAkKCcudGFiX2NvbnRlbnQnKTtcbiAgICBjb25zdCAkYWNjb3JkaW9uID0gJCgnLnRhYl9hY2NvcmRpb24nKTtcbiAgICBjb25zdCBUQUJfQUNUSVZFX0NMQVNTID0gJ2FjdGl2ZSc7XG4gICAgY29uc3QgJHBhZ2UgPSAkKCdodG1sLCBib2R5Jyk7XG4gICAgZnVuY3Rpb24gZGVza3RvcFRhYnMoKSB7XG4gICAgICAkdGFiLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgY29uc3QgJHJlbFZhbHVlID0gJCh0aGlzKS5hdHRyKCdyZWwnKTtcbiAgICAgICAgICBjb25zdCAkY29udGVudCA9ICR0YWJDb250YWluZXIuZmluZChgW2lkPSR7JHJlbFZhbHVlfV1gKTtcbiAgICAgICAgICAkdGFiLnJlbW92ZUNsYXNzKFRBQl9BQ1RJVkVfQ0xBU1MpO1xuICAgICAgICAgICR0YWJDb250ZW50LmhpZGUoKTtcbiAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFRBQl9BQ1RJVkVfQ0xBU1MpO1xuICAgICAgICAgICRjb250ZW50LmZhZGVJbigpO1xuICAgICAgICAgIGlmICh3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0ICRoYXNoID0gYCMkeyRyZWxWYWx1ZX1gO1xuICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKG51bGwsIG51bGwsICRoYXNoKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkcGFnZS5hbmltYXRlKHsgc2Nyb2xsVG9wOiAwIH0sIDUwMCk7XG4gICAgICAgICAgICAkcGFnZS5vbignc2Nyb2xsIG1vdXNlZG93biB3aGVlbCBET01Nb3VzZVNjcm9sbCBtb3VzZXdoZWVsIGtleXVwIHRvdWNobW92ZScsICgpID0+IHtcbiAgICAgICAgICAgICAgJHBhZ2Uuc3RvcCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0ICRoYXNoID0gYCMkeyRyZWxWYWx1ZX1gO1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSAkaGFzaDtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkcGFnZS5hbmltYXRlKHsgc2Nyb2xsVG9wOiAwIH0sIDUwMCk7XG4gICAgICAgICAgICAkcGFnZS5vbignc2Nyb2xsIG1vdXNlZG93biB3aGVlbCBET01Nb3VzZVNjcm9sbCBtb3VzZXdoZWVsIGtleXVwIHRvdWNobW92ZScsICgpID0+IHtcbiAgICAgICAgICAgICAgJHBhZ2Uuc3RvcCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYWNjb3JkaW9uKCkge1xuICAgICAgJGFjY29yZGlvbi5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICRhY2NvcmRpb24ubm90KCQodGhpcykpLnJlbW92ZUNsYXNzKFRBQl9BQ1RJVkVfQ0xBU1MpO1xuICAgICAgICAkdGFiQ29udGVudC5mYWRlT3V0KCk7XG4gICAgICAgIGNvbnN0ICRyZWxWYWx1ZSA9ICQodGhpcykuYXR0cigncmVsJyk7XG4gICAgICAgIGNvbnN0ICRjb250ZW50ID0gJHRhYkNvbnRhaW5lci5maW5kKGBbaWQ9JHskcmVsVmFsdWV9XWApO1xuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKFRBQl9BQ1RJVkVfQ0xBU1MpO1xuICAgICAgICAkY29udGVudC50b2dnbGUoKTtcbiAgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaGFzaCA9ICQodGhpcykuYXR0cigncmVsJyk7XG4gICAgICB9KTtcbiAgICAgIGlmIChkb2N1bWVudC5sb2NhdGlvbi5oYXNoLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJHRhYkNvbnRlbnQuaGlkZSgpO1xuICAgICAgICAkdGFiLnJlbW92ZUNsYXNzKFRBQl9BQ1RJVkVfQ0xBU1MpO1xuICAgICAgICBjb25zdCBIQVNIID0gZG9jdW1lbnQubG9jYXRpb24uaGFzaC5zcGxpdCgnIycpWzFdO1xuICAgICAgICBjb25zdCAkY3VycmVudFZhY2FuY3kgPSAkdGFiQ29udGFpbmVyLmZpbmQoYFtpZD1cIiR7SEFTSH1cIl1gKTtcbiAgICAgICAgY29uc3QgJGN1cnJlbnRUYWIgPSAkKCcudGFicycpLmZpbmQoYFtyZWw9XCIke0hBU0h9XCJdYCk7XG4gICAgICAgIGNvbnN0ICRjdXJyZW50QWNjID0gJHRhYkNvbnRhaW5lci5maW5kKGBbcmVsPVwiJHtIQVNIfVwiXWApO1xuICAgICAgICAkY3VycmVudFRhYi5hZGRDbGFzcyhUQUJfQUNUSVZFX0NMQVNTKTtcbiAgICAgICAgJGN1cnJlbnRBY2MuYWRkQ2xhc3MoVEFCX0FDVElWRV9DTEFTUyk7XG4gICAgICAgICRjdXJyZW50VmFjYW5jeS5mYWRlSW4oKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgIGlmICghJHRhYi5sZW5ndGgpIHJldHVybjtcbiAgICAgIGRlc2t0b3BUYWJzKCk7XG4gICAgICBhY2NvcmRpb24oKTtcbiAgICAgIC8vIGlmIChTQ1JFRU5fV0lEVEggPiA3NjgpICR0YWJDb250YWluZXIuZmluZCgnW2lkPVwidGFiMVwiXScpLmZhZGVJbigpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaW5pdDogaW5pdCgpLFxuICAgIH07XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCB0YWJzO1xuIl19
