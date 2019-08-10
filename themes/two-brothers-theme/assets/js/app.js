(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _hamburger = require('./modules/hamburger');

var _hamburger2 = _interopRequireDefault(_hamburger);

var _sticky = require('./modules/sticky');

var _sticky2 = _interopRequireDefault(_sticky);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// You can write a call and import your functions in this file.
//
// This file will be compiled into app.js and will not be minified.
// Feel free with using ES6 here.

// import {NAME} from './modules/...';
(function ($) {
  // When DOM is ready
  $(function () {
    _sticky2.default.handler();
    _hamburger2.default.handler();
  });
})(jQuery);

},{"./modules/hamburger":2,"./modules/sticky":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var hamburger = {
  handler: function handler() {
    var $body = $('body');
    var $btn = $('.hamburger');
    var $menu = $('.menu');
    var $submenu = $('.submenu');
    var $submenuLink = $('.menu__link--submenu');
    var $submenuClose = $('.submenu__item--static');
    var OPENED_CLASS = 'opened';
    var OVERLAY_CLASS = 'overlay';
    function hamburgerToggle() {
      $btn.on('click', function switcher() {
        $(this).toggleClass(OPENED_CLASS);
        $menu.toggleClass(OPENED_CLASS);
        $body.toggleClass(OVERLAY_CLASS);
        $submenu.removeClass(OPENED_CLASS);
      });
    }
    function submenuToggle() {
      $submenuLink.on('click', function (event) {
        event.preventDefault();
        $submenu.toggleClass(OPENED_CLASS);
      });
      $submenuClose.on('click', function (event) {
        event.preventDefault();
        $submenu.toggleClass(OPENED_CLASS);
      });
    }
    function init() {
      if (!$btn.length) return;
      hamburgerToggle();
      if (!$submenu.length) return;
      submenuToggle();
    }
    return {
      init: init()
    };
  }
};

exports.default = hamburger;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var stickyHeader = {
  handler: function handler() {
    var $window = $(window);
    var $header = $('.header');
    var $sticky = 10;

    function onScroll() {
      $window.on('scroll', function () {
        console.log($sticky);
        if ($window.scrollTop() > $sticky) {
          $header.addClass('sticky');
          console.log('123');
        } else {
          $header.removeClass('sticky');
        }
      });
    }
    return {
      init: onScroll()
    };
  }
};

exports.default = stickyHeader;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0aGVtZXMvdHdvLWJyb3RoZXJzLXRoZW1lL3NyYy9qcy9hcHAuanMiLCJ0aGVtZXMvdHdvLWJyb3RoZXJzLXRoZW1lL3NyYy9qcy9tb2R1bGVzL2hhbWJ1cmdlci5qcyIsInRoZW1lcy90d28tYnJvdGhlcnMtdGhlbWUvc3JjL2pzL21vZHVsZXMvc3RpY2t5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNNQTs7OztBQUNBOzs7Ozs7QUFQQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUlBLENBQUMsVUFBQyxDQUFELEVBQU87QUFDTjtBQUNBLElBQUUsWUFBTTtBQUNOLHFCQUFhLE9BQWI7QUFDQSx3QkFBVSxPQUFWO0FBQ0QsR0FIRDtBQUlELENBTkQsRUFNRyxNQU5IOzs7Ozs7OztBQ1RBLElBQU0sWUFBWTtBQUNoQixTQURnQixxQkFDTjtBQUNSLFFBQU0sUUFBUSxFQUFFLE1BQUYsQ0FBZDtBQUNBLFFBQU0sT0FBTyxFQUFFLFlBQUYsQ0FBYjtBQUNBLFFBQU0sUUFBUSxFQUFFLE9BQUYsQ0FBZDtBQUNBLFFBQU0sV0FBVyxFQUFFLFVBQUYsQ0FBakI7QUFDQSxRQUFNLGVBQWUsRUFBRSxzQkFBRixDQUFyQjtBQUNBLFFBQU0sZ0JBQWdCLEVBQUUsd0JBQUYsQ0FBdEI7QUFDQSxRQUFNLGVBQWUsUUFBckI7QUFDQSxRQUFNLGdCQUFnQixTQUF0QjtBQUNBLGFBQVMsZUFBVCxHQUEyQjtBQUN6QixXQUFLLEVBQUwsQ0FBUSxPQUFSLEVBQWlCLFNBQVMsUUFBVCxHQUFvQjtBQUNuQyxVQUFFLElBQUYsRUFBUSxXQUFSLENBQW9CLFlBQXBCO0FBQ0EsY0FBTSxXQUFOLENBQWtCLFlBQWxCO0FBQ0EsY0FBTSxXQUFOLENBQWtCLGFBQWxCO0FBQ0EsaUJBQVMsV0FBVCxDQUFxQixZQUFyQjtBQUNELE9BTEQ7QUFNRDtBQUNELGFBQVMsYUFBVCxHQUF5QjtBQUN2QixtQkFBYSxFQUFiLENBQWdCLE9BQWhCLEVBQXlCLFVBQUMsS0FBRCxFQUFXO0FBQ2xDLGNBQU0sY0FBTjtBQUNBLGlCQUFTLFdBQVQsQ0FBcUIsWUFBckI7QUFDRCxPQUhEO0FBSUEsb0JBQWMsRUFBZCxDQUFpQixPQUFqQixFQUEwQixVQUFDLEtBQUQsRUFBVztBQUNuQyxjQUFNLGNBQU47QUFDQSxpQkFBUyxXQUFULENBQXFCLFlBQXJCO0FBQ0QsT0FIRDtBQUlEO0FBQ0QsYUFBUyxJQUFULEdBQWdCO0FBQ2QsVUFBSSxDQUFDLEtBQUssTUFBVixFQUFrQjtBQUNsQjtBQUNBLFVBQUksQ0FBQyxTQUFTLE1BQWQsRUFBc0I7QUFDdEI7QUFDRDtBQUNELFdBQU87QUFDTCxZQUFNO0FBREQsS0FBUDtBQUdEO0FBckNlLENBQWxCOztrQkF3Q2UsUzs7Ozs7Ozs7QUN4Q2YsSUFBTSxlQUFlO0FBQ25CLFNBRG1CLHFCQUNUO0FBQ1IsUUFBTSxVQUFVLEVBQUUsTUFBRixDQUFoQjtBQUNBLFFBQU0sVUFBVSxFQUFFLFNBQUYsQ0FBaEI7QUFDQSxRQUFNLFVBQVUsRUFBaEI7O0FBRUEsYUFBUyxRQUFULEdBQW9CO0FBQ2xCLGNBQVEsRUFBUixDQUFXLFFBQVgsRUFBcUIsWUFBTTtBQUN2QixnQkFBUSxHQUFSLENBQVksT0FBWjtBQUNGLFlBQUksUUFBUSxTQUFSLEtBQXNCLE9BQTFCLEVBQW1DO0FBQ2pDLGtCQUFRLFFBQVIsQ0FBaUIsUUFBakI7QUFDQSxrQkFBUSxHQUFSLENBQVksS0FBWjtBQUNELFNBSEQsTUFHTztBQUNMLGtCQUFRLFdBQVIsQ0FBb0IsUUFBcEI7QUFDRDtBQUNGLE9BUkQ7QUFTRDtBQUNELFdBQU87QUFDTCxZQUFNO0FBREQsS0FBUDtBQUdEO0FBcEJrQixDQUFyQjs7a0JBdUJlLFkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBZb3UgY2FuIHdyaXRlIGEgY2FsbCBhbmQgaW1wb3J0IHlvdXIgZnVuY3Rpb25zIGluIHRoaXMgZmlsZS5cbi8vXG4vLyBUaGlzIGZpbGUgd2lsbCBiZSBjb21waWxlZCBpbnRvIGFwcC5qcyBhbmQgd2lsbCBub3QgYmUgbWluaWZpZWQuXG4vLyBGZWVsIGZyZWUgd2l0aCB1c2luZyBFUzYgaGVyZS5cblxuLy8gaW1wb3J0IHtOQU1FfSBmcm9tICcuL21vZHVsZXMvLi4uJztcbmltcG9ydCBoYW1idXJnZXIgZnJvbSAnLi9tb2R1bGVzL2hhbWJ1cmdlcic7XG5pbXBvcnQgc3RpY2t5SGVhZGVyIGZyb20gJy4vbW9kdWxlcy9zdGlja3knO1xuXG4oKCQpID0+IHtcbiAgLy8gV2hlbiBET00gaXMgcmVhZHlcbiAgJCgoKSA9PiB7XG4gICAgc3RpY2t5SGVhZGVyLmhhbmRsZXIoKTtcbiAgICBoYW1idXJnZXIuaGFuZGxlcigpO1xuICB9KTtcbn0pKGpRdWVyeSk7XG4iLCJjb25zdCBoYW1idXJnZXIgPSB7XG4gIGhhbmRsZXIoKSB7XG4gICAgY29uc3QgJGJvZHkgPSAkKCdib2R5Jyk7XG4gICAgY29uc3QgJGJ0biA9ICQoJy5oYW1idXJnZXInKTtcbiAgICBjb25zdCAkbWVudSA9ICQoJy5tZW51Jyk7XG4gICAgY29uc3QgJHN1Ym1lbnUgPSAkKCcuc3VibWVudScpO1xuICAgIGNvbnN0ICRzdWJtZW51TGluayA9ICQoJy5tZW51X19saW5rLS1zdWJtZW51Jyk7XG4gICAgY29uc3QgJHN1Ym1lbnVDbG9zZSA9ICQoJy5zdWJtZW51X19pdGVtLS1zdGF0aWMnKTtcbiAgICBjb25zdCBPUEVORURfQ0xBU1MgPSAnb3BlbmVkJztcbiAgICBjb25zdCBPVkVSTEFZX0NMQVNTID0gJ292ZXJsYXknO1xuICAgIGZ1bmN0aW9uIGhhbWJ1cmdlclRvZ2dsZSgpIHtcbiAgICAgICRidG4ub24oJ2NsaWNrJywgZnVuY3Rpb24gc3dpdGNoZXIoKSB7XG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoT1BFTkVEX0NMQVNTKTtcbiAgICAgICAgJG1lbnUudG9nZ2xlQ2xhc3MoT1BFTkVEX0NMQVNTKTtcbiAgICAgICAgJGJvZHkudG9nZ2xlQ2xhc3MoT1ZFUkxBWV9DTEFTUyk7XG4gICAgICAgICRzdWJtZW51LnJlbW92ZUNsYXNzKE9QRU5FRF9DTEFTUyk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc3VibWVudVRvZ2dsZSgpIHtcbiAgICAgICRzdWJtZW51TGluay5vbignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJHN1Ym1lbnUudG9nZ2xlQ2xhc3MoT1BFTkVEX0NMQVNTKTtcbiAgICAgIH0pO1xuICAgICAgJHN1Ym1lbnVDbG9zZS5vbignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJHN1Ym1lbnUudG9nZ2xlQ2xhc3MoT1BFTkVEX0NMQVNTKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgaWYgKCEkYnRuLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgaGFtYnVyZ2VyVG9nZ2xlKCk7XG4gICAgICBpZiAoISRzdWJtZW51Lmxlbmd0aCkgcmV0dXJuO1xuICAgICAgc3VibWVudVRvZ2dsZSgpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaW5pdDogaW5pdCgpLFxuICAgIH07XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBoYW1idXJnZXI7XG4iLCJjb25zdCBzdGlja3lIZWFkZXIgPSB7XG4gIGhhbmRsZXIoKSB7XG4gICAgY29uc3QgJHdpbmRvdyA9ICQod2luZG93KTtcbiAgICBjb25zdCAkaGVhZGVyID0gJCgnLmhlYWRlcicpO1xuICAgIGNvbnN0ICRzdGlja3kgPSAxMDtcblxuICAgIGZ1bmN0aW9uIG9uU2Nyb2xsKCkge1xuICAgICAgJHdpbmRvdy5vbignc2Nyb2xsJywgKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCRzdGlja3kpO1xuICAgICAgICBpZiAoJHdpbmRvdy5zY3JvbGxUb3AoKSA+ICRzdGlja3kpIHtcbiAgICAgICAgICAkaGVhZGVyLmFkZENsYXNzKCdzdGlja3knKTtcbiAgICAgICAgICBjb25zb2xlLmxvZygnMTIzJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcygnc3RpY2t5Jyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaW5pdDogb25TY3JvbGwoKSxcbiAgICB9O1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgc3RpY2t5SGVhZGVyO1xuIl19
