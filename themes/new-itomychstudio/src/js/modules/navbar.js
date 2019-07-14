const navbar = {
  responsiveNavbar() {
    const $window = $(window);
    const $header = $('.header');
    const $menuToggler = $('.menu-toggler');
    const $navbarHolder = $('.navbar-holder');
    const $closeBtn = $('.close-btn');
    const $logo = $('.logo');
    const DESKTOP_VIEW_WIDTH = 1023;
    const SCROLL_START_POINT = 0;
    const SCROLLED_CLASS = 'scrolled';
    const OPENED_CLASS = 'opened';
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
        const BOTTOM_POSITION = $(document).height() - $(window).height();
        const FROM_TOP = $(this).scrollTop();
        if (FROM_TOP > SCROLL_START_POINT
            && FROM_TOP !== BOTTOM_POSITION) {
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
      $menuToggler.on('click', () => {
        if (widthCheck(DESKTOP_VIEW_WIDTH)) {
          removeScrollClass($menuToggler);
          removeScrollClass($navbarHolder);
        } else {
          removeScrollClass($navbarHolder);
          $navbarHolder.addClass(OPENED_CLASS);
        }
      });
      $closeBtn.on('click', () => {
        $navbarHolder.removeClass(OPENED_CLASS);
      });
    }
    function init() {
      if (!$header.length) return;
      onScrollDesktop();
      menuHandler();
    }
    return {
      init: init(),
    };
  },
};

export default navbar;
